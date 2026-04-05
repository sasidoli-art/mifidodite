import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { ADOZIONI_SEED } from "@/lib/adozioni-seed";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo") || "";

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      let rows;
      if (tipo) {
        rows = await sql`SELECT * FROM annunci_adozioni WHERE approvato = true AND stato = 'attivo' AND tipo = ${tipo} ORDER BY created_at DESC LIMIT 30`;
      } else {
        rows = await sql`SELECT * FROM annunci_adozioni WHERE approvato = true AND stato = 'attivo' ORDER BY created_at DESC LIMIT 30`;
      }
      if (rows.length > 0) return NextResponse.json(rows);
    } catch (err) {
      console.error("Adozioni DB error:", err);
    }
  }

  // Fallback seed
  let data = ADOZIONI_SEED;
  if (tipo) data = data.filter((a) => a.tipo === tipo);
  return NextResponse.json(data);
}
