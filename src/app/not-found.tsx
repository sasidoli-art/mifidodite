import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LogoPaw } from "@/components/shared/Logo";
import { Home, Newspaper, Search, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-6">
            <LogoPaw size={64} className="opacity-20" />
            <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-foreground">
              404
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-foreground mb-3">
            Oops! Pagina non trovata
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            La pagina che cerchi non esiste o e stata spostata.
            Ma non preoccuparti, ci sono tante cose da scoprire su MiFidoDiTe!
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <Home size={16} /> Homepage
            </Link>
            <Link
              href="/magazine"
              className="flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-white py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <Newspaper size={16} /> Magazine
            </Link>
            <Link
              href="/professionisti"
              className="flex items-center justify-center gap-2 border-2 border-border hover:border-primary text-foreground py-3 rounded-full font-semibold text-sm transition-all"
            >
              <Search size={16} /> Professionisti
            </Link>
            <Link
              href="/adozioni"
              className="flex items-center justify-center gap-2 border-2 border-border hover:border-primary text-foreground py-3 rounded-full font-semibold text-sm transition-all"
            >
              <Heart size={16} /> Adozioni
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
