"use client";

import { useState } from "react";
import { CheckCircle, Upload } from "lucide-react";
import { CATEGORIE_LABELS } from "@/lib/types";
import type { CategoriaTipo, TipoAnimale } from "@/lib/types";

export function RegistraForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: salvataggio reale su Supabase + creazione utente
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <CheckCircle size={64} className="mx-auto mb-6 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Registrazione completata!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Grazie per esserti registrato. Riceverai una email con le istruzioni
          per completare il tuo profilo e iniziare a ricevere richieste.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Registra la tua attivita</h2>
        <p className="text-sm text-muted-foreground mt-1">Compila il form — ci vogliono meno di 5 minuti.</p>
      </div>

      {/* Attivita */}
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

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Tipo animale</label>
        <div className="flex gap-4">
          {(["cane", "gatto", "entrambi"] as TipoAnimale[]).map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipo_animale" value={t} checked={form.tipo_animale === t}
                onChange={() => update("tipo_animale", t)}
                className="accent-primary" />
              <span className="text-sm capitalize">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Referente */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Nome referente *</label>
          <input type="text" required value={form.nome_referente} onChange={(e) => update("nome_referente", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Mario Rossi" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
          <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="info@tuaattivita.it" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Telefono</label>
        <input type="tel" value={form.telefono} onChange={(e) => update("telefono", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="+39 333 1234567" />
      </div>

      {/* Indirizzo */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2">
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
          <input type="text" maxLength={2} value={form.provincia} onChange={(e) => update("provincia", e.target.value.toUpperCase())}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="MI" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Indirizzo</label>
        <input type="text" value={form.indirizzo} onChange={(e) => update("indirizzo", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Via Roma 1" />
      </div>

      {/* Descrizione e servizi */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Descrizione della tua attivita *</label>
        <textarea required rows={4} value={form.descrizione} onChange={(e) => update("descrizione", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="Raccontaci cosa fai, cosa ti rende speciale, perche i clienti dovrebbero sceglierti..." />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Servizi offerti</label>
        <input type="text" value={form.servizi} onChange={(e) => update("servizi", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Es: Giardino recintato, Webcam 24h, Pasti personalizzati (separa con virgola)" />
      </div>

      {/* Social */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Sito web</label>
          <input type="url" value={form.sito_web} onChange={(e) => update("sito_web", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Facebook</label>
          <input type="url" value={form.facebook_url} onChange={(e) => update("facebook_url", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="https://facebook.com/..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Instagram</label>
          <input type="url" value={form.instagram_url} onChange={(e) => update("instagram_url", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="https://instagram.com/..." />
        </div>
      </div>

      {/* Codice sconto / invito */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/50">
        <label className="block text-sm font-medium text-foreground mb-1">🎁 Hai un codice sconto o invito?</label>
        <input type="text" value={form.codice_sconto} onChange={(e) => update("codice_sconto", e.target.value.toUpperCase())}
          className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white outline-none focus:ring-2 focus:ring-primary/30 uppercase tracking-wider font-mono"
          placeholder="Es. BENVENUTO, VIP-NOME, LANCIO" />
        <p className="text-xs text-amber-700 mt-1.5">Se te l'ha dato un amico o un professionista, inseriscilo per ottenere vantaggi esclusivi.</p>
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
        {loading ? "Registrazione in corso..." : "Registra la mia attivita — gratis"}
      </button>

      <p className="text-xs text-center text-muted-foreground">
        Registrandoti accetti i nostri <a href="/termini" className="underline">termini di servizio</a> e
        la <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}
