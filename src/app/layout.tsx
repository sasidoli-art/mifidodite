import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { ChatBot } from "@/components/shared/ChatBot";
import { BackToTop } from "@/components/shared/BackToTop";
import { Analytics } from "@/components/shared/Analytics";

// Font v3: Bricolage Grotesque (headings, bold & impactful) + DM Sans (body, clean)
const heading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mifidodite.eu"),
  title: "MifidoDiTe.eu — Vacanze, spiagge e servizi per chi vive con animali",
  description:
    "Mappa spiagge e hotel pet-friendly, schede razza, sentieri, ristoranti, calcolatori: tutto per viaggiare e vivere con il tuo animale in Italia. 550+ pagine verificate.",
  keywords: [
    "spiagge dog friendly",
    "hotel pet friendly",
    "vacanze con il cane",
    "ristoranti pet friendly",
    "sentieri cani",
    "razze cani",
    "pensione cani",
    "dog sitter",
    "toelettatura",
    "veterinario",
    "animali domestici",
    "Italia",
  ],
  alternates: {
    canonical: "https://www.mifidodite.eu",
    languages: { "it-IT": "https://www.mifidodite.eu", "x-default": "https://www.mifidodite.eu" },
  },
  openGraph: {
    title: "MifidoDiTe.eu — Portale pet-friendly italiano",
    description:
      "Spiagge, hotel, ristoranti e sentieri dove il tuo animale e il benvenuto. Schede razza, calcolatori, mappe interattive.",
    url: "https://www.mifidodite.eu",
    siteName: "MifidoDiTe.eu",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "MifidoDiTe.eu — Portale pet-friendly italiano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MifidoDiTe.eu — Portale pet-friendly italiano",
    description: "Spiagge, hotel, ristoranti e sentieri dove il tuo animale e il benvenuto.",
    images: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <head>
        {/* DNS prefetch + preconnect per domini esterni critici */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://a.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://b.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://c.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://d.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://overpass-api.de" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "MifidoDiTe.eu",
                alternateName: "Mi Fido di Te",
                url: "https://www.mifidodite.eu",
                description: "Il portale italiano per trovare spiagge dog-friendly, hotel pet-friendly, professionisti e guide per chi ama viaggiare e vivere con il proprio animale.",
                inLanguage: "it-IT",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://www.mifidodite.eu/professionisti?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "MifidoDiTe.eu",
                url: "https://www.mifidodite.eu",
                logo: "https://www.mifidodite.eu/icon",
                description: "Il portale italiano per chi ama viaggiare e vivere con il proprio animale. Spiagge dog-friendly, hotel pet-friendly, professionisti e guide.",
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
        <ChatBot />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
