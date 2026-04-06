import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const AUTH_COOKIE = "mifidodite-session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE);

  if (!session?.value) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const data = JSON.parse(Buffer.from(session.value, "base64").toString());
    return NextResponse.json({
      user: {
        id: data.userId,
        email: data.email,
        nome: data.nome,
        ruolo: data.ruolo,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
