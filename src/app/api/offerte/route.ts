import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { OFFERTE_SEED } from "@/lib/offerte-seed";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT * FROM offerte WHERE attivo = true ORDER BY created_at DESC`;
      if (rows.length > 0) {
        return NextResponse.json(rows.map((r) => ({
          id: r.id,
          nome_negozio: r.nome_negozio,
          comune: r.comune,
          provincia: r.provincia,
          titolo: r.titolo,
          slug: r.slug,
          descrizione: r.descrizione,
          prezzo_originale: r.prezzo_originale,
          prezzo_scontato: r.prezzo_scontato,
          sconto_percentuale: Number(r.sconto_percentuale) || 0,
          categoria_prodotto: r.categoria_prodotto,
          marca: r.marca,
          img: r.img || "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&q=80",
          valido_dal: r.valido_dal,
          valido_al: r.valido_al,
        })));
      }
    } catch (err) {
      console.error("Offerte DB error:", err);
    }
  }
  return NextResponse.json(OFFERTE_SEED);
}
