"use client";

import { useState } from "react";
import { CheckCircle, Heart, HandHeart, Search } from "lucide-react";
import Link from "next/link";

type TipoAnnuncio = "adotta" | "offro" | "cerco";

export function PubblicaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    tipo: "" as TipoAnnuncio | "",
    // Animale
    specie: "cane",
    nome_animale: "",
    razza: "",
    sesso: "non_specificato",
    eta_mesi: "",
    taglia: "",
    colore: "",
    // Descrizione
    titolo: "",
    descrizione: "",
    carattere: "",
    // Salute
    vaccinato: false,
    sterilizzato: false,
    microchip: false,
    compatibile_bambini: "",
    compatibile_cani: "",
    compatibile_gatti: "",
    note_salute: "",
    // Localizzazione
    comune: "",
    provincia: "",
    // Contatto
    nome_contatto: "",
    email_contatto: "",
    telefono_contatto: "",
    tipo_contatto: "privato",
    nome_organizzazione: "",
    // Policy
    richiesta_preaffido: false,
    costo_adozione: "",
  });

  function update(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/adozioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      // errore
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <CheckCircle size={64} className="mx-auto mb-6 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Annuncio inviato!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Il tuo annuncio sara verificato dal nostro team entro 24 ore.
          Riceverai una email quando sara pubblicato.
        </p>
        <Link href="/adozioni" className="inline-block mt-6 text-primary font-semibold hover:underline">
          Torna alle adozioni
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step 1: Tipo annuncio */}
      {step >= 1 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">1. Tipo di annuncio</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "adotta" as const, icon: Heart, label: "Offro in adozione", desc: "Un animale cerca famiglia", color: "border-red-300 bg-red-50" },
              { id: "offro" as const, icon: HandHeart, label: "Cerco nuova casa", desc: "Devo trovare una famiglia per il mio animale", color: "border-orange-300 bg-orange-50" },
              { id: "cerco" as const, icon: Search, label: "Cerco animale", desc: "Voglio adottare", color: "border-blue-300 bg-blue-50" },
            ].map((t) => (
              <button key={t.id} type="button"
                onClick={() => { update("tipo", t.id); if (step === 1) setStep(2); }}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  form.tipo === t.id ? t.color + " shadow-sm" : "border-border hover:border-primary/30"
                }`}
              >
                <t.icon size={24} className={`mx-auto mb-2 ${form.tipo === t.id ? "text-primary" : "text-muted-foreground"}`} />
                <p className="font-semibold text-sm">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Dati animale */}
      {step >= 2 && form.tipo && (
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">2. L'animale</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Specie *</label>
                <select value={form.specie} onChange={(e) => update("specie", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="cane">Cane</option>
                  <option value="gatto">Gatto</option>
                  <option value="coniglio">Coniglio</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              {form.tipo !== "cerco" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Nome dell'animale</label>
                  <input type="text" value={form.nome_animale} onChange={(e) => update("nome_animale", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Es: Luna" />
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Razza</label>
                <input type="text" value={form.razza} onChange={(e) => update("razza", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Es: Meticcio, Labrador" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sesso</label>
                <select value={form.sesso} onChange={(e) => update("sesso", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="non_specificato">Non specificato</option>
                  <option value="maschio">Maschio</option>
                  <option value="femmina">Femmina</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Taglia</label>
                <select value={form.taglia} onChange={(e) => update("taglia", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">Non specificata</option>
                  <option value="piccola">Piccola (0-10 kg)</option>
                  <option value="media">Media (10-25 kg)</option>
                  <option value="grande">Grande (25-45 kg)</option>
                  <option value="gigante">Gigante (45+ kg)</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Eta (in mesi)</label>
                <input type="number" min="0" max="300" value={form.eta_mesi} onChange={(e) => update("eta_mesi", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Es: 24 (= 2 anni)" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Colore</label>
                <input type="text" value={form.colore} onChange={(e) => update("colore", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Es: Marrone e bianco" />
              </div>
            </div>
          </div>
          {step === 2 && <button type="button" onClick={() => setStep(3)} className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold">Continua</button>}
        </div>
      )}

      {/* Step 3: Descrizione */}
      {step >= 3 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">3. Racconta la storia</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titolo annuncio *</label>
              <input type="text" required value={form.titolo} onChange={(e) => update("titolo", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Es: Luna cerca una famiglia con giardino" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descrizione dettagliata *</label>
              <textarea required rows={6} value={form.descrizione} onChange={(e) => update("descrizione", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                placeholder="Racconta la storia dell'animale, il suo carattere, perche cerchi una famiglia, cosa serve..." />
              <p className="text-xs text-muted-foreground mt-1">Piu dettagli scrivi, piu possibilita hai di trovare la famiglia giusta.</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Carattere (opzionale)</label>
              <input type="text" value={form.carattere} onChange={(e) => update("carattere", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Es: Socievole, giocherellone, ama i bambini" />
            </div>

            {form.tipo !== "cerco" && (
              <>
                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.vaccinato} onChange={(e) => update("vaccinato", e.target.checked)} className="accent-primary" />
                    Vaccinato
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.sterilizzato} onChange={(e) => update("sterilizzato", e.target.checked)} className="accent-primary" />
                    Sterilizzato/a
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.microchip} onChange={(e) => update("microchip", e.target.checked)} className="accent-primary" />
                    Microchip
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Note sulla salute</label>
                  <input type="text" value={form.note_salute} onChange={(e) => update("note_salute", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Es: Allergia al pollo, prende farmaco X (lascia vuoto se tutto ok)" />
                </div>
              </>
            )}
          </div>
          {step === 3 && <button type="button" onClick={() => setStep(4)} className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold">Continua</button>}
        </div>
      )}

      {/* Step 4: Contatto e localizzazione */}
      {step >= 4 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">4. I tuoi dati</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Il tuo nome *</label>
                <input type="text" required value={form.nome_contatto} onChange={(e) => update("nome_contatto", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" required value={form.email_contatto} onChange={(e) => update("email_contatto", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Telefono</label>
                <input type="tel" value={form.telefono_contatto} onChange={(e) => update("telefono_contatto", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Comune *</label>
                <input type="text" required value={form.comune} onChange={(e) => update("comune", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Provincia *</label>
                <input type="text" required maxLength={2} value={form.provincia}
                  onChange={(e) => update("provincia", e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="MI" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sei un...</label>
              <select value={form.tipo_contatto} onChange={(e) => update("tipo_contatto", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                <option value="privato">Privato</option>
                <option value="rifugio">Rifugio / Canile</option>
                <option value="associazione">Associazione</option>
              </select>
            </div>
            {form.tipo_contatto !== "privato" && (
              <div>
                <label className="block text-sm font-medium mb-1">Nome organizzazione</label>
                <input type="text" value={form.nome_organizzazione} onChange={(e) => update("nome_organizzazione", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            )}
            {form.tipo !== "cerco" && (
              <div>
                <label className="block text-sm font-medium mb-1">Costo adozione</label>
                <input type="text" value={form.costo_adozione} onChange={(e) => update("costo_adozione", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Es: Gratuito, Rimborso spese 80€" />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
            <Heart size={20} />
            {loading ? "Invio in corso..." : "Pubblica annuncio"}
          </button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            L'annuncio sara verificato dal nostro team entro 24 ore prima della pubblicazione.
          </p>
        </div>
      )}
    </form>
  );
}
