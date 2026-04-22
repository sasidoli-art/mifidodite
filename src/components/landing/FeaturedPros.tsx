"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const SERVIZI = [
  {
    titolo: "Trova il veterinario",
    desc: "Cliniche e ambulatori veterinari verificati nella tua zona",
    // TODO: sostituire con foto visita veterinaria dedicata in prossimo batch Envato
    /* orig: https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80 */
    img: "/img/stock/persone-pet/cute-puppy-and-kitten-closeup-looking-at-camera-2026-01-05-01-09-12-utc-card.jpg",
    href: "/professionisti?cat=veterinario",
    color: "from-red-500/80 to-red-600/80",
  },
  {
    titolo: "Pensione per il tuo pet",
    desc: "Strutture sicure dove il tuo amico si sentira a casa",
    /* orig: https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80 */
    img: "/img/stock/cani/funny-moments-from-the-life-of-pets-2026-03-17-21-42-35-utc-card.jpg",
    href: "/professionisti?cat=pensione",
    color: "from-amber-500/80 to-orange-500/80",
  },
  {
    titolo: "Toelettatura professionale",
    desc: "Bagno, taglio, stripping e trattamenti per il pelo del tuo cane",
    /* orig: https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80 */
    // TODO: sostituire con foto toelettatura professionale dedicata in prossimo batch Envato.
    //       Catalogo attuale non ha match accettabile — lasciata Unsplash originale.
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&q=80",
    href: "/professionisti?cat=toelettatura",
    color: "from-pink-500/80 to-rose-500/80",
  },
];

export function FeaturedPros() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Servizi pet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Trova chi si prendera <span className="text-primary">cura di loro</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Veterinari, pensioni, toelettatori e molto altro nella tua zona. Dati reali da OpenStreetMap.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVIZI.map((s, i) => (
            <motion.div
              key={s.titolo}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}
            >
              <Link href={s.href} className="group block relative h-72 sm:h-80 rounded-3xl overflow-hidden">
                <img loading="lazy"
                  src={s.img}
                  alt={s.titolo}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.color} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-extrabold text-white group-hover:translate-y-[-4px] transition-transform">
                    {s.titolo}
                  </h3>
                  <p className="text-white/80 text-sm mt-1 group-hover:translate-y-[-2px] transition-transform">
                    {s.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-white font-semibold text-sm mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <MapPin size={14} /> Cerca nella tua zona <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/professionisti"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-all hover:gap-3"
          >
            Vedi tutte le categorie <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
