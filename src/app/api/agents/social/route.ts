import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { logAgent, startTimer } from "@/lib/agent-logger";
import { getDB } from "@/lib/db";
import { sendEmail } from "@/lib/email";

// ============================================
// AGENTE SOCIAL
// Genera post social dai migliori articoli del magazine
// e li manda via email a info@mifidodite.eu, pronti per
// copia-incolla manuale su Instagram/Facebook/TikTok.
//
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

  // Prendi 5 articoli random tra i 30 piu recenti
  let articoli: ArticoloRow[] = [];
  try {
    const rows = await sql`
      SELECT titolo, slug, estratto, categoria, img, tags
      FROM articoli
      WHERE pubblicato = true
      ORDER BY created_at DESC
      LIMIT 30
    `;
    articoli = rows as unknown as ArticoloRow[];
  } catch (err) {
    console.error("[Social] errore lettura articoli:", err);
  }

  if (articoli.length < 2) {
    await logAgent({ agente: "social", stato: "parziale", errore_messaggio: "Articoli insufficienti", durata_ms: elapsed() });
    return NextResponse.json({ success: false, error: "Articoli insufficienti" });
  }

  // Scegli 2 articoli random
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

    // INVIO EMAIL CON I POST PRONTI
    const emailSent = await sendEmail({
      to: "info@mifidodite.eu",
      fromName: "MifidoDiTe — Social Bot",
      subject: `🐾 ${posts.length} post social pronti — ${new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}`,
      html: buildPostsEmailHtml(posts),
    });

    await logAgent({
      agente: "social",
      stato: "ok",
      risultati_trovati: posts.length,
      risultati_salvati: salvati,
      durata_ms: elapsed(),
      dettagli: { posts, email_sent: emailSent },
    });

    return NextResponse.json({
      success: true,
      agente: "social",
      data: new Date().toISOString().split("T")[0],
      posts_generati: posts.length,
      salvati_db: salvati,
      email_inviata: emailSent,
    });
  } catch (err) {
    await logAgent({ agente: "social", stato: "errore", errore_messaggio: String(err), durata_ms: elapsed() });
    return NextResponse.json({ success: false, error: String(err) });
  }
}

function buildPostsEmailHtml(posts: PostGenerated[]): string {
  const dataIt = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const postBlocks = posts
    .map((p, i) => {
      const articleUrl = p.slug ? `https://mifidodite.eu/magazine/${p.slug}` : "https://mifidodite.eu/magazine";
      const hashtagsStr = (p.instagram?.hashtags || []).join(" ");
      const fullInstagramText = p.instagram?.caption ? `${p.instagram.caption}\n\n${hashtagsStr}` : "";

      return `
<div style="background:#fff;border:1px solid #FED7AA;border-radius:16px;padding:24px;margin:16px 0;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
    <span style="background:#EA580C;color:#fff;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:999px;">POST ${i + 1}</span>
    <span style="color:#9A3412;font-size:13px;font-weight:600;">${escapeHtml(p.articolo || "")}</span>
  </div>

  ${p.img ? `<div style="margin-bottom:16px;text-align:center;"><img src="${p.img}" alt="" style="max-width:100%;height:auto;border-radius:12px;max-height:300px;" /></div>` : ""}

  ${p.instagram?.caption ? `
  <div style="background:#FFEDD5;border-radius:12px;padding:14px;margin-bottom:12px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <strong style="color:#9A3412;font-size:13px;">📸 INSTAGRAM</strong>
      <span style="color:#C2410C;font-size:11px;">${(fullInstagramText.length)} char</span>
    </div>
    <pre style="white-space:pre-wrap;word-wrap:break-word;font-family:-apple-system,sans-serif;color:#7C2D12;font-size:13px;line-height:1.6;margin:0;">${escapeHtml(fullInstagramText)}</pre>
  </div>
  ` : ""}

  ${p.facebook ? `
  <div style="background:#FFEDD5;border-radius:12px;padding:14px;margin-bottom:12px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <strong style="color:#9A3412;font-size:13px;">👥 FACEBOOK</strong>
      <span style="color:#C2410C;font-size:11px;">${p.facebook.length} char</span>
    </div>
    <pre style="white-space:pre-wrap;word-wrap:break-word;font-family:-apple-system,sans-serif;color:#7C2D12;font-size:13px;line-height:1.6;margin:0;">${escapeHtml(p.facebook)}</pre>
  </div>
  ` : ""}

  ${p.tiktok ? `
  <div style="background:#FFEDD5;border-radius:12px;padding:14px;margin-bottom:12px;">
    <strong style="color:#9A3412;font-size:13px;">🎬 TIKTOK / REEL IDEA</strong>
    <p style="color:#7C2D12;font-size:13px;margin:6px 0 0;">${escapeHtml(p.tiktok)}</p>
  </div>
  ` : ""}

  <div style="text-align:center;margin-top:16px;">
    <a href="${articleUrl}" style="display:inline-block;background:#EA580C;color:#fff;text-decoration:none;padding:10px 20px;border-radius:10px;font-weight:600;font-size:13px;">📖 Apri articolo</a>
  </div>
</div>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:-apple-system,Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:28px;border-radius:16px 16px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">🐾 Social Bot MifidoDiTe</h1>
    <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">${dataIt}</p>
  </div>

  <div style="background:#fff;padding:20px;border-radius:0 0 16px 16px;border:1px solid #FED7AA;border-top:0;">
    <p style="color:#9A3412;font-size:15px;line-height:1.6;margin:0 0 16px;">
      Ciao Antonio,<br>
      l'AI ha preparato <strong>${posts.length} post pronti</strong> per i social.
      Apri Instagram (o Facebook), copia il testo e l'immagine, e pubblica!
    </p>

    <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;padding:12px;margin-bottom:16px;">
      <p style="color:#92400E;font-size:13px;margin:0;line-height:1.5;">
        💡 <strong>Tip:</strong> tieni premuto sul testo per copiarlo.
        Le immagini puoi salvarle dalla mail o cliccare "Apri articolo" e prenderle dal magazine.
      </p>
    </div>

    ${postBlocks}

    <div style="text-align:center;margin-top:20px;padding-top:16px;border-top:1px solid #FED7AA;">
      <p style="color:#C2410C;font-size:12px;margin:0;">
        Generato automaticamente dall'agent social di MifidoDiTe.eu<br>
        Prossimo invio: domenica
      </p>
    </div>
  </div>
</div>
</body></html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
