"use client";

import { useState } from "react";
import { Mail, CheckCircle, Send, Dog, Cat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [cap, setCap] = useState("");
  const [animale, setAnimale] = useState("cane");
  const [nomeAnimale, setNomeAnimale] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gdpr) { setError("Devi accettare la privacy policy."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, cap, tipo_animale: animale, nome_animale: nomeAnimale }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Errore"); }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore");
    } finally { setLoading(false); }
  }

  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-primary mb-4 block">Newsletter</span>
            <h2 className="text-[42px] font-extrabold leading-tight tracking-tight text-white mb-5">
              Resta aggiornato,
              <br />
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">ogni settimana</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Ricevi 3 articoli selezionati, offerte esclusive e segnalazioni SOS smarriti della tua zona. Gratis, per sempre.
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-[20px] p-10 text-center"
                >
                  <CheckCircle size={48} className="mx-auto mb-4 text-secondary" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ci sei{nomeAnimale ? `, ${nomeAnimale} ti ringrazia` : ""}!
                  </h3>
                  <p className="text-white/60">Ogni settimana riceverai le migliori novita per il tuo {animale}.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-[20px] p-8 space-y-4"
                >
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="email" required placeholder="La tua email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-primary/50 text-sm" />
                  </div>

                  <div className="flex gap-3">
                    <input type="text" placeholder="CAP" value={cap}
                      onChange={(e) => setCap(e.target.value)} maxLength={5}
                      className="w-24 px-4 py-3.5 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none text-sm text-center" />
                    <div className="flex gap-2 flex-1">
                      <button type="button" onClick={() => setAnimale("cane")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all ${animale === "cane" ? "bg-primary text-white" : "bg-white/10 text-white/50 border border-white/10"}`}>
                        <Dog size={16} /> Cane
                      </button>
                      <button type="button" onClick={() => setAnimale("gatto")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all ${animale === "gatto" ? "bg-primary text-white" : "bg-white/10 text-white/50 border border-white/10"}`}>
                        <Cat size={16} /> Gatto
                      </button>
                    </div>
                  </div>

                  <input type="text" placeholder={`Come si chiama il tuo ${animale}?`} value={nomeAnimale}
                    onChange={(e) => setNomeAnimale(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 outline-none text-sm" />

                  <label className="flex items-start gap-2 text-xs text-white/40 cursor-pointer">
                    <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)}
                      className="accent-primary mt-0.5 shrink-0" />
                    <span>Acconsento al trattamento dei dati per la newsletter. <a href="/privacy" className="text-primary underline" target="_blank">Privacy Policy</a></span>
                  </label>

                  {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                  <button type="submit" disabled={loading}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 text-sm">
                    <Send size={16} /> {loading ? "Un momento..." : "Iscrivimi gratis"}
                  </button>

                  <p className="text-center text-[11px] text-white/25">Niente spam, puoi disiscriverti in 1 click.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
