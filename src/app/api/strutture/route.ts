import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { PROFESSIONISTI_SEED } from "@/lib/professionisti-seed";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cat = searchParams.get("cat") || "";
  const q = searchParams.get("q") || "";

  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);

      let results;
      if (cat && q) {
        results = await sql`SELECT id, nome, slug, descrizione, categoria, comune, provincia, rating_medio, numero_recensioni FROM strutture WHERE attivo = true AND categoria = ${cat} AND (comune ILIKE ${'%' + q + '%'} OR provincia ILIKE ${'%' + q + '%'} OR nome ILIKE ${'%' + q + '%'}) ORDER BY nome LIMIT 50`;
      } else if (cat) {
        results = await sql`SELECT id, nome, slug, descrizione, categoria, comune, provincia, rating_medio, numero_recensioni FROM strutture WHERE attivo = true AND categoria = ${cat} ORDER BY nome LIMIT 50`;
      } else if (q) {
        results = await sql`SELECT id, nome, slug, descrizione, categoria, comune, provincia, rating_medio, numero_recensioni FROM strutture WHERE attivo = true AND (comune ILIKE ${'%' + q + '%'} OR provincia ILIKE ${'%' + q + '%'} OR nome ILIKE ${'%' + q + '%'}) ORDER BY nome LIMIT 50`;
      } else {
        results = await sql`SELECT id, nome, slug, descrizione, categoria, comune, provincia, rating_medio, numero_recensioni FROM strutture WHERE attivo = true ORDER BY nome LIMIT 50`;
      }

      return NextResponse.json(results.map((r) => ({
        id: r.id,
        nome: r.nome,
        slug: r.slug,
        descrizione: r.descrizione,
        descrizione_storytelling: null,
        categoria: r.categoria,
        comune: r.comune,
        provincia: r.provincia,
        foto_copertina: null,
        rating_medio: Number(r.rating_medio) || 0,
        numero_recensioni: Number(r.numero_recensioni) || 0,
        piano: "free",
        in_evidenza: false,
      })));
    } catch (err) {
      console.error("[API strutture] DB error:", err);
    }
  }

  // Fallback seed
  let data = PROFESSIONISTI_SEED;
  if (cat) data = data.filter((s) => s.categoria === cat);
  if (q) {
    const ql = q.toLowerCase();
    data = data.filter((s) => s.comune.toLowerCase().includes(ql) || s.provincia?.toLowerCase().includes(ql) || s.nome.toLowerCase().includes(ql));
  }
  return NextResponse.json(data);
}
