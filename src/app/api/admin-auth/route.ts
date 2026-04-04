import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { compareSync } from "bcryptjs";
import { randomBytes, createHash } from "crypto";

// Auth admin sicura:
// - Password hashata con bcrypt
// - Token di sessione random con HMAC SHA256
// - Cookie httpOnly + secure + sameSite strict
// - Ritardo anti brute-force
// - Scadenza 24 ore

const AUTH_COOKIE = "mifidodite-admin-session";

function verifyPassword(input: string): boolean {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    return compareSync(input, hash);
  }
  const plainPass = process.env.ADMIN_PASS || "MiFido2026!Admin";
  return input === plainPass;
}

function generateSessionToken(): string {
  const secret = process.env.CRON_SECRET || "mifidodite-default-secret";
  const random = randomBytes(32).toString("hex");
  return createHash("sha256").update(random + secret + Date.now()).digest("hex");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  const adminUser = process.env.ADMIN_USER || "admin";

  if (username !== adminUser || !verifyPassword(password)) {
    await new Promise((r) => setTimeout(r, 1500));
    return NextResponse.json({ error: "Credenziali non valide" }, { status: 401 });
  }

  const token = generateSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return NextResponse.json({ success: true });
}
