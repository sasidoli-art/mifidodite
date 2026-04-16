import Link from "next/link";
import { Mail } from "lucide-react";
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
              Il portale italiano per chi viaggia e vive con il proprio animale. Spiagge, vacanze, ristoranti, sentieri, razze e guide.
            </p>
            <div className="space-y-1.5">
              <a href="mailto:info@mifidodite.eu"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                <Mail size={14} /> info@mifidodite.eu
              </a>
            </div>
          </div>

          {/* Viaggiare col cane */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Viaggiare col cane</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/spiagge" className="hover:text-primary transition-colors">Spiagge dog-friendly</Link></li>
              <li><Link href="/vacanze" className="hover:text-primary transition-colors">Hotel e agriturismi</Link></li>
              <li><Link href="/ristoranti" className="hover:text-primary transition-colors">Ristoranti</Link></li>
              <li><Link href="/sentieri" className="hover:text-primary transition-colors">Sentieri ed escursioni</Link></li>
              <li><Link href="/mappa" className="hover:text-primary transition-colors">Mappa professionisti</Link></li>
            </ul>
          </div>

          {/* Conoscere il cane */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Conoscere il cane</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/razze" className="hover:text-primary transition-colors">Schede razza</Link></li>
              <li><Link href="/quiz-razza" className="hover:text-primary transition-colors">Quiz: quale razza?</Link></li>
              <li><Link href="/costo-cane" className="hover:text-primary transition-colors">Costo annuale cane</Link></li>
              <li><Link href="/razioni-cane" className="hover:text-primary transition-colors">Razioni giornaliere</Link></li>
              <li><Link href="/eta-cane" className="hover:text-primary transition-colors">Eta umana</Link></li>
              <li><Link href="/peso-ideale-cane" className="hover:text-primary transition-colors">Peso ideale</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/magazine" className="hover:text-primary transition-colors">Magazine</Link></li>
              <li><Link href="/professionisti" className="hover:text-primary transition-colors">Cerca professionisti</Link></li>
              <li><Link href="/sos-smarriti" className="hover:text-red-400 transition-colors">SOS Smarriti</Link></li>
              <li><Link href="/per-professionisti" className="hover:text-primary transition-colors">Per i professionisti</Link></li>
              <li><Link href="/chi-siamo" className="hover:text-primary transition-colors">Chi siamo</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy &amp; Termini</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10">
        <div className="max-w-[1160px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} MifidoDiTe.eu &mdash; Contenuti e database protetti. Riproduzione vietata.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-primary" />
            Creato per l&apos;amore degli amici a 4 zampe
          </p>
        </div>
      </div>
    </footer>
  );
}
