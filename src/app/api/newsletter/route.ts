import { NextResponse } from "next/server";

// Newsletter signup temporaneamente sospeso (giugno 2026).
// Il sito e in modalita pausa: nessuna nuova iscrizione viene accettata
// per evitare obblighi GDPR (registro consensi, double opt-in) finche non
// torneremo operativi. Gli iscritti esistenti restano nel DB e possono
// disiscriversi normalmente via /unsubscribe.
export async function POST() {
  return NextResponse.json(
    { error: "Iscrizioni alla newsletter temporaneamente sospese. Torna a trovarci presto." },
    { status: 503 }
  );
}
