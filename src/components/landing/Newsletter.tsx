"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [cap, setCap] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, cap }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Errore durante l'iscrizione");
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
      <section id="newsletter" className="py-20 bg-primary">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <CheckCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Perfetto, ci sei!</h2>
          <p className="text-lg opacity-90">
            Ogni settimana riceverai le migliori segnalazioni di pensioni,
            spiagge e professionisti pet vicino a te.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="py-20 bg-primary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail size={48} className="mx-auto mb-6 text-white" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Resta aggiornato
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Ogni settimana ti inviamo le migliori pensioni, spiagge libere e
          professionisti pet <strong>vicino a te</strong>. Gratis, per sempre.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            required
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-foreground outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="text"
            placeholder="CAP (opzionale)"
            value={cap}
            onChange={(e) => setCap(e.target.value)}
            maxLength={5}
            pattern="[0-9]{5}"
            className="w-full sm:w-28 px-4 py-3 rounded-xl text-foreground outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-foreground text-white px-6 py-3 rounded-xl font-semibold hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Iscrivimi"}
          </button>
        </form>

        {error && <p className="mt-3 text-red-200 text-sm">{error}</p>}

        <p className="mt-4 text-sm text-white/60">
          Niente spam, solo cose utili per te e il tuo amico. Cancellati quando vuoi.
        </p>
      </div>
    </section>
  );
}
