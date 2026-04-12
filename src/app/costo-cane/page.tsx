import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CalcolatoreClient } from "./CalcolatoreClient";
import { Calculator } from "lucide-react";

export const metadata = {
  title: "Quanto costa mantenere un cane? Calcolatore 2026 — MifidoDiTe.eu",
  description: "Scopri quanto costa davvero mantenere un cane in Italia. Calcolatore gratuito: cibo, veterinario, toelettatura, accessori. Personalizzato per taglia, citta e stile di vita.",
  keywords: ["quanto costa un cane", "costo mantenimento cane", "spese cane", "calcolatore costi cane", "budget cane"],
};

export default function CostoCanePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-background">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Calculator size={16} /> Calcolatore gratuito
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Quanto costa <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">mantenere un cane?</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Calcola il budget annuale per il tuo cane in base a taglia, citta e stile di vita.
            </p>
          </div>
        </section>

        <CalcolatoreClient />

        <section className="py-10 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Dati basati su medie italiane 2026 (fonti: ANMVI, listini Zooplus e Arcaplanet). Le stime possono variare in base al singolo animale, alle scelte del proprietario e alle condizioni di salute.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
