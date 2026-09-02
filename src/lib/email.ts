// ============================================
// Sistema Email — SMTP Aruba
// Sostituisce Brevo per tutto: newsletter, reset password, notifiche
// ============================================

import nodemailer from "nodemailer";

// Configurazione SMTP Aruba
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtps.aruba.it",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true, // SSL/TLS
    auth: {
      user: process.env.SMTP_USER || "miao@mifidodite.eu",
      pass: process.env.SMTP_PASS || "",
    },
  });
}

// ---- INVIO EMAIL GENERICO ----

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  fromName?: string;
}): Promise<boolean> {
  if (!process.env.SMTP_PASS) {
    console.error("[Email] SMTP_PASS non configurata");
    return false;
  }

  try {
    const transporter = getTransporter();
    const fromName = params.fromName || "MifidoDiTe.eu";
    const fromEmail = params.from || process.env.SMTP_USER || "miao@mifidodite.eu";

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    return true;
  } catch (err) {
    console.error("[Email] Errore invio:", err);
    return false;
  }
}

// ---- EMAIL RESET PASSWORD ----

export async function sendResetPassword(email: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";

  return sendEmail({
    to: email,
    subject: "Reimposta la tua password — MifidoDiTe.eu",
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:24px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">🐾 MifidoDiTe.eu</h1>
  </div>
  <div style="padding:24px;">
    <h2 style="color:#9A3412;margin-top:0;">Reimposta la tua password</h2>
    <p style="color:#C2410C;line-height:1.6;">
      Hai richiesto di reimpostare la password del tuo account su MifidoDiTe.eu.
      Clicca il bottone qui sotto per scegliere una nuova password.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${appUrl}/reset-password?token=${token}"
         style="background:#EA580C;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:bold;font-size:16px;display:inline-block;">
        Reimposta password
      </a>
    </div>
    <p style="color:#C2410C;font-size:13px;">
      Il link scade tra 1 ora. Se non hai richiesto tu il reset, ignora questa email.
    </p>
  </div>
  <div style="padding:12px;text-align:center;background:#FFEDD5;border-top:1px solid #FED7AA;">
    <p style="color:#C2410C;font-size:11px;margin:0;">MifidoDiTe.eu — Mi fido di te 🐾</p>
  </div>
</div>
</body></html>`,
  });
}

// ---- EMAIL CONFERMA REGISTRAZIONE ----

export async function sendConfermaRegistrazione(email: string, nome: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";

  return sendEmail({
    to: email,
    subject: `Benvenuto su MifidoDiTe.eu, ${nome}!`,
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:24px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;">🐾 Benvenuto!</h1>
  </div>
  <div style="padding:24px;">
    <p style="color:#9A3412;font-size:16px;line-height:1.6;">
      Ciao <strong>${nome}</strong>, il tuo profilo e stato creato su MifidoDiTe.eu!
    </p>
    <p style="color:#C2410C;line-height:1.6;">
      Il tuo profilo sara visibile dopo una rapida verifica del nostro team.
      Riceverai una notifica quando sara online.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${appUrl}/login"
         style="background:#EA580C;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:bold;display:inline-block;">
        Accedi al tuo account
      </a>
    </div>
  </div>
  <div style="padding:12px;text-align:center;background:#FFEDD5;border-top:1px solid #FED7AA;">
    <p style="color:#C2410C;font-size:11px;margin:0;">MifidoDiTe.eu — Mi fido di te 🐾</p>
  </div>
</div>
</body></html>`,
  });
}

// ---- EMAIL LEAD (notifica al professionista) ----

