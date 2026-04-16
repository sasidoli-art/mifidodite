"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Utensils, Mountain, Sparkles } from "lucide-react";

const CARDS = [
  {
    href: "/ristoranti",
    icon: Utensils,
    tag: "Mangiare fuori",
    title: "Ristoranti pet-friendly",
    desc: "38 locali in tutta Italia: osterie, pizzerie, agriturismi con dehors. Il tuo cane e il benvenuto.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    href: "/sentieri",
    icon: Mountain,
    tag: "Outdoor",
    title: "Sentieri ed escursioni",
    desc: "26 sentieri dog-friendly: Dolomiti, Cinque Terre, Sardegna, Gran Sasso. Difficolta, dislivello, durata.",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    gradient: "from-emerald-600 to-teal-700",
  },
];

export function ScopriDiPiu() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[1.5px] text-primary bg-primary/5 border border-primary/15 px-4 py-2 rounded-full mb-5">
            <Sparkles size={14} /> Scopri di piu
          </span>
          <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-tight tracking-tight text-foreground mb-3">
            Tutto quello che serve <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">fuori casa</span>
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-[540px] mx-auto leading-relaxed">
            Dalle escursioni sulle Dolomiti ai ristoranti del Salento. Il tuo cane ovunque, come dovrebbe essere.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.href}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <Link
                  href={c.href}
                  className="group block relative rounded-[24px] overflow-hidden h-[320px] card-hover"
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-85`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="relative h-full flex flex-col justify-end p-7 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">{c.tag}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">{c.title}</h3>
                    <p className="text-sm text-white/90 leading-snug mb-4 max-w-md">{c.desc}</p>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Esplora <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
