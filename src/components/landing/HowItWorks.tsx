"use client";

import { Search, Star, Send } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: Search,
    num: "01",
    title: "Cerca nella tua zona",
    desc: "Inserisci il CAP o il comune. Ti mostriamo veterinari, pensioni e professionisti pet reali vicino a te.",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=500&q=80",
  },
  {
    icon: Star,
    num: "02",
    title: "Leggi e confronta",
    desc: "Consulta il magazine con 140+ articoli, confronta i servizi e informati prima di decidere.",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&q=80",
  },
  {
    icon: Send,
    num: "03",
    title: "Contatta il professionista",
    desc: "Chiedi disponibilita con un click. Il professionista riceve la tua richiesta e ti risponde direttamente.",
    img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-primary mb-4 block">Come funziona</span>
          <h2 className="text-[42px] font-extrabold leading-tight tracking-tight text-foreground">
            Tre passi per trovare chi
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">si prendera cura di loro</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative bg-white rounded-[20px] p-0 overflow-hidden border border-border card-hover bar-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Immagine */}
              <div className="h-[160px] overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-500"
                />
              </div>

              <div className="p-7 relative">
                {/* Numero gigante trasparente */}
                <span className="absolute top-4 right-6 text-[64px] font-extrabold text-foreground/[.03] leading-none select-none">
                  {step.num}
                </span>

                {/* Icon box */}
                <div className="w-[52px] h-[52px] rounded-[14px] bg-primary/[.08] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary">
                  <step.icon size={24} className="text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
