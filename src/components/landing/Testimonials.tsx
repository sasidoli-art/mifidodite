"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Laura M.",
    location: "Milano",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "Ho trovato subito un veterinario vicino casa grazie a MiFidoDiTe. Gli articoli sul magazine mi hanno aiutato a capire i bisogni del mio cucciolo. Consigliatissimo!",
    pet: "Luna, Labrador",
  },
  {
    name: "Marco B.",
    location: "Roma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Il chatbot Zampa mi ha consigliato un articolo perfetto sul trasporto dei cani in auto. Non sapevo che rischiavo una multa! Ora viaggio in regola.",
    pet: "Rex, Pastore Tedesco",
  },
  {
    name: "Giulia T.",
    location: "Firenze",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "Finalmente un sito pet italiano serio, con informazioni verificate. Gli articoli sulle razze sono fantastici e le offerte Amazon mi fanno risparmiare ogni settimana.",
    pet: "Micio, Gatto Europeo",
  },
  {
    name: "Alessandro P.",
    location: "Torino",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "Ho adottato il mio cane grazie alla sezione adozioni. Gli annunci sono reali, presi da Subito.it, non le solite cose inventate. Grazie MiFidoDiTe!",
    pet: "Brio, meticcio adottato",
  },
  {
    name: "Francesca D.",
    location: "Bologna",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    text: "L'articolo sul primo soccorso al cane mi ha salvato una serata di panico. Sapere cosa fare quando il tuo animale sta male vale piu di mille parole.",
    pet: "Nala, Golden Retriever",
  },
  {
    name: "Roberto L.",
    location: "Napoli",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text: "Il magazine e una miniera d'oro. Ogni settimana trovo articoli nuovi su salute, comportamento, curiosita scientifiche. Non c'e niente di simile in Italia.",
    pet: "Thor, Rottweiler",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-accent text-accent" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-[1160px] mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-primary-light mb-4 block">Recensioni</span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold leading-tight tracking-tight text-white mb-4">
            Cosa dicono di <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">MiFidoDiTe</span>
          </h2>
          <p className="text-white/50 text-lg max-w-[560px] mx-auto leading-relaxed">
            La voce dei proprietari che ci hanno scelto per i loro amici a 4 zampe.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              className="relative bg-white/[.06] backdrop-blur-sm border border-white/[.06] rounded-[20px] p-6 sm:p-7 transition-all duration-400 hover:bg-white/[.1] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Quote icon */}
              <Quote size={28} className="text-primary/30 mb-4" />

              {/* Review text */}
              <p className="text-white/75 text-[15px] leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[.06]">
                <img loading="lazy"
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <Stars count={review.rating} />
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">{review.location} — {review.pet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-[32px] sm:text-[40px] font-extrabold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_linear_infinite]">140+</p>
            <p className="text-white/40 text-sm mt-1">Articoli nel magazine</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div>
            <p className="text-[32px] sm:text-[40px] font-extrabold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_linear_infinite]">20</p>
            <p className="text-white/40 text-sm mt-1">Regioni coperte</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div>
            <p className="text-[32px] sm:text-[40px] font-extrabold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_linear_infinite]">24/7</p>
            <p className="text-white/40 text-sm mt-1">Zampa AI attivo</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div>
            <p className="text-[32px] sm:text-[40px] font-extrabold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_linear_infinite]">100%</p>
            <p className="text-white/40 text-sm mt-1">Gratis per sempre</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
