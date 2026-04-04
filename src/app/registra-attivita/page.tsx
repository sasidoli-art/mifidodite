import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { RegistraForm } from "./RegistraForm";
import { Eye, Users, TrendingUp, Zap, Check } from "lucide-react";

export const metadata = {
  title: "Registra la tua attivita — MifidoDiTe.it",
  description: "Sei un professionista del mondo pet? Registra gratis la tua attivita e inizia a ricevere clienti.",
};

export default function RegistraAttivitaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Fatti trovare dai <span className="text-primary">proprietari</span> della tua zona
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Registra gratis la tua attivita su MifidoDiTe.it e inizia a ricevere
              richieste di disponibilita da clienti reali. Nessun costo nascosto.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Vantaggi */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-foreground">
                Perche registrarti?
              </h2>

              {[
                { icon: Eye, title: "Visibilita immediata", desc: "Il tuo profilo visibile a migliaia di proprietari che cercano nella tua zona." },
                { icon: Users, title: "Clienti reali", desc: "Ricevi richieste di disponibilita direttamente — lead veri, non click vuoti." },
                { icon: TrendingUp, title: "Cresci senza sito", desc: "Non hai un sito web? La tua scheda su MifidoDiTe e il tuo biglietto da visita online." },
                { icon: Zap, title: "Attivo in 5 minuti", desc: "Compila il form, aggiungi qualche foto e sei online. Semplice." },
              ].map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{b.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}

              {/* Piani */}
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-foreground mb-4">I nostri piani</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-muted text-foreground text-xs font-bold px-2.5 py-1 rounded-full">FREE</span>
                    <div>
                      <p className="font-medium text-foreground">Gratis per sempre</p>
                      <p className="text-sm text-muted-foreground">Profilo base, 1 foto, vedi quanti lead ricevi ma non chi sono.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">PRO</span>
                    <div>
                      <p className="font-medium text-foreground">19,90€/mese — <span className="text-primary">Scelta intelligente</span></p>
                      <p className="text-sm text-muted-foreground">Ricevi TUTTI i lead, 10 foto, badge verificato, statistiche, descrizione AI.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-foreground text-white text-xs font-bold px-2.5 py-1 rounded-full">TOP</span>
                    <div>
                      <p className="font-medium text-foreground">24,90€/mese — <span className="text-secondary">Solo 5€ in piu</span></p>
                      <p className="text-sm text-muted-foreground">Tutto Pro + mini-sito personale, evidenza homepage, newsletter, certificati.</p>
                    </div>
                  </div>
                </div>
                <a href="/per-professionisti" className="block mt-4 text-center text-sm text-primary font-medium hover:underline">
                  Confronta i piani nel dettaglio →
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <RegistraForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
