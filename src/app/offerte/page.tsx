"use client";

import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Tag, MapPin, Clock, Filter, X, ShoppingBag, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { OFFERTE_SEED, CATEGORIE_PRODOTTO } from "@/lib/offerte-seed";
import type { OffertaSeed } from "@/lib/offerte-seed";

export default function OffertePage() {
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");

  const marche = [...new Set(OFFERTE_SEED.map((o) => o.marca).filter(Boolean))].sort() as string[];

  const filtered = OFFERTE_SEED.filter((o) => {
    if (categoria && o.categoria_prodotto !== categoria) return false;
    if (marca && o.marca !== marca) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero — caldo, claymorphism */}
        <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)" }}>
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div key={i} className="absolute text-primary/5"
                style={{ top: `${15 + i * 20}%`, left: `${10 + i * 22}%`, fontSize: `${60 + i * 15}px` }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}>
                🏷️
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <motion.div className="inline-flex items-center gap-2 bg-white clay px-4 py-1.5 mb-6"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <Sparkles size={14} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">Aggiornate ogni settimana</span>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Offerte <span className="text-primary">Pet</span>
            </motion.h1>

            <motion.p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Le migliori offerte su cibo, accessori e prodotti per il tuo amico a 4 zampe. Dai migliori brand e negozi d'Italia.
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Brand partner bar */}
          <AnimatedSection className="mb-10">
            <div className="clay bg-white p-6 text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Brand presenti</p>
              <div className="flex flex-wrap justify-center gap-6">
                {marche.map((m) => (
                  <motion.button key={m}
                    onClick={() => setMarca(marca === m ? "" : m)}
                    className={`text-lg font-bold transition-colors ${
                      marca === m ? "text-primary" : "text-foreground/30 hover:text-foreground/60"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>
                    {m}
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Filtri categoria */}
          <AnimatedSection className="mb-8">
            <StaggerContainer className="flex flex-wrap gap-2 justify-center" staggerDelay={0.05}>
              <StaggerItem>
                <motion.button onClick={() => setCategoria("")}
                  className={`clay flex items-center gap-2 px-5 py-2.5 text-sm font-semibold ${
                    !categoria ? "bg-primary text-white border-primary" : "bg-white text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ShoppingBag size={15} /> Tutte ({OFFERTE_SEED.length})
                </motion.button>
              </StaggerItem>
              {Object.entries(CATEGORIE_PRODOTTO).map(([key, { label, emoji }]) => {
                const count = OFFERTE_SEED.filter((o) => o.categoria_prodotto === key).length;
                if (count === 0) return null;
                return (
                  <StaggerItem key={key}>
                    <motion.button onClick={() => setCategoria(categoria === key ? "" : key)}
                      className={`clay flex items-center gap-2 px-5 py-2.5 text-sm font-semibold ${
                        categoria === key ? "bg-primary text-white border-primary" : "bg-white text-foreground"
                      }`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <span>{emoji}</span> {label} ({count})
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </AnimatedSection>

          {/* Filtro attivo */}
          {(categoria || marca) && (
            <div className="flex items-center gap-2 mb-6">
              {marca && (
                <button onClick={() => setMarca("")}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {marca} <X size={14} />
                </button>
              )}
              <span className="text-sm text-muted-foreground">{filtered.length} offerte</span>
            </div>
          )}

          {/* Grid offerte */}
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" staggerDelay={0.06}>
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

          {/* CTA per aziende — il vero obiettivo della pagina */}
          <AnimatedSection className="mt-16" delay={0.2}>
            <div className="clay bg-white p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full mb-4">
                    <Building2 size={14} />
                    Per aziende e brand
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Il tuo prodotto visto da migliaia di proprietari
                  </h3>
                  <p className="text-muted-foreground mt-3 max-w-md">
                    Pubblica le offerte del tuo brand su MifidoDiTe.eu. Raggiungi proprietari di cani e gatti profilati per zona, taglia e razza.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center lg:justify-start">
                    <motion.a href="/partner"
                      className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-bold"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Diventa partner <ArrowRight size={16} />
                    </motion.a>
                    <motion.a href="mailto:pro@mifidodite.eu?subject=Partnership Offerte"
                      className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-xl font-semibold"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Scrivici
                    </motion.a>
                  </div>
                </div>
                <div className="text-8xl shrink-0">🏪</div>
              </div>
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
      className={`clay bg-white overflow-hidden group ${scaduto ? "opacity-50 grayscale" : ""}`}
      whileHover={scaduto ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Immagine */}
      <div className="relative h-44 overflow-hidden bg-muted rounded-t-[calc(var(--radius)-3px)]">
        <img src={o.img} alt={o.titolo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

        {o.sconto_percentuale && !scaduto && (
          <motion.div className="absolute top-3 left-3 bg-destructive text-white text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-lg"
            whileHover={{ scale: 1.1, rotate: -2 }}>
            -{o.sconto_percentuale}%
          </motion.div>
        )}

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
          {catInfo?.emoji} {catInfo?.label}
        </div>

        {scaduto && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="clay bg-white text-foreground font-bold px-5 py-2 text-sm">Scaduta</span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Brand — GRANDE e visibile (per le aziende) */}
        <div className="flex items-center justify-between mb-2">
          {o.marca ? (
            <span className="text-sm font-extrabold text-primary uppercase tracking-wider">{o.marca}</span>
          ) : (
            <span className="text-sm font-bold text-primary">{o.nome_negozio}</span>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin size={10} />
            {o.provincia === "IT" ? "Online" : o.comune}
          </span>
        </div>

        {/* Negozio se diverso dalla marca */}
        {o.marca && (
          <p className="text-xs text-muted-foreground mb-1">da {o.nome_negozio}</p>
        )}

        {/* Titolo */}
        <h3 className="font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {o.titolo}
        </h3>

        {/* Prezzo */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-extrabold text-foreground">{o.prezzo_scontato}</span>
          {o.prezzo_originale && (
            <span className="text-sm text-muted-foreground line-through">{o.prezzo_originale}</span>
          )}
        </div>

        {/* Validita */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
          <Clock size={11} />
          Fino al {new Date(o.valido_al).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
        </div>
      </div>
    </motion.div>
  );
}
