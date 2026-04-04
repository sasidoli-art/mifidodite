"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Tag, MapPin, Clock, Filter, X, Percent, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { OFFERTE_SEED, CATEGORIE_PRODOTTO } from "@/lib/offerte-seed";
import type { OffertaSeed } from "@/lib/offerte-seed";

export default function OffertePage() {
  const [categoria, setCategoria] = useState("");
  const [provincia, setProvincia] = useState("");

  const province = [...new Set(OFFERTE_SEED.map((o) => o.provincia))].sort();

  const filtered = OFFERTE_SEED.filter((o) => {
    if (categoria && o.categoria_prodotto !== categoria) return false;
    if (provincia && o.provincia !== provincia) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero — gradiente con pattern */}
        <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-600 py-20">
          {/* Pattern decorativo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white"
                style={{ top: `${10 + i * 15}%`, left: `${5 + i * 18}%`, fontSize: `${50 + i * 10}px` }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                🏷️
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-sm font-medium text-white/90">Aggiornate ogni settimana</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Offerte e Volantini
              <br />
              <span className="text-yellow-300">Pet</span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Le migliori offerte su cibo, accessori e prodotti per cani e gatti
              dai negozi di tutta Italia.
            </motion.p>

            {/* Stats veloci */}
            <motion.div
              className="flex justify-center gap-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: OFFERTE_SEED.length, label: "Offerte attive" },
                { value: [...new Set(OFFERTE_SEED.map((o) => o.nome_negozio))].length, label: "Negozi" },
                { value: "50%", label: "Sconto max" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Categorie con icone grandi */}
          <AnimatedSection className="mb-8">
            <StaggerContainer className="flex flex-wrap gap-3 justify-center" staggerDelay={0.06}>
              <StaggerItem>
                <motion.button
                  onClick={() => setCategoria("")}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    !categoria
                      ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg shadow-purple-200"
                      : "bg-white text-foreground hover:bg-muted border border-border"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={16} />
                  Tutte ({OFFERTE_SEED.length})
                </motion.button>
              </StaggerItem>
              {Object.entries(CATEGORIE_PRODOTTO).map(([key, { label, emoji }]) => {
                const count = OFFERTE_SEED.filter((o) => o.categoria_prodotto === key).length;
                if (count === 0) return null;
                return (
                  <StaggerItem key={key}>
                    <motion.button
                      onClick={() => setCategoria(categoria === key ? "" : key)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                        categoria === key
                          ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow-lg shadow-purple-200"
                          : "bg-white text-foreground hover:bg-muted border border-border"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">{emoji}</span>
                      {label} ({count})
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </AnimatedSection>

          {/* Filtro provincia */}
          <div className="flex items-center gap-3 mb-8">
            <select value={provincia} onChange={(e) => setProvincia(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-border text-sm outline-none cursor-pointer shadow-sm">
              <option value="">📍 Tutta Italia</option>
              {province.map((p) => (
                <option key={p} value={p}>{p === "IT" ? "🌐 Online" : p}</option>
              ))}
            </select>

            {(categoria || provincia) && (
              <button onClick={() => { setCategoria(""); setProvincia(""); }}
                className="text-sm text-purple-500 hover:underline flex items-center gap-1">
                <X size={14} /> Resetta filtri
              </button>
            )}

            <span className="ml-auto text-sm text-muted-foreground font-medium">{filtered.length} offerte</span>
          </div>

          {/* Grid offerte */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.08}>
            {filtered.map((offerta) => (
              <StaggerItem key={offerta.id}>
                <OffertaCard offerta={offerta} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Tag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold">Nessuna offerta trovata</h3>
              <p className="text-muted-foreground mt-2">Prova a cambiare i filtri.</p>
            </div>
          )}

          {/* CTA Negozi */}
          <AnimatedSection className="mt-16" delay={0.2}>
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground">Sei un negozio pet?</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Pubblica le tue offerte su MifidoDiTe.eu e raggiungi migliaia di proprietari nella tua zona. Completamente gratis.
                </p>
                <motion.a
                  href="/registra-attivita"
                  className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-200 hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Registra il tuo negozio <ArrowRight size={16} />
                </motion.a>
              </div>
              <div className="text-8xl">🏪</div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}

function OffertaCard({ offerta: o }: { offerta: OffertaSeed }) {
  const catInfo = CATEGORIE_PRODOTTO[o.categoria_prodotto];
  const scaduto = new Date(o.valido_al) < new Date();

  return (
    <motion.div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border/50 group ${scaduto ? "opacity-50 grayscale" : ""}`}
      whileHover={scaduto ? {} : { y: -6 }}
      transition={{ duration: 0.2 }}
    >
      {/* Immagine */}
      <div className="relative h-44 overflow-hidden bg-muted">
        <img
          src={o.img}
          alt={o.titolo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge sconto */}
        {o.sconto_percentuale && !scaduto && (
          <div className="absolute top-3 left-3">
            <motion.div
              className="bg-red-500 text-white text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-lg"
              initial={{ rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.1 }}
            >
              -{o.sconto_percentuale}%
            </motion.div>
          </div>
        )}

        {/* Categoria */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
          {catInfo?.emoji} {catInfo?.label}
        </div>

        {/* Overlay scaduta */}
        {scaduto && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-foreground font-bold px-5 py-2 rounded-full text-sm shadow-lg">Offerta scaduta</span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Negozio + citta */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{o.nome_negozio}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={10} />
            {o.provincia === "IT" ? "Online" : o.comune}
          </span>
        </div>

        {/* Titolo */}
        <h3 className="font-bold text-foreground leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
          {o.titolo}
        </h3>

        {/* Marca */}
        {o.marca && (
          <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {o.marca}
          </span>
        )}

        {/* Prezzo */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-extrabold text-foreground">{o.prezzo_scontato}</span>
          {o.prezzo_originale && (
            <span className="text-sm text-muted-foreground line-through">{o.prezzo_originale}</span>
          )}
        </div>

        {/* Validita */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          <Clock size={11} />
          Valida fino al {new Date(o.valido_al).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
        </div>
      </div>
    </motion.div>
  );
}
