import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Check, Star, Crown, Zap, ArrowRight, X, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Per i Professionisti — MifidoDiTe.eu",
  description: "Registra la tua attivita pet su MifidoDiTe.eu. I tuoi prossimi clienti ti stanno gia cercando.",
};

const PLANS = [
  {
    name: "Free",
    price: "0",
    period: "per sempre",
    desc: "Provalo. Vedi che funziona.",
    cta: "Registrati con codice invito",
    ctaStyle: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    popular: false,
    badge: null,
    features: [
      { text: "Profilo con info base", included: true },
      { text: "1 foto", included: true },
      { text: "Visibile nei risultati di ricerca", included: true },
      { text: "Vedi QUANTI lead ricevi", included: true },
    ],
    limitations: [
      { text: "Non vedi chi ti ha scritto", icon: EyeOff },
      { text: "Non puoi rispondere ai lead", icon: Lock },
      { text: "Nessuna statistica", icon: Lock },
      { text: "Nessun badge o priorita", icon: Lock },
    ],
    hook: "Vedi i clienti che ti cercano... ma non puoi contattarli.",
  },
  {
    name: "Pro",
    price: "19",
    priceCents: "90",
    period: "al mese",
    desc: "Tutto quello che serve per lavorare.",
    cta: "Registrati con codice invito",
    ctaStyle: "bg-primary text-white hover:bg-primary-dark",
    popular: true,
    badge: "Scelta intelligente",
    features: [
      { text: "Profilo completo e personalizzabile", included: true },
      { text: "Fino a 10 foto", included: true },
      { text: "Ricevi TUTTI i lead (nome, email, telefono)", included: true },
      { text: "Rispondi direttamente ai clienti", included: true },
      { text: "Statistiche visite e richieste", included: true },
      { text: "Badge \"Verificato\" sul profilo", included: true },
      { text: "Descrizione professionale generata da AI", included: true },
      { text: "Supporto email dedicato", included: true },
    ],
    limitations: [],
    hook: null,
  },
  {
    name: "Top",
    price: "24",
    priceCents: "90",
    period: "al mese",
    desc: "Solo 5€ in piu. Davvero vuoi rinunciarci?",
    cta: "Registrati con codice invito",
    ctaStyle: "bg-foreground text-white hover:bg-foreground/90",
    popular: false,
    badge: "Miglior valore",
    features: [
      { text: "Tutto del Pro, piu:", included: true },
      { text: "Foto illimitate + video (embed YouTube)", included: true },
      { text: "Mini-sito personale (mifidodite.eu/pro/nome)", included: true },
      { text: "Appari PRIMA nei risultati di ricerca", included: true },
      { text: "In evidenza nella homepage", included: true },
      { text: "Incluso nella newsletter settimanale", included: true },
      { text: "Upload certificati e attestati professionali", included: true },
      { text: "Report mensile PDF con performance", included: true },
      { text: "Badge \"Top Professionista\"", included: true },
    ],
    limitations: [],
    hook: null,
  },
];

const TESTIMONIALS = [
  {
    name: "Daniela C.",
    role: "Pensione per cani — Bergamo",
    text: "Con il piano Pro ricevo 3-4 richieste a settimana. Prima era solo passaparola. Si e ripagato dal primo mese.",
    rating: 5,
    piano: "Pro",
  },
  {
    name: "Marco T.",
    role: "Dog Sitter — Milano",
    text: "Con il Free vedevo che arrivavano le richieste ma non potevo rispondere. Dopo 2 giorni ho fatto l'upgrade. Ora ho l'agenda piena.",
    rating: 5,
    piano: "Top",
  },
  {
    name: "Laura B.",
    role: "Toelettatura — Roma",
    text: "Il mini-sito del piano Top e diventato il mio biglietto da visita. Lo mando ai clienti al posto del sito che non ho mai avuto.",
    rating: 5,
    piano: "Top",
  },
];

