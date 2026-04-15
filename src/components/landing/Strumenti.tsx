"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calculator, Utensils, Clock, Scale } from "lucide-react";

const STRUMENTI = [
  {
    label: "Quale razza fa per te?",
    desc: "Quiz in 6 domande per scoprire la razza di cane ideale per il tuo stile di vita.",
    cta: "Fai il quiz",
    href: "/quiz-razza",
    icon: Sparkles,
    gradient: "from-primary to-accent",
    badge: "Quiz gratuito",
  },
  {
    label: "Quanto costa un cane?",
    desc: "Calcola il budget annuale in base a taglia, citta e stile di vita.",
    cta: "Calcola ora",
    href: "/costo-cane",
    icon: Calculator,
    gradient: "from-secondary to-primary-light",
    badge: "Costi",
  },
  {
    label: "Quanto cibo dare al cane?",
    desc: "Razioni giornaliere precise in base a peso, eta e attivita.",
    cta: "Calcola razioni",
    href: "/razioni-cane",
    icon: Utensils,
    gradient: "from-primary to-primary-dark",
    badge: "Razioni",
  },
  {
    label: "Eta umana del tuo cane",
    desc: "Quanti anni umani ha davvero? Formula UCSD 2019 per taglia.",
    cta: "Scopri l'eta",
    href: "/eta-cane",
    icon: Clock,
    gradient: "from-accent to-primary-light",
    badge: "Eta",
  },
  {
    label: "Peso ideale per razza",
    desc: "Il tuo cane e sovrappeso? Valutazione BCS con consigli personalizzati.",
    cta: "Controlla peso",
    href: "/peso-ideale-cane",
    icon: Scale,
    gradient: "from-secondary to-accent",
    badge: "Peso",
  },
];

export function Strumenti() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1160px] mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-primary mb-4 block">Strumenti utili</span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold leading-tight tracking-tight text-foreground mb-4">
            Tool gratuiti per chi ama gli animali
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-[560px] mx-auto leading-relaxed">
            Strumenti interattivi per aiutarti a scegliere e prenderti cura del tuo pet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {STRUMENTI.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <Link
                  href={s.href}
                  className="group relative block bg-white rounded-[24px] overflow-hidden border border-border p-8 sm:p-10 h-full card-hover"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${s.gradient} opacity-[.08] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{s.badge}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {s.label}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>

                    <div className="inline-flex items-center gap-2 font-semibold text-primary group-hover:gap-3 transition-all">
                      {s.cta}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
