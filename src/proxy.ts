import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";

// ============================================================
// Admin auth (invariato rispetto al vecchio middleware)
// ============================================================
function getAllowedIPs(): string[] {
  const ips = process.env.ADMIN_ALLOWED_IPS || "";
  if (!ips) return [];
  return ips.split(",").map((ip) => ip.trim()).filter(Boolean);
}

function checkIP(request: NextRequest): boolean {
  const allowedIPs = getAllowedIPs();
  if (allowedIPs.length === 0) return true;
  const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "";
  return allowedIPs.includes(clientIP);
}

function getSessionUser(request: NextRequest): { userId: number; ruolo: string } | null {
  const session = request.cookies.get("mifidodite-session");
  if (!session?.value) return null;
  try {
    const data = JSON.parse(Buffer.from(session.value, "base64").toString());
    if (data.userId && data.ruolo) return { userId: data.userId, ruolo: data.ruolo };
  } catch { /* invalid */ }
  return null;
}

// ============================================================
// Magazine redirect cache (TTL 5 min, per-isolate)
// ============================================================
type RedirectInfo = { redirect_to_slug: string | null; redirect_reason: string | null };
const CACHE_TTL_MS = 5 * 60 * 1000;
const redirectCache = new Map<string, { value: RedirectInfo | null; expiresAt: number }>();

async function loadRedirect(slug: string): Promise<RedirectInfo | null> {
  const cached = redirectCache.get(slug);
  const now = Date.now();
  if (cached && cached.expiresAt > now) return cached.value;

  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const sql = neon(url);
  const rows = await sql`
    SELECT redirect_to_slug, redirect_reason
    FROM articoli
    WHERE slug = ${slug}
    LIMIT 1
  `;
  const value: RedirectInfo | null = rows[0]
    ? {
        redirect_to_slug: rows[0].redirect_to_slug ?? null,
        redirect_reason: rows[0].redirect_reason ?? null,
      }
    : null;
  redirectCache.set(slug, { value, expiresAt: now + CACHE_TTL_MS });
  return value;
}

async function handleMagazine(request: NextRequest, slug: string): Promise<NextResponse | null> {
  let info: RedirectInfo | null = null;
  try {
    info = await loadRedirect(slug);
  } catch (err) {
    console.error(`[proxy] redirect lookup failed for ${slug}:`, err);
    return null;
  }
  if (!info) return null;

  if (info.redirect_reason === "deleted_410") {
    return new NextResponse("Gone", { status: 410 });
  }
  if (info.redirect_to_slug) {
    const dest = new URL(`/magazine/${info.redirect_to_slug}`, request.url);
    dest.search = request.nextUrl.search;
    return NextResponse.redirect(dest, 301);
  }
  return null;
}

// ============================================================
// Proxy (ex middleware)
// ============================================================
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin-login") {
    if (!checkIP(request)) return new NextResponse("Accesso negato", { status: 403 });
    return NextResponse.next();
  }

  if (path.startsWith("/admin")) {
    if (!checkIP(request)) return new NextResponse("Accesso negato", { status: 403 });
    const user = getSessionUser(request);
    if (!user || user.ruolo !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
    return NextResponse.next();
  }

  const magazineMatch = path.match(/^\/magazine\/([^/]+)\/?$/);
  if (magazineMatch) {
    const slug = decodeURIComponent(magazineMatch[1]);
    const res = await handleMagazine(request, slug);
    if (res) return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login", "/magazine/:slug"],
};
