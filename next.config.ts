import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.sbito.it",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
    ],
  },
  async redirects() {
    return [
      // Migrazione /dormire -> /vacanze (13 Apr 2026)
      { source: "/dormire", destination: "/vacanze", permanent: true },
      { source: "/dormire/:path*", destination: "/vacanze/:path*", permanent: true },
      // Vecchio slug articolo hub -> nuovo
      {
        source: "/magazine/dormire-con-il-cane-italia-2026-guida",
        destination: "/magazine/vacanze-con-il-cane-italia-2026-guida",
        permanent: true,
      },
      // Pagine commerciali dismesse (22 giugno 2026) — sito ora 100% gratuito
      { source: "/per-professionisti", destination: "/", permanent: true },
      { source: "/partner", destination: "/", permanent: true },
      { source: "/registra-attivita", destination: "/", permanent: true },
      { source: "/offerte", destination: "/magazine", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Escludi sitemap.xml e robots.txt: GSC rifiuta le sitemap che servono
        // X-Robots-Tag, interpretandolo come "non processare questa risorsa".
        source: "/((?!sitemap\\.xml|robots\\.txt).*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            // Anti-copia: disabilita Google Cache + traduzioni automatiche
            // mantenendo l'indicizzazione normale (no noindex)
            key: "X-Robots-Tag",
            value: "noarchive, notranslate, max-image-preview:large",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
