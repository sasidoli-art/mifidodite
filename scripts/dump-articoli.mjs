#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_EXPORT = path.join(__dirname, "articoli-export.json");
const OUT_CLUSTERS = path.join(__dirname, "cluster-candidati.json");

if (!process.env.DATABASE_URL) {
  console.error("✗ DATABASE_URL non configurata. Esco.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const STOPWORDS = new Set([
  "il","la","lo","i","gli","le","un","una","uno","di","del","dello","della","dei","degli","delle",
  "in","a","ad","e","ed","o","od","per","con","su","sul","sulla","sui","sugli","sulle","da","dal","dalla",
  "guida","completa","completo","come","cosa","che","chi","quale","quali","quando","dove","perche","perche",
  "al","allo","alla","ai","agli","alle","nel","nello","nella","nei","negli","nelle","si","se","non",
  "piu","meno","miei","tua","sua","suo","suoi","sue","tutto","tutti","tutte","ogni","anche","ancora",
  "questo","questa","questi","queste","quel","quella","quello","suo","loro",
  "2025","2026","2024"
]);

const STRIP_SUFFIXES = [
  /-mnrj0\w+$/i, /-[a-z0-9]{8,}$/i,
];

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(plain) {
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

function normalizeSlug(slug) {
  let s = slug.toLowerCase();
  for (const re of STRIP_SUFFIXES) s = s.replace(re, "");
  return s;
}

function tokenize(slug) {
  const s = normalizeSlug(slug);
  const tokens = s.split(/[-_\s]+/).filter(Boolean);
  return new Set(tokens.filter(t => t.length >= 3 && !STOPWORDS.has(t)));
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return inter / union;
}

// Union-Find
class UF {
  constructor(n) { this.p = Array.from({ length: n }, (_, i) => i); this.r = new Array(n).fill(0); }
  find(x) { while (this.p[x] !== x) { this.p[x] = this.p[this.p[x]]; x = this.p[x]; } return x; }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra === rb) return;
    if (this.r[ra] < this.r[rb]) this.p[ra] = rb;
    else if (this.r[ra] > this.r[rb]) this.p[rb] = ra;
    else { this.p[rb] = ra; this.r[ra]++; }
  }
}

