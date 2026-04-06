import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { annuncio_id, nome, email, telefono, messaggio, ha_giardino, ha_altri_animali, ha_bambini } = body;

  if (!annuncio_id || !nome || !email || !messaggio) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  const sql = getDB();

  // Salva il contatto
  try {
    await sql`
      INSERT INTO contatti_adozione (annuncio_id, nome, email, telefono, messaggio, ha_giardino, ha_altri_animali, ha_bambini)
      VALUES (${annuncio_id}, ${nome}, ${email.toLowerCase().trim()}, ${telefono || null}, ${messaggio}, ${ha_giardino || false}, ${ha_altri_animali || false}, ${ha_bambini || false})
    `;
  } catch (err) {
    console.error("Contatto adozione error:", err);
    return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
  }

  // Recupera email del proprietario annuncio per notifica
  try {
    const annunci = await sql`
      SELECT email_contatto, nome_contatto, nome_animale, titolo
      FROM annunci_adozioni WHERE id = ${annuncio_id} LIMIT 1
    `;
    const annuncio = annunci[0];

    if (annuncio?.email_contatto) {
      const dettagli = [
        ha_giardino ? "Ha giardino" : null,
        ha_altri_animali ? "Ha altri animali" : null,
        ha_bambini ? "Ha bambini" : null,
      ].filter(Boolean).join(", ");

      sendEmail({
        to: annuncio.email_contatto as string,
        subject: `Qualcuno e interessato a ${annuncio.nome_animale || "il tuo annuncio"} su MifidoDiTe`,
        html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:24px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:18px;">🐾 Nuovo messaggio!</h1>
  </div>
  <div style="padding:24px;">
    <p style="color:#C2410C;">Ciao <strong>${annuncio.nome_contatto}</strong>,</p>
    <p style="color:#C2410C;"><strong>${nome}</strong> e interessato al tuo annuncio "${annuncio.titolo}".</p>
    <div style="background:#FFEDD5;border-radius:12px;padding:16px;margin:16px 0;">
      <p style="margin:0 0 8px;color:#9A3412;"><strong>Messaggio:</strong></p>
      <p style="margin:0;color:#C2410C;">${messaggio}</p>
    </div>
    <table style="width:100%;font-size:14px;margin:12px 0;">
      <tr><td style="color:#C2410C;padding:4px 0;">Email:</td><td><a href="mailto:${email}" style="color:#EA580C;">${email}</a></td></tr>
      ${telefono ? `<tr><td style="color:#C2410C;padding:4px 0;">Telefono:</td><td><a href="tel:${telefono}" style="color:#EA580C;">${telefono}</a></td></tr>` : ""}
      ${dettagli ? `<tr><td style="color:#C2410C;padding:4px 0;">Info:</td><td style="color:#9A3412;">${dettagli}</td></tr>` : ""}
    </table>
    <div style="text-align:center;margin:24px 0;">
      <a href="mailto:${email}?subject=Re: ${annuncio.nome_animale || annuncio.titolo} su MifidoDiTe"
         style="background:#EA580C;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:bold;display:inline-block;">
        Rispondi a ${nome}
      </a>
    </div>
  </div>
</div>
</body></html>`,
      }).catch((err) => console.error("Email contatto adozione error:", err));
    }
  } catch { /* non bloccare */ }

  return NextResponse.json({ success: true });
}
