"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const VANTAGGI = [
  "Profilo professionale gratuito",
  "Visibilita su tutta Italia",
  "Richieste dai proprietari della tua zona",
  "Magazine con 140+ articoli — il tuo brand accanto",
];

export function ProCTA() {
  return (
    <section className="py-20 bg-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Testo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Per professionisti pet
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              I tuoi prossimi clienti
              <br />
              <span className="text-primary">ti stanno gia cercando</span>
            </h2>
            <p className="text-white/70 mt-4 text-lg leading-relaxed max-w-lg">
              Registra la tua attivita gratis su MifidoDiTe.eu con il codice invito.
              Fatti trovare dai proprietari di cani e gatti della tua zona.
            </p>

            <ul className="mt-6 space-y-3">
              {VANTAGGI.map((v) => (
                <li key={v} className="flex items-center gap-3 text-white/80">
                  <CheckCircle size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{v}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mt-8">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/registra-attivita"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold transition-all"
                >
                  Registrati gratis <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/per-professionisti"
                  className="inline-flex items-center gap-2 border-2 border-white/20 text-white hover:border-white/40 px-7 py-3.5 rounded-full font-semibold transition-all"
                >
                  Scopri di piu
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Immagine */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img loading="lazy"
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&q=80"
                alt="Professionista pet con cane"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-white font-bold text-lg">Ogni settimana, nuovi proprietari cercano servizi pet</p>
                  <p className="text-white/70 text-sm mt-1">Fai in modo che trovino te.</p>
                </div>
              </div>
            </div>

            {/* Badge floating */}
            <motion.div
              className="absolute -top-4 -right-4 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold shadow-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              100% Gratis
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
