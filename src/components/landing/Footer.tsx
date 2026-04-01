import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold text-white">
                MifidoDiTe.it
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Il portale italiano per trovare pensioni, spiagge pet-friendly e
              professionisti del mondo animale vicino a te. Anche quelli che non
              hanno un sito web.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Categorie</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/professionisti?cat=pensione" className="hover:text-primary transition-colors">Pensioni</Link></li>
              <li><Link href="/spiagge" className="hover:text-primary transition-colors">Spiagge dog-friendly</Link></li>
              <li><Link href="/professionisti?cat=toelettatura" className="hover:text-primary transition-colors">Toelettatura</Link></li>
              <li><Link href="/professionisti?cat=dog_sitter" className="hover:text-primary transition-colors">Dog sitter</Link></li>
              <li><Link href="/professionisti?cat=educatore_cinofilo" className="hover:text-primary transition-colors">Educatori cinofili</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chi-siamo" className="hover:text-primary transition-colors">Chi siamo</Link></li>
              <li><Link href="/per-professionisti" className="hover:text-primary transition-colors">Per i professionisti</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/termini" className="hover:text-primary transition-colors">Termini di servizio</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} MifidoDiTe.it — Mi fido di te. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
