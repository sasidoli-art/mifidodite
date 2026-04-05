import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { sendEmail, buildNewsletterHtml } from "@/lib/brevo";
import { verifyCron } from "@/lib/cron-auth";
import { logAgent, startTimer } from "@/lib/agent-logger";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;
  const elapsed = startTimer();

  if (!process.env.DATABASE_URL || !process.env.BREVO_API_KEY) {
    return NextResponse.json({ success: false, motivo: "DATABASE_URL o BREVO_API_KEY mancante" });
  }

  const sql = neon(process.env.DATABASE_URL);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";

  // 1. Iscritti attivi
  const iscritti = await sql`SELECT * FROM newsletter_iscritti WHERE attivo = true`;
  if (!iscritti?.length) {
    return NextResponse.json({ success: true, inviati: 0, motivo: "nessun iscritto" });
  }

  // 2. Novita ultima settimana
  const unaSettimanaFa = new Date();
  unaSettimanaFa.setDate(unaSettimanaFa.getDate() - 7);
  const novita = await sql`SELECT nome, slug, comune, provincia, categoria, descrizione FROM strutture WHERE attivo = true AND created_at >= ${unaSettimanaFa.toISOString()} ORDER BY created_at DESC LIMIT 20`;

  // 3. Ultimo articolo pubblicato
  const articoli = await sql`SELECT titolo, slug, estratto, img, categoria FROM articoli WHERE pubblicato = true ORDER BY created_at DESC LIMIT 1`;
  const articolo = articoli.length > 0 ? {
    titolo: articoli[0].titolo as string,
    slug: articoli[0].slug as string,
    estratto: (articoli[0].estratto as string) || "",
    img: (articoli[0].img as string) || "",
    categoria: (articoli[0].categoria as string) || "",
  } : null;

  // 4. Eventi prossimi
  const oggi = new Date().toISOString().split("T")[0];
  const eventi = await sql`SELECT titolo, data_inizio::text, citta, sommario FROM eventi WHERE attivo = true AND data_inizio >= ${oggi} ORDER BY data_inizio ASC LIMIT 3`;

  // 5. Offerta della settimana
  const offerte = await sql`SELECT titolo, marca, nome_negozio, prezzo_scontato, sconto_percentuale FROM offerte WHERE attivo = true ORDER BY created_at DESC LIMIT 1`;
  const offerta = offerte.length > 0 ? {
    titolo: offerte[0].titolo as string,
    marca: (offerte[0].marca as string) || "",
    negozio: (offerte[0].nome_negozio as string) || "",
    prezzo_scontato: (offerte[0].prezzo_scontato as string) || "",
    sconto: Number(offerte[0].sconto_percentuale) || 0,
  } : null;

  // 6. SOS smarriti attivi
  const smarriti = await sql`SELECT nome_animale, comune, specie FROM sos_smarriti WHERE stato = 'attivo' ORDER BY created_at DESC LIMIT 3`;

  // 7. Invio (max 290/giorno per Brevo free)
  let inviati = 0;
  const maxGiornaliero = 290;

  for (const iscritto of iscritti) {
    if (inviati >= maxGiornaliero) break;

    try {
      // Filtra novita per provincia
      let locali = novita || [];
      if (iscritto.provincia) {
        const filtrate = locali.filter((n) => n.provincia === iscritto.provincia);
        if (filtrate.length >= 2) locali = filtrate;
      }

      const html = buildNewsletterHtml({
        nome: (iscritto.nome as string) || "",
        comune: (iscritto.comune as string) || "la tua zona",
        novita: (locali as Array<Record<string, unknown>>).slice(0, 5).map((n) => ({
          tipo: n.categoria as string,
          nome: n.nome as string,
          comune: `${n.comune} (${n.provincia})`,
          slug: n.slug as string,
          descrizione: (n.descrizione as string) || "",
        })),
        articolo,
        eventi: (eventi as Array<Record<string, unknown>>).map((e) => ({
          titolo: e.titolo as string,
          data: (e.data_inizio as string) || "",
          citta: (e.citta as string) || "",
          sommario: (e.sommario as string) || "",
        })),
        offerta,
        smarriti: (smarriti as Array<Record<string, unknown>>).map((s) => ({
          nome_animale: (s.nome_animale as string) || "",
          comune: (s.comune as string) || "",
          specie: (s.specie as string) || "cane",
        })),
        appUrl,
      });

      const sent = await sendEmail({
        to: [{ email: iscritto.email as string, name: (iscritto.nome as string) || undefined }],
        subject: `🐾 Novita pet vicino a ${(iscritto.comune as string) || "te"} — MifidoDiTe`,
        htmlContent: html,
      });

      if (sent) inviati++;
    } catch {
      // Continua con il prossimo
    }
  }

  await logAgent({
    agente: "newsletter",
    stato: inviati > 0 ? "ok" : "parziale",
    risultati_trovati: iscritti.length,
    risultati_salvati: inviati,
    durata_ms: elapsed(),
  });

  return NextResponse.json({ success: true, totale: iscritti.length, inviati });
}
