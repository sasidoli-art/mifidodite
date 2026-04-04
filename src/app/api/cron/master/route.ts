import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";

// ============================================
// MASTER CRON — Orchestratore di tutti gli agenti
// Gira ogni giorno alle 7:00 (1 solo cron Vercel free)
// Decide cosa fare in base al giorno della settimana
// ============================================
//
// PIANIFICAZIONE SETTIMANALE:
//
// LUN: Newsletter + Scraper (citta del giorno)
// MAR: Scraper + Writer (2 articoli)
// MER: Scraper + Social (genera post per 2 giorni)
// GIO: Scraper + Writer (2 articoli)
// VEN: Scraper + Outreach (10 email invito)
// SAB: Scraper + Monitor (SOS smarriti da Subito)
// DOM: Scraper + Social (genera post per 2 giorni)
//
// Lo Scraper gira OGNI GIORNO → 1 citta al giorno = 60+ citta in 2 mesi
// Il Writer gira 2x/settimana → 4 articoli/settimana → 16/mese
// Il Social gira 2x/settimana → post pronti per ogni giorno
// L'Outreach gira 1x/settimana → 10 email = 40/mese
// Il Monitor gira 1x/settimana → importa smarriti freschi
//
// COSTO: ~8€/mese totali (Claude Haiku)

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const oggi = new Date();
  const giorno = oggi.getDay(); // 0=Dom, 1=Lun, ... 6=Sab
  const giornoNome = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"][giorno];
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3333";
  const secret = process.env.CRON_SECRET || "";

  const headers = { Authorization: `Bearer ${secret}` };
  const risultati: Record<string, unknown> = {};

  async function callAgent(nome: string, path: string) {
    try {
      const res = await fetch(`${baseUrl}${path}`, { headers });
      const data = await res.json();
      risultati[nome] = { status: res.ok ? "ok" : "errore", ...data };
    } catch (err) {
      risultati[nome] = { status: "errore", error: String(err) };
    }
  }

  // Lo Scraper gira SEMPRE (1 citta nuova al giorno)
  await callAgent("scraper", "/api/agents/scraper");

  // Poi in base al giorno
  switch (giorno) {
    case 1: // LUNEDI — Newsletter
      await callAgent("newsletter", "/api/cron/send-newsletter");
      break;

    case 2: // MARTEDI — Writer
      await callAgent("writer", "/api/agents/writer");
      break;

    case 3: // MERCOLEDI — Social
      await callAgent("social", "/api/agents/social");
      break;

    case 4: // GIOVEDI — Writer
      await callAgent("writer", "/api/agents/writer");
      break;

    case 5: // VENERDI — Outreach
      await callAgent("outreach", "/api/agents/outreach");
      break;

    case 6: // SABATO — Monitor SOS
      await callAgent("monitor", "/api/agents/monitor");
      break;

    case 0: // DOMENICA — Social
      await callAgent("social", "/api/agents/social");
      break;
  }

  return NextResponse.json({
    success: true,
    data: oggi.toISOString().split("T")[0],
    giorno: giornoNome,
    agenti_eseguiti: Object.keys(risultati),
    risultati,
  });
}
