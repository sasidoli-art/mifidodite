import { NextRequest, NextResponse } from "next/server";

// Verifica autenticazione per endpoint cron
// Vercel invia automaticamente Authorization: Bearer <CRON_SECRET>
// In sviluppo locale, passa senza auth

export function verifyCron(request: NextRequest): NextResponse | null {
  // In sviluppo locale, salta la verifica
  if (process.env.NODE_ENV === "development") return null;

  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET non configurato" }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  return null; // Auth ok
}
