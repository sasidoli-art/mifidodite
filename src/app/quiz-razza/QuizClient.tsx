"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { RAZZE, type Razza, type Taglia, type Energia, type Esperienza } from "@/lib/razze-data";

type AbitazioneVal = "app_piccolo" | "app_grande" | "casa_giardino";
type OreVal = "poche" | "medie" | "molte";
type AttivitaVal = "sedentaria" | "moderata" | "attiva";
type TagliaPref = Taglia | "qualsiasi";

interface Answers {
  abitazione?: AbitazioneVal;
  ore?: OreVal;
  bambini?: boolean;
  attivita?: AttivitaVal;
  tagliaPref?: TagliaPref;
  esperienza?: Esperienza;
}

const DOMANDE = [
  {
    id: "abitazione",
    label: "Dove vivi?",
    opzioni: [
      { val: "app_piccolo", label: "Appartamento piccolo", emoji: "🏢" },
      { val: "app_grande", label: "Appartamento grande", emoji: "🏠" },
      { val: "casa_giardino", label: "Casa con giardino", emoji: "🌳" },
    ],
  },
  {
    id: "ore",
    label: "Quante ore stai fuori casa al giorno?",
    opzioni: [
      { val: "poche", label: "Meno di 4 ore", emoji: "⏱️" },
      { val: "medie", label: "4-8 ore", emoji: "⏰" },
      { val: "molte", label: "Piu di 8 ore", emoji: "🕐" },
    ],
  },
  {
    id: "bambini",
    label: "Hai bambini piccoli in casa?",
    opzioni: [
      { val: "true", label: "Si", emoji: "👶" },
      { val: "false", label: "No", emoji: "🚫" },
    ],
  },
  {
    id: "attivita",
    label: "Che tipo di attivita fisica fai?",
    opzioni: [
      { val: "sedentaria", label: "Poca, sono casalingo", emoji: "🛋️" },
      { val: "moderata", label: "Passeggiate quotidiane", emoji: "🚶" },
      { val: "attiva", label: "Corsa, trekking, sport", emoji: "🏃" },
    ],
  },
  {
    id: "tagliaPref",
    label: "Che taglia di cane preferisci?",
    opzioni: [
      { val: "piccola", label: "Piccolo", emoji: "🐕" },
      { val: "media", label: "Medio", emoji: "🐕‍🦺" },
      { val: "grande", label: "Grande", emoji: "🦮" },
      { val: "qualsiasi", label: "Non importa", emoji: "✨" },
    ],
  },
  {
    id: "esperienza",
    label: "Hai gia avuto cani in passato?",
    opzioni: [
      { val: "principiante", label: "E il primo", emoji: "🌱" },
      { val: "intermedio", label: "Qualcuno si", emoji: "📚" },
      { val: "esperto", label: "Sono esperto", emoji: "🎓" },
    ],
  },
] as const;

function calcolaRisultati(a: Answers): Razza[] {
  const scored = RAZZE.map((r) => {
    let score = 0;

    if (a.abitazione === "app_piccolo") {
      if (r.appartamento === "ottimo") score += 30;
      else if (r.appartamento === "medio") score += 5;
      else score -= 20;
      if (r.taglia === "piccola") score += 15;
      else if (r.taglia === "media") score += 5;
      else if (r.taglia === "gigante") score -= 15;
    } else if (a.abitazione === "app_grande") {
      if (r.appartamento === "ottimo") score += 20;
      else if (r.appartamento === "medio") score += 15;
      if (r.taglia === "gigante") score -= 5;
    } else if (a.abitazione === "casa_giardino") {
      score += 10;
      if (r.taglia === "grande" || r.taglia === "gigante") score += 15;
      if (r.energia === "alta") score += 10;
    }

    if (a.ore === "molte") {
      if (r.energia === "bassa") score += 15;
      else if (r.energia === "alta") score -= 20;
      if (r.slug === "siberian-husky" || r.slug === "border-collie") score -= 15;
    } else if (a.ore === "medie") {
      if (r.energia === "media") score += 10;
    } else if (a.ore === "poche") {
      if (r.energia === "alta") score += 10;
    }

    if (a.bambini === true) {
      if (r.bambini === "ottimo") score += 25;
      else if (r.bambini === "buono") score += 5;
      else score -= 15;
    }

    if (a.attivita === "sedentaria") {
      if (r.energia === "bassa") score += 20;
      else if (r.energia === "alta") score -= 25;
    } else if (a.attivita === "moderata") {
      if (r.energia === "media") score += 15;
      else if (r.energia === "bassa") score += 5;
    } else if (a.attivita === "attiva") {
      if (r.energia === "alta") score += 25;
      else if (r.energia === "bassa") score -= 15;
    }

    if (a.tagliaPref && a.tagliaPref !== "qualsiasi") {
      if (r.taglia === a.tagliaPref) score += 25;
      else score -= 10;
    }

    if (a.esperienza === "principiante") {
      if (r.esperienzaMinima === "principiante") score += 20;
      else if (r.esperienzaMinima === "intermedio") score -= 10;
      else score -= 25;
    } else if (a.esperienza === "intermedio") {
      if (r.esperienzaMinima === "principiante" || r.esperienzaMinima === "intermedio") score += 15;
      else score -= 5;
    } else if (a.esperienza === "esperto") {
      score += 10;
    }

    return { razza: r, score };
  });

  return scored
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((s) => s.razza);
}

