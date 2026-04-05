"use client";

import { useState } from "react";
import { Mail, CheckCircle, Send, Dog, Cat, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function NewsletterPopup({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [cap, setCap] = useState("");
  const [animale, setAnimale] = useState("cane");
  const [nomeAnimale, setNomeAnimale] = useState("");
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
        body: JSON.stringify({ email, cap, tipo_animale: animale, nome_animale: nomeAnimale }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Errore");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-border">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg z-10" aria-label="Chiudi">
          <X size={20} className="text-muted-foreground" />
        </button>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle size={56} className="mx-auto mb-4 text-secondary" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ci sei{nomeAnimale ? `, ${nomeAnimale} ti ringrazia` : ""}! 🐾
            </h2>
            <p className="text-muted-foreground">
              Ogni settimana riceverai consigli e segnalazioni per il tuo {animale}.
            </p>
            <button onClick={onClose} className="mt-6 text-primary font-semibold hover:underline">
              Continua a navigare
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-center">
              <Mail size={32} className="mx-auto mb-3 text-white" />
              <h2 className="text-xl font-bold text-white">Resta aggiornato</h2>
              <p className="text-white/80 text-sm mt-1">
                Consigli, offerte e professionisti vicino a te. Gratis.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" required placeholder="La tua email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>

              {/* CAP + Animale */}
              <div className="flex gap-3">
                <input type="text" placeholder="CAP" value={cap}
                  onChange={(e) => setCap(e.target.value)} maxLength={5}
                  className="w-24 px-3 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/30 text-sm text-center" />
                <div className="flex gap-2 flex-1">
                  <button type="button" onClick={() => setAnimale("cane")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      animale === "cane" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}>
                    <Dog size={16} /> Cane
                  </button>
                  <button type="button" onClick={() => setAnimale("gatto")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      animale === "gatto" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}>
                    <Cat size={16} /> Gatto
                  </button>
                </div>
              </div>

              {/* Nome animale */}
              <input type="text" placeholder={`Come si chiama il tuo ${animale}?`} value={nomeAnimale}
                onChange={(e) => setNomeAnimale(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary/30 text-sm" />

              {/* Consenso GDPR */}
              <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
                <input type="checkbox" required className="accent-primary mt-0.5 shrink-0" />
                <span>
                  Acconsento al trattamento dei miei dati per l&apos;invio della newsletter settimanale.
                  Posso cancellarmi in qualsiasi momento. <a href="/privacy" className="underline text-primary">Privacy Policy</a>
                </span>
              </label>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                <Send size={16} />
                {loading ? "Un momento..." : "Iscrivimi gratis"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
