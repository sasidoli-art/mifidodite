import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getDB } from "@/lib/db";
import { sendResetPassword } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email richiesta" }, { status: 400 });
  }

  const sql = getDB();

  // Cerca utente (non rivelare se esiste o no per sicurezza)
  const users = await sql`SELECT id, email, nome FROM utenti WHERE email = ${email.toLowerCase().trim()} AND attivo = true LIMIT 1`;

  if (users.length > 0) {
    const user = users[0];
    const token = randomBytes(32).toString("hex");
    const scadenza = new Date(Date.now() + 60 * 60 * 1000); // 1 ora

    // Salva token nel DB
    await sql`
      UPDATE utenti
      SET reset_token = ${token}, reset_token_scade = ${scadenza.toISOString()}, updated_at = NOW()
      WHERE id = ${user.id}
    `;

    // Invia email
    try {
      await sendResetPassword(user.email, token);
    } catch (err) {
      console.error("[Auth] Email reset non inviata:", err);
    }
  }

  // Risposta uguale sia che l'email esista o no (anti-enumeration)
  return NextResponse.json({
    success: true,
    message: "Se l'email e registrata, riceverai un link per reimpostare la password.",
  });
}
