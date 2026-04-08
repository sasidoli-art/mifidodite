import type { Metadata } from "next";
import Script from "next/script";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { ChatBot } from "@/components/shared/ChatBot";

const GA_ID = "G-WTEF9GDNNN";

function CookieBannerWrapper() {
  return <CookieBanner />;
}

// Font consigliati da UI/UX Pro Max skill
// Riga 6: Playful Creative — "Rounded, friendly fonts perfect for playful UIs"
// Fredoka per heading (playful, arrotondato)
// Nunito per body (friendly, leggibile)

const heading = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MifidoDiTe.eu",
              alternateName: "Mi Fido di Te",
              url: "https://www.mifidodite.eu",
              description: "Il portale italiano per trovare pensioni, spiagge dog-friendly, dog sitter, toelettatori e professionisti pet vicino a te.",
              inLanguage: "it-IT",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.mifidodite.eu/professionisti?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBannerWrapper />
        <ChatBot />

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
