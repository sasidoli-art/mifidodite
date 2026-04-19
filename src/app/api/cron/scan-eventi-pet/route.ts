import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { scanAllSources } from "@/lib/event-scanner";
import { logAgent, startTimer } from "@/lib/agent-logger";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const elapsed = startTimer();

  // Per evitare di consumare AI tokens in cold start, limitiamo a tutte le 20 fonti
  // ma il pre-filtro keyword tipicamente lascia passare solo 2-5 item per fonte.
  const results = await scanAllSources();
  const totale = results.reduce(
    (acc, r) => {
      acc.fetched += r.fetched;
      acc.prefiltered += r.prefiltered;
      acc.classified += r.classified;
      acc.inserted += r.inserted;
      acc.errors += r.errors;
      return acc;
    },
    { fetched: 0, prefiltered: 0, classified: 0, inserted: 0, errors: 0 },
  );

  const durataMs = elapsed();

  await logAgent({
    agente: "event-scanner",
    stato: totale.errors === 0 ? "ok" : "parziale",
    risultati_trovati: totale.prefiltered,
    risultati_salvati: totale.inserted,
    durata_ms: durataMs,
    dettagli: { totale, per_fonte: results },
  });

  return NextResponse.json({
    success: true,
    summary: `Scansionate ${results.length} fonti, ${totale.inserted} nuovi candidati inseriti`,
    totale,
    per_fonte: results,
  });
}
