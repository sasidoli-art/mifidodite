"use client";

import Link from "next/link";
import Image from "next/image";

// TODO: dati da Supabase — per ora mock con immagini puppies del template
const FEATURED = [
  {
    id: "1",
    img: "/images/puppies/1.jpg",
    nome: "Pensione Il Rifugio di Fido",
    categoria: "Pensione",
    eta: "Bergamo (BG)",
    disponibilita: "Posti disponibili: cani piccoli e medi",
    desc: "Giardino recintato, webcam 24h, veterinario convenzionato. Il tuo amico come a casa.",
  },
  {
    id: "2",
    img: "/images/puppies/2.jpg",
    nome: "Sara — Dog Sitter Certificata",
    categoria: "Dog Sitter",
    eta: "Milano (MI)",
    disponibilita: "Disponibile weekend e festivi",
    desc: "A domicilio, passeggiate personalizzate, esperienza con cuccioli e cani anziani.",
  },
  {
    id: "3",
    img: "/images/puppies/3.jpg",
    nome: "Toelettatura Zampe d'Oro",
    categoria: "Toelettatura",
    eta: "Roma (RM)",
    disponibilita: "Su appuntamento lun-sab",
    desc: "Stripping, taglio di razza, bagno ozono. Trattamenti delicati per ogni tipo di pelo.",
  },
  {
    id: "4",
    img: "/images/puppies/4.jpg",
    nome: "Bau Beach Rimini",
    categoria: "Spiaggia",
    eta: "Rimini (RN)",
    disponibilita: "Aperta da maggio a settembre",
    desc: "Ingresso libero, docce per cani, area gioco recintata. Il mare per tutti.",
  },
  {
    id: "5",
    img: "/images/puppies/5.jpg",
    nome: "Dott. Bianchi — Veterinario",
    categoria: "Veterinario",
    eta: "Firenze (FI)",
    disponibilita: "Visite anche a domicilio",
    desc: "Specializzato in ortopedia e nutrizione. Clinica moderna, ambiente sereno.",
  },
  {
    id: "6",
    img: "/images/puppies/6.jpg",
    nome: "Marco — Educatore Cinofilo",
    categoria: "Educatore",
    eta: "Torino (TO)",
    disponibilita: "Corsi individuali e di gruppo",
    desc: "Metodo gentile, approccio positivo. Per un cane felice e equilibrato.",
  },
];

export function FeaturedPros() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-title text-center mb-16">
          <h1 className="animate-zoomIn">
            In <span>Evidenza</span>
          </h1>
          <h2 className="animate-zoomIn delay-300">
            i professionisti piu <span>amati e cercati</span> della settimana
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {FEATURED.map((item, i) => (
            <Link
              key={item.id}
              href={`/struttura/${item.id}`}
              className={`group flex flex-col sm:flex-row gap-4 bg-white rounded-lg border border-border p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fadeInUp delay-${(i % 3 + 1) * 200}`}
            >
              {/* Foto rotonda */}
              <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-primary/20 mx-auto sm:mx-0">
                <Image
                  src={item.img}
                  alt={item.nome}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {item.nome}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {item.categoria}
                  </span>
                </div>
                <p className="text-sm text-primary font-medium mt-0.5">{item.eta}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.disponibilita}</p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/professionisti"
            className="inline-block border-2 border-primary text-primary px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
          >
            Vedi tutti i professionisti
          </Link>
        </div>
      </div>
    </section>
  );
}
