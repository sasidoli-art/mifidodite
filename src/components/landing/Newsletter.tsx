"use client";

import { useState } from "react";
import { Mail, CheckCircle, Send, Dog, Cat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Newsletter() {
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
        body: JSON.stringify({
          email,
          cap,
          tipo_animale: animale,
          nome_animale: nomeAnimale,
        }),
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

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-[10%] text-white/5 text-7xl rotate-12">🐾</div>
        <div className="absolute bottom-8 right-[15%] text-white/5 text-8xl -rotate-12">🐾</div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" className="text-center"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <CheckCircle size={64} className="mx-auto mb-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Perfetto{nomeAnimale ? `, ci vediamo con ${nomeAnimale}` : ""}!
              </h2>
              <p className="text-lg text-white/80">
                Ogni settimana riceverai consigli e segnalazioni personalizzate per il tuo {animale}.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" className="text-center">
              <AnimatedSection>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
                  <Mail size={32} className="text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Resta aggiornato
                </h2>
                <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto">
                  Ogni settimana consigli, offerte e professionisti <strong className="text-white">vicino a te</strong>, personalizzati per il tuo amico. Gratis.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/15">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Riga 1: email + CAP */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="email" required placeholder="La tua email" value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-foreground outline-none focus:ring-2 focus:ring-white/50 shadow-sm text-base placeholder:text-muted-foreground/60" />
                      </div>
                      <div className="sm:w-28">
                        <input type="text" placeholder="CAP" value={cap}
                          onChange={(e) => setCap(e.target.value)} maxLength={5} pattern="[0-9]{5}"
                          className="w-full px-4 py-3.5 rounded-xl bg-white text-foreground outline-none focus:ring-2 focus:ring-white/50 shadow-sm text-base text-center placeholder:text-muted-foreground/60" />
                      </div>
                    </div>

                    {/* Riga 2: tipo animale + nome (i dati preziosi) */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setAnimale("cane")}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                            animale === "cane"
                              ? "bg-white text-primary shadow-sm"
                              : "bg-white/20 text-white/80 hover:bg-white/30"
                          }`}>
                          <Dog size={18} /> Cane
                        </button>
                        <button type="button" onClick={() => setAnimale("gatto")}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                            animale === "gatto"
                              ? "bg-white text-primary shadow-sm"
                              : "bg-white/20 text-white/80 hover:bg-white/30"
                          }`}>
                          <Cat size={18} /> Gatto
                        </button>
                      </div>
                      <div className="flex-1">
                        <input type="text" placeholder={`Come si chiama il tuo ${animale}?`} value={nomeAnimale}
                          onChange={(e) => setNomeAnimale(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl bg-white text-foreground outline-none focus:ring-2 focus:ring-white/50 shadow-sm text-base placeholder:text-muted-foreground/60" />
                      </div>
                    </div>

                    <motion.button type="submit" disabled={loading}
                      className="w-full sm:w-auto sm:px-10 bg-white text-primary py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors disabled:opacity-50 shadow-lg mx-auto"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Send size={18} />
                      {loading ? "Un momento..." : "Iscrivimi alla newsletter"}
                    </motion.button>
                  </form>

                  {error && (
                    <motion.p className="mt-3 text-red-200 text-sm text-center"
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      {error}
                    </motion.p>
                  )}
                </div>

                <p className="mt-5 text-sm text-white/40">
                  Niente spam, solo cose utili per te e {nomeAnimale || `il tuo ${animale}`}. Cancellati quando vuoi.
                </p>
              </AnimatedSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
