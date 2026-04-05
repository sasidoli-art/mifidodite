"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CheckCircle, AlertTriangle, Heart } from "lucide-react";
import Link from "next/link";

export default function SegnalaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    tipo: "" as "perso" | "trovato" | "",
    specie: "cane",
    nome_animale: "",
    razza: "",
    colore: "",
    taglia: "",
    descrizione: "",
    data_evento: "",
    ora_evento: "",
    indirizzo_evento: "",
    comune: "",
    provincia: "",
    nome_contatto: "",
    telefono_contatto: "",
    email_contatto: "",
    ricompensa: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/sos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSubmitted(true);
    } catch {} finally { setLoading(false); }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex-1 py-20">
          <div className="max-w-md mx-auto text-center bg-white rounded-2xl p-10 shadow-sm">
            <CheckCircle size={64} className="mx-auto mb-6 text-secondary" />
            <h2 className="text-2xl font-bold mb-3">Segnalazione pubblicata!</h2>
            <p className="text-muted-foreground">La tua segnalazione e ora visibile a tutti. In bocca al lupo!</p>
            <Link href="/sos-smarriti" className="inline-block mt-6 text-primary font-semibold hover:underline">Torna a SOS Smarriti</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">Segnala smarrimento</h1>
          <p className="text-center text-muted-foreground mb-10">Piu dettagli inserisci, piu possibilita hai di ritrovare il tuo amico.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Tipo di segnalazione</h2>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => update("tipo", "perso")}
                  className={`p-4 rounded-xl border-2 text-center ${form.tipo === "perso" ? "border-red-400 bg-red-50" : "border-border"}`}>
                  <AlertTriangle size={24} className={`mx-auto mb-1 ${form.tipo === "perso" ? "text-red-500" : "text-muted-foreground"}`} />
                  <span className="font-bold text-sm">Ho perso</span>
                </button>
                <button type="button" onClick={() => update("tipo", "trovato")}
                  className={`p-4 rounded-xl border-2 text-center ${form.tipo === "trovato" ? "border-green-400 bg-green-50" : "border-border"}`}>
                  <Heart size={24} className={`mx-auto mb-1 ${form.tipo === "trovato" ? "text-green-500" : "text-muted-foreground"}`} />
                  <span className="font-bold text-sm">Ho trovato</span>
                </button>
              </div>
            </div>

            {form.tipo && (
              <>
                {/* Animale */}
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="font-bold text-lg">L'animale</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Specie *</label>
                      <select value={form.specie} onChange={(e) => update("specie", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                        <option value="cane">Cane</option>
                        <option value="gatto">Gatto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome (se noto)</label>
                      <input type="text" value={form.nome_animale} onChange={(e) => update("nome_animale", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Razza</label>
                      <input type="text" value={form.razza} onChange={(e) => update("razza", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Es: Meticcio" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Colore *</label>
                      <input type="text" required value={form.colore} onChange={(e) => update("colore", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Es: Nero con petto bianco" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Taglia</label>
                      <select value={form.taglia} onChange={(e) => update("taglia", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                        <option value="">-</option>
                        <option value="piccola">Piccola</option>
                        <option value="media">Media</option>
                        <option value="grande">Grande</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrizione dettagliata *</label>
                    <textarea required rows={4} value={form.descrizione} onChange={(e) => update("descrizione", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      placeholder="Collare, segni particolari, comportamento, cosa fare se lo si vede..." />
                  </div>
                </div>

                {/* Dove e quando */}
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="font-bold text-lg">Dove e quando</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Data *</label>
                      <input type="date" required value={form.data_evento} onChange={(e) => update("data_evento", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Ora (circa)</label>
                      <input type="time" value={form.ora_evento} onChange={(e) => update("ora_evento", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Zona / indirizzo *</label>
                    <input type="text" required value={form.indirizzo_evento} onChange={(e) => update("indirizzo_evento", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Es: Via Roma, zona parco, vicino al supermercato..." />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Comune *</label>
                      <input type="text" required value={form.comune} onChange={(e) => update("comune", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Provincia *</label>
                      <input type="text" required maxLength={2} value={form.provincia}
                        onChange={(e) => update("provincia", e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" placeholder="MI" />
                    </div>
                  </div>
                </div>

                {/* Contatto */}
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="font-bold text-lg">I tuoi contatti</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome *</label>
                      <input type="text" required value={form.nome_contatto} onChange={(e) => update("nome_contatto", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Telefono *</label>
                      <input type="tel" required value={form.telefono_contatto} onChange={(e) => update("telefono_contatto", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="+39 333 1234567" />
                    </div>
                  </div>
                  {form.tipo === "perso" && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Ricompensa (opzionale)</label>
                      <input type="text" value={form.ricompensa} onChange={(e) => update("ricompensa", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Es: Offro ricompensa 100€" />
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input type="checkbox" required className="accent-primary mt-0.5 shrink-0" />
                  <span>
                    Autorizzo la pubblicazione di questa segnalazione e dei miei contatti (telefono, nome) su MifidoDiTe.eu.
                    I dati saranno visibili pubblicamente. <a href="/privacy" className="underline text-primary">Privacy Policy</a>
                  </span>
                </label>

                <button type="submit" disabled={loading}
                  className={`w-full mt-2 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
                    form.tipo === "perso" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}>
                  <AlertTriangle size={20} />
                  {loading ? "Pubblicazione..." : "Pubblica segnalazione"}
                </button>
              </>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
