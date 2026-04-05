import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";
import { logAgent, startTimer } from "@/lib/agent-logger";

// ============================================
// MASTER ORCHESTRATOR — MiFidoDiTe Growth Engine
//
// Intelligenza centrale che coordina la crescita automatica.
// Gira ogni giorno alle 7:00 via Vercel Cron.
//
// SCHEDULE:
// LUN: Scraper + Event Enrichment (priorita alta)
// MAR: Scraper + SEO Writer (2 articoli)
// MER: Scraper + Social Creator
// GIO: Scraper + SEO Writer (2 articoli)
// VEN: Scraper + Outreach (10-12 email)
// SAB: Scraper + Lost Pet Monitor
// DOM: Scraper + Social Creator + Weekly Report
//
// Lo Scraper gira OGNI GIORNO — 1 citta a rotazione
// Costo totale: ~1.50€/mese (Claude Haiku)
// ============================================

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const elapsed = startTimer();
  const oggi = new Date();
  const giorno = oggi.getDay(); // 0=Dom, 1=Lun, ... 6=Sab
  const giornoNome = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"][giorno];
  const dataISO = oggi.toISOString().split("T")[0];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3333";
  const secret = process.env.CRON_SECRET || "";

  const headers = { Authorization: `Bearer ${secret}` };
  const risultati: Record<string, unknown> = {};
  const taskEseguiti: string[] = [];

  async function callAgent(nome: string, path: string) {
    try {
      const res = await fetch(`${baseUrl}${path}`, { headers });
      const data = await res.json();
      risultati[nome] = { status: res.ok ? "ok" : "errore", ...data };
      taskEseguiti.push(nome);
    } catch (err) {
      risultati[nome] = { status: "errore", error: String(err) };
      taskEseguiti.push(`${nome}_FALLITO`);
    }
  }

  // ---- SCRAPER: gira SEMPRE (1 citta al giorno) ----
  await callAgent("scraper", "/api/agents/scraper");

  // ---- TASK GIORNALIERO ----
  switch (giorno) {
    case 1: // LUNEDI — Event Enrichment (priorita alta)
      await callAgent("newsletter", "/api/cron/send-newsletter");
      // TODO: aggiungere agent eventi dedicato
      break;

    case 2: // MARTEDI — SEO Writer
      await callAgent("writer", "/api/agents/writer");
      break;

    case 3: // MERCOLEDI — Social Creator
      await callAgent("social", "/api/agents/social");
      break;

    case 4: // GIOVEDI — SEO Writer
      await callAgent("writer", "/api/agents/writer");
      break;

    case 5: // VENERDI — Outreach DISABILITATO (Art. 130 Codice Privacy: email non sollecitate)
      // L'outreach verra riabilitato solo quando i professionisti si registreranno
      // volontariamente e daranno consenso a ricevere comunicazioni.
      // await callAgent("outreach", "/api/agents/outreach");
      risultati.outreach = { status: "disabilitato", motivo: "Art. 130 Codice Privacy" };
      taskEseguiti.push("outreach_DISABILITATO");
      break;

    case 6: // SABATO — Lost Pet Monitor
      await callAgent("monitor", "/api/agents/monitor");
      break;

    case 0: // DOMENICA — Social + Report
      await callAgent("social", "/api/agents/social");
      break;
  }

  const durataMs = elapsed();

  // Log nel DB
  await logAgent({
    agente: "master",
    stato: "ok",
    risultati_trovati: taskEseguiti.length,
    risultati_salvati: taskEseguiti.filter(t => !t.includes("FALLITO")).length,
    durata_ms: durataMs,
    dettagli: {
      data: dataISO,
      giorno: giornoNome,
      tasks: taskEseguiti,
      risultati,
    },
  });

  return NextResponse.json({
    execution_date: dataISO,
    day_of_week: giornoNome,
    tasks_performed: taskEseguiti,
    summary: `${giornoNome}: eseguiti ${taskEseguiti.length} task in ${(durataMs / 1000).toFixed(1)}s`,
    risultati,
  });
}
