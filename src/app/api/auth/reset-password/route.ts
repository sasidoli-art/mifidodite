import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcryptjs";
import { getDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token e nuova password richiesti" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "La password deve avere almeno 8 caratteri" }, { status: 400 });
  }

  const sql = getDB();

  // Trova utente con token valido e non scaduto
  const users = await sql`
    SELECT id, email FROM utenti
    WHERE reset_token = ${token}
      AND reset_token_scade > NOW()
      AND attivo = true
    LIMIT 1
  `;

  if (users.length === 0) {
    return NextResponse.json({ error: "Link scaduto o non valido. Richiedi un nuovo reset." }, { status: 400 });
  }

  const user = users[0];
  const passwordHash = hashSync(password, 12);

  // Aggiorna password e cancella token
  await sql`
    UPDATE utenti
    SET password_hash = ${passwordHash}, reset_token = NULL, reset_token_scade = NULL, updated_at = NOW()
    WHERE id = ${user.id}
  `;

  return NextResponse.json({
    success: true,
    message: "Password aggiornata. Ora puoi accedere con la nuova password.",
  });
}
