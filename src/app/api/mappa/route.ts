import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { MAP_PINS } from "@/lib/mappa-data";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT id, nome, slug, categoria, comune, provincia, latitudine, longitudine, rating_medio, numero_recensioni, descrizione FROM strutture WHERE attivo = true AND latitudine IS NOT NULL AND longitudine IS NOT NULL LIMIT 200`;
      if (rows.length > 0) {
        return NextResponse.json(rows.map((r) => ({
          id: r.id,
          nome: r.nome,
          slug: r.slug,
          categoria: r.categoria,
          comune: r.comune,
          provincia: r.provincia,
          lat: Number(r.latitudine),
          lng: Number(r.longitudine),
          rating: Number(r.rating_medio) || 0,
          recensioni: Number(r.numero_recensioni) || 0,
          descrizione: r.descrizione || "",
          tipo: "professionista",
        })));
      }
    } catch {}
  }
  // Fallback seed
  return NextResponse.json(MAP_PINS);
}
