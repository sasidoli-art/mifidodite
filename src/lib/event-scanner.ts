// Event scanner: fetch RSS, classifica con Claude Haiku, stage in eventi_candidati
// Usato dal cron /api/cron/scan-eventi-pet

import * as cheerio from "cheerio";
import { getDB } from "./db";
import { askClaude } from "./ai-agent";
import { EVENT_SOURCES, type EventSource } from "./event-sources";
import { fetchPage } from "./scraper";

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

interface AIClassification {
  is_pet: boolean;
  categoria: "cani" | "gatti" | "entrambi" | "altri" | null;
  citta: string | null;
  provincia: string | null;
  regione: string | null;
  data_evento: string | null; // YYYY-MM-DD
  data_evento_fine: string | null;
  score: number; // 0-100
  reason: string;
}

function parseRss(xml: string): RssItem[] {
  const $ = cheerio.load(xml, { xmlMode: true });
  const items: RssItem[] = [];
  $("item").each((_, el) => {
    const title = $(el).find("title").first().text().trim();
    const link = $(el).find("link").first().text().trim();
    const description = $(el).find("description").first().text().trim();
    const pubDate = $(el).find("pubDate").first().text().trim();
    if (title && link) items.push({ title, link, description, pubDate });
  });
  return items;
}

// Parola chiave veloce prima di scomodare l'AI (risparmio tokens)
const PET_KEYWORDS = [
  "gatt", "felin", "cane", "cani", "cuccio", "zampa", "veterinar",
  "adozion", "canil", "gattil", "raduno", "cinofil", "pet", "animal",
  "dog", "cat", "esposizion", "fiera canina", "fiera felina",
  "toelettatur", "educator", "kennel", "cinotecnic", "cinologic",
  "quattrozampe", "quattro zampe", "quattrozampeinfiera", "bau",
];

function quickPetFilter(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return PET_KEYWORDS.some((kw) => text.includes(kw));
}

async function classifyWithAI(
  item: RssItem,
  source: EventSource,
): Promise<AIClassification> {
  const prompt = `Sei un classificatore di eventi. Rispondi SOLO con JSON valido, nessun altro testo.

EVENTO:
Titolo: ${item.title}
Descrizione: ${item.description.slice(0, 500)}
Fonte: ${source.nome} (${source.citta}, ${source.regione})
Data pubblicazione: ${item.pubDate}

DOMANDA:
E un evento dedicato agli animali domestici (cani, gatti, ecc.)? Esempi rilevanti: esposizioni feline/canine, raduni, open day di canili/gattili, pet therapy, sfilate cinofile, fiere pet, seminari educatori cinofili, adozioni, eventi sui sentieri dog-friendly con guida organizzata.

NON rilevanti: concerti, mostre d'arte senza tema pet, sagre generiche anche se tollerano cani, eventi sportivi umani, spettacoli teatrali.

Estrai data evento in formato YYYY-MM-DD se presente nel titolo/descrizione. Se non specificata, null.
Categoria: "cani", "gatti", "entrambi", "altri" (conigli/uccelli/esotici), o null se non pet.

JSON richiesto:
{
  "is_pet": boolean,
  "categoria": "cani" | "gatti" | "entrambi" | "altri" | null,
  "citta": string | null,
  "provincia": string | null (sigla 2 lettere),
  "regione": string | null,
  "data_evento": "YYYY-MM-DD" | null,
  "data_evento_fine": "YYYY-MM-DD" | null,
  "score": 0-100,
  "reason": string (max 100 caratteri)
}`;

  const raw = await askClaude(prompt, 400);
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`AI non ha restituito JSON: ${raw.slice(0, 200)}`);
  const parsed = JSON.parse(match[0]) as AIClassification;

  // Fallback su dati della fonte se AI non li estrae
  if (!parsed.citta) parsed.citta = source.citta;
  if (!parsed.regione) parsed.regione = source.regione;

  return parsed;
}

export interface ScanResult {
  source: string;
  fetched: number;
  prefiltered: number;
  classified: number;
  inserted: number;
  errors: number;
}

export async function scanSource(source: EventSource): Promise<ScanResult> {
  const result: ScanResult = {
    source: source.nome,
    fetched: 0,
    prefiltered: 0,
    classified: 0,
    inserted: 0,
    errors: 0,
  };

  const xml = await fetchPage(source.url);
  if (!xml) {
    result.errors++;
    return result;
  }

  const items = source.tipo === "rss" ? parseRss(xml) : [];
  result.fetched = items.length;

  const sql = getDB();

  for (const item of items) {
    // 1. Pre-filtro keyword (evita chiamate AI inutili)
    if (!quickPetFilter(item.title, item.description)) continue;
    result.prefiltered++;

    // 2. Dedup su fonte_url (UNIQUE index)
    try {
      const existing = await sql`
        SELECT id FROM eventi_candidati WHERE fonte_url = ${item.link} LIMIT 1
      `;
      if (existing.length > 0) continue;
    } catch {
      // tabella potrebbe non esistere ancora in dev — in quel caso skip silenzioso
      result.errors++;
      continue;
    }

    // 3. Classifica con AI
    try {
      const cls = await classifyWithAI(item, source);
      result.classified++;

      if (!cls.is_pet || cls.score < 50) continue;

      // 4. Inserisci come pending
      const pubDate = item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : null;

      await sql`
        INSERT INTO eventi_candidati (
          fonte_url, fonte_nome, titolo_raw, descrizione_raw, data_pubblicazione,
          is_pet, categoria, citta, provincia, regione,
          data_evento, data_evento_fine, ai_score, ai_reason
        ) VALUES (
          ${item.link}, ${source.nome}, ${item.title}, ${item.description.slice(0, 2000)}, ${pubDate},
          ${cls.is_pet}, ${cls.categoria}, ${cls.citta}, ${cls.provincia}, ${cls.regione},
          ${cls.data_evento}, ${cls.data_evento_fine}, ${cls.score}, ${cls.reason}
        )
      `;
      result.inserted++;
    } catch (err) {
      console.error(`[event-scanner] ${source.nome} item "${item.title}":`, err);
      result.errors++;
    }
  }

  return result;
}

export async function scanAllSources(limit?: number): Promise<ScanResult[]> {
  const sources = limit ? EVENT_SOURCES.slice(0, limit) : EVENT_SOURCES;
  const results: ScanResult[] = [];
  for (const src of sources) {
    try {
      results.push(await scanSource(src));
    } catch (err) {
      console.error(`[event-scanner] fonte ${src.nome} fallita:`, err);
      results.push({
        source: src.nome,
        fetched: 0,
        prefiltered: 0,
        classified: 0,
        inserted: 0,
        errors: 1,
      });
    }
  }
  return results;
}