async function main() {
  console.log("📥 Estrazione articoli pubblicati dal DB Neon...");
  const rows = await sql`
    SELECT id, slug, titolo, categoria, estratto, contenuto, tags, created_at, in_evidenza
    FROM articoli
    WHERE pubblicato = TRUE
    ORDER BY created_at ASC
  `;

  console.log(`✓ ${rows.length} articoli recuperati`);

  const articoli = rows.map(r => {
    const plain = stripHtml(r.contenuto);
    return {
      id: r.id,
      slug: r.slug,
      titolo: r.titolo,
      categoria: r.categoria,
      estratto: r.estratto,
      body_sample: plain.slice(0, 1500),
      word_count: countWords(plain),
      tags: r.tags ?? [],
      in_evidenza: r.in_evidenza,
      created_at: r.created_at,
    };
  });

  // --- Riepilogo estrazione ---
  const byCat = new Map();
  for (const a of articoli) byCat.set(a.categoria, (byCat.get(a.categoria) ?? 0) + 1);
  const dates = articoli.map(a => new Date(a.created_at));
  const minDate = dates.length ? new Date(Math.min(...dates.map(d => d.getTime()))) : null;
  const maxDate = dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : null;

  console.log("\n============ FASE 1 — RIEPILOGO ============");
  console.log(`Totale articoli pubblicati: ${articoli.length}`);
  console.log(`Range date: ${minDate?.toISOString().slice(0,10)} → ${maxDate?.toISOString().slice(0,10)}`);
  console.log(`\nDistribuzione per categoria:`);
  const catSorted = [...byCat.entries()].sort((a,b) => b[1] - a[1]);
  for (const [c, n] of catSorted) console.log(`  ${(c ?? "(null)").padEnd(20)} ${n}`);

  const wcStats = articoli.map(a => a.word_count).sort((a,b) => a-b);
  const wcMin = wcStats[0] ?? 0;
  const wcMax = wcStats[wcStats.length - 1] ?? 0;
  const wcMed = wcStats[Math.floor(wcStats.length / 2)] ?? 0;
  console.log(`\nWord count: min=${wcMin} med=${wcMed} max=${wcMax}`);

  await fs.writeFile(OUT_EXPORT, JSON.stringify({
    generato_il: new Date().toISOString(),
    totale: articoli.length,
    articoli,
  }, null, 2), "utf8");
  console.log(`\n💾 Export salvato in ${path.relative(process.cwd(), OUT_EXPORT)}`);

  // --- FASE 2 — pre-clustering lessicale ---
  console.log("\n============ FASE 2 — PRE-CLUSTERING ============");
  const tokens = articoli.map(a => tokenize(a.slug));
  const uf = new UF(articoli.length);
  const THRESHOLD = 0.5;
  let pairs = 0;

  for (let i = 0; i < articoli.length; i++) {
    for (let j = i + 1; j < articoli.length; j++) {
      if (tokens[i].size < 2 || tokens[j].size < 2) continue;
      const s = jaccard(tokens[i], tokens[j]);
      if (s >= THRESHOLD) { uf.union(i, j); pairs++; }
    }
  }

  const groups = new Map();
  for (let i = 0; i < articoli.length; i++) {
    const r = uf.find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(i);
  }

  const clusters = [];
  let singletonCount = 0;
  let clusterId = 1;
  for (const [, idxs] of groups) {
    if (idxs.length === 1) { singletonCount++; continue; }
    const members = idxs.map(i => ({
      id: articoli[i].id,
      slug: articoli[i].slug,
      titolo: articoli[i].titolo,
      categoria: articoli[i].categoria,
      word_count: articoli[i].word_count,
      created_at: articoli[i].created_at,
    })).sort((a,b) => b.word_count - a.word_count);
    clusters.push({
      cluster_id: `cl_${String(clusterId++).padStart(3, "0")}`,
      size: members.length,
      articoli: members,
    });
  }
  clusters.sort((a,b) => b.size - a.size);

  const sizes = clusters.map(c => c.size).sort((a,b) => a-b);
  const sizeMin = sizes[0] ?? 0;
  const sizeMax = sizes[sizes.length - 1] ?? 0;
  const sizeAvg = sizes.length ? (sizes.reduce((s,n) => s+n, 0) / sizes.length).toFixed(2) : 0;
  const sizeDist = new Map();
  for (const s of sizes) sizeDist.set(s, (sizeDist.get(s) ?? 0) + 1);

  console.log(`Soglia Jaccard: ${THRESHOLD}`);
  console.log(`Coppie simili trovate: ${pairs}`);
  console.log(`Cluster candidati (size ≥ 2): ${clusters.length}`);
  console.log(`Singleton: ${singletonCount}`);
  console.log(`Size cluster: min=${sizeMin} avg=${sizeAvg} max=${sizeMax}`);
  console.log(`\nDistribuzione size:`);
  for (const [s, n] of [...sizeDist.entries()].sort((a,b) => a[0]-b[0])) {
    console.log(`  size ${s}:  ${n} cluster`);
  }
  console.log(`\nTop 10 cluster per size:`);
  for (const c of clusters.slice(0, 10)) {
    console.log(`  ${c.cluster_id} (size ${c.size}):`);
    for (const m of c.articoli.slice(0, 5)) console.log(`    - [${m.word_count}w] ${m.slug}`);
    if (c.articoli.length > 5) console.log(`    ... +${c.articoli.length - 5} altri`);
  }

  await fs.writeFile(OUT_CLUSTERS, JSON.stringify({
    generato_il: new Date().toISOString(),
    soglia_jaccard: THRESHOLD,
    totale_articoli: articoli.length,
    singleton: singletonCount,
    cluster_candidati: clusters,
  }, null, 2), "utf8");
  console.log(`\n💾 Cluster salvati in ${path.relative(process.cwd(), OUT_CLUSTERS)}`);

  if (clusters.length > 30) {
    console.log(`\n⚠  ${clusters.length} cluster candidati — soglia Jaccard ${THRESHOLD} potrebbe essere troppo bassa. Valutare alzarla.`);
  }
}

main().catch(e => {
  console.error("Errore fatale:", e);
  process.exit(1);
});
