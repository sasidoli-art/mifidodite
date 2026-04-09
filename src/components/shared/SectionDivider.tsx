// Divisori sfumati tra sezioni — wave SVG + gradient fade

interface DividerProps {
  from?: string; // colore background sezione sopra
  to?: string;   // colore background sezione sotto
  variant?: "wave" | "curve" | "fade" | "angle";
  flip?: boolean;
  className?: string;
}

export function SectionDivider({ from = "#FBF8F4", to = "#3D2B1F", variant = "wave", flip = false, className = "" }: DividerProps) {
  if (variant === "fade") {
    return (
      <div className={`h-24 sm:h-32 ${className}`} style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }} />
    );
  }

  if (variant === "angle") {
    return (
      <div className={`relative h-16 sm:h-24 ${className}`} style={{ background: to }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className={`absolute bottom-full left-0 w-full h-16 sm:h-24 ${flip ? "rotate-180" : ""}`}>
          <polygon fill={to} points="0,100 1440,0 1440,100" />
        </svg>
      </div>
    );
  }

  if (variant === "curve") {
    return (
      <div className={`relative ${className}`} style={{ background: to, marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block w-full h-12 sm:h-20 ${flip ? "rotate-180" : ""}`}>
          <ellipse cx="720" cy="-40" rx="900" ry="80" fill={from} />
        </svg>
      </div>
    );
  }

  // Default: wave
  return (
    <div className={`relative ${className}`} style={{ background: to, marginTop: "-1px" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block w-full h-12 sm:h-20 ${flip ? "rotate-180" : ""}`}>
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z" fill={from} />
      </svg>
    </div>
  );
}
