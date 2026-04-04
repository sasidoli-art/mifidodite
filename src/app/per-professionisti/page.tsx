import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Check, Star, Crown, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Per i Professionisti — MifidoDiTe.eu",
  description: "Registra la tua attivita pet su MifidoDiTe.eu. Piani gratuiti e premium per pensioni, dog sitter, toelettatori e veterinari.",
};

const PLANS = [
  {
    name: "Free",
    price: "0",
    period: "per sempre",
    desc: "Perfetto per iniziare e farsi trovare",
    cta: "Registrati gratis",
    popular: false,
    features: [
      "Profilo base con descrizione",
      "Fino a 3 foto",
      "Visibile nei risultati di ricerca",
      "Ricevi lead via email",
      "1 categoria",
      "Contatti visibili (telefono, email)",
    ],
    notIncluded: [
      "Priorita nei risultati",
      "Badge verificato",
      "Galleria illimitata",
      "Statistiche visite e lead",
      "Evidenza in homepage",
      "Newsletter dedicata",
    ],
  },
  {
    name: "Premium",
    price: "29",
    period: "al mese",
    desc: "Per chi vuole piu visibilita e clienti",
    cta: "Inizia 14 giorni gratis",
    popular: true,
    features: [
      "Tutto di Free, piu:",
      "Priorita nei risultati di ricerca",
      "Badge \"Verificato\" sul profilo",
      "Galleria foto illimitata",
      "Fino a 3 categorie",
      "Statistiche visite e lead",
      "Descrizione storytelling generata da AI",
      "Risposta prioritaria ai lead",
      "Supporto email dedicato",
    ],
    notIncluded: [
      "Evidenza in homepage",
      "Newsletter dedicata",
      "Account manager",
    ],
  },
  {
    name: "Premium Plus",
    price: "59",
    period: "al mese",
    desc: "Massima visibilita per chi vuole crescere",
    cta: "Inizia 14 giorni gratis",
    popular: false,
    features: [
      "Tutto di Premium, piu:",
      "In evidenza nella homepage",
      "Incluso nella newsletter settimanale",
      "Categorie illimitate",
      "Profilo con video",
      "Account manager dedicato",
      "Report mensile performance",
      "Supporto prioritario WhatsApp",
      "Badge \"Top Professionista\"",
    ],
    notIncluded: [],
  },
];

const TESTIMONIALS = [
  {
    name: "Daniela C.",
    role: "Pensione Il Giardino dei Cani — Bergamo",
    text: "Da quando sono su MifidoDiTe ricevo 3-4 richieste a settimana. Prima dovevo fare tutto passaparola. Il piano Premium si e ripagato dal primo mese.",
    rating: 5,
  },
  {
    name: "Marco T.",
    role: "Dog Sitter — Milano",
    text: "Non avevo un sito web e non sapevo come farmi trovare. MifidoDiTe mi ha dato una vetrina professionale senza spendere nulla. Quando ho visto i primi lead ho fatto l'upgrade a Premium.",
    rating: 5,
  },
  {
    name: "Laura B.",
    role: "Toelettatura Zampe Felici — Roma",
    text: "La cosa che apprezzo di piu sono le recensioni vere. I clienti che arrivano da MifidoDiTe sanno gia cosa aspettarsi e sono sempre soddisfatti.",
    rating: 5,
  },
];

const FAQ = [
  {
    q: "Quanto costa registrarsi?",
    a: "La registrazione e il profilo base sono gratuiti per sempre. Puoi iniziare senza carta di credito e decidere dopo se passare a Premium.",
  },
  {
    q: "Come ricevo le richieste dei clienti?",
    a: "Quando un utente compila il form \"Chiedi disponibilita\" sulla tua scheda, ricevi una email con tutti i dettagli: nome, contatti, date, tipo animale e note. Puoi rispondere direttamente.",
  },
  {
    q: "Posso cancellare l'abbonamento Premium?",
    a: "Si, in qualsiasi momento. La cancellazione ha effetto dalla fine del mese gia pagato. Il tuo profilo torna al piano Free.",
  },
  {
    q: "Cosa succede se qualcuno lascia una recensione falsa?",
    a: "Puoi segnalarla e la esamineremo entro 48 ore. Rimuoviamo tutte le recensioni che violano le nostre linee guida.",
  },
  {
    q: "Posso modificare il mio profilo dopo la registrazione?",
    a: "Certo, accedi alla Dashboard e modifica foto, descrizione, servizi e prezzi quando vuoi.",
  },
  {
    q: "Il mio profilo e gia presente ma non l'ho creato io. Come faccio?",
    a: "Alcuni profili vengono creati automaticamente da fonti pubbliche. Puoi reclamarlo: scrivici a ciao@mifidodite.eu con i tuoi dati e te lo assegneremo.",
  },
];

export default function PerProfessionistiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Fatti trovare da chi cerca <span className="text-primary">proprio te</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Migliaia di proprietari cercano ogni giorno pensioni, dog sitter e professionisti pet nella loro zona. Registra la tua attivita e inizia a ricevere clienti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/registra-attivita" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                Registrati gratis
              </Link>
              <a href="#piani" className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-colors">
                Vedi i piani
              </a>
            </div>
          </div>
        </section>

        {/* Piani */}
        <section id="piani" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Scegli il piano giusto per te</h2>
              <p className="mt-3 text-muted-foreground">Inizia gratis, cresci quando vuoi. Nessun vincolo.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 border-2 transition-all ${
                    plan.popular
                      ? "border-primary shadow-xl scale-[1.02] relative"
                      : "border-border hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star size={14} /> Piu popolare
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="text-4xl font-extrabold text-foreground">{plan.price}€</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>

                  <Link
                    href="/registra-attivita"
                    className={`block mt-6 py-3 rounded-xl font-semibold text-center transition-colors ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm opacity-40">
                        <span className="w-4 h-4 shrink-0 mt-0.5 text-center">—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonianze */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Cosa dicono i professionisti</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed text-sm italic">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Domande frequenti</h2>
            <div className="space-y-4">
              {FAQ.map((faq) => (
                <div key={faq.q} className="border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-foreground">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-foreground text-center">
          <div className="max-w-2xl mx-auto px-4">
            <Zap className="mx-auto text-primary mb-4" size={40} />
            <h2 className="text-3xl font-bold text-white mb-4">Pronto a ricevere clienti?</h2>
            <p className="text-white/70 mb-8">
              Registrati in 5 minuti. Il listing base e gratis per sempre. Nessuna carta di credito richiesta.
            </p>
            <Link
              href="/registra-attivita"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Registra la tua attivita <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
