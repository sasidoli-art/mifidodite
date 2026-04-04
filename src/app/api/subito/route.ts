import { NextResponse } from "next/server";
import { fetchAllSubitoAdozioni } from "@/lib/subito-scraper";

// GET /api/subito — restituisce annunci freschi da Subito.it
// Chiamato dal client per popolare la sezione "Da Subito.it"

export async function GET() {
  const annunci = await fetchAllSubitoAdozioni();

  // Cache 30 minuti per non bombardare Subito
  return NextResponse.json(annunci, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
