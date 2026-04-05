import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    return NextResponse.json({
      status: "ERRORE",
      motivo: "DATABASE_URL non presente nelle environment variables",
      env_keys: Object.keys(process.env).filter(k => k.includes("DATABASE") || k.includes("NEON") || k.includes("NEXT_PUBLIC")),
    });
  }

  try {
    const sql = neon(dbUrl);
    const version = await sql`SELECT version()`;
    const strutture = await sql`SELECT COUNT(*) as n FROM strutture`;
    const articoli = await sql`SELECT COUNT(*) as n FROM articoli`;
    const eventi = await sql`SELECT COUNT(*) as n FROM eventi`;

    return NextResponse.json({
      status: "OK",
      db_url_prefix: dbUrl.slice(0, 30) + "...",
      postgres_version: version[0].version.slice(0, 40),
      strutture: strutture[0].n,
      articoli: articoli[0].n,
      eventi: eventi[0].n,
    });
  } catch (err) {
    return NextResponse.json({
      status: "ERRORE_CONNESSIONE",
      db_url_prefix: dbUrl.slice(0, 30) + "...",
      errore: String(err),
    });
  }
}
