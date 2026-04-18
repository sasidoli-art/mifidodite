"use client";

import { motion } from "framer-motion";
import { CheckCircle2, BookOpen, Compass, Shield } from "lucide-react";

const PILLARS = [
  {
    icon: CheckCircle2,
    title: "Verificato a mano",
    desc: "Ogni spiaggia, struttura, ristorante e sentiero e controllato manualmente dal nostro team. Coordinate, indirizzi, regole.",
  },
  {
    icon: BookOpen,
    title: "Fonti pubbliche",
    desc: "Usiamo solo fonti verificabili: ENPA, Ministero del Turismo, ordinanze comunali, siti ufficiali delle strutture.",
  },
  {
    icon: Compass,
    title: "Aggiornato stagionalmente",
    desc: "Prima di ogni stagione (balneare, escursionistica) ricontrolliamo le voci: cosa e ancora aperto, cosa e cambiato.",
  },
  {
    icon: Shield,
    title: "Indipendente",
    desc: "Non siamo un aggregatore automatico. Selezioniamo manualmente, citiamo le fonti, correggiamo se ci segnalate errori.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-primary-light mb-4 block">Come lavoriamo</span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold leading-tight tracking-tight text-white mb-4">
            Tutto <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">verificato</span>, tutto aggiornato
          </h2>
          <p className="text-white/50 text-lg max-w-[620px] mx-auto leading-relaxed">
            Niente scraping automatico, niente recensioni inventate. Un team che seleziona manualmente ogni voce e cita le fonti.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="relative bg-white/[.06] backdrop-blur-sm border border-white/[.08] rounded-[20px] p-6 sm:p-7 transition-all duration-400 hover:bg-white/[.1] hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 shadow-lg">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-[17px] mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats reali */}
        <motion.div
          className="mt-16 bg-white/[.04] border border-white/[.08] rounded-[24px] p-8 sm:p-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            <Stat value="77" label="Spiagge" />
            <Stat value="89" label="Strutture" />
            <Stat value="38" label="Ristoranti" />
            <Stat value="26" label="Sentieri" />
            <Stat value="20" label="Razze" />
            <Stat value="550+" label="Pagine" />
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs text-white/30">
          Hai trovato un errore? Scrivici a <a href="mailto:info@mifidodite.eu" className="text-primary-light hover:underline">info@mifidodite.eu</a> — correggiamo nel giro di 48 ore.
        </p>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[30px] sm:text-[36px] font-extrabold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">{value}</p>
      <p className="text-white/50 text-xs mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}
