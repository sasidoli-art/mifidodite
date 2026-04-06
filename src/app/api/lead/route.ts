import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendLeadNotifica, sendEmail } from "@/lib/email";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(getClientIP(request), 5, 60000);
  if (!allowed) return NextResponse.json({ error: "Troppe richieste. Riprova tra un minuto." }, { status: 429 });

  const body = await request.json();
  const { struttura_id, nome, email, telefono, data_inizio, data_fine, numero_animali, tipo_animale, taglia, note } = body;

  if (!struttura_id || !nome || !email) {
    return NextResponse.json({ error: "Nome, email e struttura sono obbligatori" }, { status: 400 });
  }

  const sql = getDB();

  // 1. Salva il lead
  let leadId: number;
  try {
    const result = await sql`
      INSERT INTO lead (struttura_id, nome, email, telefono, data_inizio, data_fine, numero_animali, tipo_animale, taglia, note)
      VALUES (${struttura_id}, ${nome.trim()}, ${email.toLowerCase().trim()}, ${telefono || null}, ${data_inizio || null}, ${data_fine || null}, ${numero_animali || 1}, ${tipo_animale || 'cane'}, ${taglia || null}, ${note || null})
      RETURNING id
    `;
    leadId = result[0].id;
  } catch (err) {
    console.error("Lead insert error:", err);
    return NextResponse.json({ error: "Errore nel salvataggio. Riprova." }, { status: 500 });
  }

  // 2. Incrementa contatore lead
  try {
    await sql`UPDATE strutture SET lead_count = COALESCE(lead_count, 0) + 1 WHERE id = ${struttura_id}`;
  } catch { /* non bloccare */ }

  // 3. Notifica alla struttura
  try {
    const strutture = await sql`SELECT affiliazione, email, nome FROM strutture WHERE id = ${struttura_id} LIMIT 1`;
    const struttura = strutture[0];

    if (struttura) {
      if (struttura.affiliazione === "attivo" && struttura.email) {
        // Struttura affiliata → invia lead via email
        sendLeadNotifica({
          emailStruttura: struttura.email as string,
          nomeStruttura: (struttura.nome as string) || "La tua attivita",
          lead: { nome, email, telefono, note },
        }).catch((err) => console.error("Lead email error:", err));

        await sql`UPDATE lead SET stato = 'inviato' WHERE id = ${leadId}`;
      } else if (struttura.affiliazione === "non_invitato" || struttura.affiliazione === "invitato") {
        // Struttura NON affiliata → invito affiliazione
        if (struttura.email) {
          const token = crypto.randomUUID();

          await sql`
            INSERT INTO inviti_affiliazione (struttura_id, email_destinatario, token, numero_lead_pendenti)
            VALUES (${struttura_id}, ${struttura.email}, ${token}, 1)
          `;

          await sql`UPDATE strutture SET affiliazione = 'invitato' WHERE id = ${struttura_id}`;

          const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";
          sendEmail({
            to: struttura.email as string,
            fromName: "MifidoDiTe.eu",
            subject: `Qualcuno cerca "${struttura.nome}" su MifidoDiTe`,
            html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:24px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">MifidoDiTe.eu</h1>
  </div>
  <div style="padding:24px;">
    <h2 style="color:#9A3412;margin-top:0;">Qualcuno ti sta cercando!</h2>
    <p style="color:#C2410C;line-height:1.6;">
      Un proprietario ha cercato <strong>"${struttura.nome}"</strong> su MifidoDiTe.eu e vuole contattarti.
      Ma il tuo profilo non e ancora attivo — stai perdendo clienti!
    </p>
    <p style="color:#C2410C;line-height:1.6;">
      Registrati <strong>gratis</strong> in 5 minuti e inizia a ricevere le richieste.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${appUrl}/registra-attivita?token=${token}"
         style="background:#EA580C;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:bold;font-size:16px;display:inline-block;">
        Attiva il mio profilo — gratis
      </a>
    </div>
  </div>
</div>
</body></html>`,
          }).catch((err) => console.error("Invito email error:", err));
        }
      }
    }
  } catch { /* non bloccare */ }

  return NextResponse.json({ success: true, lead_id: leadId! });
}
