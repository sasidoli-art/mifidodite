import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CalcolatoreEtaClient } from "./CalcolatoreEtaClient";
import { Clock } from "lucide-react";

export const metadata = {
  title: "Eta del cane in anni umani 2026 — Calcolatore preciso | MifidoDiTe.eu",
  description: "Quanti anni umani ha il tuo cane? Calcolatore basato su studi scientifici UCSD 2019, con differenze per taglia. Scopri l'eta umana del tuo cane.",
  keywords: ["eta cane anni umani", "calcolatore eta cane", "anni umani cane", "quanti anni ha il mio cane"],
  alternates: { canonical: "https://www.mifidodite.eu/eta-cane" },
};

export default function EtaCanePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-background">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Clock size={16} /> Calcolatore eta
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Quanti anni umani ha <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">il tuo cane?</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Basato sulla formula aggiornata dell&apos;Universita di San Diego 2019, con differenziazione per taglia.
            </p>
          </div>
        </section>

        <CalcolatoreEtaClient />

        <section className="py-10 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              La vecchia regola &quot;1 anno cane = 7 anni umani&quot; e sbagliata. Usiamo la formula UCSD 2019 che tiene conto dell&apos;invecchiamento epigenetico e delle differenze per taglia.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
