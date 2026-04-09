// Logo ufficiale MifidoDiTe.eu — zampa arancione con cuoricino

export function LogoPaw({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="paw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#E84E1B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="26" fill="url(#paw-grad)" />
      <ellipse cx="20" cy="52" rx="14" ry="17" fill="url(#paw-grad)" />
      <ellipse cx="50" cy="38" rx="13" ry="16" fill="url(#paw-grad)" />
      <ellipse cx="80" cy="52" rx="14" ry="17" fill="url(#paw-grad)" />
      <path
        d="M50 98 C50 98 36 86 36 80 C36 76 40 73 44 75 C46 76 48 78 50 81 C52 78 54 76 56 75 C60 73 64 76 64 80 C64 86 50 98 50 98Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}

export function LogoPawDark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="paw-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8C5A" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="26" fill="url(#paw-grad-dark)" />
      <ellipse cx="20" cy="52" rx="14" ry="17" fill="url(#paw-grad-dark)" />
      <ellipse cx="50" cy="38" rx="13" ry="16" fill="url(#paw-grad-dark)" />
      <ellipse cx="80" cy="52" rx="14" ry="17" fill="url(#paw-grad-dark)" />
      <path
        d="M50 98 C50 98 36 86 36 80 C36 76 40 73 44 75 C46 76 48 78 50 81 C52 78 54 76 56 75 C60 73 64 76 64 80 C64 86 50 98 50 98Z"
        fill="#1e1e2e"
        opacity="0.9"
      />
    </svg>
  );
}

export function LogoText({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  const nameColor = variant === "light" ? "text-foreground" : "text-white";
  const accentColor = "text-[#FF6B35]";
  const tagColor = variant === "light" ? "text-muted-foreground" : "text-white/50";

  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span className={`text-lg font-black tracking-tight ${nameColor}`}>
        Mi<span className={accentColor}>Fido</span>Di<span className={accentColor}>Te</span>
        <span className="inline-block bg-[#FF6B35] text-white text-[9px] font-extrabold px-1.5 py-[1px] rounded-md ml-1 align-super">.eu</span>
      </span>
      <span className={`text-[10px] font-semibold uppercase tracking-[3px] mt-1 ${tagColor}`}>
        Il magazine pet d&apos;Italia
      </span>
    </div>
  );
}

export function LogoFull({ variant = "light", pawSize = 32 }: { variant?: "light" | "dark"; pawSize?: number }) {
  return (
    <div className="flex items-center gap-3">
      {variant === "light" ? <LogoPaw size={pawSize} /> : <LogoPawDark size={pawSize} />}
      <LogoText variant={variant} />
    </div>
  );
}
