"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/magazine", label: "Magazine" },
  { href: "/professionisti", label: "Professionisti" },
  { href: "/spiagge", label: "Spiagge" },
  { href: "/cliniche", label: "Cliniche & Rifugi" },
  { href: "/eventi", label: "Eventi" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-2/3" />
              </Link>
            ))}
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
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="#newsletter"
                    className="mt-4 px-4 py-3 rounded-lg text-base font-medium bg-primary text-white text-center"
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
