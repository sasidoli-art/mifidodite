import { NextResponse } from "next/server";
import { postToInstagram } from "@/lib/buffer";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const env_check = {
    BUFFER_API_KEY: process.env.BUFFER_API_KEY ? `${process.env.BUFFER_API_KEY.slice(0, 8)}...` : null,
    BUFFER_ORG_ID: process.env.BUFFER_ORG_ID || null,
    BUFFER_CHANNEL_INSTAGRAM: process.env.BUFFER_CHANNEL_INSTAGRAM || null,
  };

  // Prova un post reale di test
  let result: unknown = null;
  let error: string | null = null;
  if (process.env.BUFFER_API_KEY && process.env.BUFFER_CHANNEL_INSTAGRAM) {
    try {
      const post = await postToInstagram(
        "Test diagnostico MifidoDiTe.eu — verifica integrazione API.\n\n#MiFidoDiTe #Test",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1080&q=80"
      );
      result = post;
    } catch (err) {
      error = (err as Error).message;
    }
  }

  return NextResponse.json({
    env_check,
    result,
    error,
  });
}
