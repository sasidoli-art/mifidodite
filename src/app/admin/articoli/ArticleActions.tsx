"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";

export function ArticleActions({ articleId }: { articleId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approva" | "rifiuta" | null>(null);

  async function action(act: "approva" | "rifiuta") {
    if (act === "rifiuta" && !confirm("Sicuro di voler rifiutare e cancellare questa bozza?")) return;

    setLoading(act);
    try {
      const res = await fetch(`/api/admin/articoli/${articleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: act }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Errore");
      }
    } catch {
      alert("Errore di connessione");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => action("rifiuta")}
        disabled={loading !== null}
        className="inline-flex items-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
      >
        {loading === "rifiuta" ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
        Rifiuta
      </button>
      <button
        onClick={() => action("approva")}
        disabled={loading !== null}
        className="inline-flex items-center gap-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
      >
        {loading === "approva" ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
        Approva e pubblica
      </button>
    </div>
  );
}
