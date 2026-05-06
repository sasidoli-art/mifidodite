import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Heart, Target, Users, Shield, PawPrint, Eye } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Chi Siamo — MifidoDiTe.eu",
  description: "La storia e la missione di MifidoDiTe: il portale italiano dove proprietari di cani e gatti trovano strutture verificate a mano e professionisti affidabili.",
  keywords: ["chi siamo mifidodite", "about us", "team mifidodite", "missione pet-friendly"],
  alternates: { canonical: "https://www.mifidodite.eu/chi-siamo" },
  openGraph: {
    type: "website",
    title: "Chi Siamo — MifidoDiTe.eu",
    description: "La storia e la missione dietro il portale pet-friendly più affidabile d'Italia.",
    url: "https://www.mifidodite.eu/chi-siamo",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
  },
};

export default function ChiSiamoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="text-5xl block mb-4">🐾</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
              Mi <span className="text-primary">Fido</span> di Te
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Non e solo un nome. E una promessa.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* La nostra storia */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">La nostra storia</h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p>
                Tutto e nato da un problema semplice: dovevamo partire per una settimana e non sapevamo a chi lasciare Luna, la nostra Labrador di 4 anni.
              </p>
              <p>
                Abbiamo cercato online. Trovato elenchi generici, siti abbandonati, numeri di telefono che non rispondevano. Le pensioni migliori della nostra zona? Pubblicizzate solo su un gruppo Facebook con 200 iscritti. Il dog sitter piu bravo del quartiere? Nessun sito, nessuna recensione, solo passaparola.
              </p>
              <p>
                Ci siamo detti: <strong>perche in Italia non esiste un posto dove trovare facilmente chi si prende cura degli animali?</strong> Non l'ennesimo elenco freddo, ma un portale vero — con recensioni, foto, contatti, e soprattutto con quei piccoli professionisti locali che fanno un lavoro straordinario ma sono invisibili online.
              </p>
              <p>
                Cosi e nato MifidoDiTe.eu. Il nome racconta tutto: il gioco di parole tra "Fido" (il cane per eccellenza) e "mi fido di te" (la fiducia che cerchi quando lasci il tuo amico a qualcuno).
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">La nostra missione</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Rendere visibile chi non si trova",
                  desc: "Ogni settimana cerchiamo su Facebook, gruppi locali e passaparola i professionisti pet che non hanno un sito web. Li portiamo alla luce perche meritano di essere trovati.",
                },
                {
                  icon: Shield,
                  title: "Creare fiducia reale",
                  desc: "Recensioni verificate, schede complete, foto reali. Nessuna valutazione comprata. Vogliamo che tu scelga con la tranquillita di chi sa cosa aspettarsi.",
                },
                {
                  icon: Target,
                  title: "Vicino a te, davvero",
                  desc: "Non siamo un elenco nazionale generico. Cerchi per CAP, per comune, per km di distanza. I risultati sono reali e pertinenti alla tua zona.",
                },
                {
                  icon: Heart,
                  title: "Dalla parte degli animali",
                  desc: "Ogni scelta che facciamo parte da una domanda: questo e meglio per gli animali? Se la risposta e si, lo facciamo. Se e no, non lo facciamo.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Numeri */}
          <section className="mb-16 bg-foreground rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">MifidoDiTe in numeri</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "550+", label: "Pagine verificate" },
                { value: "77", label: "Spiagge dog-friendly" },
                { value: "89", label: "Strutture ricettive" },
                { value: "8,000+", label: "Newsletter iscritti" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-primary">{s.value}</div>
                  <div className="text-sm text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Come funziona il portale */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Come funziona</h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p><strong>Per i proprietari</strong> — cerchi per CAP o comune, scegli la categoria (pensione, dog sitter, toelettatura, veterinario, spiaggia...), leggi le recensioni e chiedi disponibilita con un form in 30 secondi. Gratis, senza registrazione.</p>
              <p><strong>Per i professionisti</strong> — registri la tua attivita in 5 minuti. Il listing base e gratis per sempre. Ricevi le richieste di disponibilita direttamente via email. Se vuoi piu visibilita, i piani Premium partono da 29 euro al mese.</p>
              <p><strong>Per gli animali</strong> — ogni struttura e professionista viene verificato. Le recensioni sono reali. Il nostro obiettivo e che ogni cane e gatto finisca nelle mani giuste.</p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-10">
            <PawPrint className="mx-auto text-primary mb-4" size={40} />
            <h2 className="text-2xl font-bold text-foreground mb-3">Unisciti a noi</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Che tu sia un proprietario o un professionista, MifidoDiTe e il posto giusto per te.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/professionisti" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Cerca professionisti
              </Link>
              <Link href="/registra-attivita" className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
                Registra la tua attivita
              </Link>
            </div>
          </section>

          {/* Credibilita */}
          <section className="mb-16 bg-white rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Trasparenza e Credibilita</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground font-semibold">Email ufficiale:</p>
                <p className="text-foreground"><a href="mailto:info@mifidodite.eu" className="text-primary hover:underline">info@mifidodite.eu</a></p>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Affiliazioni dichiarate:</p>
                <p className="text-foreground">Link Booking.com sono affiliati e generano una piccola commissione a supporto del progetto. I prezzi che vedi non cambiano per te.</p>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Dati verificabili:</p>
                <p className="text-foreground">Usiamo OpenStreetMap (open data), Nominatim per geocoding, e compilazioni manuali dirette con le strutture. Zero scraping automatico.</p>
              </div>
              <div>
                <p className="text-muted-foreground font-semibold">Protezione contenuti:</p>
                <p className="text-foreground">I nostri articoli, schede e descrizioni sono protetti da copyright. AI bot (GPTBot, ClaudeBot, etc.) sono bloccati via robots.txt. Vedi <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> e <Link href="/termini" className="text-primary hover:underline">Termini di Servizio</Link>.</p>
              </div>
            </div>
          </section>

          {/* Contatti */}
          <section className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contattaci</h2>
            <p className="text-muted-foreground mb-4">
              Hai domande, suggerimenti, o vuoi segnalare un errore? Scrivici direttamente:
            </p>
            <p className="mt-3">
              <a href="mailto:info@mifidodite.eu" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">
                ✉️ info@mifidodite.eu
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-6">
              Rispondiamo entro 48 ore. Se sei un professionista pet-friendly e cerchi visibilita, contattaci per una partnership verificata.
            </p>
            <p className="text-xs text-muted-foreground mt-8">
              MifidoDiTe.eu — Creato per l'amore degli amici a 4 zampe
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
