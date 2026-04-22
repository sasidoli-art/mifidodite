import { NextResponse } from "next/server";
import { askAIFull, extractJSON } from "@/lib/ai-agent";
import { sendEmail } from "@/lib/email";
import { logAgentStart, logAgentSuccess, logAgentError, calculateCost } from "@/lib/agent-logger";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface MiFidoPost {
  angolo: string;
  facebook: string;
  instagram: { caption: string; hashtags: string[] };
  tiktok: string;
}

const ANGOLI = [
  "Annuncio entusiasta del lancio: 'C'e una novita!'",
  "Tutorial pratico: come usarlo in 30 secondi",
  "Storia divertente: 'Ho chiesto a MiFido cosa fare se...' (risposta utile)",
  "Comparativa: prima dovevi cercare ovunque, ora chiedi a MiFido",
  "FAQ: le 3 domande piu utili da fare a MiFido",
  "Trasparenza: MiFido NON e un veterinario (responsabilita + value prop)",
];

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prompt = `Sei il Social Media Creator di MifidoDiTe.eu, il magazine pet d'Italia.

OGGETTO: Lancio di **MiFido**, il nuovo assistente AI di MifidoDiTe.eu.

CARATTERISTICHE DI MIFIDO:
- E un chatbot AI gratuito disponibile su mifidodite.eu (icona in basso a destra del sito)
- Aiuta a trovare articoli, professionisti pet, offerte
- Risponde in italiano, in modo amichevole
- Non e un veterinario (sempre con disclaimer per la salute)
- E gratis e disponibile 24/7
- Powered by AI (DeepSeek)

Devi generare 6 post social che annunciano MiFido, ognuno con un'angolazione diversa:

${ANGOLI.map((a, i) => `${i + 1}. ${a}`).join("\n")}

Per OGNI post genera:
- POST FACEBOOK (max 300 char): hook + valore + CTA "Provalo gratis su mifidodite.eu"
- POST INSTAGRAM (caption max 200 char + 8 hashtag): primo rigo accattivante, finisce con "↓ link in bio"
- IDEA TIKTOK/REEL (max 100 char): hook + concept video

REGOLE:
- Tono caldo, friendly, mai commerciale aggressivo
- Italiano fluente, 2-3 emoji strategiche
- Includi sempre #MiFidoDiTe e #MiFido nei tag
- Usa "MiFido" sempre maiuscolo

Rispondi SOLO con array JSON puro (no markdown, no fences):
[
  {
    "angolo": "Annuncio lancio",
    "facebook": "...",
    "instagram": { "caption": "...", "hashtags": ["#tag1", "#tag2"] },
    "tiktok": "..."
  },
  ... (6 elementi totali)
]`;

  const runId = await logAgentStart("gen-social-mifido", null, prompt, { trigger: "manual", context: "lancio-mifido" });

  try {
    const response = await askAIFull(prompt, 4000);
    const parsed = extractJSON(response.text);
    const posts = (Array.isArray(parsed) ? parsed : [parsed]) as MiFidoPost[];

    if (posts.length === 0) {
      await logAgentError(runId, "Nessun post generato (JSON vuoto)", { model_used: response.model_used });
      return NextResponse.json({ success: false, error: "Nessun post generato" });
    }

    // Manda email con tutti i 6 post pronti
    const emailSent = await sendEmail({
      to: "info@mifidodite.eu",
      fromName: "MifidoDiTe — Social Bot",
      subject: `🚀 ${posts.length} post pronti per il lancio di MiFido`,
      html: buildLaunchEmailHtml(posts),
    });

    const cost = calculateCost(response.model_used, response.usage.input, response.usage.output);
    await logAgentSuccess(runId, {
      inputTokens: response.usage.input,
      outputTokens: response.usage.output,
      costEur: cost,
      fullOutput: response.text,
      metadataExtra: { posts_generati: posts.length, email_inviata: emailSent, model_used: response.model_used },
    });

    return NextResponse.json({
      success: true,
      posts_generati: posts.length,
      email_inviata: emailSent,
      angoli: posts.map((p) => p.angolo),
    });
  } catch (err) {
    await logAgentError(runId, String(err));
    return NextResponse.json({ success: false, error: String(err) });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildLaunchEmailHtml(posts: MiFidoPost[]): string {
  const dataIt = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const postBlocks = posts
    .map((p, i) => {
      const hashtagsStr = (p.instagram?.hashtags || []).join(" ");
      const fullInstagramText = p.instagram?.caption ? `${p.instagram.caption}\n\n${hashtagsStr}` : "";

      return `
<div style="background:#fff;border:1px solid #FED7AA;border-radius:16px;padding:24px;margin:16px 0;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
    <span style="background:#EA580C;color:#fff;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:999px;">POST ${i + 1}/${posts.length}</span>
    <span style="color:#9A3412;font-size:13px;font-weight:600;">${escapeHtml(p.angolo || "")}</span>
  </div>

  ${p.instagram?.caption ? `
  <div style="background:#FFEDD5;border-radius:12px;padding:14px;margin-bottom:12px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <strong style="color:#9A3412;font-size:13px;">📸 INSTAGRAM</strong>
      <span style="color:#C2410C;font-size:11px;">${fullInstagramText.length} char</span>
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
  <div style="background:#FFEDD5;border-radius:12px;padding:14px;">
    <strong style="color:#9A3412;font-size:13px;">🎬 TIKTOK / REEL IDEA</strong>
    <p style="color:#7C2D12;font-size:13px;margin:6px 0 0;">${escapeHtml(p.tiktok)}</p>
  </div>
  ` : ""}
</div>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:-apple-system,Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:600px;margin:0 auto;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:28px;border-radius:16px 16px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">🚀 Lancio MiFido</h1>
    <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">${posts.length} post pronti — ${dataIt}</p>
  </div>

  <div style="background:#fff;padding:20px;border-radius:0 0 16px 16px;border:1px solid #FED7AA;border-top:0;">
    <p style="color:#9A3412;font-size:15px;line-height:1.6;margin:0 0 16px;">
      Ciao Antonio,<br>
      ho preparato <strong>${posts.length} post pronti</strong> per annunciare il lancio di MiFido sui social.
      Ogni post ha un&apos;angolazione diversa per non sembrare ripetitivo.
    </p>

    <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:12px;padding:12px;margin-bottom:16px;">
      <p style="color:#92400E;font-size:13px;margin:0;line-height:1.5;">
        💡 <strong>Suggerimento:</strong> pubblicane uno al giorno per 6 giorni, oppure 2 al giorno per 3 giorni.
        Non pubblicarli tutti insieme — l'algoritmo penalizza il flooding.
      </p>
    </div>

    ${postBlocks}

    <div style="text-align:center;margin-top:20px;padding-top:16px;border-top:1px solid #FED7AA;">
      <p style="color:#C2410C;font-size:12px;margin:0;">
        Generato dall'agent social di MifidoDiTe.eu<br>
        Vai su <a href="https://mifidodite.eu" style="color:#EA580C;text-decoration:none;font-weight:600;">mifidodite.eu</a> per testare MiFido in azione
      </p>
    </div>
  </div>
</div>
</body></html>`;
}
