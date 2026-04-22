import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { scrapeGenericPage } from "@/lib/scraper";
import { askAIFull, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { CITTA_ITALIANE, REGIONI } from "@/lib/scraper-google";
import { logAgent, startTimer, calculateCost } from "@/lib/agent-logger";

// ============================================
// AGENTE SCRAPER
// Cerca professionisti reali su Google, li analizza con Claude
// e li salva nel DB. Gira ogni giorno, 1 citta alla volta.
// ============================================

const CATEGORIE_RICERCA = [
  "pensione per cani",
  "dog sitter",
  "toelettatura cani",
  "educatore cinofilo",
  "veterinario",
  "cat sitter",
  "pet taxi",
];

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const elapsed = startTimer();
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCostEur = 0;
  let modelUsed = "";

  // Determina quale citta scrapare oggi (rotazione giornaliera)
  const oggi = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  const tutteLeCitta = REGIONI.flatMap((r) =>
    (CITTA_ITALIANE[r] || []).map((c) => ({ ...c, regione: r }))
  );
  const cittaIndex = oggi % tutteLeCitta.length;
  const citta = tutteLeCitta[cittaIndex];

  const risultati: Array<{
    nome: string;
    categoria: string;
    comune: string;
    provincia: string;
    regione: string;
    descrizione: string;
    telefono: string | null;
    indirizzo: string | null;
    servizi: string[];
  }> = [];

  // Per ogni categoria, cerca su Google e analizza con Claude
  for (const categoria of CATEGORIE_RICERCA) {
    try {
      const query = encodeURIComponent(`${categoria} ${citta.citta} ${citta.prov}`);

      // Fonte 1: Google
      let pageText = "";
      const googleUrl = `https://www.google.com/search?q=${query}&num=10&hl=it`;
      const googlePage = await scrapeGenericPage(googleUrl);
      if (googlePage.text && googlePage.text.length > 100) {
        pageText = googlePage.text;
      }

      // Fonte 2: PagineGialle (fallback se Google blocca)
      if (!pageText) {
        const pgQuery = encodeURIComponent(`${categoria}`);
        const pgUrl = `https://www.paginegialle.it/ricerca/${pgQuery}/${encodeURIComponent(citta.citta)}`;
        const pgPage = await scrapeGenericPage(pgUrl);
        if (pgPage.text && pgPage.text.length > 100) {
          pageText = pgPage.text;
        }
      }

      if (!pageText) continue;

      // Prompt ottimizzato per estrazione professionisti
      const prompt = `Sei l'agente di crescita di MiFidoDiTe.eu, il portale pet #1 in Italia.

Analizza questo testo e trova professionisti/strutture pet REALI a ${citta.citta} (${citta.prov}).

Per ognuno rispondi con JSON array. Campi obbligatori:
- name: nome reale dell'attivita (NON inventare)
- category: una tra pensione, dog_sitter, cat_sitter, toelettatura, educatore_cinofilo, veterinario, pet_taxi
- description: 2-3 frasi accattivanti e SEO-friendly basate sui dati reali
- phone: telefono se presente, altrimenti null
- address: indirizzo se presente, altrimenti null
- services: array di servizi offerti
- website: url sito web se presente, altrimenti null

REGOLE FERREE:
- Solo attivita VERIFICABILI. Se inventi un nome, danneggi il portale.
- Se non trovi nulla, rispondi con []
- La descrizione deve essere empatica: parla al proprietario che cerca aiuto per il suo animale
- Rispondi SOLO con array JSON, niente altro
- Solo attivita nella zona di ${citta.citta}

Rispondi SOLO con un array JSON valido.

TESTO DA ANALIZZARE:
${pageText.slice(0, 3000)}`;

      const fullRes = await askAIFull(prompt, 3000);
      const response = fullRes.text;
      totalInputTokens += fullRes.usage.input;
      totalOutputTokens += fullRes.usage.output;
      modelUsed = fullRes.model_used;
      totalCostEur += calculateCost(fullRes.model_used, fullRes.usage.input, fullRes.usage.output);
      const parsed = extractJSON(response) as Array<{
        nome: string;
        categoria: string;
        descrizione: string;
        telefono?: string;
        indirizzo?: string;
        servizi?: string[];
      }>;

      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item.nome && item.nome.length > 3) {
            risultati.push({
              nome: item.nome,
              categoria: item.categoria || categoria.replace(/ /g, "_"),
              comune: citta.citta,
              provincia: citta.prov,
              regione: citta.regione,
              descrizione: item.descrizione || "",
              telefono: item.telefono || null,
              indirizzo: item.indirizzo || null,
              servizi: item.servizi || [],
            });
          }
        }
      }

      // Rate limiting: pausa 3-5 secondi tra le ricerche (randomizzata per sembrare umano)
      await new Promise((resolve) => setTimeout(resolve, 3000 + Math.random() * 2000));
    } catch {
      // Continua con la prossima categoria
    }
  }

  // Salva nel DB (se Supabase configurato)
  let salvati = 0;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();

    for (const r of risultati) {
      const slug = slugify(`${r.nome}-${r.comune}`);

      // Controlla duplicati
      const { data: exists } = await supabase
        .from("strutture")
        .select("id")
        .eq("slug", slug)
        .limit(1)
        .single();

      if (!exists) {
        await supabase.from("strutture").insert({
          nome: r.nome,
          slug,
          categoria: r.categoria,
          comune: r.comune,
          provincia: r.provincia,
          regione: r.regione,
          descrizione: r.descrizione,
          telefono: r.telefono,
          indirizzo: r.indirizzo,
          servizi: r.servizi,
          fonte: "scraping_google",
          attivo: false,  // Non visibile — passa per approvazione admin
          verificato: false,
        });
        salvati++;
      }
    }
  }

  // Log esecuzione
  await logAgent({
    agente: "scraper",
    stato: risultati.length > 0 ? "ok" : "parziale",
    citta: `${citta.citta} (${citta.prov})`,
    risultati_trovati: risultati.length,
    risultati_salvati: salvati,
    errori: 0,
    durata_ms: elapsed(),
    costo_stimato: Number(totalCostEur.toFixed(6)),
    dettagli: {
      regione: citta.regione,
      categorie_cercate: CATEGORIE_RICERCA.length,
      nomi: risultati.map((r) => r.nome),
      model_used: modelUsed,
      input_tokens: totalInputTokens,
      output_tokens: totalOutputTokens,
    },
  });

  return NextResponse.json({
    success: true,
    agente: "scraper",
    citta: `${citta.citta} (${citta.prov})`,
    regione: citta.regione,
    categorie_cercate: CATEGORIE_RICERCA.length,
    trovati: risultati.length,
    salvati,
    risultati: risultati.map((r) => ({ nome: r.nome, categoria: r.categoria })),
  });
}
