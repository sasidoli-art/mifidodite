"use client";

import { openConsentBanner } from "@/lib/consent";

export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className={className ?? "hover:text-primary transition-colors text-left"}
    >
      Gestisci cookie
    </button>
  );
}
