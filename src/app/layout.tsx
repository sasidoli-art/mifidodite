import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