export function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [risultati, setRisultati] = useState<Razza[] | null>(null);

  const totale = DOMANDE.length;
  const progress = Math.round((step / totale) * 100);

  function rispondi(val: string) {
    const domanda = DOMANDE[step];
    const newAnswers = { ...answers } as Answers;

    if (domanda.id === "abitazione") newAnswers.abitazione = val as AbitazioneVal;
    else if (domanda.id === "ore") newAnswers.ore = val as OreVal;
    else if (domanda.id === "bambini") newAnswers.bambini = val === "true";
    else if (domanda.id === "attivita") newAnswers.attivita = val as AttivitaVal;
    else if (domanda.id === "tagliaPref") newAnswers.tagliaPref = val as TagliaPref;
    else if (domanda.id === "esperienza") newAnswers.esperienza = val as Esperienza;

    setAnswers(newAnswers);

    if (step + 1 >= totale) {
      setRisultati(calcolaRisultati(newAnswers));
    } else {
      setStep(step + 1);
    }
  }

  function indietro() {
    if (step > 0) setStep(step - 1);
  }

  function ricomincia() {
    setStep(0);
    setAnswers({});
    setRisultati(null);
  }

  function condividi() {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: "Quiz: Quale razza di cane fa per te?",
        text: "Ho scoperto la mia razza ideale su MifidoDiTe.eu!",
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiato!");
    }
  }

  if (risultati) {
    const primo = risultati[0];
    const altri = risultati.slice(1);

    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} /> Il tuo risultato
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            La razza ideale per te e
          </h2>
          <p className="text-5xl sm:text-6xl font-extrabold text-primary">{primo.nome}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border mb-10"
        >
          <div className="h-64 sm:h-80 overflow-hidden relative">
            <img src={primo.foto} alt={primo.nome} className="w-full h-full object-cover" />
          </div>
          <div className="p-8">
            <p className="text-lg text-foreground mb-6">{primo.descrizione}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {primo.caratteristiche.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" /> {c}
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm mb-6 p-4 bg-muted rounded-xl">
              <div><strong className="text-foreground">Taglia:</strong> <span className="capitalize text-muted-foreground">{primo.taglia}</span></div>
              <div><strong className="text-foreground">Energia:</strong> <span className="capitalize text-muted-foreground">{primo.energia}</span></div>
              <div><strong className="text-foreground">Pelo:</strong> <span className="capitalize text-muted-foreground">{primo.pelo}</span></div>
              <div><strong className="text-foreground">Costo mensile:</strong> <span className="text-muted-foreground">~{primo.costoMensile}€</span></div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/razze/${primo.slug}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                Scheda completa {primo.nome} <ArrowRight size={16} />
              </Link>
              <Link
                href="/razze"
                className="inline-flex items-center gap-2 bg-muted text-foreground px-5 py-3 rounded-full font-semibold hover:bg-muted/70 transition-colors"
              >
                Tutte le razze
              </Link>
              <button
                onClick={condividi}
                className="inline-flex items-center gap-2 bg-white border-2 border-border text-foreground px-5 py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                <Share2 size={16} /> Condividi
              </button>
            </div>
          </div>
        </motion.div>

        {altri.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">Potrebbero piacerti anche</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {altri.map((r) => (
                <Link key={r.slug} href={`/razze/${r.slug}`} className="bg-white rounded-2xl overflow-hidden border border-border flex items-center gap-4 p-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                  <img src={r.foto} alt={r.nome} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{r.nome}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{r.descrizione}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={ricomincia}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <RotateCcw size={16} /> Rifai il quiz
          </button>
        </div>
      </div>
    );
  }

  const domanda = DOMANDE[step];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 text-sm">
          <span className="text-muted-foreground font-medium">Domanda {step + 1} di {totale}</span>
          <span className="text-primary font-bold">{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8 text-center">
            {domanda.label}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {domanda.opzioni.map((op) => (
              <button
                key={op.val}
                onClick={() => rispondi(op.val)}
                className="group bg-white border-2 border-border rounded-2xl p-6 text-left hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{op.emoji}</span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {op.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={indietro}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} /> Indietro
          </button>
        </div>
      )}
    </div>
  );
}
