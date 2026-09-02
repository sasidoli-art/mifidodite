import { NextResponse } from "next/server";

// === PROGETTO IN DISMISSIONE ===
// Endpoint disattivato. Era l'unica route pubblica (senza CRON_SECRET)
// che raggiungeva i provider AI a pagamento tramite lib/chatbot.
// L'implementazione originale resta nella storia git (commit e7f88b8).

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    { error: "Servizio non piu disponibile." },
    { status: 410 }
  );
}
