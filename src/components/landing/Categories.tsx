"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  { label: "Veterinari", desc: "Ambulatori e cliniche nella tua zona", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80", href: "/professionisti?cat=veterinario" },
  { label: "Pensioni", desc: "Strutture sicure dove il tuo pet sta bene", img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80", href: "/professionisti?cat=pensione" },
  { label: "Dog Sitter", desc: "A domicilio, passeggiate, compagnia", img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=500&q=80", href: "/professionisti?cat=dog_sitter" },
  { label: "Toelettatura", desc: "Bagno, taglio, stripping e trattamenti", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80", href: "/professionisti?cat=toelettatura" },
  { label: "Educatori cinofili", desc: "Metodo gentile per cani e proprietari", img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500&q=80", href: "/professionisti?cat=educatore_cinofilo" },
  { label: "Offerte pet", desc: "Cibo, accessori e giochi in offerta", img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80", href: "/offerte" },
];

export function Categories() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-primary mb-4 block">Servizi</span>
          <h2 className="text-[42px] font-extrabold leading-tight tracking-tight text-foreground mb-4">
            Cosa puoi trovare su <span className="text-primary">MiFidoDiTe</span>
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-[560px] mx-auto leading-relaxed">
            Professionisti, guide e offerte per ogni esigenza del tuo animale domestico.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={s.href} className="group block bg-white rounded-[20px] overflow-hidden border border-border card-hover">
                <div className="h-[180px] overflow-hidden relative">
                  <img
                    src={s.img}
                    alt={s.label}
                    className="w-full h-full object-cover group-hover:scale-[1.06] group-hover:brightness-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{s.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                  <ArrowRight size={18} className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
