import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(getClientIP(request), 3, 60000);
  if (!allowed) return NextResponse.json({ error: "Troppe richieste." }, { status: 429 });
  const body = await request.json();
  const { tipo, descrizione, nome_contatto, telefono_contatto, comune, provincia } = body;

  if (!tipo || !descrizione || !nome_contatto || !telefono_contatto || !comune || !provincia) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  // Se Supabase non e configurato, rispondi ok (dev mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ success: true, dev: true });
  }

  const supabase = await createClient();

  const { error } = await supabase.from("sos_smarriti").insert({
    tipo,
    nome_animale: body.nome_animale || null,
    specie: body.specie || "cane",
    razza: body.razza || null,
    colore: body.colore || null,
    taglia: body.taglia || null,
    descrizione,
    data_evento: body.data_evento || new Date().toISOString().split("T")[0],
    ora_evento: body.ora_evento || null,
    indirizzo_evento: body.indirizzo_evento || null,
    comune,
    provincia: provincia.toUpperCase(),
    nome_contatto,
    telefono_contatto,
    email_contatto: body.email_contatto || null,
    ricompensa: body.ricompensa || null,
  });

  if (error) {
    console.error("SOS insert error:", error);
    return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
  }

  // TODO: inviare alert newsletter a iscritti della zona

  return NextResponse.json({ success: true });
}
