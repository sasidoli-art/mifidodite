"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { motion } from "framer-motion";

const STATS = [
  { value: 12500, suffix: "+", label: "Strutture censite", emoji: "🏠" },
  { value: 350, suffix: "+", label: "Spiagge dog-friendly", emoji: "🏖️" },
  { value: 20, suffix: "", label: "Regioni coperte", emoji: "🇮🇹" },
  { value: 48000, suffix: "+", label: "Proprietari soddisfatti", emoji: "❤️" },
];

const TRUST_POINTS = [
  {
    emoji: "🔍",
    title: "Troviamo chi non si trova",
    desc: "Cerchiamo ogni settimana su Facebook, gruppi locali e passaparola. Portiamo alla luce i professionisti invisibili.",
  },
  {
    emoji: "💛",
    title: "Recensioni vere",
    desc: "Solo recensioni verificate da altri proprietari. Nessuna valutazione comprata o falsa.",
  },
  {
    emoji: "📍",
    title: "Vicino a te, davvero",
    desc: "Ricerca per CAP con raggio in km. Risultati reali, non generici elenchi nazionali.",
  },
];

export function TrustSection() {
  return (
    <>
      {/* Contatori animati */}
      <section className="py-14 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <span className="text-2xl block mb-2">{stat.emoji}</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust points */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Perche MifidoDiTe?
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-3 gap-8 mt-10" staggerDelay={0.15}>
            {TRUST_POINTS.map((point) => (
              <StaggerItem key={point.title}>
                <motion.div
                  className="group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {point.emoji}
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                  <p className="text-muted-foreground text-sm">{point.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
