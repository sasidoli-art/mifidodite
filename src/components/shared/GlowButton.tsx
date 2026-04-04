"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VARIANTS = {
  primary: {
    bg: "bg-gradient-to-r from-primary to-primary-dark",
    glow: "bg-primary",
    shadow: "shadow-primary/30",
    particles: "#e67e22",
  },
  secondary: {
    bg: "bg-gradient-to-r from-secondary to-emerald-500",
    glow: "bg-secondary",
    shadow: "shadow-secondary/30",
    particles: "#2ecc71",
  },
  accent: {
    bg: "bg-gradient-to-r from-accent to-blue-500",
    glow: "bg-accent",
    shadow: "shadow-accent/30",
    particles: "#3498db",
  },
  danger: {
    bg: "bg-gradient-to-r from-red-500 to-red-600",
    glow: "bg-red-500",
    shadow: "shadow-red-500/30",
    particles: "#e74c3c",
  },
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const v = VARIANTS[variant];
  const s = SIZES[size];

  const content = (
    <motion.div
      className={`relative inline-flex items-center justify-center gap-2 ${v.bg} text-white ${s} rounded-xl font-semibold cursor-pointer overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      {/* Glow di fondo */}
      <motion.div
        className={`absolute inset-0 ${v.glow} opacity-0 blur-xl`}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Onda luminosa che scorre */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Particelle luminose */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: (Math.random() - 0.5) * 120,
                y: (Math.random() - 0.5) * 60,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 0.6 + Math.random() * 0.4,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </>
      )}

      {/* Bordo luminoso */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          boxShadow: isHovered
            ? `0 0 20px ${v.particles}40, 0 0 40px ${v.particles}20, inset 0 0 20px ${v.particles}10`
            : "none",
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${v.particles}40, 0 0 40px ${v.particles}20, inset 0 0 20px ${v.particles}10`
            : `0 0 0px transparent`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Contenuto */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
