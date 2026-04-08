import { NextRequest, NextResponse } from "next/server";
import { chatWithMiFido, logChatMessage, type ChatMessage } from "@/lib/chatbot";
import { rateLimit, getClientIP } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface ChatRequestBody {
  sessionId: string;
  messages: ChatMessage[];
  pageUrl?: string;
}

export async function POST(request: NextRequest) {
  // Rate limit: max 20 messaggi/minuto per IP (anti-spam)
  const { allowed } = rateLimit(getClientIP(request), 20, 60000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Hai inviato troppi messaggi. Attendi un minuto." },
      { status: 429 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 });
  }

  const { sessionId, messages, pageUrl } = body;

  if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "sessionId e messages sono richiesti" }, { status: 400 });
  }

  // Trova l'ultimo messaggio utente
  const lastUserMessage = messages.filter((m) => m.role === "user").pop();
  if (!lastUserMessage?.content) {
    return NextResponse.json({ error: "Messaggio utente mancante" }, { status: 400 });
  }

  // Validazione lunghezza
  if (lastUserMessage.content.length > 2000) {
    return NextResponse.json({ error: "Messaggio troppo lungo (max 2000 caratteri)" }, { status: 400 });
  }

  try {
    const { reply, model, ms } = await chatWithMiFido(messages);

    // Logga la conversazione (non blocca la risposta)
    logChatMessage({
      sessionId,
      userMessage: lastUserMessage.content,
      botResponse: reply,
      pageUrl,
      responseMs: ms,
      model,
    }).catch((err) => console.error("[Chat] log async fallito:", err));

    return NextResponse.json({
      reply,
      model,
      ms,
    });
  } catch (err) {
    console.error("[Chat] errore:", err);
    return NextResponse.json(
      {
        error: "Mi dispiace, ho avuto un problema. Riprova tra qualche secondo.",
        details: process.env.NODE_ENV === "development" ? String(err) : undefined,
      },
      { status: 500 }
    );
  }
}
