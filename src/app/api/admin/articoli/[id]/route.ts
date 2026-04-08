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

// PATCH — approva o rifiuta un articolo
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const action = body.action as "approva" | "rifiuta";

  const sql = getDB();

  if (action === "approva") {
    await sql`UPDATE articoli SET pubblicato = true, updated_at = NOW() WHERE id = ${id}`;
    return NextResponse.json({ success: true, message: "Articolo pubblicato" });
  }

  if (action === "rifiuta") {
    await sql`DELETE FROM articoli WHERE id = ${id} AND pubblicato = false`;
    return NextResponse.json({ success: true, message: "Articolo rifiutato e cancellato" });
  }

  return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
}

// DELETE — cancella un articolo (anche se gia pubblicato)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDB();
  await sql`DELETE FROM articoli WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
