import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcryptjs";
import { getDB } from "@/lib/db";
import { sendConfermaRegistrazione } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { email, password, nome, telefono, codiceInvito } = await request.json();

  if (!email || !password || !nome) {
    return NextResponse.json({ error: "Email, password e nome sono richiesti" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "La password deve avere almeno 8 caratteri" }, { status: 400 });
  }

  // Verifica codice invito
  const codiciValidi = ["VIP-ADMIN", "VIP-TESTER", "BENVENUTO", "LANCIO", "FIERA2026"];
  if (!codiceInvito || !codiciValidi.includes(codiceInvito.toUpperCase().trim())) {
    return NextResponse.json({ error: "Codice invito non valido" }, { status: 400 });
  }

  const sql = getDB();

  // Controlla se email gia registrata
  const existing = await sql`SELECT id FROM utenti WHERE email = ${email.toLowerCase().trim()}`;
  if (existing.length > 0) {
    return NextResponse.json({ error: "Questa email e gia registrata. Prova ad accedere." }, { status: 409 });
  }

  // Crea utente
  const passwordHash = hashSync(password, 12);
  const result = await sql`
    INSERT INTO utenti (email, password_hash, nome, telefono, ruolo, attivo, verificato)
    VALUES (${email.toLowerCase().trim()}, ${passwordHash}, ${nome.trim()}, ${telefono || null}, 'professionista', true, false)
    RETURNING id, email, nome
  `;

  // Invia email di conferma (non blocca la registrazione se fallisce)
  try {
    await sendConfermaRegistrazione(email, nome);
  } catch {
    console.error("[Auth] Email conferma non inviata per:", email);
  }

  return NextResponse.json({
    success: true,
    user: { id: result[0].id, email: result[0].email, nome: result[0].nome },
  });
}
