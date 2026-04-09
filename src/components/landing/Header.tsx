"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { NewsletterPopup } from "@/components/shared/NewsletterPopup";
import { LogoPaw, LogoText } from "@/components/shared/Logo";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-background/95 backdrop-blur-[24px] saturate-[1.4] shadow-[0_4px_40px_rgba(61,43,31,.1)] border-b border-foreground/[.05]"
          : "bg-background/80 backdrop-blur-[24px] saturate-[1.4] border-b border-foreground/[.03]"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:scale-[1.03] transition-transform">
            <LogoPaw size={24} />
            <LogoText variant="light" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[14px] font-medium transition-colors py-1 ${
                  link.accent
                    ? "text-destructive hover:text-destructive/80"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {!link.accent && (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-full hover:w-full" />
                )}
              </Link>
            ))}

            <div className="w-px h-5 bg-border mx-1" />

            <Link href="/per-professionisti" className="text-[14px] font-medium text-primary hover:text-primary-dark transition-colors">
              Sei un professionista?
            </Link>

            <button
              onClick={() => setShowNewsletter(true)}
              className="relative bg-foreground text-white px-5 py-2.5 rounded-full text-[14px] font-semibold overflow-hidden transition-all hover:shadow-lg group"
            >
              <span className="absolute inset-0 bg-primary transform scale-x-0 origin-right transition-transform duration-400 group-hover:scale-x-100 group-hover:origin-left rounded-full" />
              <span className="relative z-10">Iscriviti gratis</span>
            </button>
          </nav>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <div className="p-2 hover:bg-muted rounded-lg transition-colors" role="button" aria-label="Apri menu"><Menu size={24} /></div>
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
                  <button onClick={() => setShowNewsletter(true)} className="mx-4 mt-2 py-3 rounded-full text-base font-medium bg-foreground text-white text-center">
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
