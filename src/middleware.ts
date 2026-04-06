import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getAllowedIPs(): string[] {
  const ips = process.env.ADMIN_ALLOWED_IPS || "";
  if (!ips) return [];
  return ips.split(",").map((ip) => ip.trim()).filter(Boolean);
}

function checkIP(request: NextRequest): boolean {
  const allowedIPs = getAllowedIPs();
  if (allowedIPs.length === 0) return true; // Nessun filtro configurato
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

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // /admin-login — filtro IP
  if (path === "/admin-login") {
    if (!checkIP(request)) {
      return new NextResponse("Accesso negato", { status: 403 });
    }
    return NextResponse.next();
  }

  // /admin/* — filtro IP + sessione admin
  if (path.startsWith("/admin")) {
    if (!checkIP(request)) {
      return new NextResponse("Accesso negato", { status: 403 });
    }

    const user = getSessionUser(request);
    if (!user || user.ruolo !== "admin") {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
