import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MifidoDiTe — Il progetto e in pausa",
  description:
    "MifidoDiTe e temporaneamente sospeso. Stiamo ripensando il modo in cui raccontiamo l'Italia pet-friendly.",
  openGraph: {
    title: "MifidoDiTe — Il progetto e in pausa",
    description:
      "Il sito e temporaneamente sospeso. Stiamo lavorando a qualcosa di piu selettivo.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
