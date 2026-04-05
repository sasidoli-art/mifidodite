import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { SOS_SEED } from "@/lib/sos-seed";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT * FROM sos_smarriti ORDER BY created_at DESC LIMIT 20`;
      if (rows.length > 0) return NextResponse.json(rows);
    } catch (err) {
      console.error("SOS DB error:", err);
    }
  }
  return NextResponse.json(SOS_SEED);
}
