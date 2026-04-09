import { Suspense } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SearchPage } from "./SearchPage";

export const metadata = {
  title: "Cerca professionisti pet vicino a te — MifidoDiTe.it",
  description:
    "Trova pensioni, dog sitter, toelettatori, educatori cinofili e veterinari vicino a te. Ricerca per CAP con raggio km.",
};

export default function ProfessionistiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-background">
        <Suspense>
          <SearchPage />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
