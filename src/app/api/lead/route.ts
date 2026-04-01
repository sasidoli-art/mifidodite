import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendLeadNotification, sendInvitoAffiliazione } from "@/lib/brevo";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    struttura_id,
    nome,
    email,
    telefono,
    data_inizio,
    data_fine,
    numero_animali,
    tipo_animale,
    taglia,
    note,
  } = body;

  // Validazione base
  if (!struttura_id || !nome || !email) {
    return NextResponse.json(
      { error: "Nome, email e struttura sono obbligatori" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // 1. Salva il lead
  const { data: lead, error: leadError } = await supabase
    .from("lead")
    .insert({
      struttura_id,
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      telefono: telefono || null,
      data_inizio: data_inizio || null,
      data_fine: data_fine || null,
      numero_animali: numero_animali || 1,
      tipo_animale: tipo_animale || "cane",
      taglia: taglia || null,
      note: note || null,
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      user_agent: request.headers.get("user-agent"),
    })
    .select()
    .single();

  if (leadError) {
    console.error("Lead insert error:", leadError);
    return NextResponse.json(
      { error: "Errore nel salvataggio. Riprova." },
      { status: 500 }
    );
  }

  // 2. Incrementa contatore lead sulla struttura
  try {
    await supabase.rpc("increment_lead_count", { sid: struttura_id });
  } catch {
    // Non bloccare se fallisce
  }

  // 3. Controlla se la struttura e affiliata
  const { data: struttura } = await supabase
    .from("strutture")
    .select("affiliazione, email, nome")
    .eq("id", struttura_id)
    .single();

  if (struttura) {
    if (struttura.affiliazione === "attivo" && struttura.email) {
      // Struttura affiliata → invia lead via email diretta
      sendLeadNotification({
        email_struttura: struttura.email,
        nome_struttura: struttura.nome || "La tua attivita",
        lead: { nome, email, telefono, data_inizio, data_fine, numero_animali, tipo_animale, note },
      }).catch((err) => console.error("Lead email error:", err));

      await supabase
        .from("lead")
        .update({ stato: "inviato" })
        .eq("id", lead.id);
    } else if (
      struttura.affiliazione === "non_invitato" ||
      struttura.affiliazione === "invitato"
    ) {
      // Struttura NON affiliata → trigger invito affiliazione
      await triggerInvitoAffiliazione(supabase, struttura_id, struttura);
    }
  }

  return NextResponse.json({ success: true, lead_id: lead.id });
}

async function triggerInvitoAffiliazione(
  supabase: Awaited<ReturnType<typeof createClient>>,
  strutturaId: string,
  struttura: { email: string | null; nome: string | null }
) {
  if (!struttura.email) return;

  // Controlla se esiste gia un invito recente (ultimi 7 giorni)
  const setteGiorniFa = new Date();
  setteGiorniFa.setDate(setteGiorniFa.getDate() - 7);

  const { data: invitoEsistente } = await supabase
    .from("inviti_affiliazione")
    .select("id, numero_lead_pendenti")
    .eq("struttura_id", strutturaId)
    .gte("ultimo_invio", setteGiorniFa.toISOString())
    .order("ultimo_invio", { ascending: false })
    .limit(1)
    .single();

  if (invitoEsistente) {
    // Aggiorna contatore lead pendenti
    await supabase
      .from("inviti_affiliazione")
      .update({
        numero_lead_pendenti: (invitoEsistente.numero_lead_pendenti || 0) + 1,
      })
      .eq("id", invitoEsistente.id);
  } else {
    // Crea nuovo invito
    const token = crypto.randomUUID();
    await supabase.from("inviti_affiliazione").insert({
      struttura_id: strutturaId,
      email_destinatario: struttura.email,
      token,
      numero_lead_pendenti: 1,
      messaggio_personalizzato: `Ciao! Qualcuno sta cercando proprio te su MifidoDiTe.it. Hai ricevuto una richiesta di disponibilita per "${struttura.nome}". Registrati gratis per ricevere i contatti direttamente.`,
    });

    // Aggiorna stato affiliazione
    await supabase
      .from("strutture")
      .update({ affiliazione: "invitato" })
      .eq("id", strutturaId);

    // Invio email invito con Brevo
    sendInvitoAffiliazione({
      email: struttura.email!,
      nome_struttura: struttura.nome || "La tua attivita",
      token,
      lead_pendenti: 1,
    }).catch((err) => console.error("Invito email error:", err));
  }
}
