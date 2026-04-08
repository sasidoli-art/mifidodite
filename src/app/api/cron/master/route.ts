import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { logAgent, startTimer } from "@/lib/agent-logger";

// ============================================
// MASTER ORCHESTRATOR — MiFidoDiTe Growth Engine
//
// Chiama gli agent DIRETTAMENTE (no HTTP fetch interno)
// per essere affidabile su Vercel serverless.
//
// SCHEDULE:
// LUN: Newsletter
// MAR: Scraper + Writer (3 articoli)
// MER: Scraper + Social
// GIO: Scraper + Writer (3 articoli)
// VEN: Scraper (Outreach disabilitato per Art. 130)
// SAB: Scraper + Monitor
// DOM: Scraper + Social
//
// Costo: ~1.50€/mese (Claude Haiku)
// ============================================

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const elapsed = startTimer();
  const oggi = new Date();
  const giorno = oggi.getDay();
  const giornoNome = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"][giorno];
  const dataISO = oggi.toISOString().split("T")[0];

  const risultati: Record<string, unknown> = {};
  const taskEseguiti: string[] = [];

  async function runAgent(nome: string, agentFn: () => Promise<unknown>) {
    try {
      const result = await agentFn();
      risultati[nome] = { status: "ok", ...((result as object) || {}) };
      taskEseguiti.push(nome);
    } catch (err) {
      risultati[nome] = { status: "errore", error: String(err) };
      taskEseguiti.push(`${nome}_FALLITO`);
    }
  }

  // ---- SCRAPER: gira SEMPRE ----
  await runAgent("scraper", async () => {
    const mod = await import("@/app/api/agents/scraper/route");
    const fakeReq = new NextRequest(new URL("https://mifidodite.eu/api/agents/scraper"), {
      headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ""}` },
    });
    const res = await mod.GET(fakeReq);
    return await res.json();
  });

  // ---- TASK GIORNALIERO ----
  switch (giorno) {
    case 1: // LUNEDI — Newsletter
      await runAgent("newsletter", async () => {
        const mod = await import("@/app/api/cron/send-newsletter/route");
        const fakeReq = new NextRequest(new URL("https://mifidodite.eu/api/cron/send-newsletter"), {
          headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ""}` },
        });
        const res = await mod.GET(fakeReq);
        return await res.json();
      });
      break;

    case 2: // MARTEDI — Writer
    case 4: // GIOVEDI — Writer
      await runAgent("writer", async () => {
        const mod = await import("@/app/api/agents/writer/route");
        const fakeReq = new NextRequest(new URL("https://mifidodite.eu/api/agents/writer"), {
          headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ""}` },
        });
        const res = await mod.GET(fakeReq);
        return await res.json();
      });
      break;

    case 3: // MERCOLEDI — Social
    case 0: // DOMENICA — Social
      await runAgent("social", async () => {
        const mod = await import("@/app/api/agents/social/route");
        const fakeReq = new NextRequest(new URL("https://mifidodite.eu/api/agents/social"), {
          headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ""}` },
        });
        const res = await mod.GET(fakeReq);
        return await res.json();
      });
      break;

    case 5: // VENERDI — Outreach disabilitato
      risultati.outreach = { status: "disabilitato", motivo: "Art. 130 Codice Privacy" };
      taskEseguiti.push("outreach_DISABILITATO");
      break;

    case 6: // SABATO — Monitor
      await runAgent("monitor", async () => {
        const mod = await import("@/app/api/agents/monitor/route");
        const fakeReq = new NextRequest(new URL("https://mifidodite.eu/api/agents/monitor"), {
          headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ""}` },
        });
        const res = await mod.GET(fakeReq);
        return await res.json();
      });
      break;
  }

  const durataMs = elapsed();

  await logAgent({
    agente: "master",
    stato: "ok",
    risultati_trovati: taskEseguiti.length,
    risultati_salvati: taskEseguiti.filter((t) => !t.includes("FALLITO")).length,
    durata_ms: durataMs,
    dettagli: { data: dataISO, giorno: giornoNome, tasks: taskEseguiti, risultati },
  });

  return NextResponse.json({
    execution_date: dataISO,
    day_of_week: giornoNome,
    tasks_performed: taskEseguiti,
    summary: `${giornoNome}: eseguiti ${taskEseguiti.length} task in ${(durataMs / 1000).toFixed(1)}s`,
    risultati,
  });
}
