import Link from "next/link";
import { Mail, Heart } from "lucide-react";
import { LogoPawDark, LogoText } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='.6' fill='white'/%3E%3C/svg%3E\")" }} />
      <div className="max-w-[1160px] mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LogoPawDark size={28} />
              <LogoText variant="dark" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Il magazine pet d&apos;Italia. Guide, consigli, offerte e servizi per cani e gatti.
            </p>
            <div className="space-y-1.5">
              <a href="mailto:info@mifidodite.eu"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                <Mail size={14} /> info@mifidodite.eu
              </a>
            </div>
          </div>

          {/* Sezioni principali */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Esplora</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/magazine" className="hover:text-primary transition-colors">Magazine Pet</Link></li>
              <li><Link href="/professionisti" className="hover:text-primary transition-colors">Cerca professionisti</Link></li>
              <li><Link href="/mappa" className="hover:text-primary transition-colors">Mappa</Link></li>
              <li><Link href="/sos-smarriti" className="hover:text-red-400 transition-colors">SOS Smarriti</Link></li>
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
              <li><Link href="/per-professionisti" className="hover:text-primary transition-colors">Per i professionisti</Link></li>
              <li><Link href="/chi-siamo" className="hover:text-primary transition-colors">Chi siamo</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/termini" className="hover:text-primary transition-colors">Termini e Condizioni</Link></li>
              <li><Link href="/legal" className="hover:text-primary transition-colors">Documenti legali</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10">
        <div className="max-w-[1160px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
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
