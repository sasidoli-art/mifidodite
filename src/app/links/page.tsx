import { Newspaper, ShoppingBag, Heart, AlertTriangle, MessageCircle, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { LogoPaw, LogoText } from "@/components/shared/Logo";

export const metadata = {
  title: "MiFidoDiTe.eu — Link",
  description: "Tutti i link utili di MifidoDiTe.eu, il magazine pet d'Italia.",
};

const LINKS = [
  { href: "/magazine", label: "Magazine Pet", desc: "140+ articoli su cani, gatti e pet", icon: Newspaper, color: "bg-primary/10 text-primary" },
  { href: "/offerte", label: "Offerte Amazon", desc: "Cibo, accessori e giochi in offerta", icon: ShoppingBag, color: "bg-accent/10 text-accent" },
  { href: "/professionisti", label: "Cerca Professionisti", desc: "Veterinari, pensioni, toelettatori", icon: Search, color: "bg-secondary/10 text-secondary" },
  { href: "/adozioni", label: "Adozioni", desc: "Annunci reali da Subito.it", icon: Heart, color: "bg-red-500/10 text-red-500" },
  { href: "/sos-smarriti", label: "SOS Smarriti", desc: "Segnala o cerca un animale perso", icon: AlertTriangle, color: "bg-red-500/10 text-red-500" },
  { href: "/mappa", label: "Mappa Pet", desc: "Professionisti e servizi sulla mappa", icon: MapPin, color: "bg-secondary/10 text-secondary" },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center px-4 py-12">
      {/* Logo + brand */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center">
            <LogoPaw size={40} />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Mi<span className="text-primary-light">Fido</span>Di<span className="text-primary-light">Te</span>.eu
        </h1>
        <p className="text-white/50 text-sm mt-2">Il magazine pet d&apos;Italia</p>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm space-y-3">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-4 bg-white/[.06] hover:bg-white/[.12] border border-white/[.06] hover:border-white/[.12] rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
              <link.icon size={22} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm">{link.label}</p>
              <p className="text-white/40 text-xs mt-0.5">{link.desc}</p>
            </div>
          </Link>
        ))}

        {/* Chatbot Zampa */}
        <Link
          href="/"
          className="group flex items-center gap-4 bg-primary/20 hover:bg-primary/30 border border-primary/20 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <MessageCircle size={22} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm">Chiedi a Zampa</p>
            <p className="text-white/50 text-xs mt-0.5">Il nostro assistente AI risponde 24/7</p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <a href="https://www.mifidodite.eu" className="text-white/30 text-xs hover:text-white/50 transition-colors">
          www.mifidodite.eu
        </a>
      </div>
    </div>
  );
}
