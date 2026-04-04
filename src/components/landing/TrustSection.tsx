"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { motion } from "framer-motion";
import { Home, Umbrella, MapPin, Heart, Search, Star, Navigation } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STATS: { value: number; suffix: string; label: string; icon: LucideIcon }[] = [
  { value: 12500, suffix: "+", label: "Strutture censite", icon: Home },
  { value: 350, suffix: "+", label: "Spiagge dog-friendly", icon: Umbrella },
  { value: 20, suffix: "", label: "Regioni coperte", icon: MapPin },
  { value: 48000, suffix: "+", label: "Proprietari soddisfatti", icon: Heart },
];

const TRUST_POINTS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Troviamo chi non si trova",
    desc: "Cerchiamo ogni settimana su Facebook, gruppi locali e passaparola. Portiamo alla luce i professionisti invisibili.",
  },
  {
    icon: Star,
    title: "Recensioni vere",
    desc: "Solo recensioni verificate da altri proprietari. Nessuna valutazione comprata o falsa.",
  },
  {
    icon: Navigation,
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
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8" staggerDelay={0.1}>
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <stat.icon size={24} className="mx-auto mb-2 text-primary" strokeWidth={1.8} />
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
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <point.icon size={28} strokeWidth={1.8} />
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
