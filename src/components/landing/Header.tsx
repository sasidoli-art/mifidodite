"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const NAV_MAIN = [
  { href: "/magazine", label: "Magazine" },
  { href: "/adozioni", label: "Adozioni" },
  { href: "/sos-smarriti", label: "SOS Smarriti" },
  { href: "/professionisti", label: "Professionisti" },
];

const NAV_MORE = [
  { href: "/mappa", label: "🗺️ Mappa" },
  { href: "/spiagge", label: "🏖️ Spiagge" },
  { href: "/cliniche", label: "🏥 Cliniche & Rifugi" },
  { href: "/eventi", label: "📅 Eventi" },
  { href: "/offerte", label: "🏷️ Offerte e Volantini" },
  { href: "/prezzi", label: "💰 Quanto costa?" },
];

const NAV_ALL = [...NAV_MAIN, ...NAV_MORE];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiudi dropdown quando clicchi fuori
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-white/80 backdrop-blur border-b border-border/30"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-3xl"
              whileHover={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 0.5 }}
            >
              🐾
            </motion.span>
            <span className="text-xl font-bold text-primary">
              MifidoDiTe<span className="text-foreground">.eu</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_MAIN.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-2/3" />
              </Link>
            ))}

            {/* Dropdown "Altro" */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Altro
                <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-border/50 py-2 z-50">
                  {NAV_MORE.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#newsletter"
                className="ml-3 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Iscriviti gratis
              </Link>
            </motion.div>
          </nav>

          {/* Mobile — Sheet */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <div className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Menu size={24} />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-1 mt-8">
                  {NAV_ALL.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border my-3" />
                  <Link
                    href="/per-professionisti"
                    className="px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
                  >
                    Per i professionisti
                  </Link>
                  <Link
                    href="#newsletter"
                    className="mx-4 mt-2 py-3 rounded-lg text-base font-medium bg-primary text-white text-center"
                  >
                    Iscriviti gratis
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
