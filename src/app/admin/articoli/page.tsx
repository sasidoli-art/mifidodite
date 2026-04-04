"use client";

import { Edit, Eye, Trash2, Plus, Clock } from "lucide-react";
import Link from "next/link";
import { ARTICOLI_SEED } from "@/lib/articoli-seed";

export default function AdminArticoliPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestione Articoli</h1>
          <p className="text-sm text-muted-foreground">{ARTICOLI_SEED.length} articoli pubblicati</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
          <Plus size={16} /> Nuovo articolo
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold">Articolo</th>
              <th className="text-left p-4 font-semibold hidden md:table-cell">Categoria</th>
              <th className="text-left p-4 font-semibold hidden lg:table-cell">Lettura</th>
              <th className="text-left p-4 font-semibold hidden sm:table-cell">Data</th>
              <th className="text-right p-4 font-semibold">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {ARTICOLI_SEED.map((a) => (
              <tr key={a.slug} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={a.img} alt="" className="w-12 h-12 rounded-lg object-cover hidden sm:block" />
                    <div>
                      <p className="font-semibold text-foreground line-clamp-1">{a.titolo}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.estratto}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">{a.categoria}</span>
                </td>
                <td className="p-4 text-muted-foreground hidden lg:table-cell">
                  <span className="flex items-center gap-1"><Clock size={12} /> {a.tempo_lettura}</span>
                </td>
                <td className="p-4 text-muted-foreground text-sm hidden sm:table-cell">{a.data}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/magazine/${a.slug}`} className="p-2 hover:bg-muted rounded-lg" title="Vedi">
                      <Eye size={16} className="text-muted-foreground" />
                    </Link>
                    <button className="p-2 hover:bg-muted rounded-lg" title="Modifica">
                      <Edit size={16} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg" title="Elimina">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
