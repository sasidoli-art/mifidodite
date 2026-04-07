import { NextRequest, NextResponse } from "next/server";
import { searchOSMByCity } from "@/lib/openstreetmap";
import { verifyCron } from "@/lib/cron-auth";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 minuti per fare tutte le citta

// Pre-warming cache OSM per le top citta italiane.
// Gira ogni notte (cron Vercel) per scaldare la cache CDN.
// Cosi nessun utente vede mai l'attesa di 10-20s di Overpass.

const TOP_CITTA = [
  // Top 50 citta italiane per popolazione + zone turistiche pet-friendly
  "Roma", "Milano", "Napoli", "Torino", "Palermo", "Genova", "Bologna",
  "Firenze", "Bari", "Catania", "Venezia", "Verona", "Messina", "Padova",
  "Trieste", "Brescia", "Taranto", "Prato", "Reggio Calabria", "Modena",
  "Reggio Emilia", "Parma", "Perugia", "Livorno", "Ravenna", "Cagliari",
  "Foggia", "Rimini", "Salerno", "Ferrara", "Sassari", "Latina", "Giugliano",
  "Monza", "Siracusa", "Pescara", "Bergamo", "Forli", "Trento", "Vicenza",
  "Terni", "Bolzano", "Novara", "Piacenza", "Ancona", "Andria", "Arezzo",
  "Udine", "Cesena", "Lecce",
];

const CATEGORIE = ["veterinario", "toelettatura", "pensione"];

export async function GET(request: NextRequest) {
  const authError = verifyCron(request);
  if (authError) return authError;

  const start = Date.now();
  const results: Array<{ citta: string; categoria: string; trovati: number; ms: number }> = [];
  let totaleTrovati = 0;

  // Loop sequenziale per non sovraccaricare Overpass
  for (const citta of TOP_CITTA) {
    for (const categoria of CATEGORIE) {
      const t0 = Date.now();
      try {
        const { places } = await searchOSMByCity(categoria, citta, 30);
        const ms = Date.now() - t0;
        results.push({ citta, categoria, trovati: places.length, ms });
        totaleTrovati += places.length;
      } catch (err) {
        console.error(`[WarmupOSM] ${citta} ${categoria} fallito:`, (err as Error).message);
      }

      // Piccola pausa per essere gentili con Overpass
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return NextResponse.json({
    success: true,
    citta_totali: TOP_CITTA.length,
    categorie_totali: CATEGORIE.length,
    queries_eseguite: results.length,
    risultati_totali: totaleTrovati,
    durata_ms: Date.now() - start,
    durata_min: Math.round((Date.now() - start) / 60000),
  });
}
