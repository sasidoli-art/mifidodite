import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { QuizClient } from "./QuizClient";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Quiz: Quale razza di cane fa per te? — MifidoDiTe.eu",
  description: "Scopri in 6 domande qual e la razza di cane ideale per il tuo stile di vita. Quiz gratuito e personalizzato, con suggerimenti di professionisti nella tua zona.",
  keywords: ["quiz razza cane", "quale cane scegliere", "razza cane ideale", "test razza cane", "scelta cane famiglia"],
};

export default function QuizRazzaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 bg-background">
        <section className="bg-foreground py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Sparkles size={16} /> Quiz personalizzato
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Quale razza di cane <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">fa per te?</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Rispondi a 6 domande e scopri quali razze si adattano meglio al tuo stile di vita.
            </p>
          </div>
        </section>

        <QuizClient />

        <section className="py-10 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              I risultati sono indicativi: ogni cane e un individuo unico. Prima di adottare, consulta un educatore cinofilo o un veterinario. Considera sempre l&apos;adozione dal canile.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
