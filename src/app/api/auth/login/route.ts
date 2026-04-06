import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { compareSync } from "bcryptjs";
import { randomBytes, createHash } from "crypto";
import { getDB } from "@/lib/db";

const AUTH_COOKIE = "mifidodite-session";

function generateSessionToken(secret: string): string {
  const random = randomBytes(32).toString("hex");
  return createHash("sha256").update(random + secret + Date.now()).digest("hex");
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email e password richiesti" }, { status: 400 });
  }

  const sql = getDB();

  const users = await sql`
    SELECT id, email, password_hash, nome, ruolo, attivo
    FROM utenti WHERE email = ${email.toLowerCase().trim()} LIMIT 1
  `;

  if (users.length === 0 || !compareSync(password, users[0].password_hash)) {
    await new Promise((r) => setTimeout(r, 1500)); // anti brute-force
    return NextResponse.json({ error: "Email o password non corretti" }, { status: 401 });
  }

  const user = users[0];

  if (!user.attivo) {
    return NextResponse.json({ error: "Account disattivato. Contatta il supporto." }, { status: 403 });
  }

  // Aggiorna ultimo login
  await sql`UPDATE utenti SET ultimo_login = NOW() WHERE id = ${user.id}`;

  // Genera token sessione
  const secret = process.env.CRON_SECRET || "mifidodite-secret";
  const token = generateSessionToken(secret);

  // Salva token nel cookie — contiene anche user info codificato
  const sessionData = JSON.stringify({
    token,
    userId: user.id,
    email: user.email,
    nome: user.nome,
    ruolo: user.ruolo,
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, Buffer.from(sessionData).toString("base64"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 giorni
    path: "/",
  });

  return NextResponse.json({
    success: true,
    user: { id: user.id, email: user.email, nome: user.nome, ruolo: user.ruolo },
  });
}

// Logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return NextResponse.json({ success: true });
}
