"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function SOSBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <Link href="/sos-smarriti">
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-500 to-red-600 p-8 sm:p-10 cursor-pointer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Pulse di sfondo */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full bg-white"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <AlertTriangle size={32} className="text-white" />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-extrabold text-white">
                    Hai perso il tuo animale?
                  </h3>
                  <p className="text-white/80 mt-1">
                    Pubblica una segnalazione gratuita. Avvisiamo tutti i proprietari nella tua zona.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold shrink-0 group">
                  Segnala ora
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
