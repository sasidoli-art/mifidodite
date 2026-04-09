import { NextRequest, NextResponse } from "next/server";
import { askDeepSeek } from "@/lib/ai-agent";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Riscrive articoli esistenti nel formato AI+SEO Ready
// Mantiene slug, titolo, categoria, img — sovrascrive contenuto + estratto

interface ArticoloRow {
  id: number;
  titolo: string;
  slug: string;
  categoria: string;
  contenuto: string;
  tags: string[];
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const batch = Math.min(Number(url.searchParams.get("batch") || "3"), 10);
  const offset = Number(url.searchParams.get("offset") || "0");

  const sql = getDB();

  // Prendi articoli da riscrivere (ordine per created_at, batch per batch)
  const articoli = (await sql`
    SELECT id, titolo, slug, categoria, contenuto, tags
    FROM articoli
    WHERE pubblicato = true
    ORDER BY created_at ASC
    LIMIT ${batch}
    OFFSET ${offset}
  `) as unknown as ArticoloRow[];

  if (articoli.length === 0) {
    return NextResponse.json({ done: true, message: "Nessun articolo da riscrivere", offset });
  }

  const results: Array<{ titolo: string; slug: string; stato: string }> = [];
  const errors: string[] = [];

  for (const art of articoli) {
    try {
      // Estrai l'argomento dal titolo + primi 200 char del vecchio contenuto
      const oldTextPreview = art.contenuto
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 300);

      const prompt = `Riscrivi questo articolo per MifidoDiTe.eu nel formato SEO + AI Ready.

TITOLO: ${art.titolo}
CATEGORIA: ${art.categoria}
ARGOMENTO (dal vecchio articolo): ${oldTextPreview}

STRUTTURA OBBLIGATORIA:

1. PRIMO PARAGRAFO = RISPOSTA DIRETTA alla domanda del titolo.
   NON iniziare con "In questo articolo..." o "Quando si parla di...".
   Inizia con la RISPOSTA: fatti concreti, numeri, procedura in 2-3 frasi.
   Questo paragrafo deve funzionare DA SOLO come risposta completa.

2. Se il tema lo richiede, ELENCO/PROCEDURA subito dopo.
   Usa <ol> per passi, <ul> per liste. 1 frase per punto. Chiaro e diretto.

3. SEZIONI h2 formulate COME DOMANDE che la gente cerca su Google:
   "Quanto costa...?", "Cosa rischio se...?", "Quali sono i sintomi di...?"
   "Come si fa...?", "Quando chiamare il veterinario?"
   Sotto ogni h2: risposta diretta nel PRIMO paragrafo.

4. Se riguarda LEGGI italiane: cita Art. + nome legge + sanzioni in euro.
   Se citi studi: universita + rivista + anno.
   Se citi dati: specifica la fonte.
   NON inventare nulla.

5. SEZIONE FAQ alla fine: 3-4 domande in <h3>Domanda?</h3><p>Risposta diretta 1-2 frasi.</p>

REGOLE:
- 1000-1400 parole
- HTML: h2, h3, p, ol, ul, li, strong. NO div, NO span, NO classi CSS.
- Paragrafi MAX 3 righe (leggibilita mobile)
- Tono: esperto ma accessibile, come un veterinario amico
- Italiano fluente, ZERO anglicismi
- OGNI paragrafo deve poter essere "copiato e incollato come risposta" da solo
- Chiudi con: "<p><strong>Scopri altre guide e consigli su MifidoDiTe.eu, il magazine pet d'Italia.</strong></p>"
- Rispondi SOLO con HTML. No markdown, no fences, no commenti.`;

      const newContent = await askDeepSeek(prompt, 6000);
      let html = newContent.replace(/^```html?\s*/i, "").replace(/```\s*$/i, "").trim();

      if (html.length < 500) {
        errors.push(`Troppo corto: ${art.titolo} (${html.length} chars)`);
        continue;
      }

      // Genera nuovo estratto (prima frase del contenuto senza HTML)
      const plainText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const estratto = plainText.slice(0, 155) + (plainText.length > 155 ? "..." : "");

      // Aggiorna nel DB (sovrascrive contenuto + estratto, mantiene tutto il resto)
      await sql`
        UPDATE articoli
        SET contenuto = ${html}, estratto = ${estratto}, updated_at = NOW()
        WHERE id = ${art.id}
      `;

      results.push({ titolo: art.titolo, slug: art.slug, stato: "riscritto" });
    } catch (err) {
      errors.push(`${art.titolo.slice(0, 40)}: ${(err as Error).message}`);
    }
  }

  const totale = await sql`SELECT count(*)::int as n FROM articoli WHERE pubblicato = true`;

  return NextResponse.json({
    success: results.length > 0,
    riscritti: results.length,
    offset,
    next_offset: offset + batch,
    totale_pubblicati: totale[0].n,
    articoli: results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
