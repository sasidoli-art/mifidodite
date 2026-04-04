import Link from "next/link";
import { Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold text-white">
                MifidoDiTe.eu
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Il portale italiano per trovare pensioni, spiagge pet-friendly e
              professionisti del mondo animale vicino a te. Anche quelli che non
              hanno un sito web.
            </p>
            <a
              href="mailto:bau@mifidodite.eu"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Mail size={14} />
              bau@mifidodite.eu
            </a>
          </div>

          {/* Esplora */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Esplora</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/magazine" className="hover:text-primary transition-colors">Magazine Pet</Link></li>
              <li><Link href="/professionisti" className="hover:text-primary transition-colors">Cerca professionisti</Link></li>
              <li><Link href="/spiagge" className="hover:text-primary transition-colors">Spiagge dog-friendly</Link></li>
              <li><Link href="/cliniche" className="hover:text-primary transition-colors">Cliniche e rifugi</Link></li>
              <li><Link href="/eventi" className="hover:text-primary transition-colors">Eventi pet</Link></li>
            </ul>
          </div>

          {/* Categorie */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Categorie</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/professionisti?cat=pensione" className="hover:text-primary transition-colors">Pensioni</Link></li>
              <li><Link href="/professionisti?cat=dog_sitter" className="hover:text-primary transition-colors">Dog sitter</Link></li>
              <li><Link href="/professionisti?cat=toelettatura" className="hover:text-primary transition-colors">Toelettatura</Link></li>
              <li><Link href="/professionisti?cat=educatore_cinofilo" className="hover:text-primary transition-colors">Educatori cinofili</Link></li>
              <li><Link href="/professionisti?cat=veterinario" className="hover:text-primary transition-colors">Veterinari</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/chi-siamo" className="hover:text-primary transition-colors">Chi siamo</Link></li>
              <li><Link href="/per-professionisti" className="hover:text-primary transition-colors">Per i professionisti</Link></li>
              <li><Link href="/registra-attivita" className="hover:text-primary transition-colors">Registra la tua attivita</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/termini" className="hover:text-primary transition-colors">Termini di servizio</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} MifidoDiTe.eu — Mi fido di te. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Fatto con <Heart size={12} className="text-primary" /> per gli amici a 4 zampe
          </p>
        </div>
      </div>
    </footer>
  );
}
