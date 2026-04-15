import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CalcolatoreRazioniClient } from "./CalcolatoreRazioniClient";
import { Utensils } from "lucide-react";

export const metadata = {
  title: "Quanto cibo dare al cane? Calcolatore razioni giornaliere 2026 — MifidoDiTe.eu",
  description: "Calcolatore gratuito delle razioni di cibo per il tuo cane: in base a peso, eta, attivita e tipo di cibo. Dosi giornaliere personalizzate e consigli.",
  keywords: ["quanto cibo dare al cane", "razioni cane", "calcolatore crocchette", "dosi cibo cane", "quanto mangia un cane"],
  alternates: { canonical: "https://www.mifidodite.eu/razioni-cane" },
};

export default function RazioniCanePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-background">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Utensils size={16} /> Calcolatore razioni
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Quanto cibo dare al <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">tuo cane?</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Calcola la razione giornaliera corretta in base a peso, eta, attivita e tipo di alimentazione.
            </p>
          </div>
        </section>

        <CalcolatoreRazioniClient />

        <section className="py-10 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Le razioni calcolate sono indicative. Per cani con patologie, cuccioli, femmine in gravidanza o condizioni speciali, consulta sempre il tuo veterinario.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
