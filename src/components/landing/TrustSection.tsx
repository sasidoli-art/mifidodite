"use client";

import { motion } from "framer-motion";
import { Shield, Newspaper, Heart, MapPin } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: Newspaper,
    title: "140+ articoli nel magazine",
    desc: "Guide, curiosita scientifiche, leggi italiane e consigli pratici scritti con AI e revisionati dalla redazione.",
    color: "bg-orange-50 text-primary",
  },
  {
    icon: MapPin,
    title: "Dati reali, non inventati",
    desc: "I professionisti che trovi vengono da OpenStreetMap. Nomi, indirizzi e telefoni verificati, non generati dall'AI.",
    color: "bg-blue-50 text-accent",
  },
  {
    icon: Heart,
    title: "Adozioni vere da Subito.it",
    desc: "Gli annunci di adozione sono reali, aggiornati ogni 30 minuti. Niente annunci finti per fare numero.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Shield,
    title: "GDPR + AI Act conformi",
    desc: "Trasparenza totale sull'uso dell'AI. Privacy policy, registri trattamenti e disclaimer sempre visibili.",
    color: "bg-green-50 text-secondary",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Perche <span className="text-primary">fidarsi</span> di noi
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Non vendiamo fumo. Ecco cosa ci rende diversi.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_POINTS.map((point, i) => (
            <motion.div
              key={point.title}
              className="group bg-white rounded-2xl border border-border p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className={`w-14 h-14 rounded-2xl ${point.color} flex items-center justify-center mb-5`}
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <point.icon size={28} />
              </motion.div>
              <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
