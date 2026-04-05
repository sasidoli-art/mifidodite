"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import type { LeadRequest, TipoAnimale } from "@/lib/types";

interface LeadFormProps {
  strutturaId: string;
  strutturaNome: string;
}

export function LeadForm({ strutturaId, strutturaNome }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<LeadRequest>({
    struttura_id: strutturaId,
    nome: "",
    email: "",
    telefono: "",
    data_inizio: "",
    data_fine: "",
    numero_animali: 1,
    tipo_animale: "cane",
    taglia: "",
    note: "",
  });

  function updateField<K extends keyof LeadRequest>(
    key: K,
    value: LeadRequest[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Errore durante l'invio");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <CheckCircle size={48} className="mx-auto mb-4 text-secondary" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          Richiesta inviata!
        </h3>
        <p className="text-muted-foreground">
          Abbiamo inoltrato la tua richiesta a <strong>{strutturaNome}</strong>.
          Riceverai una risposta al piu presto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground">
          Chiedi disponibilita
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Compila il form e <strong>{strutturaNome}</strong> ricevera la tua
          richiesta
        </p>
      </div>

      {/* Nome + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Il tuo nome *
          </label>
          <input
            type="text"
            required
            value={form.nome}
            onChange={(e) => updateField("nome", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Mario Rossi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="mario@email.it"
          />
        </div>
      </div>

      {/* Telefono */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Telefono (opzionale)
        </label>
        <input
          type="tel"
          value={form.telefono}
          onChange={(e) => updateField("telefono", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="+39 333 1234567"
        />
      </div>

      {/* Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Dal
          </label>
          <input
            type="date"
            value={form.data_inizio}
            onChange={(e) => updateField("data_inizio", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Al
          </label>
          <input
            type="date"
            value={form.data_fine}
            onChange={(e) => updateField("data_fine", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Animale */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Tipo animale
          </label>
          <select
            value={form.tipo_animale}
            onChange={(e) =>
              updateField("tipo_animale", e.target.value as TipoAnimale)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="cane">Cane</option>
            <option value="gatto">Gatto</option>
            <option value="entrambi">Entrambi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Quanti animali
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={form.numero_animali}
            onChange={(e) =>
              updateField("numero_animali", parseInt(e.target.value) || 1)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Taglia
          </label>
          <select
            value={form.taglia}
            onChange={(e) => updateField("taglia", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Non specificata</option>
            <option value="piccola">Piccola (0-10 kg)</option>
            <option value="media">Media (10-25 kg)</option>
            <option value="grande">Grande (25+ kg)</option>
          </select>
        </div>
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Note o richieste particolari
        </label>
        <textarea
          value={form.note}
          onChange={(e) => updateField("note", e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="Es: il mio cane ha bisogno di medicine, e timido con gli altri cani..."
        />
      </div>

      {/* Consenso GDPR */}
      <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
        <input type="checkbox" required className="accent-primary mt-0.5 shrink-0" />
        <span>
          Acconsento all&apos;invio dei miei dati a <strong>{strutturaNome}</strong> per ricevere una risposta alla mia richiesta.{" "}
          <a href="/privacy" className="underline text-primary">Privacy Policy</a>
        </span>
      </label>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        <Send size={18} />
        {loading ? "Invio in corso..." : "Chiedi disponibilita"}
      </button>
    </form>
  );
}
