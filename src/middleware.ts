import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// IP autorizzati per l'admin (aggiungi il tuo IP qui o via env)
// Lascia vuoto per disabilitare il filtro IP
function getAllowedIPs(): string[] {
  const ips = process.env.ADMIN_ALLOWED_IPS || "";
  if (!ips) return []; // Nessun filtro IP — solo login
  return ips.split(",").map((ip) => ip.trim()).filter(Boolean);
}

export function middleware(request: NextRequest) {
  // Proteggi /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 1. Filtro IP (se configurato)
    const allowedIPs = getAllowedIPs();
    if (allowedIPs.length > 0) {
      const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || request.headers.get("x-real-ip")
        || "";

      if (!allowedIPs.includes(clientIP)) {
        return new NextResponse("Accesso negato", { status: 403 });
      }
    }

    // 2. Verifica sessione
    const session = request.cookies.get("mifidodite-admin-session");

    if (!session?.value || session.value.length !== 64 || !/^[a-f0-9]+$/.test(session.value)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin-login";
      return NextResponse.redirect(url);
    }
  }

  // Proteggi /admin-login con lo stesso filtro IP
  if (request.nextUrl.pathname === "/admin-login") {
    const allowedIPs = getAllowedIPs();
    if (allowedIPs.length > 0) {
      const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || request.headers.get("x-real-ip")
        || "";

      if (!allowedIPs.includes(clientIP)) {
        return new NextResponse("Accesso negato", { status: 403 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
