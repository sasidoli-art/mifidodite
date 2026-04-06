import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(getClientIP(request), 3, 60000);
  if (!allowed) return NextResponse.json({ error: "Troppe richieste. Riprova tra un minuto." }, { status: 429 });

  const body = await request.json();
  const { email, cap, nome, tipo_animale, nome_animale } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email non valida" }, { status: 400 });
  }

  const emailClean = email.toLowerCase().trim();

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const existing = await sql`SELECT id FROM newsletter_iscritti WHERE email = ${emailClean} LIMIT 1`;

      if (existing.length > 0) {
        await sql`UPDATE newsletter_iscritti SET cap = ${cap || null}, nome = ${nome || nome_animale || null}, tipo_animale = ${tipo_animale || 'cane'} WHERE email = ${emailClean}`;
      } else {
        await sql`INSERT INTO newsletter_iscritti (email, cap, nome, tipo_animale, attivo) VALUES (${emailClean}, ${cap || null}, ${nome || nome_animale || null}, ${tipo_animale || 'cane'}, ${true})`;
      }
    } catch (err) {
      console.error("Newsletter DB error:", err);
      return NextResponse.json({ error: "Errore durante l'iscrizione. Riprova." }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