const FAQ = [
  {
    q: "Posso provare prima di pagare?",
    a: "Si. Il piano Free e gratis per sempre. I piani Pro e Top hanno 14 giorni di prova gratuita — se non ti convince, non paghi nulla.",
  },
  {
    q: "Cosa succede con il piano Free?",
    a: "Vedi quante persone ti cercano e quante richieste ricevi. Ma non vedi chi sono e non puoi contattarli. E pensato per farti capire il potenziale — quando vedi che i clienti ci sono, l'upgrade e naturale.",
  },
  {
    q: "Perche il Top costa solo 5€ in piu del Pro?",
    a: "Perche vogliamo che tu lo prenda. Il mini-sito, l'evidenza in homepage e la newsletter valgono molto piu di 5 euro. E il piano che consigliamo a tutti.",
  },
  {
    q: "Posso cancellare quando voglio?",
    a: "Si, in qualsiasi momento. La cancellazione ha effetto dalla fine del mese gia pagato. Il tuo profilo torna al piano Free.",
  },
  {
    q: "Come ricevo i lead?",
    a: "Via email, in tempo reale. Quando un proprietario compila il form sulla tua scheda, ricevi nome, email, telefono, date e note direttamente nella tua casella.",
  },
  {
    q: "Il mini-sito del piano Top come funziona?",
    a: "E una pagina completa dedicata a te: bio, foto, video, certificati, servizi, prezzi, recensioni. Con URL personalizzato tipo mifidodite.eu/pro/il-tuo-nome. Lo condividi al posto del sito web.",
  },
];

export default function PerProfessionistiPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero — diretto, zero fronzoli */}
        <section className="bg-muted py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              I tuoi prossimi clienti
              <br />
              <span className="text-primary">ti stanno gia cercando</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
              Ogni giorno migliaia di proprietari cercano pensioni, dog sitter e toelettatori nella loro zona. Con MifidoDiTe ti trovano.
            </p>
          </div>
        </section>

        {/* Piani — il cuore della pagina */}
        <section id="piani" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-foreground">Scegli il tuo piano</h2>
              <p className="mt-3 text-muted-foreground">Registrati con codice invito. Cresci quando vuoi. Cancelli quando vuoi.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl transition-all ${
                    plan.popular
                      ? "border-2 border-primary shadow-xl ring-1 ring-primary/20 scale-[1.02]"
                      : plan.name === "Top"
                      ? "border-2 border-foreground/20 shadow-lg"
                      : "border border-border"
                  } bg-white p-7`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full ${
                      plan.popular
                        ? "bg-primary text-white"
                        : "bg-foreground text-white"
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>

                  {/* Prezzo */}
                  <div className="mt-3 flex items-baseline">
                    <span className="text-5xl font-extrabold text-foreground">{plan.price}</span>
                    {"priceCents" in plan && (
                      <span className="text-2xl font-bold text-foreground">,{plan.priceCents}</span>
                    )}
                    <span className="text-lg text-muted-foreground ml-1">€</span>
                    <span className="text-sm text-muted-foreground ml-2">/{plan.period}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>

                  {/* CTA */}
                  <Link
                    href="/registra-attivita"
                    className={`block mt-6 py-3.5 rounded-xl font-bold text-center transition-all ${plan.ctaStyle}`}
                  >
                    {plan.cta}
                  </Link>

                  {/* Hook psicologico per il Free */}
                  {plan.hook && (
                    <p className="mt-4 text-xs text-center text-amber-600 font-medium bg-amber-50 rounded-lg py-2 px-3">
                      ⚠️ {plan.hook}
                    </p>
                  )}

                  {/* Features incluse */}
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5 text-sm">
                        <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                        <span className="text-foreground">{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Limitazioni (solo Free) */}
                  {plan.limitations.length > 0 && (
                    <ul className="mt-4 pt-4 border-t border-border space-y-3">
                      {plan.limitations.map((l) => (
                        <li key={l.text} className="flex items-start gap-2.5 text-sm">
                          <l.icon size={16} className="text-red-400 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{l.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Confronto diretto */}
            <div className="mt-14 text-center">
              <p className="text-muted-foreground text-sm">
                Il <strong className="text-foreground">Pro</strong> costa meno di un caffe al giorno.
                Il <strong className="text-foreground">Top</strong> costa solo <strong className="text-primary">5€ in piu</strong> e include il mini-sito, l'evidenza in homepage e la newsletter.
              </p>
            </div>
          </div>
        </section>

        {/* Social proof — testimonianze */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Chi l'ha provato, non torna indietro</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      t.piano === "Top" ? "bg-foreground text-white" : "bg-primary/10 text-primary"
                    }`}>
                      Piano {t.piano}
                    </span>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed italic">"{t.text}"</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Domande frequenti</h2>
            <div className="space-y-3">
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
        <section className="py-16 bg-foreground">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Il primo passo costa zero
            </h2>
            <p className="text-white/60 mb-8">
              Registrati gratis in 5 minuti. Vedi quanti clienti ti cercano. Poi decidi tu.
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
