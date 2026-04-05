// ============================================
// Brevo (ex Sendinblue) — Email & Newsletter
// ============================================

const BREVO_API_URL = "https://api.brevo.com/v3";

function headers() {
  return {
    "api-key": process.env.BREVO_API_KEY!,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// ---- CONTATTI ----

export async function syncContact(data: {
  email: string;
  nome?: string;
  cap?: string;
  comune?: string;
  tipo_animale?: string;
}) {
  const res = await fetch(`${BREVO_API_URL}/contacts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      email: data.email,
      updateEnabled: true,
      listIds: [2], // Lista "Newsletter MifidoDiTe"
      attributes: {
        NOME: data.nome || "",
        CAP: data.cap || "",
        COMUNE: data.comune || "",
        TIPO_ANIMALE: data.tipo_animale || "cane",
      },
    }),
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    console.error("Brevo syncContact error:", err);
  }
}

export async function removeContact(email: string) {
  await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
    method: "DELETE",
    headers: headers(),
  });
}

// ---- EMAIL TRANSAZIONALI ----

export async function sendEmail(params: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender?: { name: string; email: string };
}) {
  const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      sender: params.sender || {
        name: process.env.BREVO_SENDER_NAME || "MifidoDiTe.eu",
        email: process.env.BREVO_SENDER_EMAIL || "miao@mifidodite.eu",
      },
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("Brevo sendEmail error:", err);
    return false;
  }
  return true;
}

// ---- INVITO AFFILIAZIONE ----

export async function sendInvitoAffiliazione(params: {
  email: string;
  nome_struttura: string;
  token: string;
  lead_pendenti: number;
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";

  return sendEmail({
    to: [{ email: params.email }],
    subject: `${params.lead_pendenti} persone cercano "${params.nome_struttura}" su MifidoDiTe`,
    htmlContent: emailInvitoAffiliazione(params.nome_struttura, params.token, params.lead_pendenti, appUrl),
  });
}

// ---- LEAD NOTIFICATION ----

export async function sendLeadNotification(params: {
  email_struttura: string;
  nome_struttura: string;
  lead: {
    nome: string;
    email: string;
    telefono?: string;
    data_inizio?: string;
    data_fine?: string;
    numero_animali: number;
    tipo_animale: string;
    note?: string;
  };
}) {
  return sendEmail({
    to: [{ email: params.email_struttura }],
    subject: `Nuova richiesta per "${params.nome_struttura}" su MifidoDiTe`,
    htmlContent: emailLeadNotification(params.nome_struttura, params.lead),
  });
}

// ============================================
// TEMPLATE HTML
// ============================================

function emailInvitoAffiliazione(nome: string, token: string, lead: number, appUrl: string) {
  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;background:#f5f0eb;margin:0;padding:20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:#e67e22;padding:30px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:24px;">🐾 MifidoDiTe.eu</h1>
  </div>
  <div style="padding:30px;">
    <h2 style="color:#1a1a2e;margin-top:0;">${lead} ${lead === 1 ? "persona cerca" : "persone cercano"} proprio te!</h2>
    <p style="color:#6b7280;line-height:1.6;">
      Qualcuno ha cercato <strong>"${nome}"</strong> su MifidoDiTe.eu e vuole contattarti.
      Ma il tuo profilo non e ancora attivo — stai perdendo clienti!
    </p>
    <p style="color:#6b7280;line-height:1.6;">
      Registrati <strong>gratis</strong> in 5 minuti e inizia a ricevere le richieste
      direttamente nella tua email. Nessun costo nascosto.
    </p>
    <div style="text-align:center;margin:30px 0;">
      <a href="${appUrl}/registra-attivita?token=${token}"
         style="background:#e67e22;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:bold;font-size:16px;display:inline-block;">
        Attiva il mio profilo — gratis
      </a>
    </div>
    <p style="color:#999;font-size:13px;text-align:center;">
      Hai ricevuto questa email perche "${nome}" e stato trovato su MifidoDiTe.eu.
      <br>Se non sei tu, ignora questa email.
    </p>
  </div>
</div>
</body></html>`;
}

function emailLeadNotification(nomeStruttura: string, lead: {
  nome: string; email: string; telefono?: string;
  data_inizio?: string; data_fine?: string;
  numero_animali: number; tipo_animale: string; note?: string;
}) {
  const date = lead.data_inizio && lead.data_fine
    ? `<tr><td style="color:#999;padding:4px 0;">Date:</td><td style="padding:4px 0;"><strong>${lead.data_inizio} → ${lead.data_fine}</strong></td></tr>`
    : "";

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;background:#f5f0eb;margin:0;padding:20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
  <div style="background:#e67e22;padding:30px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:24px;">🐾 Nuova richiesta!</h1>
  </div>
  <div style="padding:30px;">
    <p style="color:#6b7280;">Hai ricevuto una nuova richiesta di disponibilita per <strong>${nomeStruttura}</strong>:</p>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <tr><td style="color:#999;padding:4px 0;">Nome:</td><td style="padding:4px 0;"><strong>${lead.nome}</strong></td></tr>
      <tr><td style="color:#999;padding:4px 0;">Email:</td><td style="padding:4px 0;"><a href="mailto:${lead.email}" style="color:#e67e22;">${lead.email}</a></td></tr>
      ${lead.telefono ? `<tr><td style="color:#999;padding:4px 0;">Telefono:</td><td style="padding:4px 0;"><a href="tel:${lead.telefono}" style="color:#e67e22;">${lead.telefono}</a></td></tr>` : ""}
      ${date}
      <tr><td style="color:#999;padding:4px 0;">Animale:</td><td style="padding:4px 0;"><strong>${lead.numero_animali}x ${lead.tipo_animale}</strong></td></tr>
      ${lead.note ? `<tr><td style="color:#999;padding:4px 0;">Note:</td><td style="padding:4px 0;">${lead.note}</td></tr>` : ""}
    </table>
    <div style="text-align:center;margin:24px 0;">
      <a href="mailto:${lead.email}?subject=Re: Richiesta su MifidoDiTe"
         style="background:#e67e22;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:bold;display:inline-block;">
        Rispondi a ${lead.nome}
      </a>
    </div>
    <p style="color:#999;font-size:12px;text-align:center;">
      Questa richiesta e stata inviata tramite MifidoDiTe.eu
    </p>
  </div>
</div>
</body></html>`;
}

// ---- NEWSLETTER SETTIMANALE ----

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
        <h2 style="color:#9A3412;font-size:16px;margin:0 0 12px;font-family:Fredoka,sans-serif;">🏠 Nuovi professionisti vicino a te</h2>
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
          <h2 style="color:#9A3412;font-size:18px;margin:6px 0;font-family:Fredoka,sans-serif;">
            <a href="${u}/magazine/${params.articolo.slug}" style="color:#9A3412;text-decoration:none;">${params.articolo.titolo}</a>
          </h2>
          <p style="color:#C2410C;font-size:13px;margin:0 0 12px;">${params.articolo.estratto}</p>
          <a href="${u}/magazine/${params.articolo.slug}" style="color:#EA580C;font-size:13px;font-weight:bold;text-decoration:none;">Leggi l'articolo →</a>
        </div>
      </div>` : "";

  const eventiHtml = params.eventi.length > 0
    ? `<div style="margin:20px 0;">
        <h2 style="color:#9A3412;font-size:16px;margin:0 0 12px;font-family:Fredoka,sans-serif;">📅 Eventi questa settimana</h2>
        ${params.eventi.map((e) => `
          <div style="padding:8px 0;border-bottom:1px solid #FED7AA;">
            <strong style="color:#9A3412;font-size:14px;">${e.titolo}</strong><br>
            <span style="color:#C2410C;font-size:12px;">${e.data} — ${e.citta}</span>
          </div>
        `).join("")}
        <a href="${u}/eventi" style="color:#EA580C;font-size:12px;font-weight:bold;text-decoration:none;display:block;margin-top:8px;">Tutti gli eventi →</a>
      </div>` : "";

  const offertaHtml = params.offerta
    ? `<div style="margin:20px 0;background:#FFF7ED;border:2px solid #FED7AA;border-radius:12px;padding:16px;text-align:center;">
        <span style="color:#EA580C;font-size:10px;font-weight:bold;text-transform:uppercase;">🏷️ Offerta della settimana</span>
        <h3 style="color:#9A3412;font-size:16px;margin:8px 0 4px;">${params.offerta.titolo}</h3>
        <p style="color:#C2410C;font-size:12px;margin:0;">${params.offerta.marca} — da ${params.offerta.negozio}</p>
        <div style="margin:10px 0;">
          <span style="background:#DC2626;color:#fff;font-size:14px;font-weight:bold;padding:4px 12px;border-radius:6px;">-${params.offerta.sconto}%</span>
          <span style="color:#9A3412;font-size:18px;font-weight:bold;margin-left:8px;">${params.offerta.prezzo_scontato}</span>
        </div>
        <a href="${u}/offerte" style="color:#EA580C;font-size:12px;font-weight:bold;text-decoration:none;">Vedi tutte le offerte →</a>
      </div>` : "";

  const smarritiHtml = params.smarriti.length > 0
    ? `<div style="margin:20px 0;background:#FEF2F2;border:2px solid #FECACA;border-radius:12px;padding:16px;">
        <h2 style="color:#DC2626;font-size:14px;margin:0 0 8px;">🚨 SOS Smarriti nella tua zona</h2>
        ${params.smarriti.map((s) => `
          <p style="color:#991B1B;font-size:13px;margin:4px 0;">
            <strong>${s.nome_animale || s.specie}</strong> smarrito a ${s.comune}
          </p>
        `).join("")}
        <a href="${u}/sos-smarriti" style="color:#DC2626;font-size:12px;font-weight:bold;text-decoration:none;">Aiutaci a ritrovarli →</a>
      </div>` : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Nunito,Arial,sans-serif;background:#FFF7ED;margin:0;padding:20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #FED7AA;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#EA580C,#F97316);padding:28px;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;font-family:Fredoka,sans-serif;">🐾 Questa settimana vicino a te</h1>
    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">Le novita pet per ${params.comune}</p>
  </div>

  <!-- Body -->
  <div style="padding:24px;">
    <p style="color:#9A3412;font-size:15px;line-height:1.5;">
      Ciao <strong>${params.nome || "amico"}</strong> 👋<br>
      Ecco cosa c'e di nuovo questa settimana per te e il tuo amico a 4 zampe:
    </p>

    ${novitaHtml}
    ${articoloHtml}
    ${eventiHtml}
    ${offertaHtml}
    ${smarritiHtml}

    <!-- CTA principale -->
    <div style="text-align:center;margin:24px 0 8px;">
      <a href="${u}/professionisti" style="background:#EA580C;color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:bold;font-size:15px;display:inline-block;">
        Cerca professionisti vicino a te
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="padding:16px;text-align:center;background:#FFEDD5;border-top:1px solid #FED7AA;">
    <p style="color:#C2410C;font-size:11px;margin:0;">
      Ricevi questa email perche sei iscritto a MifidoDiTe.eu<br>
      <a href="${u}/unsubscribe?email={{email}}" style="color:#C2410C;text-decoration:underline;">Cancellati</a> ·
      <a href="${u}/privacy" style="color:#C2410C;text-decoration:underline;">Privacy</a>
    </p>
    <p style="color:#C2410C;font-size:10px;margin:6px 0 0;">miao@mifidodite.eu — Mi fido di te 🐾</p>
  </div>

</div>
</body></html>`;
}
