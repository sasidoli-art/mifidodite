import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { scrapeGenericPage } from "@/lib/scraper";
import { askDeepSeekFull, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { logAgent, startTimer, calculateCost } from "@/lib/agent-logger";
import { getDB } from "@/lib/db";

// Accumulatore token/cost per il run corrente
type RunAccum = { input: number; output: number; cost: number };

// ============================================
// AGENTE WRITER v2
// Scrapa fonti ITALIANE + INTERNAZIONALI, genera articoli SEO.
// Curiosita scientifiche, studi, fatti verificabili.
// ============================================

const FONTI_IT = [
  { url: "https://www.kodami.it/", nome: "Kodami" },
  { url: "https://www.greenme.it/animali/", nome: "GreenMe" },
  { url: "https://www.lastampa.it/la-zampa", nome: "La Zampa" },
  { url: "https://www.petpassion.tv/", nome: "PetPassion" },
];

const FONTI_INT = [
  { url: "https://www.sciencedaily.com/news/plants_animals/dogs/", nome: "ScienceDaily Dogs" },
  { url: "https://www.sciencedaily.com/news/plants_animals/cats/", nome: "ScienceDaily Cats" },
  { url: "https://www.bbc.com/news/topics/c77jz3mdqwzt", nome: "BBC Animals" },
  { url: "https://www.nationalgeographic.com/animals", nome: "NatGeo Animals" },
  { url: "https://www.newscientist.com/subject/life/", nome: "NewScientist" },
  { url: "https://www.livescience.com/animals", nome: "LiveScience Animals" },
];

const CATEGORIE = ["guide", "salute", "comportamento", "curiosita", "razze", "gatti", "consigli", "aneddoti"];

const UNSPLASH_IMAGES: Record<string, string> = {
  guide: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  salute: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  comportamento: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80",
  curiosita: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
  razze: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
  gatti: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
  consigli: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  aneddoti: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80",
};

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const elapsed = startTimer();
  const sql = getDB();

  // 1. Scrapa fonti italiane e internazionali
  const spuntiIT: string[] = [];
  const spuntiINT: string[] = [];

  const scrapePromises = [
    ...FONTI_IT.map(async (fonte) => {
      try {
        const page = await scrapeGenericPage(fonte.url);
        if (page.text) spuntiIT.push(`[${fonte.nome}] ${page.text.slice(0, 600)}`);
      } catch { /* skip */ }
    }),
    ...FONTI_INT.map(async (fonte) => {
      try {
        const page = await scrapeGenericPage(fonte.url);
        if (page.text) spuntiINT.push(`[${fonte.nome}] ${page.text.slice(0, 600)}`);
      } catch { /* skip */ }
    }),
  ];

  await Promise.all(scrapePromises);

  console.log(`[Writer] Fonti IT: ${spuntiIT.length}, Fonti INT: ${spuntiINT.length}`);

  // Se nessuna fonte, genera comunque con conoscenza AI
  if (spuntiIT.length === 0 && spuntiINT.length === 0) {
    spuntiIT.push("[Nessuna fonte scraped] Genera articoli basati sulla tua conoscenza di studi scientifici reali sul mondo pet, veterinaria, comportamento animale, curiosita zoologiche.");
  }

  // 2. Genera articoli uno alla volta (JSON piu affidabile)
  const oggi = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  const categoriaOggi = CATEGORIE[Math.floor(Date.now() / 86400000) % CATEGORIE.length];
  const categoriaAlt = CATEGORIE[(Math.floor(Date.now() / 86400000) + 3) % CATEGORIE.length];

  const ARTICOLI_DA_SCRIVERE = [
    {
      tipo: "pratico",
      desc: "Un articolo PRATICO: guida, consiglio o salute animale. Basato su fonti italiane.",
      categoria: categoriaOggi,
      fonti: spuntiIT.join("\n") || spuntiINT.join("\n"),
    },
    {
      tipo: "curiosita-scientifica",
      desc: "Un articolo di CURIOSITA SCIENTIFICA basato su studi internazionali. Es: 'Perche i gatti fanno le fusa? La scienza ha una nuova risposta', 'I cani capiscono davvero le nostre emozioni — cosa dice la ricerca'. Cita studi reali con universita e rivista.",
      categoria: "curiosita",
      fonti: spuntiINT.join("\n") || spuntiIT.join("\n"),
    },
    {
      tipo: "internazionale-italiano",
      desc: "Un articolo che MESCOLA una notizia/studio internazionale con il contesto italiano. Es: uno studio UK sulle razze piu longeve applicato alla situazione italiana, dati ENCI vs trend mondiali.",
      categoria: categoriaAlt,
      fonti: [...spuntiINT, ...spuntiIT].join("\n"),
    },
  ];

  type ArticleResult = {
    titolo: string;
    slug: string;
    categoria: string;
    estratto: string;
    contenuto: string;
    tempo_lettura: string;
    tags: string[];
    fonte_nome?: string;
    fonte_url?: string;
  };

  const articoli: ArticleResult[] = [];
  let salvati = 0;
  const accum: RunAccum = { input: 0, output: 0, cost: 0 };

  for (const task of ARTICOLI_DA_SCRIVERE) {
    try {
      // STEP 1: Genera metadati dell'articolo
      const metaPrompt = `Sei il SEO Writer di MiFidoDiTe.eu. Data: ${oggi}.

COMPITO: ${task.desc}

SPUNTI:
${task.fonti.slice(0, 1500)}

Genera i METADATI di un articolo per il magazine. Rispondi SOLO con JSON puro (no markdown, no fences):
{"titolo":"titolo SEO max 80 char","slug":"formato-url-seo","categoria":"${task.categoria}","estratto":"meta description 2 frasi max 160 char","tempo_lettura":"X min","tags":["3-5 keyword"],"fonte_nome":"fonte","fonte_url":"url"}`;

      console.log(`[Writer] Step 1: metadati per ${task.tipo}...`);
      const metaRes = await askDeepSeekFull(metaPrompt, 500);
      accum.input += metaRes.usage.input;
      accum.output += metaRes.usage.output;
      accum.cost += calculateCost(metaRes.model_used, metaRes.usage.input, metaRes.usage.output);
      console.log(`[Writer] Meta response (${metaRes.text.length} chars):`, metaRes.text.slice(0, 300));
      const meta = extractJSON(metaRes.text) as ArticleResult;
      if (!meta?.titolo) {
        console.warn(`[Writer] Nessun titolo per ${task.tipo}, skip`);
        continue;
      }

      const slug = meta.slug || slugify(meta.titolo);

      // Controlla se slug gia esiste
      const existing = await sql`SELECT id FROM articoli WHERE slug = ${slug} LIMIT 1`;
      if (existing.length > 0) {
        console.log(`[Writer] Slug "${slug}" gia esiste, skip`);
        continue;
      }

      // STEP 2: Genera il contenuto — formato SEO + AI Ready
      const contentPrompt = `Scrivi un articolo per il magazine di MifidoDiTe.eu. Formato ottimizzato per SEO e per essere citato da AI (ChatGPT, Perplexity, Google AI Overview).

TITOLO: ${meta.titolo}
CATEGORIA: ${meta.categoria}
ESTRATTO: ${meta.estratto}

STRUTTURA OBBLIGATORIA (segui questo schema):

1. PRIMO PARAGRAFO = RISPOSTA DIRETTA alla domanda del titolo.
   Deve essere "copiabile e incollabile" come risposta autonoma.
   NON iniziare con "In questo articolo..." o frasi introduttive.
   Inizia con la RISPOSTA: fatti, numeri, procedura in 2-3 frasi.

2. PROCEDURA / ELENCO CHIAVE subito dopo (se il tema lo richiede).
   Usa <ol> o <ul> con passi chiari e concreti.
   Ogni punto = 1 frase. No testo inutile.

3. SEZIONI h2 formulate COME DOMANDE che le persone cercano su Google:
   Es: "Quanto costa adottare un cane dal canile?"
   Es: "Quali documenti servono per il passaggio di proprieta?"
   Es: "Cosa rischio se non metto il microchip?"
   Ogni h2 = una domanda reale → risposta immediata nel primo paragrafo sotto.

4. SEZIONE FAQ alla fine con 3-4 domande frequenti in formato:
   <h3>Domanda?</h3><p>Risposta diretta in 1-2 frasi.</p>

REGOLE DI SCRITTURA:
- 1000-1500 parole
- HTML: h2, h3, p, ol, ul, li, strong. NO div, NO span, NO classi CSS.
- Paragrafi MAX 3 righe (leggibilita mobile)
- Tono: esperto ma accessibile, come un veterinario amico
- Italiano fluente, ZERO anglicismi
- Se citi leggi: numero articolo + nome legge (es. Art. 169 CdS, Legge 281/1991)
- Se citi dati: specifica la fonte (universita, ente, studio)
- NON inventare statistiche
- Ogni paragrafo deve poter essere "copiato e incollato come risposta" da solo
- Chiudi con: "<p><strong>Scopri altre guide e consigli su MifidoDiTe.eu, il magazine pet d'Italia.</strong></p>"
- Rispondi SOLO con HTML. No markdown, no fences, no commenti.`;

      console.log(`[Writer] Step 2: contenuto per "${meta.titolo}"...`);
      const contentRes = await askDeepSeekFull(contentPrompt, 5000);
      accum.input += contentRes.usage.input;
      accum.output += contentRes.usage.output;
      accum.cost += calculateCost(contentRes.model_used, contentRes.usage.input, contentRes.usage.output);
      const contenuto = contentRes.text;
      console.log(`[Writer] Contenuto ricevuto (${contenuto.length} chars)`);

      // Pulisci eventuali fences markdown dal contenuto
      let htmlContent = contenuto
        .replace(/^```html?\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();

      if (htmlContent.length < 500) {
        console.warn(`[Writer] Contenuto troppo corto per ${task.tipo} (${htmlContent.length} chars), skip`);
        continue;
      }

      const categoria = meta.categoria || task.categoria;
      const img = UNSPLASH_IMAGES[categoria] || UNSPLASH_IMAGES.curiosita;

      await sql`
        INSERT INTO articoli (titolo, slug, categoria, estratto, contenuto, tempo_lettura, tags, img, fonte_nome, fonte_url, pubblicato)
        VALUES (
          ${meta.titolo},
          ${slug},
          ${categoria},
          ${meta.estratto || ""},
          ${htmlContent},
          ${meta.tempo_lettura || "5 min"},
          ${meta.tags || []},
          ${img},
          ${meta.fonte_nome || null},
          ${meta.fonte_url || null},
          false
        )
      `;
      salvati++;
      articoli.push({ ...meta, contenuto: htmlContent });
      console.log(`[Writer] Articolo "${meta.titolo}" salvato!`);
    } catch (err) {
      const errMsg = (err as Error).message || String(err);
      console.error(`[Writer] Articolo ${task.tipo} FALLITO:`, errMsg);
      articoli.push({ titolo: `ERRORE: ${task.tipo} — ${errMsg.slice(0, 200)}`, slug: "", categoria: "", estratto: "", contenuto: "", tempo_lettura: "", tags: [] });
    }
  }

  await logAgent({
    agente: "writer",
    stato: salvati > 0 ? "ok" : "parziale",
    risultati_trovati: articoli.length,
    risultati_salvati: salvati,
    durata_ms: elapsed(),
    costo_stimato: Number(accum.cost.toFixed(6)),
    dettagli: {
      titoli: articoli.map((a) => a.titolo),
      model_used: "deepseek-chat",
      input_tokens: accum.input,
      output_tokens: accum.output,
    },
  });

  return NextResponse.json({
    success: true,
    agente: "writer",
    articoli_generati: articoli.length,
    salvati,
    titoli: articoli.map((a) => a.titolo),
  });
}
