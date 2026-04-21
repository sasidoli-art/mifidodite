#!/usr/bin/env node
// TASK 3 — applica il preview hero al DB in transazione singola.
// Backup del vecchio img in img_legacy (rollback possibile).
// og_image NON toccato (resta NULL).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PREVIEW = path.join(__dirname, "hero-assignment-preview.json");
const LOG = path.join(__dirname, "hero-assignment-applied.log");

if (!process.env.DATABASE_URL) { console.error("✗ DATABASE_URL mancante"); process.exit(1); }
const sql = neon(process.env.DATABASE_URL);

const plan = JSON.parse(await fs.readFile(PREVIEW, "utf8"));
const entries = plan.preview;

// Fetch master articles: serve id + img corrente (per backup)
const slugs = entries.map(e => e.master_slug);
const rows = await sql`SELECT id, slug, img FROM articoli WHERE slug = ANY(${slugs})`;
const bySlug = new Map(rows.map(r => [r.slug, r]));

// Build updates
function toHttpPath(manifestPath) {
  return "/" + manifestPath.replace(/^app\/public\//, "");
}

const updates = [];
for (const e of entries) {
  const art = bySlug.get(e.master_slug);
  if (!art) { console.error(`✗ master mancante nel DB: ${e.master_slug}`); process.exit(1); }
  const newImg = toHttpPath(e.foto_scelta.path_card_jpg);
  updates.push({
    id: art.id,
    slug: art.slug,
    old_img: art.img,
    new_img: newImg,
    new_alt: e.foto_scelta.alt_text,
    foto_slug: e.foto_scelta.slug,
    categoria_foto: e.foto_scelta.categoria_foto,
    confidenza: e.confidenza_match,
    cluster_topic: e.cluster_topic,
  });
}

console.log(`\n▶ TASK 3 — Hero assignment\n  18 master da aggiornare\n  og_image: NON toccato (NULL)`);

// Transaction
const started = Date.now();
try {
  const queries = updates.map(u => sql`
    UPDATE articoli
    SET img_legacy = img,
        img = ${u.new_img},
        img_alt = ${u.new_alt},
        updated_at = NOW()
    WHERE id = ${u.id}
  `);
  await sql.transaction(queries);
} catch (err) {
  console.error(`\n✗ TRANSACTION FAILED — ROLLBACK automatico:`);
  console.error(err);
  process.exit(1);
}
const elapsed = Date.now() - started;

// Verify post-commit
const verifyRows = await sql`
  SELECT id, slug, img, img_alt, img_legacy IS NOT NULL AS has_backup
  FROM articoli
  WHERE id = ANY(${updates.map(u => u.id)})
`;
const verifyById = new Map(verifyRows.map(r => [r.id, r]));

let postOk = 0, postFail = 0;
for (const u of updates) {
  const v = verifyById.get(u.id);
  if (!v) { postFail++; u.post_ok = false; continue; }
  const matchImg = v.img === u.new_img;
  const matchAlt = v.img_alt === u.new_alt;
  const matchBackup = v.has_backup === true;
  u.post_ok = matchImg && matchAlt && matchBackup;
  u.post_img = v.img;
  u.post_has_backup = matchBackup;
  if (u.post_ok) postOk++; else postFail++;
}

// Log
const logLines = [];
logLines.push(`# Hero assignment applied log`);
logLines.push(`Avvio/Fine:  ${new Date(started).toISOString()} / ${new Date().toISOString()}`);
logLines.push(`Durata:      ${elapsed}ms`);
logLines.push(`Master aggiornati: ${postOk}/${updates.length}`);
logLines.push(`Post-commit anomalie: ${postFail}`);
logLines.push(``);
logLines.push(`## Dettaglio per master`);
for (const u of updates) {
  logLines.push(``);
  logLines.push(`### ${u.slug}`);
  logLines.push(`  id:            ${u.id}`);
  logLines.push(`  cluster:       ${u.cluster_topic}`);
  logLines.push(`  confidenza:    ${u.confidenza}`);
  logLines.push(`  categoria_foto: ${u.categoria_foto}`);
  logLines.push(`  foto_slug:     ${u.foto_slug}`);
  logLines.push(`  old_img:       ${u.old_img ?? "(null)"}`);
  logLines.push(`  new_img:       ${u.new_img}`);
  logLines.push(`  new_alt:       ${u.new_alt}`);
  logLines.push(`  post_ok:       ${u.post_ok}`);
}
await fs.writeFile(LOG, logLines.join("\n"), "utf8");

// Report console
console.log(`\n============ REPORT TASK 3 ============`);
console.log(`Master aggiornati:     ${postOk}/${updates.length}`);
console.log(`Durata transazione:    ${elapsed}ms`);
console.log(`Post-commit anomalie:  ${postFail}`);

const example = updates[0];
console.log(`\nEsempio sanity check (${example.slug}):`);
console.log(`  old img: ${example.old_img ?? "(null)"}`);
console.log(`  new img: ${example.post_img}`);
console.log(`  has_backup: ${example.post_has_backup}`);

const catDist = new Map();
for (const u of updates) catDist.set(u.categoria_foto, (catDist.get(u.categoria_foto) ?? 0) + 1);
console.log(`\nDistribuzione categorie foto usate:`);
for (const [c, n] of [...catDist.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${c.padEnd(15)} ${n}`);

const confDist = new Map();
for (const u of updates) confDist.set(u.confidenza, (confDist.get(u.confidenza) ?? 0) + 1);
console.log(`\nConfidenza match:`);
for (const [c, n] of [...confDist.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${c.padEnd(10)} ${n}`);

console.log(`\nMaster con confidenza bassa (elenco):`);
for (const u of updates.filter(x => x.confidenza === "bassa")) {
  console.log(`  - ${u.slug}  (${u.cluster_topic})`);
}

console.log(`\nLog salvato: ${path.relative(process.cwd(), LOG)}`);

if (postFail > 0) {
  console.error(`\n⚠ ${postFail} anomalie post-commit — verifica manuale`);
  process.exit(2);
}
console.log(`\n✓ TASK 3 completato senza anomalie.`);
