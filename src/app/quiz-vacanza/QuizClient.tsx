"use client";

import { useState } from "react";
import { VACANZE_SEED, slugifyRegioneV, type VacanzeSeed } from "@/lib/vacanze-seed";
import type { VacanzeTipo, PrezzoFascia, TagliaMax } from "@/lib/vacanze-types";
import { ChevronRight, RotateCcw, MapPin } from "lucide-react";
import Link from "next/link";

interface Opzione {
  label: string;
  /** Regioni preferite */
  regioni?: string[];
  /** Tipo struttura preferito */
  tipo?: VacanzeTipo;
  /** Fascia di prezzo */
  fascia?: PrezzoFascia;
  /** Taglia max cane */
  taglia?: TagliaMax;
  /** Boost generico per match piu' libero */
  weight?: number;
}

interface Domanda {
  id: string;
  testo: string;
  opzioni: Opzione[];
}

const REGIONI_MARE = ["Liguria", "Toscana", "Lazio", "Campania", "Calabria", "Basilicata", "Puglia", "Molise", "Abruzzo", "Marche", "Emilia-Romagna", "Veneto", "Friuli-Venezia Giulia", "Sardegna", "Sicilia"];
const REGIONI_MONTAGNA = ["Trentino-Alto Adige", "Valle d'Aosta", "Piemonte", "Lombardia", "Veneto", "Friuli-Venezia Giulia", "Abruzzo", "Calabria"];
const REGIONI_ARTE = ["Lazio", "Toscana", "Lombardia", "Veneto", "Campania", "Emilia-Romagna", "Sicilia"];
const REGIONI_CAMPAGNA = ["Toscana", "Umbria", "Marche", "Piemonte", "Sicilia", "Sardegna", "Lazio"];

const DOMANDE: Domanda[] = [
  {
    id: "ambiente",
    testo: "Che tipo di vacanza vuoi fare con il tuo cane?",
    opzioni: [
      { label: "Mare e spiagge", regioni: REGIONI_MARE },
      { label: "Montagna e sentieri", regioni: REGIONI_MONTAGNA },
      { label: "Citta d'arte", regioni: REGIONI_ARTE },
      { label: "Campagna e collina", regioni: REGIONI_CAMPAGNA },
    ],
  },
  {
    id: "stile",
    testo: "Lo stile che cerchi?",
    opzioni: [
      { label: "Relax totale", weight: 1 },
      { label: "Attivita all'aria aperta", regioni: [...REGIONI_MONTAGNA, ...REGIONI_CAMPAGNA] },
      { label: "Cultura e gastronomia", regioni: REGIONI_ARTE },
      { label: "Avventura e natura selvaggia", regioni: ["Sardegna", "Basilicata", "Calabria", "Molise", "Abruzzo"] },
    ],
  },
  {
    id: "budget",
    testo: "Il budget per notte (per coppia + cane)?",
    opzioni: [
      { label: "Fino a 80 euro", fascia: "economico" },
      { label: "80-180 euro", fascia: "medio" },
      { label: "180-400 euro", fascia: "alto" },
      { label: "Oltre 400 euro", fascia: "luxury" },
    ],
  },
  {
    id: "tipo",
    testo: "Il tipo di struttura che preferisci?",
    opzioni: [
      { label: "Hotel o resort", tipo: "hotel" },
      { label: "Agriturismo o masseria", tipo: "agriturismo" },
      { label: "B&B o boutique", tipo: "bnb" },
      { label: "Camping o glamping", tipo: "camping" },
    ],
  },
  {
    id: "taglia",
    testo: "Quanto e grande il tuo cane?",
    opzioni: [
      { label: "Piccolo (< 10kg)", taglia: "piccola" },
      { label: "Medio (10-25kg)", taglia: "media" },
      { label: "Grande (oltre 25kg)", taglia: "grande" },
    ],
  },
  {
    id: "stagione",
    testo: "Quando pensi di partire?",
    opzioni: [
      { label: "Primavera / Estate", weight: 1 },
      { label: "Autunno / Inverno", regioni: [...REGIONI_MONTAGNA, ...REGIONI_ARTE, ...REGIONI_CAMPAGNA] },
    ],
  },
];

