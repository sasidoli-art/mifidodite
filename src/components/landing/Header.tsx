"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, PawPrint } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { NewsletterPopup } from "@/components/shared/NewsletterPopup";

const NAV_LINKS = [
  { href: "/magazine", label: "Magazine" },
  { href: "/professionisti", label: "Professionisti" },
  { href: "/mappa", label: "Mappa" },
  { href: "/offerte", label: "Offerte" },
  { href: "/adozioni", label: "Adozioni" },
  { href: "/sos-smarriti", label: "SOS Smarriti", accent: true },
];

const NAV_MOBILE_EXTRA = [
  { href: "/spiagge", label: "Spiagge" },
  { href: "/cliniche", label: "Cliniche & Rifugi" },
  { href: "/eventi", label: "Eventi" },
  { href: "/offerte", label: "Offerte" },
  { href: "/prezzi", label: "Prezzi" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <NewsletterPopup open={showNewsletter} onClose={() => setShowNewsletter(false)} />
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-white border-b border-border/20"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
              whileHover={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <PawPrint size={22} strokeWidth={2} />
            </motion.div>
            <span className="text-lg font-bold text-primary">
              MifidoDiTe<span className="text-foreground">.eu</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                  link.accent ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"
                }`}>
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all group-hover:w-2/3 ${
                  link.accent ? "bg-red-500" : "bg-primary"
                }`} />
              </Link>
            ))}

            <div className="w-px h-5 bg-border mx-2" />

            <Link href="/per-professionisti" className="px-3 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Sei un professionista?
            </Link>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <button onClick={() => setShowNewsletter(true)} className="ml-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">
                Iscriviti gratis
              </button>
            </motion.div>
          </nav>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <div className="p-2 hover:bg-muted rounded-lg transition-colors" role="button" aria-label="Apri menu di navigazione"><Menu size={24} /></div>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-0.5 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        link.accent ? "text-red-500 hover:bg-red-50" : "text-foreground hover:bg-muted"
                      }`}>
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border my-2" />
                  <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Altro</p>
                  {NAV_MOBILE_EXTRA.map((link) => (
                    <Link key={link.href} href={link.href}
                      className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border my-2" />
                  <Link href="/per-professionisti" className="px-4 py-3 rounded-lg text-base font-medium text-primary hover:bg-primary/5">
                    Sei un professionista?
                  </Link>
                  <button onClick={() => setShowNewsletter(true)} className="mx-4 mt-2 py-3 rounded-lg text-base font-medium bg-primary text-white text-center">
                    Iscriviti gratis
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
    </>
  );
}
