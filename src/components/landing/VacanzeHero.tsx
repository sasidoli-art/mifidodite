"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, BedDouble, BookOpen, Star, Info } from "lucide-react";

const PREVIEW = [
  {
    nome: "Borgo Egnazia",
    comune: "Savelletri di Fasano",
    regione: "Puglia",
    tipo: "Masseria",
    tagline: "Tra i resort piu' premiati d'Italia",
    /* orig: https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80 */
    img: "/img/stock/ambienti-hotel/swimming-pool-of-a-luxury-resort-with-waterfall-an-2026-03-26-05-09-53-utc-card.jpg",
    href: "/vacanze/puglia/borgo-egnazia-savelletri",
    fascia: "€€€€",
  },
  {
    nome: "Grand Hotel Tremezzo",
    comune: "Tremezzina",
    regione: "Lombardia",
    tipo: "Hotel 5*",
    tagline: "Palazzo Liberty sul Lago di Como",
    // TODO: sostituire con foto Lombardia/Lago di Como specifica in prossimo batch Envato
    /* orig: https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80 */
    img: "/img/stock/ambienti-hotel/exterior-of-a-house-with-a-pool-in-a-luxury-comple-2026-03-17-07-10-22-utc-card.jpg",
    href: "/vacanze/lombardia/grand-hotel-tremezzo-como",
    fascia: "€€€€",
  },
  {
    nome: "Union Lido Park & Resort",
    comune: "Cavallino-Treporti",
    regione: "Veneto",
    tipo: "Camping Village",
    tagline: "60 ettari sul mare, area cani dedicata",
    // TODO: sostituire con foto Union Lido/Cavallino o camping village sul mare in prossimo batch Envato
    /* orig: https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80 */
    img: "/img/stock/ambienti-hotel/agritourism-in-tuscany-beautiful-sunny-day-2026-03-24-12-59-04-utc-card.jpg",
    href: "/vacanze/veneto/union-lido-cavallino",
    fascia: "€€",
  },
];

export function VacanzeHero() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[1.5px] text-primary bg-primary/5 border border-primary/15 px-4 py-2 rounded-full mb-6">
            <BedDouble size={14} /> Vacanze con il cane
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-foreground mb-5">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">60 strutture pet-friendly</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>in tutta Italia
          </h2>
          <p className="text-[17px] sm:text-[19px] text-muted-foreground max-w-[620px] mx-auto leading-relaxed">
            Hotel di lusso, agriturismi toscani, masserie pugliesi, camping village e B&amp;B boutique. <strong className="text-foreground">Mappa interattiva, filtri e prenotazione diretta su Booking.</strong>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {PREVIEW.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <Link
                href={s.href}
                className="group block bg-white rounded-[24px] overflow-hidden border border-border card-hover"
              >
                <div className="h-[220px] overflow-hidden relative">
                  <img
                    src={s.img}
                    alt={s.nome}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 text-foreground">
                    {s.tipo}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-foreground/90 text-white">
                    {s.fascia}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                    <MapPin size={11} /> {s.comune}, {s.regione}
                  </div>
                  <h3 className="font-extrabold text-foreground text-lg mb-1.5 group-hover:text-primary transition-colors">
                    {s.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-snug">{s.tagline}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    <Star size={12} fill="currentColor" /> Vedi scheda <ArrowRight size={12} />
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
            href="/vacanze"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-full px-8 py-4 text-[15px] shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all"
          >
            <BedDouble size={18} /> Esplora la mappa
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/magazine/vacanze-con-il-cane-italia-2026-guida"
            className="inline-flex items-center gap-2 bg-white border-2 border-border text-foreground font-semibold rounded-full px-6 py-4 text-sm hover:border-primary hover:text-primary transition-colors"
          >
            <BookOpen size={16} /> Leggi la guida completa
          </Link>
        </motion.div>

        {/* Disclaimer aggiunto per protezione legale (pratiche commerciali + diritto immagine) */}
        <p className="mt-6 text-xs text-stone-500 italic text-center max-w-2xl mx-auto flex items-center justify-center gap-1.5">
          <Info size={12} className="flex-shrink-0" />
          <span>Le immagini in evidenza sono a scopo illustrativo. Le foto effettive di ogni struttura sono visibili nelle rispettive schede.</span>
        </p>
      </div>
    </section>
  );
}
