"use client";

import { Search, Star, Send } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: Search,
    title: "Cerca vicino a te",
    description: "Inserisci il tuo CAP o comune e scopri pensioni, professionisti e spiagge pet-friendly nel raggio di 30 km.",
    color: "bg-orange-100 text-primary",
  },
  {
    icon: Star,
    title: "Scegli con fiducia",
    description: "Leggi le recensioni di altri proprietari, guarda le foto e confronta servizi e prezzi.",
    color: "bg-yellow-100 text-amber-600",
  },
  {
    icon: Send,
    title: "Chiedi disponibilita",
    description: "Compila il form in 30 secondi. Il professionista riceve la tua richiesta e ti risponde direttamente.",
    color: "bg-green-100 text-secondary",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Come funziona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tre passi per trovare chi si prendera cura del tuo amico
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-12" staggerDelay={0.15}>
          {STEPS.map((step, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {/* Numero + icona */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mx-auto`}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <step.icon size={36} />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* Linea connettore (solo tra le card) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+60px)] w-[calc(100%-120px)] h-[2px] bg-border" />
                )}

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
