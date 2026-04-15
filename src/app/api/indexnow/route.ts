// IndexNow API endpoint
// Notifica Bing/Yandex/altri search engine quando una pagina cambia.
// POST { urls: string[] } -> ping IndexNow con le URL fornite.
// Auth: header X-Cron-Secret per evitare abusi.

import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "";
const HOST = "www.mifidodite.eu";

export async function POST(request: NextRequest) {
  const cronSecret = request.headers.get("x-cron-secret");
  if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const body = await request.json();
  const urls: string[] = body.urls || [];

  if (urls.length === 0) {
    return NextResponse.json({ error: "no urls provided" }, { status: 400 });
  }

  // IndexNow accetta fino a 10000 URL per richiesta
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000),
  };

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submitted: urls.length,
    });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "fetch failed",
    }, { status: 500 });
  }
}
