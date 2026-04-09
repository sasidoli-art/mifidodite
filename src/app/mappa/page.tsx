import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { MappaClient } from "./MappaClient";

export const metadata = {
  title: "Mappa Pet — Trova professionisti, spiagge e cliniche vicino a te — MifidoDiTe.eu",
  description: "Mappa interattiva con pensioni, dog sitter, spiagge dog-friendly, cliniche H24 e professionisti pet in tutta Italia.",
};

export default function MappaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 flex flex-col">
        <MappaClient />
      </main>
    </>
  );
}
