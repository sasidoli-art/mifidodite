import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  DM_Sans,
  Outfit,
  Poppins,
} from "next/font/google";
import "./globals.css";

// ========================================
// FONT SWITCHER — cambia qui per provare
// Decommentane UNO e commenta gli altri
// ========================================

// Opzione 1: Plus Jakarta Sans (DEFAULT) — moderno, caldo, professionale
const mainFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Opzione 2: Inter — pulito, tecnico, universale
// const mainFont = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
// });

// Opzione 3: DM Sans — amichevole, geometrico
// const mainFont = DM_Sans({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// Opzione 4: Outfit — contemporaneo, arioso
// const mainFont = Outfit({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
// });

// Opzione 5: Poppins — arrotondato, friendly
// const mainFont = Poppins({
//   variable: "--font-sans",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
// });

export const metadata: Metadata = {
  title: "MifidoDiTe.eu — Trova chi si prende cura del tuo amico a 4 zampe",
  description:
    "Il portale italiano per trovare pensioni, spiagge dog-friendly, dog sitter, toelettatori e professionisti pet vicino a te. Mi fido di te!",
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
    <html lang="it" className={`${mainFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
