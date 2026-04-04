import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { scrapeGenericPage } from "@/lib/scraper";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { logAgent, startTimer, stimaCosto } from "@/lib/agent-logger";

// ============================================
// AGENTE WRITER
// Scrapa siti pet italiani, estrae spunti, genera articoli SEO.
// 3-5 articoli a settimana, tutti unici e ottimizzati.
// ============================================

const FONTI = [
  { url: "https://www.kodami.it/", nome: "Kodami" },
  { url: "https://www.greenme.it/animali/", nome: "GreenMe" },
  { url: "https://www.lastampa.it/la-zampa", nome: "La Zampa" },
  { url: "https://www.petpassion.tv/", nome: "PetPassion" },
];

const CATEGORIE = ["guide", "salute", "comportamento", "curiosita", "razze", "gatti", "consigli", "aneddoti"];

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const elapsed = startTimer();

  // 1. Scrapa le fonti per trovare spunti
  const spunti: string[] = [];
  for (const fonte of FONTI) {
    try {
      const page = await scrapeGenericPage(fonte.url);
      if (page.text) {
        spunti.push(`[${fonte.nome}] ${page.text.slice(0, 800)}`);
      }
    } catch { /* continua */ }
  }

  if (spunti.length === 0) {
    return NextResponse.json({ success: false, error: "Nessuna fonte raggiungibile" });
  }

  // 2. Genera articoli con Claude
  const oggi = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  const categoriaOggi = CATEGORIE[Math.floor(Date.now() / 86400000) % CATEGORIE.length];

  const prompt = `Sei il SEO Writer di MiFidoDiTe.eu — il portale pet #1 in Italia.

Scrivi 2 articoli di ALTISSIMA qualita. Data: ${oggi}. Categoria suggerita: ${categoriaOggi}.

SPUNTI dalle testate pet italiane:
${spunti.join("\n\n")}

REGOLE DI SCRITTURA:
- 950-1400 parole per articolo, MAI meno
- Titolo SEO forte (keyword principale + emozione)
- Primo paragrafo: hook empatico + keyword principale
- Struttura: h2 per ogni sezione, h3 per sotto-sezioni, paragrafi MAX 3 righe
- Elenchi puntati dove servono (li, ul)
- Grassetto (<strong>) sulle frasi chiave
- Tono: come un amico veterinario che ti spiega le cose a cena
- Lingua: italiano fluente, ZERO anglicismi (toelettatura non grooming)
- Chiudi con CTA: "Su MifidoDiTe.eu trovi [professionista] nella tua zona"
- NON inventare statistiche. Se citi dati, specifica la fonte
- Articoli ORIGINALI — rielabora, non copiare

Rispondi con array JSON puro (no markdown), ogni elemento:
{
  "titolo": "max 80 char, SEO-ottimizzato",
  "slug": "formato-url-seo",
  "categoria": "guide|salute|comportamento|curiosita|razze|gatti|consigli|aneddoti",
  "estratto": "2 frasi max 160 char — funziona come meta description",
  "contenuto": "HTML completo con h2 h3 p ul li strong",
  "tempo_lettura": "X min",
  "tags": ["3-5 keyword"]
}`;

  try {
    const response = await askAI(prompt, 8000);
    const articoli = extractJSON(response) as Array<{
      titolo: string;
      slug: string;
      categoria: string;
      estratto: string;
      contenuto: string;
      tempo_lettura: string;
      tags: string[];
    }>;

    let salvati = 0;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      for (const art of articoli) {
        if (!art.titolo || !art.contenuto) continue;
        const slug = art.slug || slugify(art.titolo);

        const { data: exists } = await supabase
          .from("articoli")
          .select("id")
          .eq("slug", slug)
          .limit(1)
          .single();

        if (!exists) {
          await supabase.from("articoli").insert({
            titolo: art.titolo,
            slug,
            categoria: art.categoria || categoriaOggi,
            estratto: art.estratto,
            contenuto: art.contenuto,
            tempo_lettura: art.tempo_lettura || "5 min",
            tags: art.tags || [],
            img: `https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80`,
            pubblicato: false,  // Bozza — passa per approvazione admin
          });
          salvati++;
        }
      }
    }

    await logAgent({
      agente: "writer",
      stato: salvati > 0 ? "ok" : "parziale",
      risultati_trovati: articoli.length,
      risultati_salvati: salvati,
      durata_ms: elapsed(),
      costo_stimato: stimaCosto(prompt.length, response.length),
      dettagli: { titoli: articoli.map((a: { titolo: string }) => a.titolo) },
    });

    return NextResponse.json({
      success: true,
      agente: "writer",
      articoli_generati: articoli.length,
      salvati,
      titoli: articoli.map((a) => a.titolo),
    });
  } catch (err) {
    await logAgent({
      agente: "writer",
      stato: "errore",
      errore_messaggio: String(err),
      durata_ms: elapsed(),
    });
    return NextResponse.json({ success: false, error: String(err) });
  }
}
