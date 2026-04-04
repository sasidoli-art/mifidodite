import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/brevo";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { annuncio_id, nome, email, telefono, messaggio, ha_giardino, ha_altri_animali, ha_bambini } = body;

  if (!annuncio_id || !nome || !email || !messaggio) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  const supabase = await createClient();

  // Salva il contatto
  const { error } = await supabase.from("contatti_adozione").insert({
    annuncio_id,
    nome,
    email: email.toLowerCase().trim(),
    telefono: telefono || null,
    messaggio,
    ha_giardino: ha_giardino || false,
    ha_altri_animali: ha_altri_animali || false,
    ha_bambini: ha_bambini || false,
  });

  if (error) {
    console.error("Contatto adozione error:", error);
    return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
  }

  // Recupera email del proprietario annuncio per notifica
  const { data: annuncio } = await supabase
    .from("annunci_adozioni")
    .select("email_contatto, nome_contatto, nome_animale, titolo")
    .eq("id", annuncio_id)
    .single();

  if (annuncio?.email_contatto) {
    const dettagli = [
      ha_giardino ? "Ha giardino" : null,
      ha_altri_animali ? "Ha altri animali" : null,
      ha_bambini ? "Ha bambini" : null,
    ].filter(Boolean).join(", ");

    sendEmail({
      to: [{ email: annuncio.email_contatto, name: annuncio.nome_contatto }],
      subject: `Qualcuno e interessato a ${annuncio.nome_animale || "il tuo annuncio"} su MifidoDiTe`,
      htmlContent: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f0eb;margin:0;padding:20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:#e67e22;padding:30px;text-align:center;">
    <h1 style="color:#fff;margin:0;">🐾 Nuovo messaggio!</h1>
  </div>
  <div style="padding:30px;">
    <p>Ciao <strong>${annuncio.nome_contatto}</strong>,</p>
    <p><strong>${nome}</strong> e interessato al tuo annuncio "${annuncio.titolo}".</p>
    <div style="background:#f5f0eb;border-radius:12px;padding:16px;margin:16px 0;">
      <p style="margin:0 0 8px;"><strong>Messaggio:</strong></p>
      <p style="margin:0;color:#555;">${messaggio}</p>
    </div>
    <table style="width:100%;font-size:14px;margin:12px 0;">
      <tr><td style="color:#999;padding:4px 0;">Email:</td><td><a href="mailto:${email}" style="color:#e67e22;">${email}</a></td></tr>
      ${telefono ? `<tr><td style="color:#999;padding:4px 0;">Telefono:</td><td><a href="tel:${telefono}" style="color:#e67e22;">${telefono}</a></td></tr>` : ""}
      ${dettagli ? `<tr><td style="color:#999;padding:4px 0;">Info:</td><td>${dettagli}</td></tr>` : ""}
    </table>
    <div style="text-align:center;margin:24px 0;">
      <a href="mailto:${email}?subject=Re: ${annuncio.nome_animale || annuncio.titolo} su MifidoDiTe"
         style="background:#e67e22;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:bold;display:inline-block;">
        Rispondi a ${nome}
      </a>
    </div>
  </div>
</div>
</body></html>`,
    }).catch((err) => console.error("Email contatto adozione error:", err));
  }

  return NextResponse.json({ success: true });
}
