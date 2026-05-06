"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { NewsletterPopup } from "@/components/shared/NewsletterPopup";
import { LogoPaw } from "@/components/shared/Logo";

const NAV_LINKS = [
  { href: "/magazine", label: "Magazine" },
  { href: "/razze", label: "Razze" },
  { href: "/sos-smarriti", label: "SOS", accent: true },
];

const VACANZE_DROPDOWN = [
  { href: "/vacanze", label: "Strutture ricettive" },
  { href: "/mappa", label: "Mappa interattiva" },
];

const SCOPRI_DROPDOWN = [
  { href: "/spiagge", label: "Spiagge dog-friendly" },
  { href: "/ristoranti", label: "Ristoranti pet-friendly" },
  { href: "/sentieri", label: "Sentieri e escursioni" },
];

const NAV_MOBILE_EXTRA = [
  { href: "/professionisti", label: "Professionisti" },
  { href: "/quiz-razza", label: "Quiz razza" },
  { href: "/costo-cane", label: "Costo cane" },
  { href: "/razioni-cane", label: "Razioni cane" },
  { href: "/eta-cane", label: "Eta cane" },
  { href: "/peso-ideale-cane", label: "Peso ideale" },
  { href: "/offerte", label: "Offerte" },
  { href: "/adozioni", label: "Adozioni" },
  { href: "/cliniche", label: "Cliniche" },
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
      className={`fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(61,43,31,.08)] border-b border-foreground/[.04]"
          : "bg-white/70 backdrop-blur-xl border-b border-foreground/[.03]"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
            <LogoPaw size={26} />
            <span className="text-[17px] font-extrabold tracking-tight text-foreground">
              Mi<span className="text-primary">Fido</span>Di<span className="text-primary">Te</span>
              <span className="text-[10px] font-bold text-primary ml-0.5">.eu</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-[14px] font-medium transition-all ${
                  link.accent
                    ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                    : "text-foreground/60 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Vacanze Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-foreground/60 hover:text-foreground hover:bg-muted transition-all flex items-center gap-1">
                Vacanze <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {VACANZE_DROPDOWN.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Scopri Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-foreground/60 hover:text-foreground hover:bg-muted transition-all flex items-center gap-1">
                Scopri <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {SCOPRI_DROPDOWN.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-5 bg-foreground/10 mx-2" />

            <Link
              href="/per-professionisti"
              className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-primary hover:bg-primary/5 transition-all"
            >
              Per professionisti
            </Link>

            <button
              onClick={() => setShowNewsletter(true)}
              className="ml-2 bg-primary text-white px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all hover:bg-primary-dark hover:shadow-md active:scale-[0.97]"
            >
              Iscriviti
            </button>
          </nav>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <div className="p-2 hover:bg-muted rounded-lg transition-colors" role="button" aria-label="Menu">
                  <Menu size={22} />
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-0.5 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href}
                      className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                        link.accent ? "text-red-500 hover:bg-red-50" : "text-foreground hover:bg-muted"
                      }`}>
                      {link.label}
                    </Link>
                  ))}

                  {/* Vacanze section */}
                  <p className="px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-4 mb-1">Vacanze</p>
                  {VACANZE_DROPDOWN.map((link) => (
                    <Link key={link.href} href={link.href}
                      className="px-4 py-2.5 rounded-xl text-[14px] text-foreground hover:bg-muted transition-colors">
                      {link.label}
                    </Link>
                  ))}

                  {/* Scopri section */}
                  <p className="px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-4 mb-1">Scopri</p>
                  {SCOPRI_DROPDOWN.map((link) => (
                    <Link key={link.href} href={link.href}
                      className="px-4 py-2.5 rounded-xl text-[14px] text-foreground hover:bg-muted transition-colors">
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-border my-3" />
                  <p className="px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Altro</p>
                  {NAV_MOBILE_EXTRA.map((link) => (
                    <Link key={link.href} href={link.href}
                      className="px-4 py-2.5 rounded-xl text-[14px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border my-3" />
                  <Link href="/per-professionisti"
                    className="px-4 py-3 rounded-xl text-[15px] font-medium text-primary hover:bg-primary/5">
                    Per professionisti
                  </Link>
                  <button onClick={() => setShowNewsletter(true)}
                    className="mx-4 mt-3 py-3 rounded-full text-[15px] font-semibold bg-primary text-white text-center active:scale-[0.97]">
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
