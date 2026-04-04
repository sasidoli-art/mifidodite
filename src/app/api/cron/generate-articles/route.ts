import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { scrapeGenericPage } from "@/lib/scraper";
import { verifyCron } from "@/lib/cron-auth";

const FONTI = [
  { url: "https://www.kodami.it/", nome: "Kodami" },
  { url: "https://www.greenme.it/animali/", nome: "GreenMe" },
  { url: "https://www.lastampa.it/la-zampa", nome: "La Zampa" },
];

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const supabase = await createClient();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY mancante" }, { status: 500 });
  }

  // 1. Scrapa le fonti per trovare titoli/spunti recenti
  const spunti: string[] = [];
  for (const fonte of FONTI) {
    try {
      const page = await scrapeGenericPage(fonte.url);
      if (page.text) {
        spunti.push(`[${fonte.nome}] ${page.text.slice(0, 1000)}`);
      }
    } catch {
      // Continua con la prossima fonte
    }
  }

  if (spunti.length === 0) {
    return NextResponse.json({ success: false, error: "Nessuna fonte raggiungibile" });
  }

  // 2. Chiedi a Claude Haiku di generare 3 articoli
  const prompt = `Basandoti su questi spunti dalle principali testate pet italiane, genera 3 articoli originali per il magazine di MifidoDiTe.eu.

SPUNTI:
${spunti.join("\n\n")}

Genera esattamente 3 articoli diversi (1 guida pratica, 1 curiosita/aneddoto, 1 salute/comportamento).

Rispondi SOLO con un array JSON valido, ogni elemento con:
- titolo (max 80 char, accattivante)
- slug (formato URL)
- categoria (guide/curiosita/salute/comportamento/consigli/aneddoti/razze/gatti)
- estratto (2-3 frasi, max 200 char)
- contenuto (HTML completo: h2, p, ul/li — 800-1200 parole)
- tempo_lettura ("X min")
- tags (array 3-5 keyword)
- img_query (query per unsplash, in inglese)`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `Claude API error: ${err}` }, { status: 500 });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    // Estrai JSON dall'output
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Nessun JSON valido nella risposta" }, { status: 500 });
    }

    const articoli = JSON.parse(jsonMatch[0]);
    let salvati = 0;

    for (const art of articoli) {
      if (!art.titolo || !art.contenuto) continue;

      const slug = art.slug || slugify(art.titolo);

      // Controlla duplicati
      const { data: exists } = await supabase
        .from("articoli")
        .select("id")
        .eq("slug", slug)
        .limit(1)
        .single();

      if (exists) continue;

      // Immagine da Unsplash (gratuita)
      const imgQuery = art.img_query || "dog cat pet";
      const img = `https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80`;
      // In produzione: usa Unsplash API per cercare per query

      await supabase.from("articoli").insert({
        titolo: art.titolo,
        slug,
        categoria: art.categoria || "consigli",
        estratto: art.estratto || art.titolo,
        contenuto: art.contenuto,
        tempo_lettura: art.tempo_lettura || "5 min",
        tags: art.tags || [],
        img,
      });

      salvati++;
    }

    return NextResponse.json({ success: true, generati: articoli.length, salvati });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
