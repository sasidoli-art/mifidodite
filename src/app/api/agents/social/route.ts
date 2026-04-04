import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";
import { logAgent, startTimer } from "@/lib/agent-logger";

// ============================================
// AGENTE SOCIAL
// Prende gli articoli del magazine e genera post pronti
// per Facebook, Instagram e TikTok. Tu copi e incolli.
// ============================================

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const elapsed = startTimer();

  // Prendi gli ultimi articoli (da DB o seed)
  let articoli = ARTICOLI_SEED;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase
        .from("articoli")
        .select("titolo, slug, estratto, categoria, tags")
        .eq("pubblicato", true)
        .order("created_at", { ascending: false })
        .limit(5);
      if (data && data.length > 0) {
        articoli = data as typeof ARTICOLI_SEED;
      }
    } catch { /* usa seed */ }
  }

  // Scegli 2 articoli per oggi
  const oggi = Math.floor(Date.now() / 86400000);
  const art1 = articoli[oggi % articoli.length];
  const art2 = articoli[(oggi + 1) % articoli.length];

  const prompt = `Sei un social media manager per MifidoDiTe.eu, il portale pet #1 in Italia.

Genera post social per questi 2 articoli:

ARTICOLO 1: "${art1.titolo}"
Estratto: ${art1.estratto}
URL: https://mifidodite.eu/magazine/${art1.slug}

ARTICOLO 2: "${art2.titolo}"
Estratto: ${"estratto" in art2 ? art2.estratto : ""}
URL: https://mifidodite.eu/magazine/${art2.slug}

Sei il Social Media Creator di MiFidoDiTe.eu. Per OGNI articolo genera:

1. POST FACEBOOK (max 300 char): apri con domanda emotiva, chiudi con link. Deve creare engagement
2. POST INSTAGRAM (caption max 200 char + 8-10 hashtag): accattivante, primo rigo = hook. Includi sempre #MiFidoDiTe
3. IDEA TIKTOK/REEL (max 100 char): hook dei primi 3 secondi che ferma lo scroll + concept video

REGOLE:
- Tono caldo, empatico, MAI commerciale
- Italiano fluente, emoji strategiche (2-3 per post, non di piu)
- Hashtag misti italiano/inglese (#caniditalia #doglovers #MiFidoDiTe)
- Ogni post deve far venire voglia di cliccare e condividere
- Il Facebook post deve funzionare anche senza immagine
- L'Instagram deve funzionare come carosello educativo

Rispondi con JSON:
[
  {
    "articolo": "titolo",
    "facebook": "testo post",
    "instagram": { "caption": "testo", "hashtags": ["#tag1", "#tag2"] },
    "tiktok": "hook + concept"
  }
]`;

  try {
    const response = await askAI(prompt, 3000);
    const posts = extractJSON(response);

    // Salva post nel DB
    let salvati = 0;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && Array.isArray(posts)) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      for (const post of posts as Array<{ articolo?: string; facebook?: string; instagram?: { caption?: string; hashtags?: string[] }; tiktok?: string }>) {
        const titolo = post.articolo || "";
        if (post.facebook) {
          await supabase.from("social_posts").insert({ articolo_titolo: titolo, piattaforma: "facebook", contenuto: post.facebook });
          salvati++;
        }
        if (post.instagram?.caption) {
          await supabase.from("social_posts").insert({ articolo_titolo: titolo, piattaforma: "instagram", contenuto: post.instagram.caption, hashtags: post.instagram.hashtags || [] });
          salvati++;
        }
        if (post.tiktok) {
          await supabase.from("social_posts").insert({ articolo_titolo: titolo, piattaforma: "tiktok", contenuto: post.tiktok });
          salvati++;
        }
      }
    }

    await logAgent({ agente: "social", stato: "ok", risultati_trovati: Array.isArray(posts) ? posts.length : 0, risultati_salvati: salvati, durata_ms: elapsed(), dettagli: { posts } });

    return NextResponse.json({
      success: true,
      agente: "social",
      data: new Date().toISOString().split("T")[0],
      posts,
      salvati,
    });
  } catch (err) {
    await logAgent({ agente: "social", stato: "errore", errore_messaggio: String(err), durata_ms: elapsed() });
    return NextResponse.json({ success: false, error: String(err) });
  }
}
