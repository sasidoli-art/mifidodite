import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { askClaude, extractJSON } from "@/lib/ai-agent";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";

// ============================================
// AGENTE SOCIAL
// Prende gli articoli del magazine e genera post pronti
// per Facebook, Instagram e TikTok. Tu copi e incolli.
// ============================================

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

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

Per OGNI articolo genera:

1. POST FACEBOOK (max 300 char): emozionale, domanda iniziale, link alla fine
2. POST INSTAGRAM (caption max 200 char + 10 hashtag): accattivante, emoji moderate
3. IDEA TIKTOK/REEL (max 100 char): hook dei primi 3 secondi + concept video

REGOLE:
- Tono caldo, mai commerciale
- In italiano
- Emoji con moderazione (2-3 per post)
- Hashtag in italiano dove possibile
- Ogni post deve far venire voglia di cliccare

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
    const response = await askClaude(prompt, 3000);
    const posts = extractJSON(response);

    // Salva i post generati (per ora li ritorna, in futuro salva su DB)
    return NextResponse.json({
      success: true,
      agente: "social",
      data: new Date().toISOString().split("T")[0],
      posts,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
