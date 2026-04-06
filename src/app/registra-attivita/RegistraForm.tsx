"use client";

import { useState } from "react";
import { CheckCircle, Upload, Lock, Bell } from "lucide-react";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { CategoriaTipo, TipoAnimale } from "@/lib/types";

// Codici VIP validi — in produzione verranno verificati su DB
const CODICI_VALIDI = ["VIP-ADMIN", "VIP-TESTER", "BENVENUTO", "LANCIO", "FIERA2026"];

export function RegistraForm() {
  const [submitted, setSubmitted] = useState(false);
  const [waitlist, setWaitlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codiceValido, setCodiceValido] = useState(false);
  const [codiceErrore, setCodiceErrore] = useState("");

  const [form, setForm] = useState({
    nome_attivita: "",
    categoria: "" as CategoriaTipo | "",
    tipo_animale: "entrambi" as TipoAnimale,
    nome_referente: "",
    email: "",
    telefono: "",
    indirizzo: "",
    cap: "",
    comune: "",
    provincia: "",
    descrizione: "",
    servizi: "",
    sito_web: "",
    facebook_url: "",
    instagram_url: "",
    codice_sconto: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function verificaCodice() {
    const codice = form.codice_sconto.trim().toUpperCase();
    if (!codice) {
      setCodiceErrore("Inserisci un codice");
      setCodiceValido(false);
      return;
    }
    if (CODICI_VALIDI.includes(codice)) {
      setCodiceValido(true);
      setCodiceErrore("");
    } else {
      setCodiceValido(false);
      setCodiceErrore("Codice non valido");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!codiceValido) return;
    setLoading(true);
    // TODO: salvataggio reale su Neon
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  }

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          nome: form.nome_referente || form.nome_attivita,
          tipo_animale: "cane",
        }),
      });
    } catch {}
    setWaitlist(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <CheckCircle size={64} className="mx-auto mb-6 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Registrazione completata!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Il tuo profilo sara visibile dopo la verifica. Riceverai una email a breve.
        </p>
      </div>
    );
  }

  if (waitlist) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <Bell size={64} className="mx-auto mb-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Ti avviseremo!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Riceverai una email quando la registrazione sara aperta a tutti. Nel frattempo, se hai un codice invito puoi registrarti subito.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Codice invito */}
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <Lock size={28} className="mx-auto mb-3 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Hai un codice invito?</h2>
          <p className="text-sm text-muted-foreground mt-1">
            La registrazione e attualmente su invito. Se hai ricevuto un codice, inseriscilo qui.
          </p>
        </div>

        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={form.codice_sconto}
            onChange={(e) => { update("codice_sconto", e.target.value.toUpperCase()); setCodiceErrore(""); setCodiceValido(false); }}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 uppercase tracking-wider font-mono text-center"
            placeholder="ES: VIP-NOME"
          />
          <button
            type="button"
            onClick={verificaCodice}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Verifica
          </button>
        </div>

        {codiceErrore && <p className="text-red-500 text-sm text-center mt-2">{codiceErrore}</p>}
        {codiceValido && <p className="text-secondary text-sm text-center mt-2 font-semibold">Codice valido! Puoi procedere con la registrazione.</p>}

        {/* Waitlist per chi non ha codice */}
        {!codiceValido && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Non hai un codice? Lascia la tua email e ti avviseremo quando la registrazione sara aperta a tutti.
            </p>
            <form onSubmit={handleWaitlist} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="La tua email"
              />
              <button type="submit" disabled={loading}
                className="bg-foreground text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50">
                {loading ? "..." : "Avvisami"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Step 2: Form completo (solo se codice valido) */}
      {codiceValido && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-sm text-green-700 font-semibold">Codice {form.codice_sconto} attivo — registrazione gratuita</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-foreground">Dati attivita</h2>
            <p className="text-sm text-muted-foreground mt-1">Compila il form — ci vogliono meno di 5 minuti.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nome attivita *</label>
              <input type="text" required value={form.nome_attivita} onChange={(e) => update("nome_attivita", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Es: Pensione Il Rifugio di Fido" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Categoria *</label>
              <select required value={form.categoria} onChange={(e) => update("categoria", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Seleziona categoria</option>
                {Object.entries(CATEGORIE_LABELS).map(([val, lab]) => (
                  <option key={val} value={val}>{lab}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nome referente *</label>
              <input type="text" required value={form.nome_referente} onChange={(e) => update("nome_referente", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
              <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Telefono</label>
            <input type="tel" value={form.telefono} onChange={(e) => update("telefono", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Comune *</label>
              <input type="text" required value={form.comune} onChange={(e) => update("comune", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">CAP</label>
              <input type="text" maxLength={5} value={form.cap} onChange={(e) => update("cap", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Provincia</label>
              <input type="text" maxLength={2} value={form.provincia}
                onChange={(e) => update("provincia", e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30" placeholder="MI" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Descrizione *</label>
            <textarea required rows={4} value={form.descrizione} onChange={(e) => update("descrizione", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="Raccontaci cosa fai, cosa ti rende speciale..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Servizi offerti</label>
            <input type="text" value={form.servizi} onChange={(e) => update("servizi", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Es: Giardino recintato, Webcam 24h (separa con virgola)" />
          </div>

          {/* Consenso GDPR */}
          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" required className="accent-primary mt-0.5 shrink-0" />
            <span>
              Acconsento alla pubblicazione della mia attivita su MifidoDiTe.eu e dichiaro che le informazioni fornite sono veritiere.
              Accetto i <a href="/termini" className="underline text-primary">termini di servizio</a> e
              la <a href="/privacy" className="underline text-primary">privacy policy</a>.
            </span>
          </label>

          <button type="submit" disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
            {loading ? "Registrazione in corso..." : "Registra la mia attivita"}
          </button>
        </form>
      )}
    </div>
  );
}
