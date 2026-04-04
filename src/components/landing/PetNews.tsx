"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NEWS = [
  {
    id: "1",
    titolo: "Estate 2026: le 50 migliori spiagge dog-friendly in Italia",
    estratto: "Da Rimini alla Sardegna, la guida completa alle spiagge dove il tuo cane e il benvenuto.",
    categoria: "Guide",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&q=80",
    tempo: "8 min",
  },
  {
    id: "2",
    titolo: "Alimentazione naturale per cani: cosa dice la scienza",
    estratto: "BARF, crocchette o dieta casalinga? Abbiamo intervistato 3 veterinari nutrizionisti.",
    categoria: "Salute",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    tempo: "6 min",
  },
  {
    id: "3",
    titolo: "Come scegliere la pensione giusta: 7 domande da fare",
    estratto: "Non tutte le pensioni sono uguali. Ecco le domande che ogni proprietario dovrebbe fare.",
    categoria: "Consigli",
    img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&q=80",
    tempo: "5 min",
  },
  {
    id: "4",
    titolo: "Gatti in viaggio: tutto quello che devi sapere",
    estratto: "Dal trasportino giusto ai feromoni calmanti, la guida per viaggiare senza stress.",
    categoria: "Gatti",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    tempo: "4 min",
  },
];

export function PetNews() {
  return (
    <section id="magazine" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title text-center mb-16">
          <h1 className="animate-zoomIn">
            Il <span>Magazine</span>
          </h1>
          <h2 className="animate-zoomIn delay-300">
            guide, consigli e <span>novita dal mondo pet</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS.map((article, i) => (
            <Link
              key={article.id}
              href={`/magazine/${article.id}`}
              className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeInUp delay-${(i + 1) * 200}`}
            >
              <div className="relative h-36 sm:h-48 overflow-hidden">
                <Image
                  src={article.img}
                  alt={article.titolo}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                  {article.categoria}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {article.titolo}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {article.estratto}
                </p>
                <div className="flex items-center gap-1 mt-3 text-muted-foreground text-xs">
                  <Clock size={12} />
                  {article.tempo} di lettura
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
