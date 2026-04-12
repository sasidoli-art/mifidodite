"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Waves, BookOpen } from "lucide-react";

const PREVIEW_SPIAGGE = [
  {
    nome: "La Spiaggia di Pluto",
    comune: "Bibione",
    regione: "Veneto",
    tipo: "Stabilimento",
    tagline: "La piu grande dog beach d'Italia",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    href: "/spiagge/veneto/spiaggia-di-pluto-bibione",
  },
  {
    nome: "Dog Beach San Vincenzo",
    comune: "San Vincenzo",
    regione: "Toscana",
    tipo: "Spiaggia libera",
    tagline: "200m di battigia, cani senza guinzaglio",
    img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800&q=80",
    href: "/spiagge/toscana/dog-beach-san-vincenzo",
  },
  {
    nome: "BauBeach Maccarese",
    comune: "Fiumicino",
    regione: "Lazio",
    tipo: "Stabilimento",
    tagline: "La prima bau beach d'Italia, dal 1997",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
    href: "/spiagge/lazio/baubeach-maccarese",
  },
];

export function SpiaggeHero() {
  return (
    <section className="relative py-24 bg-foreground overflow-hidden">
      {/* Pattern onde di sfondo */}
      <div className="absolute inset-0 opacity-[.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves-pattern" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 20 0, 40 20 T 80 20" stroke="white" strokeWidth="1.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves-pattern)" />
        </svg>
      </div>

      {/* Glow decorativi */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[1.5px] text-accent bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <Waves size={14} /> Mappa 2026
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-white mb-5">
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">77 spiagge</span> dog-friendly,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>una mappa sola
          </h2>
          <p className="text-[17px] sm:text-[19px] text-white/70 max-w-[620px] mx-auto leading-relaxed">
            Stabilimenti e spiagge libere verificate in <strong className="text-white">15 regioni</strong>, con meteo, info pratiche e indicazioni. Aggiornata ogni stagione.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {PREVIEW_SPIAGGE.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <Link
                href={s.href}
                className="group block relative rounded-[20px] overflow-hidden aspect-[4/5] md:aspect-[3/4]"
              >
                <img
                  src={s.img}
                  alt={s.nome}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white ${s.tipo === "Stabilimento" ? "bg-sky-600/90" : "bg-emerald-600/90"}`}>
                    {s.tipo}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-1 text-white/70 text-xs mb-1.5">
                    <MapPin size={12} /> {s.comune}, {s.regione}
                  </div>
                  <h3 className="font-extrabold text-white text-xl leading-tight mb-1.5 group-hover:text-accent transition-colors">
                    {s.nome}
                  </h3>
                  <p className="text-sm text-white/70 leading-snug line-clamp-2">{s.tagline}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Scopri <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/spiagge"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-full px-8 py-4 text-[15px] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all"
          >
            <MapPin size={18} /> Apri la mappa
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/magazine/spiagge-dog-friendly-italia-2026-guida-completa"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold rounded-full px-6 py-4 text-sm hover:bg-white/15 transition-colors"
          >
            <BookOpen size={16} /> Leggi la guida completa
          </Link>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Stabilimenti
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Spiagge libere
          </div>
          <div className="hidden sm:block">•</div>
          <div className="hidden sm:block">Fonti: ENPA, Zampa Vacanza, Dogwelcome</div>
        </div>
      </div>
    </section>
  );
}