const tagliaCompatibile: Record<TagliaMax, TagliaMax[]> = {
  piccola: ["piccola"],
  media: ["piccola", "media"],
  grande: ["piccola", "media", "grande"],
  tutte: ["piccola", "media", "grande", "tutte"],
};

function calcolaPunteggio(struct: VacanzeSeed, risposte: Opzione[]): number {
  let score = 0;

  for (const opz of risposte) {
    if (opz.regioni && opz.regioni.includes(struct.regione)) {
      score += 3;
    }
    if (opz.tipo && opz.tipo === struct.tipo) {
      score += 4;
    }
    if (opz.fascia && opz.fascia === struct.fascia) {
      score += 3;
    }
    if (opz.taglia) {
      const ammesse = tagliaCompatibile[struct.tagliaMax];
      if (ammesse.includes(opz.taglia)) {
        score += 2;
      } else {
        score -= 3; // penalizza taglia incompatibile
      }
    }
    if (opz.weight) score += opz.weight;
  }

  return score;
}

export function QuizClient() {
  const [step, setStep] = useState(0);
  const [risposte, setRisposte] = useState<Opzione[]>([]);
  const [risultato, setRisultato] = useState<VacanzeSeed[] | null>(null);

  function rispondi(opz: Opzione) {
    const nuoveRisposte = [...risposte, opz];
    if (step < DOMANDE.length - 1) {
      setRisposte(nuoveRisposte);
      setStep(step + 1);
    } else {
      // calcola risultato
      const scored = VACANZE_SEED
        .map(s => ({ struct: s, score: calcolaPunteggio(s, nuoveRisposte) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(r => r.struct);
      setRisultato(scored);
      setRisposte(nuoveRisposte);
    }
  }

  function reset() {
    setStep(0);
    setRisposte([]);
    setRisultato(null);
  }

  if (risultato) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Le 3 strutture piu' adatte a te</h2>
          <p className="text-muted-foreground">In base alle tue risposte, ecco i nostri suggerimenti dal database verificato.</p>
        </div>

        <div className="space-y-6">
          {risultato.map((s) => (
            <Link key={s.slug} href={`/vacanze/${slugifyRegioneV(s.regione)}/${s.slug}`}>
              <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="grid sm:grid-cols-3 gap-0">
                  <div className="h-48 sm:h-auto overflow-hidden">
                    <img src={s.img} alt={s.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="col-span-2 p-6 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">{s.tipo}</p>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.nome}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><MapPin size={14} /> {s.comune} ({s.provincia})</p>
                      <p className="text-sm text-foreground leading-relaxed">{s.descrizione.slice(0, 150)}...</p>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-primary">Scopri di piu' →</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button onClick={reset} className="inline-flex items-center gap-2 bg-white border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:bg-muted transition-colors">
            <RotateCcw size={16} /> Rifai il quiz
          </button>
          <Link href="/vacanze" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors">
            Vedi tutte le 89 strutture →
          </Link>
        </div>
      </section>
    );
  }

  const domandaCorrente = DOMANDE[step];
  const progress = ((step + 1) / DOMANDE.length) * 100;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-muted-foreground">Domanda {step + 1} di {DOMANDE.length}</p>
        <div className="flex-1 ml-4 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">{domandaCorrente.testo}</h2>

      <div className="space-y-3">
        {domandaCorrente.opzioni.map((opz, i) => (
          <button
            key={i}
            onClick={() => rispondi(opz)}
            className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <span className="text-base font-semibold text-foreground group-hover:text-primary text-left">{opz.label}</span>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </section>
  );
}
