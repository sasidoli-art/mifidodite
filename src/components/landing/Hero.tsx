"use client";

import { useState } from "react";
import { Search, MapPin, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function Hero() {
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
    <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 sm:py-28 overflow-hidden">
      {/* Zampine animate che fluttuano */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/5 select-none pointer-events-none"
          style={{
            top: `${15 + i * 18}%`,
            left: `${5 + i * 22}%`,
            fontSize: `${60 + i * 15}px`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          🐾
        </motion.div>
      ))}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Il portale pet #1 in Italia</span>
        </motion.div>

        {/* Titolo con animazione parola per parola */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Il tuo amico a 4 zampe
          <br />
          <motion.span
            className="text-primary inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            merita chi si fida
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Trova pensioni, spiagge dog-friendly, dog sitter, toelettatori e
          professionisti pet vicino a te.{" "}
          <strong>Anche quelli che non hanno un sito web.</strong>
        </motion.p>

        {/* Search Bar con entrata dal basso */}
        <motion.form
          onSubmit={handleSearch}
          className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-2 flex flex-col sm:flex-row gap-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-muted">
            <MapPin size={20} className="text-primary shrink-0" />
            <input
              type="text"
              placeholder="CAP, comune o provincia..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="px-4 py-3 rounded-xl bg-muted text-foreground outline-none cursor-pointer"
          >
            <option value="">Tutte le categorie</option>
            <option value="pensione">Pensioni</option>
            <option value="spiaggia_dog_friendly">Spiagge dog-friendly</option>
            <option value="toelettatura">Toelettatura</option>
            <option value="dog_sitter">Dog sitter</option>
            <option value="cat_sitter">Cat sitter</option>
            <option value="educatore_cinofilo">Educatori cinofili</option>
            <option value="veterinario">Veterinari</option>
            <option value="fotografo_pet">Fotografi pet</option>
          </select>

          <motion.button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Search size={20} />
            <span>Cerca</span>
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Cerca per CAP, comune o provincia — risultati entro 30 km da te
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-flex flex-col items-center text-muted-foreground/40 cursor-pointer"
          >
            <span className="text-xs mb-1">Scopri</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
