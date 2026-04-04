"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ArrowRight, Star, Users, Zap } from "lucide-react";

export function ProCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Sfondo scuro elegante con gradiente sottile */}
            <div className="absolute inset-0 bg-foreground" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

            {/* Contenuto */}
            <div className="relative px-5 sm:px-14 py-10 sm:py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Testo */}
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-6">
                    <Zap size={14} />
                    Per i professionisti
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    I tuoi prossimi clienti
                    <br />
                    ti stanno gia cercando
                  </h2>

                  <p className="mt-5 text-white/60 text-lg leading-relaxed max-w-md">
                    Ogni giorno migliaia di proprietari cercano pensioni, dog sitter e toelettatori nella loro zona. Fatti trovare.
                  </p>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Link href="/registra-attivita">
                      <motion.div
                        className="relative inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-bold overflow-hidden"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          Registrati gratis <ArrowRight size={16} />
                        </span>
                      </motion.div>
                    </Link>
                    <Link href="/per-professionisti">
                      <motion.div
                        className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/5 transition-colors"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        Vedi i piani
                      </motion.div>
                    </Link>
                  </div>
                </div>

                {/* Card statistiche */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: Users, value: "18.000+", label: "Richieste al mese", color: "from-primary/30 to-primary/10" },
                    { icon: Star, value: "4.8/5", label: "Rating medio", color: "from-amber-500/30 to-amber-500/10" },
                    { icon: Zap, value: "5 min", label: "Per registrarti", color: "from-secondary/30 to-secondary/10" },
                    { icon: ArrowRight, value: "0€", label: "Costo listing base", color: "from-accent/30 to-accent/10" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-white/10 rounded-2xl p-5`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                    >
                      <stat.icon size={20} className="text-white/50 mb-3" />
                      <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                      <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
