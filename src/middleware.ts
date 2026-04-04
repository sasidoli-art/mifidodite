import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getAllowedIPs(): string[] {
  const ips = process.env.ADMIN_ALLOWED_IPS || "";
  if (!ips) return [];
  return ips.split(",").map((ip) => ip.trim()).filter(Boolean);
}

function checkIP(request: NextRequest): boolean {
  const allowedIPs = getAllowedIPs();
  if (allowedIPs.length === 0) return true; // Nessun filtro
  const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "";
  return allowedIPs.includes(clientIP);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // /admin-login — solo filtro IP, niente redirect
  if (path === "/admin-login") {
    if (!checkIP(request)) {
      return new NextResponse("Accesso negato", { status: 403 });
    }
    return NextResponse.next();
  }

  // /admin/* — filtro IP + verifica sessione
  if (path.startsWith("/admin")) {
    if (!checkIP(request)) {
      return new NextResponse("Accesso negato", { status: 403 });
    }

    const session = request.cookies.get("mifidodite-admin-session");
    if (!session?.value || session.value.length !== 64 || !/^[a-f0-9]+$/.test(session.value)) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