export async function sendLeadNotifica(params: {
  emailStruttura: string;
  nomeStruttura: string;
  lead: { nome: string; email: string; telefono?: string; note?: string };
}) {
  return sendEmail({
    to: params.emailStruttura,
    fromName: "MifidoDiTe.eu — Nuovo Lead",
    subject: `Nuova richiesta per "${params.nomeStruttura}" su MifidoDiTe`,
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:24px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:18px;">🐾 Nuova richiesta!</h1>
  </div>
  <div style="padding:24px;">
    <p style="color:#C2410C;">Hai ricevuto una nuova richiesta per <strong>${params.nomeStruttura}</strong>:</p>
    <table style="width:100%;font-size:14px;margin:12px 0;">
      <tr><td style="color:#C2410C;padding:4px 0;">Nome:</td><td style="color:#9A3412;"><strong>${params.lead.nome}</strong></td></tr>
      <tr><td style="color:#C2410C;padding:4px 0;">Email:</td><td><a href="mailto:${params.lead.email}" style="color:#EA580C;">${params.lead.email}</a></td></tr>
      ${params.lead.telefono ? `<tr><td style="color:#C2410C;padding:4px 0;">Tel:</td><td><a href="tel:${params.lead.telefono}" style="color:#EA580C;">${params.lead.telefono}</a></td></tr>` : ""}
      ${params.lead.note ? `<tr><td style="color:#C2410C;padding:4px 0;">Note:</td><td style="color:#9A3412;">${params.lead.note}</td></tr>` : ""}
    </table>
    <div style="text-align:center;margin:20px 0;">
      <a href="mailto:${params.lead.email}?subject=Re: Richiesta su MifidoDiTe"
         style="background:#EA580C;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:bold;display:inline-block;">
        Rispondi a ${params.lead.nome}
      </a>
    </div>
  </div>
</div>
</body></html>`,
  });
}

// ---- NEWSLETTER SETTIMANALE ----

export async function sendNewsletter(params: {
  to: string;
  nome: string;
  comune: string;
  html: string;
}) {
  return sendEmail({
    to: params.to,
    fromName: "MifidoDiTe.eu Newsletter",
    subject: `Novita pet vicino a ${params.comune} — MifidoDiTe`,
    html: params.html,
  });
}

// ---- TEMPLATE NEWSLETTER ----

export function buildNewsletterHtml(params: {
  nome: string;
  comune: string;
  novita: { tipo: string; nome: string; comune: string; slug: string; descrizione: string }[];
  articolo: { titolo: string; slug: string; estratto: string; img: string; categoria: string } | null;
  eventi: { titolo: string; data: string; citta: string; sommario: string }[];
  offerta: { titolo: string; marca: string; negozio: string; prezzo_scontato: string; sconto: number } | null;
  smarriti: { nome_animale: string; comune: string; specie: string }[];
  appUrl: string;
}) {
  const u = params.appUrl;

  const novitaHtml = params.novita.length > 0
    ? `<div style="margin-bottom:8px;">
        <h2 style="color:#9A3412;font-size:16px;margin:0 0 12px;">Nuovi professionisti vicino a te</h2>
        ${params.novita.map((n) => `
          <div style="padding:10px 0;border-bottom:1px solid #FED7AA;">
            <span style="background:#FFEDD5;color:#EA580C;font-size:10px;font-weight:bold;padding:2px 8px;border-radius:4px;text-transform:uppercase;">${n.tipo}</span>
            <h3 style="margin:6px 0 2px;font-size:15px;"><a href="${u}/struttura/${n.slug}" style="color:#9A3412;text-decoration:none;">${n.nome}</a></h3>
            <p style="color:#C2410C;font-size:12px;margin:0;">${n.comune} — ${n.descrizione.slice(0, 100)}...</p>
          </div>
        `).join("")}
      </div>` : "";

  const articoloHtml = params.articolo
    ? `<div style="margin:20px 0;background:#FFEDD5;border-radius:12px;overflow:hidden;">
        ${params.articolo.img ? `<img src="${params.articolo.img}" alt="${params.articolo.titolo}" style="width:100%;height:180px;object-fit:cover;">` : ""}
        <div style="padding:16px;">
          <span style="color:#EA580C;font-size:10px;font-weight:bold;text-transform:uppercase;">${params.articolo.categoria}</span>
          <h2 style="color:#9A3412;font-size:18px;margin:6px 0;">
            <a href="${u}/magazine/${params.articolo.slug}" style="color:#9A3412;text-decoration:none;">${params.articolo.titolo}</a>
          </h2>
          <p style="color:#C2410C;font-size:13px;margin:0 0 12px;">${params.articolo.estratto}</p>
          <a href="${u}/magazine/${params.articolo.slug}" style="color:#EA580C;font-size:13px;font-weight:bold;text-decoration:none;">Leggi l'articolo</a>
        </div>
      </div>` : "";

  const eventiHtml = params.eventi.length > 0
    ? `<div style="margin:20px 0;">
        <h2 style="color:#9A3412;font-size:16px;margin:0 0 12px;">Eventi questa settimana</h2>
        ${params.eventi.map((e) => `
          <div style="padding:8px 0;border-bottom:1px solid #FED7AA;">
            <strong style="color:#9A3412;font-size:14px;">${e.titolo}</strong><br>
            <span style="color:#C2410C;font-size:12px;">${e.data} — ${e.citta}</span>
          </div>
        `).join("")}
        <a href="${u}/eventi" style="color:#EA580C;font-size:12px;font-weight:bold;text-decoration:none;display:block;margin-top:8px;">Tutti gli eventi</a>
      </div>` : "";

  const offertaHtml = params.offerta
    ? "" /* Sezione offerte disattivata — sito senza monetizzazione */
    : "";

  const smarritiHtml = params.smarriti.length > 0
    ? `<div style="margin:20px 0;background:#FEF2F2;border:2px solid #FECACA;border-radius:12px;padding:16px;">
        <h2 style="color:#DC2626;font-size:14px;margin:0 0 8px;">SOS Smarriti nella tua zona</h2>
        ${params.smarriti.map((s) => `
          <p style="color:#991B1B;font-size:13px;margin:4px 0;">
            <strong>${s.nome_animale || s.specie}</strong> smarrito a ${s.comune}
          </p>
        `).join("")}
        <a href="${u}/sos-smarriti" style="color:#DC2626;font-size:12px;font-weight:bold;text-decoration:none;">Aiutaci a ritrovarli</a>
      </div>` : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:28px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">Questa settimana vicino a te</h1>
    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">Le novita pet per ${params.comune}</p>
  </div>
  <div style="padding:24px;">
    <p style="color:#9A3412;font-size:15px;line-height:1.5;">
      Ciao <strong>${params.nome || "amico"}</strong>,<br>
      Ecco cosa c'e di nuovo questa settimana per te e il tuo amico a 4 zampe:
    </p>
    ${novitaHtml}
    ${articoloHtml}
    ${eventiHtml}
    ${offertaHtml}
    ${smarritiHtml}
    <div style="text-align:center;margin:24px 0 8px;">
      <a href="${u}/professionisti" style="background:#EA580C;color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:bold;font-size:15px;display:inline-block;">
        Cerca professionisti vicino a te
      </a>
    </div>
  </div>
  <div style="padding:16px;text-align:center;background:#FFEDD5;border-top:1px solid #FED7AA;">
    <p style="color:#C2410C;font-size:11px;margin:0;">
      Ricevi questa email perche sei iscritto a MifidoDiTe.eu<br>
      <a href="${u}/unsubscribe?email={{email}}" style="color:#C2410C;text-decoration:underline;">Cancellati</a> ·
      <a href="${u}/privacy" style="color:#C2410C;text-decoration:underline;">Privacy</a>
    </p>
    <p style="color:#C2410C;font-size:10px;margin:6px 0 0;">MifidoDiTe.eu — Mi fido di te</p>
  </div>
</div>
</body></html>`;
}
