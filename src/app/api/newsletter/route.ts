import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncContact } from "@/lib/brevo";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const { allowed } = rateLimit(getClientIP(request), 3, 60000); // max 3 iscrizioni/minuto
  if (!allowed) return NextResponse.json({ error: "Troppe richieste. Riprova tra un minuto." }, { status: 429 });
  const body = await request.json();
  const { email, cap, nome, tipo_animale, categorie_interesse } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Email non valida" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.from("newsletter_iscritti").upsert(
    {
      email: email.toLowerCase().trim(),
      cap: cap || null,
      nome: nome || null,
      tipo_animale: tipo_animale || "cane",
      categorie_interesse: categorie_interesse || [],
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Errore durante l'iscrizione. Riprova." },
      { status: 500 }
    );
  }

  // Sync con Brevo (non blocca la risposta)
  syncContact({
    email: email.toLowerCase().trim(),
    nome: nome || undefined,
    cap: cap || undefined,
    tipo_animale: tipo_animale || "cane",
  }).catch((err) => console.error("Brevo sync error:", err));

  return NextResponse.json({ success: true });
}
