import { NextRequest, NextResponse } from "next/server";
import { searchOSMByCity } from "@/lib/openstreetmap";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 30;

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

  const { places, cityInfo } = await searchOSMByCity(categoria, citta, limit);

  // Cache lato client/CDN per 1 ora (compatibile con licenza ODbL)
  return NextResponse.json(
    {
      success: true,
      categoria,
      citta: cityInfo?.nome || citta,
      totale: places.length,
      places,
      attribution: "Dati © OpenStreetMap contributors, licenza ODbL",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
