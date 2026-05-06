"use client";

import { useState } from "react";
import { Search, MapPin, ArrowRight, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogoPaw } from "@/components/shared/Logo";

const GALLERY = [
  /* orig: https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80 */
  { img: "/img/stock/persone-pet/it-s-a-dog-s-world-three-puppy-dogs-contentedly-s-2026-03-13-01-55-17-utc-card.jpg", label: "Dog Sitter" },
  /* orig: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80 */
  { img: "/img/stock/gatti/shorthair-gray-cat-with-winking-eye-looking-straig-2026-03-25-05-09-58-utc-card.jpg", label: "Gatti" },
  /* orig: https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80 */
  { img: "/img/stock/cani/dog-golden-retriever-labrador-in-autumn-at-sunset-2026-03-16-02-11-30-utc-card.jpg", label: "Pensioni" },
  /* orig: https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80 */
  // TODO: sostituire con foto ambulatorio veterinario dedicata in prossimo batch Envato
  { img: "/img/stock/cani/closeup-shot-of-the-snouts-of-a-cute-dog-and-a-cat-2026-01-08-00-23-04-utc-card.jpg", label: "Veterinari" },
  /* orig: https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80 */
  // TODO: sostituire con foto toelettatura dedicata in prossimo batch Envato
  { img: "/img/stock/cani/jack-russell-puppy-isolated-on-pink-background-2026-01-09-11-30-40-utc-card.jpg", label: "Toelettatura" },
];

export function Hero({ articleCount = 155 }: { articleCount?: number }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (categoria) params.set("cat", categoria);
    router.push(`/professionisti?${params.toString()}`);
  }

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Radial gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(212,169,76,.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(122,158,126,.06),transparent_60%)]" />
      </div>

      <div className="relative max-w-[1160px] mx-auto px-6">
        {/* Grid: testo + immagine */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-[13px] font-semibold px-4 py-2 rounded-full border border-secondary/15 mb-5">
              <LogoPaw size={14} />
              Portale pet-friendly italiano
            </div>

            <h1 className="text-[32px] sm:text-[46px] lg:text-[54px] font-extrabold leading-[1.08] tracking-tight text-foreground mb-5">
              550+ spiagge, hotel e ristoranti
              <br />
              dove il tuo cane è
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                davvero benvenuto
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-[480px] mb-8">
              Tutte le strutture sono <strong className="text-foreground">verificate a mano</strong> — niente sorprese. Trova veterinari, pensioni e professionisti nella tua zona.
            </p>

            {/* Search form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-white px-4 py-3.5 rounded-full border border-border shadow-sm">
                <MapPin size={18} className="text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="CAP o comune..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="px-4 py-3.5 rounded-full bg-white border border-border text-foreground text-sm outline-none shadow-sm"
              >
                <option value="">Tutte le categorie</option>
                <option value="veterinario">Veterinari</option>
                <option value="pensione">Pensioni</option>
                <option value="toelettatura">Toelettatura</option>
                <option value="dog_sitter">Dog sitter</option>
                <option value="educatore_cinofilo">Educatori cinofili</option>
              </select>
              <motion.button
                type="submit"
                className="bg-primary hover:bg-foreground text-white px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                whileTap={{ scale: 0.97 }}
              >
                <Search size={18} />
                Cerca
              </motion.button>
            </form>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Star size={14} className="text-accent" /> {articleCount}+ articoli</span>
              <span className="flex items-center gap-1.5"><Heart size={14} className="text-primary" /> Adozioni reali</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-secondary" /> Dati OpenStreetMap</span>
            </div>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            className="relative hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-[420px] h-[480px] rounded-[28px] overflow-hidden relative shadow-[0_24px_64px_rgba(61,43,31,.14)]">
              {/* orig: https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80 */}
              {/* TODO PRIORITÀ ALTA: hero_main — Westy studio è accettabile ma sub-ottimale come prima impressione sito. Cercare foto cane singolo in contesto naturale (casa/giardino) per sostituirlo. */}
              <img
                src="/img/stock/cani/close-up-of-a-maltese-in-front-of-a-blue-backgroun-2026-03-09-07-57-04-utc-card.jpg"
                alt="West Highland White Terrier bianco sorridente su sfondo azzurro, ritratto studio professionale"
                className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-[rgba(44,27,14,.85)] via-[rgba(44,27,14,.4)] to-transparent">
                <div className="flex gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-white bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">Magazine Pet</span>
                  <span className="text-[11px] font-semibold text-white bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">Professionisti</span>
                </div>
                <h3 className="text-white font-bold text-lg">MiFidoDiTe.eu</h3>
                <p className="text-white/70 text-[13px]">Guide, offerte e servizi per il tuo pet</p>
              </div>
            </div>

            {/* Floating badge top-left */}
            <motion.div
              className="absolute top-3 -left-5 bg-white rounded-2xl px-4 py-3 shadow-[0_12px_44px_rgba(61,43,31,.12)] flex items-center gap-3 z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Star size={20} className="text-secondary" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-foreground">140+ articoli</p>
                <p className="text-[11px] text-muted-foreground">Magazine pet</p>
              </div>
            </motion.div>

            {/* Floating badge bottom-right */}
            <motion.div
              className="absolute bottom-10 -right-8 bg-white rounded-2xl px-4 py-3 shadow-[0_12px_44px_rgba(61,43,31,.12)] flex items-center gap-3 z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-foreground">Adozioni reali</p>
                <p className="text-[11px] text-muted-foreground">Da Subito.it</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery strip */}
        <motion.div
          className="flex gap-4 pt-12 pb-0 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {GALLERY.map((item, idx) => (
            <div key={item.label} className={`flex-1 min-w-0 h-[140px] sm:h-[180px] rounded-[16px] sm:rounded-[20px] overflow-hidden relative group ${idx > 2 ? "hidden lg:block" : ""}`}>
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover brightness-[.95] group-hover:brightness-100 group-hover:scale-[1.08] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,27,14,.3)] to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 text-white text-[13px] font-semibold flex items-center gap-1.5 z-10">
                <ArrowRight size={12} /> {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
