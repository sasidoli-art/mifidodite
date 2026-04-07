import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sql = getDB();

  // Recupera offerta
  const rows = await sql`SELECT id, link_acquisto, affiliate_source, asin FROM offerte WHERE id = ${id} LIMIT 1`;
  if (rows.length === 0 || !rows[0].link_acquisto) {
    return NextResponse.redirect(new URL("/offerte", request.url));
  }

  const offerta = rows[0];

  // Logga il click (non blocca se fallisce)
  try {
    const cap = request.nextUrl.searchParams.get("cap") || null;
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";

    await sql`
      INSERT INTO offerte_click (offerta_id, asin, affiliate_source, cap, user_agent, referer)
      VALUES (${id}, ${offerta.asin}, ${offerta.affiliate_source}, ${cap}, ${userAgent}, ${referer})
    `;

    await sql`UPDATE offerte SET click_count = COALESCE(click_count, 0) + 1 WHERE id = ${id}`;
  } catch (err) {
    console.error("[OfferteClick] log fallito:", err);
  }

  return NextResponse.redirect(offerta.link_acquisto as string, { status: 302 });
}
