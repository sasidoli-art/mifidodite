import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

const AUTH_COOKIE = "mifidodite-session";

async function checkAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE);
  if (!session?.value) return false;
  try {
    const data = JSON.parse(Buffer.from(session.value, "base64").toString());
    return data.ruolo === "admin";
  } catch {
    return false;
  }
}

// POST — azioni bulk su tutte le bozze
export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await request.json();
  const action = body.action as "approva-tutte" | "rifiuta-tutte";

  const sql = getDB();

  if (action === "approva-tutte") {
    const result = await sql`UPDATE articoli SET pubblicato = true, updated_at = NOW() WHERE pubblicato = false RETURNING id`;
    return NextResponse.json({ success: true, modificati: result.length, message: `${result.length} articoli pubblicati` });
  }

  if (action === "rifiuta-tutte") {
    const result = await sql`DELETE FROM articoli WHERE pubblicato = false RETURNING id`;
    return NextResponse.json({ success: true, modificati: result.length, message: `${result.length} bozze cancellate` });
  }

  return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
}
