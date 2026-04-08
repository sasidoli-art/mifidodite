import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { logAgent, startTimer } from "@/lib/agent-logger";
import { getDB } from "@/lib/db";
import { postToInstagram } from "@/lib/buffer";

// ============================================
// AGENTE SOCIAL
// Genera post social dai migliori articoli del magazine
// e li pubblica automaticamente su Instagram via Buffer.
// Gira mercoledi e domenica dal master cron.
// ============================================

interface ArticoloRow {
  titolo: string;
  slug: string;
  estratto: string;
  categoria: string;
  img: string;
  tags: string[];
}

interface PostGenerated {
  articolo: string;
  slug?: string;
  img?: string;
  facebook?: string;
  instagram?: { caption: string; hashtags: string[] };
  tiktok?: string;
}

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const elapsed = startTimer();
  const sql = getDB();

  // Prendi gli ultimi 5 articoli pubblicati dal DB Neon
  let articoli: ArticoloRow[] = [];
  try {
    const rows = await sql`
      SELECT titolo, slug, estratto, categoria, img, tags
      FROM articoli
      WHERE pubblicato = true
      ORDER BY created_at DESC
      LIMIT 5
    `;
    articoli = rows as unknown as ArticoloRow[];
  } catch (err) {
    console.error("[Social] errore lettura articoli:", err);
  }

  if (articoli.length < 2) {
    await logAgent({ agente: "social", stato: "parziale", errore_messaggio: "Articoli insufficienti", durata_ms: elapsed() });
    return NextResponse.json({ success: false, error: "Articoli insufficienti" });
  }

  // Scegli 2 articoli random dai 5 piu recenti
  const shuffled = [...articoli].sort(() => Math.random() - 0.5);
  const art1 = shuffled[0];
  const art2 = shuffled[1];

  const prompt = `Sei il Social Media Creator di MifidoDiTe.eu, il magazine pet d'Italia.

Genera post social per questi 2 articoli:

ARTICOLO 1: "${art1.titolo}"
Estratto: ${art1.estratto}
URL: https://mifidodite.eu/magazine/${art1.slug}

ARTICOLO 2: "${art2.titolo}"
Estratto: ${art2.estratto}
URL: https://mifidodite.eu/magazine/${art2.slug}

Per OGNI articolo genera:

1. POST FACEBOOK (max 300 char): apri con domanda emotiva, chiudi con link
2. POST INSTAGRAM (caption max 200 char + 8 hashtag): primo rigo = hook che ferma lo scroll
3. IDEA TIKTOK/REEL (max 100 char): hook + concept video

REGOLE:
- Tono caldo, empatico, MAI commerciale
- Italiano fluente, 2-3 emoji strategiche
- Hashtag misti italiano/inglese, includi sempre #MiFidoDiTe
- L'instagram caption finisce sempre con "↓ link in bio"

Rispondi SOLO con array JSON puro (no markdown, no fences):
[
  {
    "articolo": "${art1.titolo}",
    "facebook": "...",
    "instagram": { "caption": "...", "hashtags": ["#tag1", "#tag2"] },
    "tiktok": "..."
  },
  {
    "articolo": "${art2.titolo}",
    "facebook": "...",
    "instagram": { "caption": "...", "hashtags": ["#tag1", "#tag2"] },
    "tiktok": "..."
  }
]`;

  try {
    const response = await askAI(prompt, 3000);
    const parsed = extractJSON(response);
    const posts = (Array.isArray(parsed) ? parsed : [parsed]) as PostGenerated[];

    // Aggiungi slug e img al primo (Instagram lo usa)
    if (posts[0]) { posts[0].slug = art1.slug; posts[0].img = art1.img; }
    if (posts[1]) { posts[1].slug = art2.slug; posts[1].img = art2.img; }

    // Salva post nel DB
    let salvati = 0;
    for (const post of posts) {
      try {
        if (post.facebook) {
          await sql`INSERT INTO social_posts (articolo_titolo, piattaforma, contenuto) VALUES (${post.articolo || ""}, 'facebook', ${post.facebook})`;
          salvati++;
        }
        if (post.instagram?.caption) {
          await sql`INSERT INTO social_posts (articolo_titolo, piattaforma, contenuto, hashtags) VALUES (${post.articolo || ""}, 'instagram', ${post.instagram.caption}, ${post.instagram.hashtags || []})`;
          salvati++;
        }
        if (post.tiktok) {
          await sql`INSERT INTO social_posts (articolo_titolo, piattaforma, contenuto) VALUES (${post.articolo || ""}, 'tiktok', ${post.tiktok})`;
          salvati++;
        }
      } catch (err) {
        console.error("[Social] errore salvataggio post:", err);
      }
    }

    // PUBBLICAZIONE AUTOMATICA SU BUFFER (Instagram)
    const bufferResults: Array<{ post: string; status: string; error?: string }> = [];
    if (process.env.BUFFER_API_KEY) {
      for (const post of posts) {
        if (!post.instagram?.caption || !post.img) continue;

        try {
          // Combina caption + hashtag in un singolo testo
          const hashtags = (post.instagram.hashtags || []).join(" ");
          const fullText = `${post.instagram.caption}\n\n${hashtags}`;

          const result = await postToInstagram(fullText, post.img);
          bufferResults.push({ post: post.articolo || "", status: result.status });
          console.log(`[Social] post Buffer creato: ${result.id}`);
        } catch (err) {
          bufferResults.push({ post: post.articolo || "", status: "errore", error: String(err) });
          console.error("[Social] errore publish Buffer:", err);
        }
      }
    }

    await logAgent({
      agente: "social",
      stato: "ok",
      risultati_trovati: posts.length,
      risultati_salvati: salvati,
      durata_ms: elapsed(),
      dettagli: { posts, buffer_results: bufferResults },
    });

    return NextResponse.json({
      success: true,
      agente: "social",
      data: new Date().toISOString().split("T")[0],
      posts,
      salvati_db: salvati,
      buffer_pubblicati: bufferResults.filter((r) => r.status !== "errore").length,
      buffer_risultati: bufferResults,
    });
  } catch (err) {
    await logAgent({ agente: "social", stato: "errore", errore_messaggio: String(err), durata_ms: elapsed() });
    return NextResponse.json({ success: false, error: String(err) });
  }
}
