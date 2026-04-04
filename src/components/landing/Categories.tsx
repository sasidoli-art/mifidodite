"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { Home, Umbrella, Scissors, Dog, GraduationCap, Stethoscope, Camera, Car } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const CATEGORIES: { icon: LucideIcon; label: string; desc: string; href: string; color: string; iconColor: string }[] = [
  { icon: Home, label: "Pensioni", desc: "Lascia il tuo amico in mani sicure", href: "/professionisti?cat=pensione", color: "from-orange-100 to-orange-50", iconColor: "text-orange-500" },
  { icon: Umbrella, label: "Spiagge dog-friendly", desc: "Mare e sabbia anche per lui", href: "/spiagge", color: "from-blue-100 to-blue-50", iconColor: "text-blue-500" },
  { icon: Scissors, label: "Toelettatura", desc: "Bello, pulito e coccolato", href: "/professionisti?cat=toelettatura", color: "from-pink-100 to-pink-50", iconColor: "text-pink-500" },
  { icon: Dog, label: "Dog sitter", desc: "Come stare a casa, ma meglio", href: "/professionisti?cat=dog_sitter", color: "from-green-100 to-green-50", iconColor: "text-green-500" },
  { icon: GraduationCap, label: "Educatori cinofili", desc: "Per un cane felice e equilibrato", href: "/professionisti?cat=educatore_cinofilo", color: "from-purple-100 to-purple-50", iconColor: "text-purple-500" },
  { icon: Stethoscope, label: "Veterinari", desc: "La salute prima di tutto", href: "/professionisti?cat=veterinario", color: "from-red-100 to-red-50", iconColor: "text-red-500" },
  { icon: Camera, label: "Fotografi pet", desc: "Ricordi a 4 zampe", href: "/professionisti?cat=fotografo_pet", color: "from-yellow-100 to-yellow-50", iconColor: "text-yellow-600" },
  { icon: Car, label: "Pet taxi", desc: "Trasporto sicuro e confortevole", href: "/professionisti?cat=pet_taxi", color: "from-teal-100 to-teal-50", iconColor: "text-teal-500" },
];

export function Categories() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Cosa stai cercando?
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Esplora per categoria e trova il professionista giusto
          </motion.p>
        </div>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.08}>
          {CATEGORIES.map((cat) => (
            <StaggerItem key={cat.label}>
              <Link href={cat.href}>
                <motion.div
                  className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center transition-all group cursor-pointer h-full`}
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-white/80 flex items-center justify-center shadow-sm ${cat.iconColor}`}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <cat.icon size={28} strokeWidth={1.8} />
                  </motion.div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cat.desc}</p>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
