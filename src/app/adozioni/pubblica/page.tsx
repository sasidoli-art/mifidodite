import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { PubblicaForm } from "./PubblicaForm";

export const metadata = {
  title: "Pubblica annuncio adozione — MifidoDiTe.eu",
  description: "Pubblica un annuncio gratuito per adottare, offrire o cercare un cane o un gatto.",
};

export default function PubblicaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Pubblica un annuncio
            </h1>
            <p className="text-muted-foreground mt-2">
              Gratis, semplice, verificato dal nostro team entro 24 ore.
            </p>
          </div>
          <PubblicaForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
