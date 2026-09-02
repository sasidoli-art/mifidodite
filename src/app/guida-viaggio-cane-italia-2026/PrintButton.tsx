"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
    >
      <Download size={18} /> Scarica come PDF
    </button>
  );
}
