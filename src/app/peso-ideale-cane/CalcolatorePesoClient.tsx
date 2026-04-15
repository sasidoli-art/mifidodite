"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Scale, AlertTriangle, Check, TrendingDown, TrendingUp, Info, ArrowRight } from "lucide-react";

interface RazzaInput {
  slug: string;
  nome: string;
  pesoMin: number;
  pesoMax: number;
}

interface Props {
  razze: RazzaInput[];
}

type Stato = "sottopeso-grave" | "sottopeso" | "ideale" | "sovrappeso" | "obesita";

function valutaPeso(pesoAttuale: number, pesoMin: number, pesoMax: number): Stato {
  const pesoIdeale = (pesoMin + pesoMax) / 2;
  const pct = (pesoAttuale / pesoIdeale) * 100;

  if (pct < 80) return "sottopeso-grave";
  if (pct < 95) return "sottopeso";
  if (pct <= 115) return "ideale";
  if (pct <= 130) return "sovrappeso";
  return "obesita";
}

const STATO_INFO: Record<Stato, {
  label: string;
  colore: string;
  bg: string;
  border: string;
  desc: string;
  icon: React.ReactNode;
  consigli: string[];
}> = {
  "sottopeso-grave": {
    label: "Sottopeso grave",
    colore: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    desc: "Il tuo cane e visibilmente dimagrito. Richiede visita veterinaria urgente.",
    icon: <AlertTriangle className="text-red-600" size={28} />,
    consigli: [
      "Porta il cane dal veterinario entro pochi giorni",
      "Potrebbe esserci un problema di salute (parassiti, tiroide, tumori)",
      "Non aumentare le razioni da solo: prima la causa",
    ],
  },
  "sottopeso": {
    label: "Sottopeso",
    colore: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    desc: "Il tuo cane e leggermente sotto il peso ideale. Si vedono le costole senza doverle cercare.",
    icon: <TrendingDown className="text-amber-600" size={28} />,
    consigli: [
      "Aumenta le razioni del 10-15% per 2-3 settimane",
      "Passa a un cibo piu calorico se e molto attivo",
      "Pesa ogni 10 giorni per monitorare",
      "Se non ingrassa, consulta il veterinario",
    ],
  },
  "ideale": {
    label: "Peso ideale",
    colore: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    desc: "Perfetto! Il tuo cane e in forma ottimale. Le costole si sentono ma non si vedono.",
    icon: <Check className="text-emerald-600" size={28} />,
    consigli: [
      "Mantieni le razioni attuali",
      "Continua con le passeggiate regolari",
      "Ricontrolla il peso ogni mese",
    ],
  },
  "sovrappeso": {
    label: "Sovrappeso",
    colore: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    desc: "Il tuo cane e leggermente sovrappeso. Le costole sono difficili da sentire.",
    icon: <TrendingUp className="text-orange-600" size={28} />,
    consigli: [
      "Riduci le razioni del 10% per 4-6 settimane",
      "Aumenta il movimento (20 min in piu al giorno)",
      "Togli i premi extra tra i pasti",
      "Passa a crocchette light se non migliora",
    ],
  },
  "obesita": {
    label: "Obesita",
    colore: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    desc: "Il tuo cane e obeso. L&apos;obesita riduce l&apos;aspettativa di vita di 2-3 anni e aumenta rischi cardiaci, diabete e problemi articolari.",
    icon: <AlertTriangle className="text-red-600" size={28} />,
    consigli: [
      "Prenota una visita veterinaria per un piano dimagrimento",
      "Mai dimagrimenti rapidi (rischio steatosi epatica)",
      "Crocchette light o veterinarie per dimagrimento",
      "Aumenta gradualmente il movimento",
      "Monitora peso ogni 2 settimane",
    ],
  },
};

