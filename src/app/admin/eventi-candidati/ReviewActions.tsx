"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";

export function ReviewActions({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"approve" | "reject" | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function act(action: "approve" | "reject") {
    setBusy(action);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/eventi-candidati/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      router.refresh();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2 pt-2 border-t border-border">
      <button
        onClick={() => act("approve")}
        disabled={busy !== null}
        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
      >
        {busy === "approve" ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
        Approva e pubblica
      </button>
      <button
        onClick={() => act("reject")}
        disabled={busy !== null}
        className="inline-flex items-center gap-1.5 bg-muted hover:bg-red-50 hover:text-red-700 text-foreground/70 text-sm font-semibold px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
      >
        {busy === "reject" ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
        Scarta
      </button>
      {err && <span className="text-xs text-red-600">{err}</span>}
    </div>
  );
}
