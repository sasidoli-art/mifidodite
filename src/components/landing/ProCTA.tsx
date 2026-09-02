"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MapPin, Sparkles } from "lucide-react";

const VANTAGGI = [
  { icon: BookOpen, label: "150+ articoli e guide gratuite" },
  { icon: MapPin, label: "Spiagge, vacanze e sentieri pet-friendly" },
  { icon: Sparkles, label: "Calcolatori per la salute del tuo cane" },
];

export function ProCTA() {
  return (
    <section className="py-20 bg-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Tutto gratis, tutto pet-friendly
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Un magazine indipendente
              <br />
              <span className="text-primary">per chi vive con un cane</span>
            </h2>
            <p className="text-white/70 mt-4 text-lg leading-relaxed max-w-lg">
              Guide regionali, itinerari testati e consigli pratici. Nessuna pubblicita,
              nessun listing a pagamento: solo contenuti utili per i proprietari di cani e gatti.
            </p>

            <ul className="mt-6 space-y-3">
              {VANTAGGI.map((v) => (
                <li key={v.label} className="flex items-center gap-3 text-white/80">
                  <v.icon size={18} className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{v.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/magazine"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-bold transition-all"
                >
                  Vai al magazine <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/vacanze"
                  className="inline-flex items-center gap-2 border-2 border-white/20 text-white hover:border-white/40 px-7 py-3.5 rounded-full font-semibold transition-all"
                >
                  Esplora le strutture
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img loading="lazy"
                src="/img/stock/persone-pet/group-of-happy-multinational-people-business-team-2026-03-19-07-55-36-utc-card.jpg"
                alt="Famiglia che si gode una vacanza pet-friendly con il proprio cane"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-white font-bold text-lg">Un media indipendente al servizio dei proprietari</p>
                  <p className="text-white/70 text-sm mt-1">Niente pubblicita, nessun obbligo, accesso libero.</p>
                </div>
              </div>
            </div>

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
