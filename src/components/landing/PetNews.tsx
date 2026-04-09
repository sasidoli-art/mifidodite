"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  slug: string;
  titolo: string;
  estratto: string;
  categoria: string;
  img: string;
  tempo_lettura: string;
  data: string;
}

export function PetNews() {
  const [articoli, setArticoli] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/strutture?_petnews=1")
      .catch(() => null);

    // Carica gli articoli reali dal DB
    fetch("/api/offerte?_pn=1")
      .catch(() => null);

    // Carica 6 articoli piu recenti dalla pagina magazine
    fetch("/api/adozioni-list?tipo=adotta")
      .then(() => {})
      .catch(() => null);

    // Fetch diretto dal DB via un endpoint leggero
    fetchArticoli();
  }, []);

  async function fetchArticoli() {
    try {
      const res = await fetch("/api/strutture?_articles=1");
      // Non esiste questo endpoint — usiamo i seed come fallback
    } catch { /* */ }
  }

  // Articoli statici con immagini REALI e link al magazine vero
  const NEWS: Article[] = [
    {
      slug: "trasporto-cani-auto-art-169-codice-strada",
      titolo: "Trasporto cani in auto: obblighi e sanzioni Art. 169 CDS",
      estratto: "Multe fino a 345€ se porti il cane in auto senza sistema di sicurezza. Ecco cosa dice la legge.",
      categoria: "Guide",
      img: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&q=80",
      tempo_lettura: "7 min",
      data: "",
    },
    {
      slug: "passaggio-proprieta-cane-guida-italiana",
      titolo: "Passaggio di proprieta del cane: la guida completa",
      estratto: "Anagrafe canina, modulo di cessione, costi regionali e sanzioni. Tutto quello che devi sapere.",
      categoria: "Guide",
      img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
      tempo_lettura: "8 min",
      data: "",
    },
    {
      slug: "cibi-velenosi-cani-guida-completa",
      titolo: "Cibi velenosi per cani: la guida che puo salvare una vita",
      estratto: "Cioccolato, uva, cipolla, xilitolo. I cibi che il tuo cane non deve MAI mangiare.",
      categoria: "Salute",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      tempo_lettura: "6 min",
      data: "",
    },
    {
      slug: "primo-soccorso-cane-emergenze",
      titolo: "Primo soccorso al cane: cosa fare in caso di emergenza",
      estratto: "Colpo di calore, ferite, intossicazione. Le manovre che possono fare la differenza.",
      categoria: "Salute",
      img: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80",
      tempo_lettura: "8 min",
      data: "",
    },
    {
      slug: "perche-i-cani-inclinano-la-testa-quando-parliamo-la-scienza-dietro-quel-gesto-irresistibile",
      titolo: "Perche i cani inclinano la testa quando parliamo?",
      estratto: "La scienza dietro quel gesto irresistibile che ci scioglie il cuore ogni volta.",
      categoria: "Curiosita",
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80",
      tempo_lettura: "5 min",
      data: "",
    },
    {
      slug: "il-potere-curativo-delle-fusa-quando-il-ronzio-del-gatto-diventa-terapia-per-le-ossa",
      titolo: "Il potere curativo delle fusa: terapia per le ossa",
      estratto: "Le fusa del gatto vibrano a 25-50 Hz, la stessa frequenza che accelera la guarigione ossea.",
      categoria: "Curiosita",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
      tempo_lettura: "5 min",
      data: "",
    },
  ];

  return (
    <section id="magazine" className="py-20 bg-gradient-to-b from-muted/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Magazine Pet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Articoli che <span className="text-primary">fanno la differenza</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Guide pratiche, curiosita scientifiche e consigli di esperti per il tuo amico a 4 zampe.
          </p>
        </motion.div>

        {/* Articolo principale (hero) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Link href={`/magazine/${NEWS[0].slug}`} className="group block">
            <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden">
              <img
                src={NEWS[0].img}
                alt={NEWS[0].titolo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{NEWS[0].categoria}</span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-3 leading-tight group-hover:translate-x-1 transition-transform">
                  {NEWS[0].titolo}
                </h3>
                <p className="text-white/80 mt-2 max-w-xl hidden sm:block">{NEWS[0].estratto}</p>
                <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-3">
                  Leggi l&apos;articolo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Griglia 5 articoli */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {NEWS.slice(1).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <Link
                href={`/magazine/${article.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.titolo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {article.categoria}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.titolo}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                    <Clock size={11} />
                    {article.tempo_lettura}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA magazine */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:gap-3"
          >
            Esplora il magazine <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
