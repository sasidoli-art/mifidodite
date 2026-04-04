"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const NAV_BUTTONS = [
  { href: "/magazine", label: "📰 Magazine" },
  { href: "/adozioni", label: "❤️ Adozioni" },
  { href: "/sos-smarriti", label: "🚨 SOS Smarriti" },
  { href: "/professionisti", label: "🔍 Professionisti" },
  { href: "/mappa", label: "🗺️ Mappa" },
  { href: "/spiagge", label: "🏖️ Spiagge" },
  { href: "/cliniche", label: "🏥 Cliniche" },
  { href: "/eventi", label: "📅 Eventi" },
  { href: "/offerte", label: "🏷️ Offerte" },
  { href: "/prezzi", label: "💰 Prezzi" },
  { href: "/per-professionisti", label: "👔 Per Professionisti" },
];

function NavGlowLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        className="relative whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-full cursor-pointer overflow-hidden border border-border/60 bg-white"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          backgroundColor: hovered ? "rgba(230, 126, 34, 0.08)" : "#ffffff",
          borderColor: hovered ? "rgba(230, 126, 34, 0.4)" : "rgba(0,0,0,0.08)",
          color: hovered ? "#e67e22" : "#4b5563",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {hovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
        {hovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/60"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 50,
                  y: (Math.random() - 0.5) * 30,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
              />
            ))}
          </>
        )}
        <span className="relative z-10">{label}</span>
      </motion.div>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Barra logo + CTA */}
      <div className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <motion.span
                className="text-2xl"
                whileHover={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.5 }}
              >
                🐾
              </motion.span>
              <span className="text-lg font-bold text-primary">
                MifidoDiTe<span className="text-foreground">.eu</span>
              </span>
            </Link>

            {/* Desktop: solo bottone CTA */}
            <div className="hidden lg:block">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#newsletter"
                  className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Iscriviti gratis
                </Link>
              </motion.div>
            </div>

            {/* Mobile — Sheet */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger>
                  <div className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Menu size={24} />
                  </div>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex flex-col gap-0.5 mt-8">
                    {NAV_BUTTONS.map((link) => (
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
      </div>

      {/* Navigazione — solo bottoni luminosi */}
      <div className={`hidden lg:block border-b transition-all duration-300 ${
        scrolled ? "border-border/40" : "border-border/20"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-2 py-2.5 overflow-x-auto">
            {NAV_BUTTONS.map((link) => (
              <NavGlowLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
