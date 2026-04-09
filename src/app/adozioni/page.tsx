import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { AdozioniContent } from "./AdozioniContent";

export const metadata = {
  title: "Adozioni — Adotta, Offri o Cerca un animale — MifidoDiTe.eu",
  description: "Annunci di adozione per cani e gatti in Italia. Adotta da un rifugio, offri una nuova casa al tuo animale, o cerca il compagno perfetto.",
};

export default function AdozioniPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <AdozioniContent />
      </main>
      <Footer />
    </>
  );
}
