import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CalcolatorePesoClient } from "./CalcolatorePesoClient";
import { Scale } from "lucide-react";
import { RAZZE } from "@/lib/razze-data";

export const metadata = {
  title: "Peso ideale del cane per razza 2026 — Calcolatore BCS | MifidoDiTe.eu",
  description: "Il tuo cane e sovrappeso? Calcolatore del peso ideale in base alla razza, con stima Body Condition Score e consigli personalizzati.",
  keywords: ["peso ideale cane", "cane in sovrappeso", "peso medio razza", "body condition score", "obesita cane"],
  alternates: { canonical: "https://www.mifidodite.eu/peso-ideale-cane" },
};

export default function PesoIdealeCanePage() {
  const razzeDisponibili = RAZZE.map((r) => ({
    slug: r.slug,
    nome: r.nome,
    pesoMin: r.pesoMinKg,
    pesoMax: r.pesoMaxKg,
  }));

  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-background">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Scale size={16} /> Calcolatore peso ideale
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Il tuo cane ha il <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">peso giusto?</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Scopri il peso ideale in base alla razza e se il tuo cane e sotto, ideale o sovrappeso.
            </p>
          </div>
        </section>

        <CalcolatorePesoClient razze={razzeDisponibili} />

        <section className="py-10 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Il peso ideale varia per singolo cane: per una diagnosi completa consulta sempre il veterinario con la valutazione Body Condition Score (BCS 1-9).
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
