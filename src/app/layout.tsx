import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { ChatBot } from "@/components/shared/ChatBot";
import { BackToTop } from "@/components/shared/BackToTop";

const GA_ID = "G-WTEF9GDNNN";

function CookieBannerWrapper() {
  return <CookieBanner />;
}

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
  title: "MifidoDiTe.eu — Il magazine pet d'Italia",
  description:
    "Magazine, guide, consigli, offerte e servizi per cani e gatti. Tutto quello che ti serve per il tuo amico a 4 zampe in un unico portale.",
  keywords: [
    "pensione cani",
    "dog sitter",
    "spiaggia cani",
    "toelettatura",
    "pet sitter",
    "educatore cinofilo",
    "veterinario",
    "animali domestici",
    "Italia",
  ],
  openGraph: {
    title: "MifidoDiTe.eu — Mi fido di te",
    description:
      "Trova pensioni, dog sitter, spiagge pet-friendly e professionisti del mondo animale vicino a te.",
    type: "website",
    locale: "it_IT",
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
        <CookieBannerWrapper />
        <ChatBot />
        <BackToTop />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
