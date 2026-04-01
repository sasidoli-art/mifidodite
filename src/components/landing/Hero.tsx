"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20 sm:py-28">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-8xl rotate-12">🐾</div>
        <div className="absolute bottom-20 right-20 text-8xl -rotate-12">🐾</div>
        <div className="absolute top-1/2 left-1/3 text-6xl rotate-45">🐾</div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
          Il tuo amico a 4 zampe
          <br />
          <span className="text-primary">merita chi si fida</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Trova pensioni, spiagge dog-friendly, dog sitter, toelettatori e
          professionisti pet vicino a te.{" "}
          <strong>Anche quelli che non hanno un sito web.</strong>
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-muted">
            <MapPin size={20} className="text-muted-foreground shrink-0" />
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

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={20} />
            <span>Cerca</span>
          </button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Cerca per CAP, comune o provincia — risultati entro 30 km da te
        </p>
      </div>
    </section>
  );
}
