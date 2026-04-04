import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

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
    <html lang="it" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
