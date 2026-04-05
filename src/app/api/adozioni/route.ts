import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(getClientIP(request), 3, 60000);
  if (!allowed) return NextResponse.json({ error: "Troppe richieste." }, { status: 429 });
  const body = await request.json();
  const { tipo, titolo, descrizione, nome_contatto, email_contatto, comune, provincia } = body;

  if (!tipo || !titolo || !descrizione || !nome_contatto || !email_contatto || !comune || !provincia) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  const supabase = await createClient();
  const slug = slugify(`${body.nome_animale || tipo}-${titolo}-${comune}`.slice(0, 80));

  const { error } = await supabase.from("annunci_adozioni").insert({
    tipo,
    titolo,
    slug,
    descrizione,
    nome_animale: body.nome_animale || null,
    specie: body.specie || "cane",
    razza: body.razza || null,
    sesso: body.sesso || "non_specificato",
    eta_mesi: body.eta_mesi ? parseInt(body.eta_mesi) : null,
    taglia: body.taglia || null,
    colore: body.colore || null,
    carattere: body.carattere || null,
    vaccinato: body.vaccinato || false,
    sterilizzato: body.sterilizzato || false,
    microchip: body.microchip || false,
    note_salute: body.note_salute || null,
    comune,
    provincia: provincia.toUpperCase(),
    nome_contatto,
    email_contatto: email_contatto.toLowerCase().trim(),
    telefono_contatto: body.telefono_contatto || null,
    tipo_contatto: body.tipo_contatto || "privato",
    nome_organizzazione: body.nome_organizzazione || null,
    richiesta_preaffido: body.richiesta_preaffido || false,
    costo_adozione: body.costo_adozione || null,
    // Non approvato di default — deve passare moderazione
    approvato: false,
    scade_il: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 giorni
  });

  if (error) {
    console.error("Adozioni insert error:", error);
    return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
