import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, buildNewsletterHtml } from "@/lib/brevo";

// Vercel Cron: ogni lunedi alle 8:00
// vercel.json: { "crons": [{ "path": "/api/cron/send-newsletter", "schedule": "0 8 * * 1" }] }

export async function GET() {
  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";

  // 1. Iscritti attivi
  const { data: iscritti } = await supabase
    .from("newsletter_iscritti")
    .select("*")
    .eq("attivo", true);

  if (!iscritti?.length) {
    return NextResponse.json({ success: true, inviati: 0, motivo: "nessun iscritto" });
  }

  // 2. Novita ultima settimana
  const unaSettimanaFa = new Date();
  unaSettimanaFa.setDate(unaSettimanaFa.getDate() - 7);

  const { data: novita } = await supabase
    .from("strutture")
    .select("nome, slug, comune, provincia, categoria, descrizione")
    .eq("attivo", true)
    .gte("created_at", unaSettimanaFa.toISOString())
    .order("created_at", { ascending: false })
    .limit(20);

  // 3. Eventi prossimi
  const oggi = new Date().toISOString().split("T")[0];
  const { data: eventi } = await supabase
    .from("eventi")
    .select("titolo, data_inizio, citta, sommario")
    .eq("attivo", true)
    .gte("data_inizio", oggi)
    .order("data_inizio", { ascending: true })
    .limit(5);

  // 4. Invio (max 290/giorno per stare sotto il limite Brevo free)
  let inviati = 0;
  const maxGiornaliero = 290;

  for (const iscritto of iscritti) {
    if (inviati >= maxGiornaliero) break;

    try {
      // Filtra novita locali
      let locali = novita || [];
      if (iscritto.provincia) {
        const filtrate = locali.filter((n) => n.provincia === iscritto.provincia);
        if (filtrate.length >= 2) locali = filtrate;
      }

      const html = buildNewsletterHtml({
        nome: iscritto.nome || "",
        comune: iscritto.comune || "la tua zona",
        novita: locali.slice(0, 5).map((n) => ({
          tipo: n.categoria,
          nome: n.nome,
          comune: `${n.comune} (${n.provincia})`,
          slug: n.slug,
          descrizione: n.descrizione || "",
        })),
        eventi: (eventi || []).map((e) => ({
          titolo: e.titolo,
          data: e.data_inizio || "",
          citta: e.citta || "",
          sommario: e.sommario || "",
        })),
        appUrl,
      });

      const sent = await sendEmail({
        to: [{ email: iscritto.email, name: iscritto.nome || undefined }],
        subject: `🐾 Novita pet vicino a ${iscritto.comune || "te"}`,
        htmlContent: html,
      });

      if (sent) inviati++;
    } catch {
      // Continua con il prossimo
    }
  }

  return NextResponse.json({
    success: true,
    totale: iscritti.length,
    inviati,
  });
}
