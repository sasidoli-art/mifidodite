import { NextRequest, NextResponse } from "next/server";
import { searchOSMByCity, type OSMPlace } from "@/lib/openstreetmap";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Cache in-memory delle ricerche OSM (chiave: categoria|citta)
// TTL 24h — i dati OSM cambiano lentamente
const cache = new Map<string, { data: { places: OSMPlace[]; cityInfo: { lat: number; lon: number; nome: string } | null }; expiresAt: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 ore

// GET /api/osm?categoria=veterinario&citta=Milano
// Restituisce attivita pet da OpenStreetMap (legale, ODbL)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria") || "";
  const citta = searchParams.get("citta") || "";
  const limit = Number(searchParams.get("limit") || "30");

  if (!categoria || !citta) {
    return NextResponse.json(
      { error: "Parametri richiesti: categoria e citta" },
      { status: 400 }
    );
  }

  const cacheKey = `${categoria}|${citta.toLowerCase().trim()}|${limit}`;
  const cached = cache.get(cacheKey);
  const now = Date.now();

  let result: { places: OSMPlace[]; cityInfo: { lat: number; lon: number; nome: string } | null };

  if (cached && cached.expiresAt > now) {
    result = cached.data;
  } else {
    result = await searchOSMByCity(categoria, citta, limit);
    cache.set(cacheKey, { data: result, expiresAt: now + CACHE_TTL });

    // Cleanup vecchie cache (max 500 entries)
    if (cache.size > 500) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) cache.delete(oldestKey);
    }
  }

  // Cache CDN aggressiva 24h (compatibile con ODbL)
  return NextResponse.json(
    {
      success: true,
      categoria,
      citta: result.cityInfo?.nome || citta,
      totale: result.places.length,
      places: result.places,
      cached: cached && cached.expiresAt > now ? true : false,
      attribution: "Dati © OpenStreetMap contributors, licenza ODbL",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
      },
    }
  );
}
