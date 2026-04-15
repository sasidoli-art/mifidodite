"use client";

import { useMemo, useState } from "react";
import { Clock, Cake, Info, Sparkles } from "lucide-react";

type TagliaUcsd = "piccola" | "media" | "grande" | "gigante";

/**
 * Formula UCSD 2019 con aggiustamenti per taglia.
 * https://www.biorxiv.org/content/10.1101/829192v1
 * Base: 16 * ln(eta_cane) + 31 per cani medi
 * Aggiustamento per taglia (empirico, basato su vita media)
 */
function etaUmana(etaCane: number, taglia: TagliaUcsd): number {
  if (etaCane <= 0) return 0;
  if (etaCane < 1) {
    // Cuccioli: 15 anni umani al primo anno, scalato
    return Math.round(etaCane * 15);
  }

  // Formula UCSD base
  let eta = 16 * Math.log(etaCane) + 31;

  // Aggiustamento taglia: i cani grandi invecchiano piu veloce
  const adjust =
    taglia === "piccola" ? -2 :
    taglia === "media" ? 0 :
    taglia === "grande" ? 3 :
    6; // gigante

  eta += adjust;
  return Math.max(15, Math.round(eta));
}

function stadioVita(etaCane: number, vitaMedia: number): { label: string; emoji: string; desc: string } {
  const ratio = etaCane / vitaMedia;
  if (ratio < 0.1) return { label: "Neonato", emoji: "👶", desc: "I primi passi nel mondo" };
  if (ratio < 0.25) return { label: "Cucciolo", emoji: "🐶", desc: "Piena energia e curiosita" };
  if (ratio < 0.45) return { label: "Giovane", emoji: "🏃", desc: "Vigore massimo" };
  if (ratio < 0.75) return { label: "Adulto", emoji: "🐕", desc: "Eta matura e stabile" };
  if (ratio < 0.95) return { label: "Anziano", emoji: "🎩", desc: "Rallenta, ma sempre con te" };
  return { label: "Veterano", emoji: "👴", desc: "Un saggio nella sua eta d'oro" };
}

function vitaMediaPerTaglia(taglia: TagliaUcsd): number {
  return taglia === "piccola" ? 15 : taglia === "media" ? 13 : taglia === "grande" ? 11 : 9;
}

export function CalcolatoreEtaClient() {
  const [anni, setAnni] = useState(3);
  const [mesi, setMesi] = useState(0);
  const [taglia, setTaglia] = useState<TagliaUcsd>("media");

  const etaCane = anni + mesi / 12;
  const etaUm = useMemo(() => etaUmana(etaCane, taglia), [etaCane, taglia]);
  const vitaMedia = vitaMediaPerTaglia(taglia);
  const stadio = useMemo(() => stadioVita(etaCane, vitaMedia), [etaCane, vitaMedia]);
  const percentualeVita = Math.min(100, Math.round((etaCane / vitaMedia) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-foreground mb-6">Il tuo cane</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Eta (anni)</label>
              <input
                type="number"
                min={0}
                max={25}
                step={1}
                value={anni}
                onChange={(e) => setAnni(Math.max(0, Math.min(25, Number(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-lg font-semibold focus:border-primary focus:outline-none"
              />
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={anni}
                onChange={(e) => setAnni(Number(e.target.value))}
                className="w-full mt-3 accent-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Mesi aggiuntivi</label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 3, 6, 9].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMesi(m)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      mesi === m
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {m === 0 ? "0" : `+${m}m`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Taglia</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { val: "piccola", label: "Piccola", desc: "< 10 kg" },
                  { val: "media", label: "Media", desc: "10-25 kg" },
                  { val: "grande", label: "Grande", desc: "25-45 kg" },
                  { val: "gigante", label: "Gigante", desc: "> 45 kg" },
                ] as const).map((t) => (
                  <button
                    key={t.val}
                    onClick={() => setTaglia(t.val)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
                      taglia === t.val
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <div className="text-sm font-semibold">{t.label}</div>
                    <div className="text-[11px] opacity-70">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-wide mb-2">
              <Cake size={16} /> Il tuo cane ha
            </div>
            <div className="text-6xl sm:text-7xl font-extrabold mb-2">
              {etaUm}<span className="text-2xl font-bold text-white/70 ml-2">anni umani</span>
            </div>
            <div className="text-white/80 text-lg">{anni} {anni === 1 ? "anno" : "anni"}{mesi > 0 ? ` e ${mesi} mesi` : ""} di eta canina</div>
          </div>

          <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Stadio di vita</h3>
            <div className="flex items-center gap-4 mb-5">
              <div className="text-5xl">{stadio.emoji}</div>
              <div>
                <div className="text-2xl font-extrabold text-foreground">{stadio.label}</div>
                <div className="text-sm text-muted-foreground">{stadio.desc}</div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="text-muted-foreground font-medium">Vita media della taglia</span>
                <span className="font-semibold text-foreground">{etaCane.toFixed(1)} / {vitaMedia} anni</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${percentualeVita}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Ha vissuto circa il <strong>{percentualeVita}%</strong> dell&apos;aspettativa di vita media per la sua taglia.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-3">
            <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong>Perche non 7 anni per 1?</strong> La vecchia regola e sbagliata. Uno studio UCSD 2019 (Wang et al.) ha mostrato che i cani invecchiano molto velocemente all&apos;inizio (1 anno = 15 umani) e piu lentamente dopo. La taglia pesa tantissimo: un Alano invecchia 2x un Chihuahua.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border p-6 text-center">
        <Sparkles className="mx-auto text-primary mb-3" size={28} />
        <h3 className="text-xl font-bold text-foreground mb-2">Vuoi sapere anche quanto costa mantenerlo?</h3>
        <p className="text-muted-foreground mb-4">Abbiamo anche il calcolatore di costi annuali e razioni giornaliere.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/costo-cane" className="bg-primary text-white font-semibold rounded-full px-5 py-2.5 hover:bg-primary-dark transition-colors text-sm">Calcola costo annuale</a>
          <a href="/razioni-cane" className="bg-white border-2 border-border text-foreground font-semibold rounded-full px-5 py-2.5 hover:border-primary hover:text-primary transition-colors text-sm">Calcola razioni</a>
        </div>
      </div>
    </div>
  );
}
