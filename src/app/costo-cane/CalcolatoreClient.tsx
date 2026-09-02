"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Euro, Info } from "lucide-react";
import {
  calcolaCosto,
  CITTA_LABELS,
  TAGLIE_LABELS,
  TIPO_CIBO_LABELS,
  PELO_LABELS,
  type ParametriCosto,
  type Citta,
  type TagliaCosto,
  type TipoCibo,
  type PeloCosto,
} from "@/lib/costi-cane-data";

export function CalcolatoreClient() {
  const [taglia, setTaglia] = useState<TagliaCosto>("media");
  const [tipoCibo, setTipoCibo] = useState<TipoCibo>("standard");
  const [pelo, setPelo] = useState<PeloCosto>("corto");
  const [citta, setCitta] = useState<Citta>("altre");
  const [assicurazione, setAssicurazione] = useState(false);
  const [tolettaturaProfessionale, setTolettaturaProfessionale] = useState(false);

  const parametri: ParametriCosto = {
    taglia, tipoCibo, pelo, citta, assicurazione, tolettaturaProfessionale,
  };

  const risultato = useMemo(() => calcolaCosto(parametri), [taglia, tipoCibo, pelo, citta, assicurazione, tolettaturaProfessionale]);

  const maxVoce = Math.max(...risultato.breakdown.map((b) => b.annuale));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm h-fit"
        >
          <h2 className="text-xl font-bold text-foreground mb-6">Configura il tuo cane</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Taglia del cane</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(TAGLIE_LABELS) as TagliaCosto[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTaglia(t)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      taglia === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {TAGLIE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Tipo di cibo</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(TIPO_CIBO_LABELS) as TipoCibo[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipoCibo(t)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      tipoCibo === t
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {TIPO_CIBO_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Tipo di pelo</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(PELO_LABELS) as PeloCosto[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPelo(p)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      pelo === p
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {PELO_LABELS[p]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Citta</label>
              <select
                value={citta}
                onChange={(e) => setCitta(e.target.value as Citta)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground font-medium focus:border-primary focus:outline-none"
              >
                {(Object.keys(CITTA_LABELS) as Citta[]).map((c) => (
                  <option key={c} value={c}>{CITTA_LABELS[c]}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tolettaturaProfessionale}
                  onChange={(e) => setTolettaturaProfessionale(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-border text-primary focus:ring-primary"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm">Toelettatura professionale</div>
                  <div className="text-xs text-muted-foreground">Sedute periodiche dal toelettatore</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assicurazione}
                  onChange={(e) => setAssicurazione(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-2 border-border text-primary focus:ring-primary"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm">Assicurazione sanitaria</div>
                  <div className="text-xs text-muted-foreground">Copertura spese veterinarie impreviste</div>
                </div>
              </label>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-wide mb-2">
              <Euro size={16} /> Costo annuale stimato
            </div>
            <div className="text-5xl sm:text-6xl font-extrabold mb-2">
              {risultato.annuale.toLocaleString("it-IT")}€
            </div>
            <div className="text-white/80 text-lg">
              ~{risultato.mensile.toLocaleString("it-IT")}€ al mese
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="text-sm text-white/70 mb-1">Primo anno (con setup iniziale)</div>
              <div className="text-2xl font-bold">{risultato.primoAnno.toLocaleString("it-IT")}€</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-5">Come si compone il costo</h3>
            <div className="space-y-4">
              {risultato.breakdown.map((b) => (
                <div key={b.voce}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <div className="font-semibold text-foreground text-sm">{b.voce}</div>
                      <div className="text-xs text-muted-foreground">{b.descrizione}</div>
                    </div>
                    <div className="font-bold text-foreground whitespace-nowrap ml-3">
                      {b.annuale.toLocaleString("it-IT")}€
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(b.annuale / maxVoce) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent/10 rounded-2xl p-5 flex gap-3">
            <Info size={18} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <strong>Nota:</strong> Queste sono stime indicative basate su medie italiane 2026.
              Non includono spese straordinarie (emergenze, interventi chirurgici, diete speciali).
              Per una preventivo accurato contatta un veterinario della tua zona.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/professionisti?cat=veterinario"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              Trova veterinari <ArrowRight size={16} />
            </Link>
            <Link
              href="/magazine?cat=consigli"
              className="inline-flex items-center gap-2 bg-white border-2 border-border text-foreground px-5 py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Consigli su cibo e accessori
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
