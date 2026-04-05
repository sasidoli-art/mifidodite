import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email richiesta" }, { status: 400 });
  }

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await sql`UPDATE newsletter_iscritti SET attivo = false, unsubscribed_at = NOW() WHERE email = ${email.toLowerCase().trim()}`;
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Unsubscribe error:", err);
    }
  }

  return NextResponse.json({ success: true });
}
