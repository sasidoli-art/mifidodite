import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { sendEmail } from "@/lib/brevo";
import { logAgent, startTimer } from "@/lib/agent-logger";

// ============================================
// AGENTE OUTREACH
// Prende i professionisti trovati dallo Scraper che hanno un'email
// e gli manda un invito personalizzato a registrarsi.
// Max 10 email al giorno per non sembrare spam.
// ============================================

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const elapsed = startTimer();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ success: true, dev: true, msg: "DB non configurato" });
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  // Warm-up: i primi 7 giorni manda max 3 email/giorno, poi scala a 10
  const { data: logCount } = await supabase
    .from("agent_logs")
    .select("id")
    .eq("agente", "outreach");
  const esecuzioniPassate = logCount?.length || 0;
  const maxOggi = esecuzioniPassate < 7 ? 3 : 10; // warm-up graduale

  // Prendi strutture con email che non sono ancora state invitate
  const { data: strutture } = await supabase
    .from("strutture")
    .select("id, nome, email, comune, provincia, categoria")
    .eq("affiliazione", "non_invitato")
    .not("email", "is", null)
    .order("created_at", { ascending: false })
    .limit(maxOggi);

  if (!strutture || strutture.length === 0) {
    return NextResponse.json({ success: true, agente: "outreach", inviati: 0, msg: "Nessun professionista da contattare" });
  }

  let inviati = 0;

  for (const s of strutture) {
    if (!s.email) continue;

    try {
      // Genera email personalizzata con Claude
      const prompt = `Scrivi una breve email di invito (max 150 parole) per invitare "${s.nome}" di ${s.comune} (${s.provincia}), categoria ${s.categoria}, a registrarsi gratis su MifidoDiTe.eu.

TONO: amichevole, diretto, non commerciale. Come se scrivessi a un collega.
STRUTTURA:
- Saluto con nome attivita
- 1 frase su cosa e MifidoDiTe (portale pet #1 Italia)
- 1 frase su cosa ci guadagna (visibilita gratuita, lead reali)
- Link: https://mifidodite.eu/registra-attivita?ref=${s.id}
- Firma: Il team di MifidoDiTe.eu

NON usare: "Gentilissimo", "Le scrivo per", "Cordiali saluti"
USA: tono diretto italiano, come un messaggio WhatsApp professionale

Rispondi con JSON: { "oggetto": "...", "corpo": "..." }`;

      const response = await askAI(prompt, 1000);
      const emailData = extractJSON(response) as { oggetto: string; corpo: string };

      if (emailData.oggetto && emailData.corpo) {
        const sent = await sendEmail({
          to: [{ email: s.email }],
          subject: emailData.oggetto,
          htmlContent: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">
${emailData.corpo.split("\n").map((p: string) => `<p style="color:#333;line-height:1.6;margin:0 0 12px;">${p}</p>`).join("")}
<p style="margin-top:20px;">
  <a href="https://mifidodite.eu/registra-attivita?ref=${s.id}"
     style="background:#e67e22;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;display:inline-block;">
    Registrati gratis su MifidoDiTe
  </a>
</p>
<p style="color:#999;font-size:12px;margin-top:24px;">
  Ricevi questa email perche ${s.nome} e stato trovato su fonti pubbliche.
  <a href="mailto:bau@mifidodite.eu" style="color:#999;">Scrivi a bau@mifidodite.eu per rimuovere i tuoi dati.</a>
</p>
</body></html>`,
        });

        if (sent) {
          // Segna come invitato
          await supabase
            .from("strutture")
            .update({ affiliazione: "invitato" })
            .eq("id", s.id);
          inviati++;
        }
      }

      // Pausa tra le email
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch {
      // Continua col prossimo
    }
  }

  await logAgent({
    agente: "outreach",
    stato: inviati > 0 ? "ok" : "parziale",
    risultati_trovati: strutture.length,
    risultati_salvati: inviati,
    durata_ms: elapsed(),
  });

  return NextResponse.json({
    success: true,
    agente: "outreach",
    professionisti_trovati: strutture.length,
    email_inviate: inviati,
  });
}
