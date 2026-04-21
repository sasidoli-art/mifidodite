#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT_PATH = path.join(__dirname, "audit-consolidamento.json");
const OUT_PATH = path.join(__dirname, "internal-linking-inventory.json");

if (!process.env.DATABASE_URL) { console.error("✗ DATABASE_URL mancante"); process.exit(1); }
const sql = neon(process.env.DATABASE_URL);

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}
function countWords(plain) { return plain ? plain.split(/\s+/).filter(Boolean).length : 0; }

// Pagine strumento come link target (hub principali del sito)
const TOOL_PAGES = [
  { url: "/razze",             label: "Razze di cani",                 topic: "schede razze, standard, scelta razza" },
  { url: "/quiz-razza",        label: "Quiz razza ideale",             topic: "aiuta a scegliere la razza in base allo stile di vita" },
  { url: "/costo-cane",        label: "Calcolatore costo cane",        topic: "stima costi annui cane (cibo, vet, toelettatura)" },
  { url: "/razioni-cane",      label: "Calcolatore razioni",           topic: "calcola dose giornaliera cibo in base a peso/eta" },
  { url: "/eta-cane",          label: "Eta cane in anni umani",        topic: "conversione eta cane" },
  { url: "/peso-ideale-cane",  label: "Peso ideale del cane",          topic: "calcola peso forma per razza/taglia" },
  { url: "/spiagge",           label: "Spiagge dog-friendly",          topic: "directory spiagge accessibili ai cani in Italia" },
  { url: "/vacanze",           label: "Vacanze con il cane",           topic: "directory strutture ricettive pet-friendly" },
  { url: "/ristoranti",        label: "Ristoranti pet-friendly",       topic: "directory ristoranti che accettano cani" },
  { url: "/sentieri",          label: "Sentieri per cani",             topic: "directory percorsi escursionistici dog-friendly" },
  { url: "/professionisti",    label: "Professionisti pet",            topic: "veterinari, educatori, dog-sitter" },
  { url: "/sos-smarriti",      label: "SOS cani smarriti",             topic: "segnalazioni smarrimento + ritrovati" },
];

const audit = JSON.parse(await fs.readFile(AUDIT_PATH, "utf8"));
const masterSlugs = audit.azioni.map(a => a.master.slug);

console.log(`📖 Audit caricato: ${audit.azioni.length} cluster master\n`);

// --- Fetch master articles full ---
const masterRows = await sql`
  SELECT id, slug, titolo, categoria, estratto, contenuto, created_at, updated_at
  FROM articoli
  WHERE slug = ANY(${masterSlugs})
`;
const masters = masterRows.map(r => {
  const plain = stripHtml(r.contenuto);
  return {
    id: r.id,
    slug: r.slug,
    titolo: r.titolo,
    categoria: r.categoria,
    estratto: r.estratto,
    contenuto: r.contenuto,
    body_plain: plain,
    word_count: countWords(plain),
    published_at: r.created_at,
    updated_at: r.updated_at,
  };
});

// Ordina masters nello stesso ordine dell'audit
const masterBySlug = new Map(masters.map(m => [m.slug, m]));
const mastersOrdered = masterSlugs.map(s => masterBySlug.get(s)).filter(Boolean);

if (mastersOrdered.length !== masterSlugs.length) {
  const missing = masterSlugs.filter(s => !masterBySlug.has(s));
  console.log(`⚠ Master mancanti nel DB: ${missing.join(", ")}`);
}

// --- Fetch candidati (tutti gli altri articoli vivi) ---
const candidateRows = await sql`
  SELECT id, slug, titolo, categoria, estratto
  FROM articoli
  WHERE pubblicato = TRUE AND redirect_to_slug IS NULL
  ORDER BY categoria, slug
`;
const masterIds = new Set(masters.map(m => m.id));
const candidates = candidateRows.filter(r => !masterIds.has(r.id));

// Distribuzione categorie candidati
const candCatDist = new Map();
for (const c of candidates) candCatDist.set(c.categoria, (candCatDist.get(c.categoria) ?? 0) + 1);

console.log(`Master:            ${mastersOrdered.length}`);
console.log(`Candidati articoli: ${candidates.length}`);
console.log(`Pagine strumento:   ${TOOL_PAGES.length}\n`);
console.log(`Distribuzione candidati per categoria:`);
for (const [c, n] of [...candCatDist.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${(c ?? "(null)").padEnd(20)} ${n}`);
}

const inventory = {
  generato_il: new Date().toISOString(),
  conteggio: {
    master: mastersOrdered.length,
    candidati: candidates.length,
    pagine_strumento: TOOL_PAGES.length,
  },
  master: mastersOrdered,
  candidati: candidates,
  pagine_strumento: TOOL_PAGES,
};

await fs.writeFile(OUT_PATH, JSON.stringify(inventory, null, 2), "utf8");
console.log(`\n💾 Inventario salvato in ${path.relative(process.cwd(), OUT_PATH)}`);
