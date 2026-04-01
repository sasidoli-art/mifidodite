import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, buildNewsletterHtml } from "@/lib/brevo";

// POST /api/newsletter/send
// Chiamata da n8n ogni lunedi mattina via cron
// Invia newsletter personalizzata per zona a tutti gli iscritti attivi

export async function POST(request: NextRequest) {
  // Auth con API key
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const supabase = await createClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";

  // 1. Prendi tutti gli iscritti attivi
  const { data: iscritti, error: iscrittiError } = await supabase
    .from("newsletter_iscritti")
    .select("*")
    .eq("attivo", true);

  if (iscrittiError || !iscritti?.length) {
    return NextResponse.json({
      success: false,
      error: iscrittiError?.message || "Nessun iscritto",
    });
  }

  // 2. Prendi le novita dell'ultima settimana
  const unaSettimanaFa = new Date();
  unaSettimanaFa.setDate(unaSettimanaFa.getDate() - 7);

  const { data: novitaGlobali } = await supabase
    .from("strutture")
    .select("nome, slug, comune, provincia, categoria, descrizione")
    .eq("attivo", true)
    .gte("created_at", unaSettimanaFa.toISOString())
    .order("created_at", { ascending: false })
    .limit(20);

  // 3. Invia a ciascun iscritto (raggruppato per provincia se possibile)
  let inviati = 0;
  let errori = 0;

  for (const iscritto of iscritti) {
    try {
      // Filtra novita per vicinanza (stessa provincia se disponibile)
      let novitaPersonali = novitaGlobali || [];
      if (iscritto.provincia) {
        const locali = novitaPersonali.filter(
          (n) => n.provincia === iscritto.provincia
        );
        // Se ci sono risultati locali usa quelli, altrimenti mostra i globali
        if (locali.length >= 2) {
          novitaPersonali = locali;
        }
      }

      // Max 5 novita per email
      novitaPersonali = novitaPersonali.slice(0, 5);

      const html = buildNewsletterHtml({
        nome: iscritto.nome || "",
        comune: iscritto.comune || iscritto.provincia || "la tua zona",
        novita: novitaPersonali.map((n) => ({
          tipo: n.categoria,
          nome: n.nome,
          comune: `${n.comune} (${n.provincia})`,
          slug: n.slug,
          descrizione: n.descrizione || "",
        })),
        eventi: [], // TODO: aggiungere eventi dalla tabella eventi
        appUrl,
      });

      const sent = await sendEmail({
        to: [{ email: iscritto.email, name: iscritto.nome || undefined }],
        subject: `🐾 Questa settimana vicino a ${iscritto.comune || "te"} — MifidoDiTe`,
        htmlContent: html,
      });

      if (sent) inviati++;
      else errori++;
    } catch {
      errori++;
    }
  }

  return NextResponse.json({
    success: true,
    totale_iscritti: iscritti.length,
    inviati,
    errori,
  });
}
