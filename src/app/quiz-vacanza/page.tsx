import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { QuizClient } from "./QuizClient";
import { Sparkles } from "lucide-react";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Quiz: Quale vacanza per il tuo cane? — MifidoDiTe.eu",
  description: "Rispondi a 6 domande e scopri la vacanza ideale con il tuo cane in Italia. Quiz gratuito che ti suggerisce mare, montagna o citta' e 3 strutture verificate.",
  keywords: ["quiz vacanza cane", "quale vacanza con cane", "test vacanza cane", "scegliere vacanza pet"],
  alternates: { canonical: "https://www.mifidodite.eu/quiz-vacanza" },
  openGraph: {
    type: "website",
    title: "Quiz: Quale vacanza per il tuo cane?",
    url: "https://www.mifidodite.eu/quiz-vacanza",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
  },
};

export default function QuizVacanzaPage() {
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
              Quale vacanza per il tuo <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">cane?</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Rispondi a 6 domande veloci e ti suggeriamo 3 strutture verificate, scelte tra le 89 del nostro database.
            </p>
          </div>
        </section>

        <QuizClient />

        <section className="py-10 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              I suggerimenti sono basati sulle preferenze indicate, e si possono affinare visitando le pagine delle singole strutture. Niente recensioni inventate: tutte le strutture sono verificate manualmente dal team MifidoDiTe.
            </p>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Quiz Vacanza", url: "/quiz-vacanza" }]))} />
      </main>
      <Footer />
    </>
  );
}
