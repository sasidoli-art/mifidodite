import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { scrapeGenericPage } from "@/lib/scraper";
import { askClaude, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { CITTA_ITALIANE, REGIONI } from "@/lib/scraper-google";
import { logAgent, startTimer, stimaCosto } from "@/lib/agent-logger";

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
  let totalInputChars = 0;
  let totalOutputChars = 0;

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
      const googleUrl = `https://www.google.com/search?q=${query}&num=10&hl=it`;

      const page = await scrapeGenericPage(googleUrl);
      if (!page.text || page.text.length < 100) continue;

      // Chiedi a Claude di estrarre i professionisti dal testo
      const prompt = `Analizza questo testo estratto da una ricerca Google per "${categoria}" a ${citta.citta} (${citta.prov}).

Estrai TUTTI i professionisti/strutture reali che trovi. Per ognuno fornisci:
- nome (il nome reale dell'attivita)
- categoria (una tra: pensione, dog_sitter, cat_sitter, toelettatura, educatore_cinofilo, veterinario, pet_taxi)
- descrizione (2-3 frasi basate su quello che trovi, NON inventare)
- telefono (se presente)
- indirizzo (se presente)
- servizi (lista di servizi menzionati)

REGOLE:
- Solo attivita REALI, non inventare nomi
- Se non trovi nulla di concreto, rispondi con []
- Solo attivita nella zona di ${citta.citta}

Rispondi SOLO con un array JSON valido.

TESTO DA ANALIZZARE:
${page.text.slice(0, 3000)}`;

      const response = await askClaude(prompt, 3000);
      totalInputChars += prompt.length;
      totalOutputChars += response.length;
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

      // Pausa tra le ricerche
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
    costo_stimato: stimaCosto(totalInputChars, totalOutputChars),
    dettagli: {
      regione: citta.regione,
      categorie_cercate: CATEGORIE_RICERCA.length,
      nomi: risultati.map((r) => r.nome),
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