export function CalcolatorePesoClient({ razze }: Props) {
  const [razzaSlug, setRazzaSlug] = useState(razze[0]?.slug || "");
  const [peso, setPeso] = useState(15);

  const razza = useMemo(() => razze.find((r) => r.slug === razzaSlug), [razze, razzaSlug]);

  const valutazione = useMemo(() => {
    if (!razza) return null;
    return valutaPeso(peso, razza.pesoMin, razza.pesoMax);
  }, [peso, razza]);

  const info = valutazione ? STATO_INFO[valutazione] : null;
  const pesoIdealeMin = razza?.pesoMin || 0;
  const pesoIdealeMax = razza?.pesoMax || 0;
  const pesoIdealeMedio = ((pesoIdealeMin + pesoIdealeMax) / 2).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-foreground mb-6">Il tuo cane</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Razza</label>
              <select
                value={razzaSlug}
                onChange={(e) => setRazzaSlug(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground font-medium focus:border-primary focus:outline-none"
              >
                {razze.map((r) => (
                  <option key={r.slug} value={r.slug}>{r.nome}</option>
                ))}
              </select>
              {razza && (
                <p className="text-xs text-muted-foreground mt-2">
                  Peso standard FCI: <strong>{razza.pesoMin}-{razza.pesoMax} kg</strong>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Peso attuale (kg)</label>
              <input
                type="number"
                min={1}
                max={100}
                step={0.1}
                value={peso}
                onChange={(e) => setPeso(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-lg font-semibold focus:border-primary focus:outline-none"
              />
              <input
                type="range"
                min={Math.max(1, (razza?.pesoMin || 1) - 5)}
                max={(razza?.pesoMax || 50) + 20}
                step={0.5}
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
                className="w-full mt-3 accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {info && razza && (
            <>
              <div className={`${info.bg} border ${info.border} rounded-3xl p-8 shadow-sm`}>
                <div className="flex items-start gap-4 mb-4">
                  <div>{info.icon}</div>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wide ${info.colore} mb-1`}>Valutazione</div>
                    <div className={`text-3xl font-extrabold ${info.colore}`}>{info.label}</div>
                  </div>
                </div>
                <p className={`${info.colore} leading-relaxed mb-4`} dangerouslySetInnerHTML={{ __html: info.desc }} />
                <div className="pt-4 border-t border-current/10">
                  <div className="text-xs font-bold uppercase tracking-wide opacity-70 mb-1">Peso ideale per la razza</div>
                  <div className="text-2xl font-extrabold">{pesoIdealeMin}-{pesoIdealeMax} kg</div>
                  <div className="text-sm opacity-70 mt-1">Media razza: {pesoIdealeMedio} kg</div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4">Cosa fare adesso</h3>
                <ul className="space-y-2.5">
                  {info.consigli.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border p-5 flex gap-3 items-start">
                <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <strong>Vuoi regolare le razioni?</strong> Il nostro <Link href="/razioni-cane" className="text-primary font-semibold underline">calcolatore razioni giornaliere</Link> calcola quanto cibo dare al tuo cane in base a peso, eta e attivita.
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info tecnica */}
      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-bold text-foreground mb-2 flex items-center gap-2"><Scale size={16} className="text-primary" /> Body Condition Score</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">I veterinari usano il <strong>BCS (Body Condition Score)</strong> scala 1-9. Un cane ideale ha BCS 4-5: vedi il giro-vita dall&apos;alto e senti le costole toccando i fianchi senza premere. Sopra il BCS 7 e sovrappeso clinico.</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-bold text-foreground mb-2">Perche controllare il peso?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Il 60% dei cani italiani e sovrappeso secondo ENPA. L&apos;obesita riduce di <strong>2-3 anni la vita</strong>, aumenta rischio diabete, malattie cardiache, tumori e problemi articolari (displasia). Monitorare mensilmente e la cosa piu semplice e importante che puoi fare.</p>
        </div>
      </div>

      <div className="mt-10 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border p-6 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Scopri tutti i nostri strumenti gratuiti</h3>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Link href="/costo-cane" className="bg-primary text-white font-semibold rounded-full px-5 py-2.5 hover:bg-primary-dark transition-colors text-sm inline-flex items-center gap-1">Costo annuale <ArrowRight size={14} /></Link>
          <Link href="/razioni-cane" className="bg-primary text-white font-semibold rounded-full px-5 py-2.5 hover:bg-primary-dark transition-colors text-sm inline-flex items-center gap-1">Razioni cibo <ArrowRight size={14} /></Link>
          <Link href="/eta-cane" className="bg-primary text-white font-semibold rounded-full px-5 py-2.5 hover:bg-primary-dark transition-colors text-sm inline-flex items-center gap-1">Eta umana <ArrowRight size={14} /></Link>
          <Link href="/quiz-razza" className="bg-white border-2 border-border text-foreground font-semibold rounded-full px-5 py-2.5 hover:border-primary hover:text-primary transition-colors text-sm inline-flex items-center gap-1">Quiz razza <ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
