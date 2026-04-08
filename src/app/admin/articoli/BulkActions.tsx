"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, Trash, Loader2 } from "lucide-react";

export function BulkActions({ count }: { count: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approva-tutte" | "rifiuta-tutte" | null>(null);

  async function bulk(action: "approva-tutte" | "rifiuta-tutte") {
    const msg =
      action === "approva-tutte"
        ? `Sicuro di voler pubblicare TUTTE le ${count} bozze?`
        : `Sicuro di voler RIFIUTARE e CANCELLARE tutte le ${count} bozze? L'azione e irreversibile.`;
    if (!confirm(msg)) return;

    setLoading(action);
    try {
      const res = await fetch(`/api/admin/articoli/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "OK");
        router.refresh();
      } else {
        alert(data.error || "Errore");
      }
    } catch {
      alert("Errore di connessione");
    } finally {
      setLoading(null);
    }
  }

  if (count === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => bulk("rifiuta-tutte")}
        disabled={loading !== null}
        className="inline-flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
      >
        {loading === "rifiuta-tutte" ? <Loader2 size={13} className="animate-spin" /> : <Trash size={13} />}
        Rifiuta tutte ({count})
      </button>
      <button
        onClick={() => bulk("approva-tutte")}
        disabled={loading !== null}
        className="inline-flex items-center gap-1.5 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
      >
        {loading === "approva-tutte" ? <Loader2 size={13} className="animate-spin" /> : <CheckCheck size={14} />}
        Pubblica tutto ({count})
      </button>
    </div>
  );
}
