"use client";

import { useMemo, useState } from "react";
import { Utensils, Info, Dog, Activity } from "lucide-react";

type Eta = "cucciolo" | "adulto" | "senior";
type Attivita = "basso" | "medio" | "alto";
type TipoCibo = "secco" | "umido" | "misto";

function fabbisognoCalorie(pesoKg: number, eta: Eta, attivita: Attivita): number {
  // Formula MER (Maintenance Energy Requirement)
  // RER = 70 * (peso^0.75)
  const rer = 70 * Math.pow(pesoKg, 0.75);
  // Moltiplicatore per stato
  const mul =
    eta === "cucciolo" ? 2.5 :
    eta === "senior" ? 1.2 :
    attivita === "basso" ? 1.4 :
    attivita === "medio" ? 1.6 :
    1.8;
  return Math.round(rer * mul);
}

function razioneCrocchette(kcalDay: number): number {
  // Media crocchette ~370 kcal/100g
  return Math.round((kcalDay / 370) * 100);
}

function razioneUmido(kcalDay: number): number {
  // Media umido ~90 kcal/100g
  return Math.round((kcalDay / 90) * 100);
}

export function CalcolatoreRazioniClient() {
  const [peso, setPeso] = useState<number>(15);
  const [eta, setEta] = useState<Eta>("adulto");
  const [attivita, setAttivita] = useState<Attivita>("medio");
  const [tipoCibo, setTipoCibo] = useState<TipoCibo>("secco");

  const kcal = useMemo(() => fabbisognoCalorie(peso, eta, attivita), [peso, eta, attivita]);
  const gSecco = useMemo(() => razioneCrocchette(kcal), [kcal]);
  const gUmido = useMemo(() => razioneUmido(kcal), [kcal]);

  const pastiGiornalieri = eta === "cucciolo" ? 3 : 2;
  const gSeccoPerPasto = Math.round(gSecco / pastiGiornalieri);
  const gUmidoPerPasto = Math.round(gUmido / pastiGiornalieri);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-foreground mb-6">Il tuo cane</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Peso (kg)</label>
              <input
                type="number"
                min={1}
                max={100}
                step={0.5}
                value={peso}
                onChange={(e) => setPeso(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-foreground text-lg font-semibold focus:border-primary focus:outline-none"
              />
              <input
                type="range"
                min={1}
                max={70}
                step={0.5}
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
                className="w-full mt-3 accent-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Eta</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { val: "cucciolo", label: "Cucciolo", desc: "<1 anno" },
                  { val: "adulto", label: "Adulto", desc: "1-7 anni" },
                  { val: "senior", label: "Senior", desc: "7+ anni" },
                ] as const).map((e) => (
                  <button
                    key={e.val}
                    onClick={() => setEta(e.val)}
                    className={`px-2 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                      eta === e.val
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <div>{e.label}</div>
                    <div className="text-[10px] font-normal opacity-70">{e.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Livello di attivita</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { val: "basso", label: "Basso" },
                  { val: "medio", label: "Medio" },
                  { val: "alto", label: "Alto" },
                ] as const).map((a) => (
                  <button
                    key={a.val}
                    onClick={() => setAttivita(a.val)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      attivita === a.val
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Basso: passeggiate corte. Medio: 2 passeggiate al giorno. Alto: sport, corsa, lunghe escursioni.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Tipo di alimentazione</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { val: "secco", label: "Secco" },
                  { val: "umido", label: "Umido" },
                  { val: "misto", label: "Misto" },
                ] as const).map((t) => (
                  <button
                    key={t.val}
                    onClick={() => setTipoCibo(t.val)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                      tipoCibo === t.val
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-white text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-wide mb-2">
              <Activity size={16} /> Fabbisogno calorico giornaliero
            </div>
            <div className="text-5xl sm:text-6xl font-extrabold mb-2">
              {kcal.toLocaleString("it-IT")} <span className="text-2xl font-bold text-white/70">kcal</span>
            </div>
            <div className="text-white/80 text-sm">Calcolato su peso, eta e attivita</div>
          </div>

          <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <Utensils size={18} className="text-primary" /> Razione giornaliera
            </h3>
            <div className="space-y-5">
              {(tipoCibo === "secco" || tipoCibo === "misto") && (
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="font-semibold text-foreground">Crocchette (secco)</div>
                    <div className="text-2xl font-extrabold text-primary">
                      {tipoCibo === "misto" ? Math.round(gSecco / 2) : gSecco}<span className="text-sm">g</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tipoCibo === "misto" ? `Meta razione (mix con umido)` : `In ${pastiGiornalieri} pasti da ${gSeccoPerPasto}g ciascuno`}
                  </p>
                </div>
              )}

              {(tipoCibo === "umido" || tipoCibo === "misto") && (
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="font-semibold text-foreground">Umido (cibo in scatola)</div>
                    <div className="text-2xl font-extrabold text-primary">
                      {tipoCibo === "misto" ? Math.round(gUmido / 2) : gUmido}<span className="text-sm">g</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tipoCibo === "misto" ? `Meta razione (mix con secco)` : `In ${pastiGiornalieri} pasti da ${gUmidoPerPasto}g ciascuno`}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-border text-sm text-muted-foreground">
                Numero pasti giornalieri consigliati: <strong className="text-foreground">{pastiGiornalieri}</strong>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
            <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <strong>Come applicare:</strong> pesati il cane ogni 2 settimane. Se ingrassa, riduci del 10%. Se dimagrisce, aumenta del 10%. I valori calorici sulle etichette dei cibi variano: controlla sempre la confezione specifica.
            </div>
          </div>
        </div>
      </div>

      {/* Info extra */}
      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-bold text-foreground mb-2 flex items-center gap-2"><Dog size={16} className="text-primary" /> Come funziona il calcolo</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Usiamo la formula veterinaria <strong>RER (Resting Energy Requirement) = 70 × peso<sup>0.75</sup></strong>, moltiplicata per un coefficiente che dipende da eta e attivita. E lo stesso metodo che usano i veterinari e FEDIAF (European Pet Food Industry Federation).</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-bold text-foreground mb-2">Perche questi valori?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Assumiamo 370 kcal/100g per le crocchette premium medie e 90 kcal/100g per l&apos;umido. I cibi low-calorie o high-performance possono differire del &plusmn;20%. Controlla sempre l&apos;etichetta.</p>
        </div>
      </div>
    </div>
  );
}
