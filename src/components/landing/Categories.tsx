"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  // TODO: sostituire con foto clinica/ambulatorio veterinario dedicata in prossimo batch Envato
  /* orig: https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80 */
  { label: "Veterinari", desc: "Ambulatori e cliniche nella tua zona", img: "/img/stock/cani/lifeguard-dog-2026-01-09-01-11-12-utc-card.jpg", href: "/professionisti?cat=veterinario" },
  /* orig: https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80 */
  { label: "Pensioni", desc: "Strutture sicure dove il tuo pet sta bene", img: "/img/stock/cani/cats-dogs-pets-group-togetherness-isolate-2026-01-09-10-58-18-utc-card.jpg", href: "/professionisti?cat=pensione" },
  /* orig: https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=500&q=80 */
  { label: "Dog Sitter", desc: "A domicilio, passeggiate, compagnia", img: "/img/stock/persone-pet/couple-with-their-two-dogs-beagle-and-greyhound-2026-03-18-05-42-30-utc-card.jpg", href: "/professionisti?cat=dog_sitter" },
  // TODO: sostituire con foto toelettatura professionale dedicata in prossimo batch Envato
  /* orig: https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&q=80 */
  { label: "Toelettatura", desc: "Bagno, taglio, stripping e trattamenti", img: "/img/stock/cani/standing-on-the-legs-beautiful-golden-retriever-d-2026-03-24-03-52-18-utc-card.jpg", href: "/professionisti?cat=toelettatura" },
  // TODO: sostituire con foto educatore cinofilo in azione dedicata in prossimo batch Envato
  /* orig: https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500&q=80 */
  { label: "Educatori cinofili", desc: "Metodo gentile per cani e proprietari", img: "/img/stock/cani/jack-russell-terrier-with-paws-up-peeking-over-bla-2026-01-06-10-39-55-utc-card.jpg", href: "/professionisti?cat=educatore_cinofilo" },
  // TODO: sostituire con foto cibo/accessori pet (crocchette, giochi) dedicata in prossimo batch Envato
  /* orig: https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80 */
  { label: "Offerte pet", desc: "Cibo, accessori e giochi in offerta", img: "/img/stock/cani/joyful-jack-russell-terrier-on-yellow-backdrop-2026-01-08-23-02-50-utc-card.jpg", href: "/offerte" },
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
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold leading-tight tracking-tight text-foreground mb-4">
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
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link href={s.href} className="group block bg-white rounded-[20px] overflow-hidden border border-border card-hover">
                <div className="h-[180px] overflow-hidden relative">
                  <img loading="lazy"
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
