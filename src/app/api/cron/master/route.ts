import { NextRequest, NextResponse } from "next/server";
import { verifyCron } from "@/lib/cron-auth";

// MASTER CRON — un solo cron che gestisce tutto
// Vercel Hobby free ha solo 2 cron, quindi usiamo 1 cron
// che decide cosa fare in base al giorno della settimana.
//
// Pianificazione: questo cron gira ogni giorno alle 7:00
// vercel.json: { "path": "/api/cron/master", "schedule": "0 7 * * *" }

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const oggi = new Date();
  const giorno = oggi.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mer, 4=Gio, 5=Ven, 6=Sab
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3333";
  const secret = process.env.CRON_SECRET || "";

  const headers = {
    Authorization: `Bearer ${secret}`,
  };

  const risultati: Record<string, string> = {};

  try {
    switch (giorno) {
      case 1: // LUNEDI — Newsletter
        const nlRes = await fetch(`${baseUrl}/api/cron/send-newsletter`, { headers });
        risultati.newsletter = nlRes.ok ? "ok" : "errore";
        break;

      case 3: // MERCOLEDI — Scraping eventi
        const evRes = await fetch(`${baseUrl}/api/cron/scrape-events`, { headers });
        risultati.eventi = evRes.ok ? "ok" : "errore";
        break;

      case 4: // GIOVEDI — Generazione articoli AI
        const artRes = await fetch(`${baseUrl}/api/cron/generate-articles`, { headers });
        risultati.articoli = artRes.ok ? "ok" : "errore";
        break;

      case 6: // SABATO — Scraping cliniche
        const clRes = await fetch(`${baseUrl}/api/cron/scrape-cliniche`, { headers });
        risultati.cliniche = clRes.ok ? "ok" : "errore";
        break;

      default:
        // Mar, Ven, Dom — niente di programmato
        risultati.stato = "nessuna azione oggi";
        break;
    }
  } catch (err) {
    risultati.errore = String(err);
  }

  return NextResponse.json({
    success: true,
    giorno: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"][giorno],
    data: oggi.toISOString().split("T")[0],
    risultati,
  });
}
