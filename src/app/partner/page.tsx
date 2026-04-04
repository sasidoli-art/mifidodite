import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Target, Users, BarChart3, Mail, Newspaper, MapPin, ArrowRight, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Diventa Partner — Pubblicita su MifidoDiTe.eu",
  description: "Raggiungi migliaia di proprietari di cani e gatti in Italia. Pubblicita targetizzata per aziende pet.",
};

const NUMERI = [
  { value: "50.000+", label: "Visite mensili", note: "in crescita del 25% mese su mese" },
  { value: "12.000+", label: "Iscritti newsletter", note: "con dati: CAP, animale, razza, taglia" },
  { value: "85%", label: "Proprietari di cani", note: "il restante 15% gatti" },
  { value: "38%", label: "Tasso apertura email", note: "3x la media di settore" },
];

const FORMATI = [
  {
    icon: Target,
    nome: "Banner Targetizzato",
    desc: "Mostra il tuo prodotto solo a chi ha un cane di taglia media a Milano. O un gatto in Lombardia. O un cucciolo sotto i 6 mesi. Tu scegli, noi targetizziamo.",
    prezzo: "da 200€/mese",
    highlight: false,
  },
  {
    icon: Newspaper,
    nome: "Articolo Sponsorizzato",
    desc: "Un articolo nel nostro magazine scritto intorno al tuo prodotto. Contenuto nativo che il lettore legge con piacere, non un banner che ignora. SEO incluso, resta online per sempre.",
    prezzo: "da 500€ one-shot",
    highlight: true,
  },
  {
    icon: Mail,
    nome: "Spazio Newsletter",
    desc: "Il tuo brand nella newsletter settimanale letta da migliaia di proprietari. Con i dati che abbiamo, la tua offerta arriva solo a chi e realmente interessato.",
    prezzo: "da 150€/invio",
    highlight: false,
  },
  {
    icon: BarChart3,
    nome: "Partnership Annuale",
    desc: "Diventa il brand di riferimento di una categoria. \"Alimentazione consigliata da...\" o \"Antiparassitario ufficiale di MifidoDiTe\". Visibilita totale, tutto l'anno.",
    prezzo: "su misura",
    highlight: false,
  },
];

const BRAND_IDEALI = [
  "Produttori cibo pet (crocchette, umido, snack, integratori)",
  "Catene pet shop (Arcaplanet, Isola dei Tesori, Maxi Zoo)",
  "Farmaceutici veterinari (antiparassitari, integratori, farmaci)",
  "Assicurazioni pet (Santevet, ConTe, Zurich)",
  "Accessori e giochi (Kong, Ferplast, Trixie)",
  "Servizi (pet taxi, toelettatura mobile, fotografi)",
  "Alimenti naturali e biologici (nicchia in crescita)",
  "App e tech pet (GPS tracker, pet camera, app veterinario)",
];

export default function PartnerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero — diretto, business */}
        <section className="bg-foreground py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Zap size={14} />
              Per aziende e brand pet
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Raggiungi chi ha un cane o un gatto.
              <br />
              <span className="text-primary">Sai gia cosa ha e dove vive.</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
              MifidoDiTe.eu e il portale pet #1 in Italia. I nostri utenti ci dicono che animale hanno, di che razza, che taglia, dove vivono e cosa cercano. Tu puoi raggiungerli con precisione chirurgica.
            </p>
            <a href="mailto:pro@mifidodite.eu?subject=Partnership MifidoDiTe"
              className="inline-flex items-center gap-2 mt-8 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              Parliamone <ArrowRight size={20} />
            </a>
          </div>
        </section>

        {/* Numeri */}
        <section className="py-16 bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground mb-12">I nostri numeri</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {NUMERI.map((n) => (
                <div key={n.label} className="text-center">
                  <div className="text-4xl font-extrabold text-primary">{n.value}</div>
                  <div className="font-semibold text-foreground mt-1">{n.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Il vantaggio: i dati */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Non vendiamo impressioni. Vendiamo precisione.</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                A differenza di Google o Facebook, i nostri utenti ci dicono volontariamente chi sono e cosa hanno. Questo ti permette di targetizzare come nessun altro canale.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🐕</div>
                <h3 className="font-bold text-foreground">Per specie e razza</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  "Mostra il mio cibo solo a chi ha un Labrador" — puoi farlo.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold text-foreground">Per zona geografica</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  "Solo proprietari in Lombardia e Piemonte" — puoi farlo.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-foreground">Per comportamento</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  "Chi cerca pensioni = sta per andare in vacanza" — tempismo perfetto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formati pubblicitari */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Formati disponibili</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {FORMATI.map((f) => (
                <div key={f.nome}
                  className={`rounded-2xl p-7 border-2 transition-all hover:shadow-lg ${
                    f.highlight ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{f.nome}</h3>
                      {f.highlight && (
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Piu richiesto</span>
                      )}
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
                      <p className="font-bold text-primary mt-3">{f.prezzo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Per chi e */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Ideale per</h2>
            <div className="bg-white rounded-2xl p-6">
              <ul className="space-y-3">
                {BRAND_IDEALI.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-foreground">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Il tuo prossimo cliente ha un cane.
              <br />
              <span className="text-primary">Noi sappiamo quale.</span>
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Scrivici per ricevere il media kit con tutti i numeri, i formati e i prezzi aggiornati. Rispondiamo entro 24 ore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:pro@mifidodite.eu?subject=Richiesta Media Kit MifidoDiTe"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                <Mail size={20} /> Richiedi il Media Kit
              </a>
              <a href="tel:+39000000000"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-colors">
                Chiamaci
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
