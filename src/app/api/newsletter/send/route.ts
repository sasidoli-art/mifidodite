import { NextRequest, NextResponse } from "next/server";

// Deprecato — usa /api/cron/send-newsletter
export async function POST(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mifidodite.eu";
  const secret = process.env.CRON_SECRET || "";

  const res = await fetch(`${baseUrl}/api/cron/send-newsletter`, {
    headers: { Authorization: `Bearer ${secret}` },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
