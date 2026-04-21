#!/usr/bin/env node
// Applica i link del plan al DB in transazione singola.
// Strategia insertion: aggiunge un NUOVO paragrafo <p><em>{wrap}</em> <a href=...>anchor</a></p>
// a fine sezione del H2 target. Non modifica il testo originale dei paragrafi esistenti.
// Wrap ruota su 3 formule ("Correlato:", "Leggi anche:", "Approfondisci:") per evitare boilerplate.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAN_PATH = path.join(__dirname, "internal-linking-plan.json");
const LOG_PATH = path.join(__dirname, "internal-linking-applied.log");

if (!process.env.DATABASE_URL) { console.error("✗ DATABASE_URL mancante"); process.exit(1); }
const sql = neon(process.env.DATABASE_URL);

const plan = JSON.parse(await fs.readFile(PLAN_PATH, "utf8"));

const WRAP_FORMS = ["Correlato:", "Leggi anche:", "Approfondisci:"];

function buildLinkParagraph(href, anchor, wrapIdx) {
  const wrap = WRAP_FORMS[wrapIdx % WRAP_FORMS.length];
  // Escape anchor (no HTML injection — anchor text è curato nel plan, ma defend in depth)
  const safeAnchor = anchor.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<p><em>${wrap}</em> <a href="${href}">${safeAnchor}</a></p>`;
}

function insertLinkAfterH2(html, h2Number, href, anchor, wrapIdx) {
  const newPara = buildLinkParagraph(href, anchor, wrapIdx);
  if (h2Number === 0) {
    const m = html.match(/<h2[^>]*>/i);
    if (!m) return html + newPara;
    return html.slice(0, m.index) + newPara + html.slice(m.index);
  }
  const matches = [...html.matchAll(/<h2[^>]*>[\s\S]*?<\/h2>/gi)];
  if (h2Number > matches.length) {
    throw new Error(`H2#${h2Number} non trovato (articolo ha solo ${matches.length} H2)`);
  }
  const current = matches[h2Number - 1];
  const next = matches[h2Number];
  const sectionStart = current.index + current[0].length;
  const sectionEnd = next ? next.index : html.length;
  const sectionText = html.slice(sectionStart, sectionEnd);
  const lastPClose = sectionText.lastIndexOf("</p>");
  if (lastPClose < 0) {
    return html.slice(0, sectionEnd) + newPara + html.slice(sectionEnd);
  }
  const insertAt = sectionStart + lastPClose + "</p>".length;
  return html.slice(0, insertAt) + newPara + html.slice(insertAt);
}

// ---------- Fetch ----------
const sourceSlugs = plan.piano.map(p => p.master_slug);
const rows = await sql`SELECT id, slug, contenuto, pubblicato FROM articoli WHERE slug = ANY(${sourceSlugs})`;
const bySlug = new Map(rows.map(r => [r.slug, r]));

const missing = sourceSlugs.filter(s => !bySlug.has(s));
if (missing.length) {
  console.error(`✗ Sorgenti mancanti nel DB: ${missing.join(", ")}`);
  process.exit(1);
}

// ---------- Build updates ----------
let wrapIdx = 0;
const updates = [];
const audit = [];
let totalLinks = 0;

for (const src of plan.piano) {
  const art = bySlug.get(src.master_slug);
  const beforeCount = (art.contenuto.match(/<a href=/gi) ?? []).length;
  let content = art.contenuto;

  // Ordina link per h2_after ASC così insertion sequenziali mantengono coerenza
  const sorted = [...src.links_proposti].sort((a, b) => (a.h2_di_inserimento - b.h2_di_inserimento));

  const appliedLinks = [];
  for (const l of sorted) {
    const href = l.target_type === "tool_page" ? l.target_slug : `/magazine/${l.target_slug}`;
    try {
      content = insertLinkAfterH2(content, l.h2_di_inserimento, href, l.anchor_text, wrapIdx);
    } catch (e) {
      console.error(`✗ Insertion fallita per ${src.master_slug} → ${l.target_slug}: ${e.message}`);
      process.exit(1);
    }
    appliedLinks.push({
      target_slug: l.target_slug,
      target_type: l.target_type,
      href,
      anchor: l.anchor_text,
      h2_after: l.h2_di_inserimento,
      wrap: WRAP_FORMS[wrapIdx % WRAP_FORMS.length],
    });
    wrapIdx++;
    totalLinks++;
  }

  const afterCount = (content.match(/<a href=/gi) ?? []).length;
  const delta = afterCount - beforeCount;
  const expected = sorted.length;

  updates.push({ id: art.id, slug: art.slug, contenuto: content });
  audit.push({
    id: art.id,
    slug: art.slug,
    source_type: src.source_type,
    cluster_topic: src.cluster_topic,
    links_inseriti_attesi: expected,
    link_count_before: beforeCount,
    link_count_after: afterCount,
    delta,
    delta_match_expected: delta === expected,
    applied_links: appliedLinks,
  });
}

console.log(`\n▶ FASE 3 — Applicazione internal linking`);
console.log(`  Sorgenti da aggiornare: ${updates.length}`);
console.log(`  Link totali da applicare: ${totalLinks}`);
console.log(`  Articoli con delta ≠ atteso (pre-commit): ${audit.filter(a => !a.delta_match_expected).length}`);

// Anomalia pre-commit: se qualche articolo ha delta != expected, NON proseguire
const preCommitAnomalies = audit.filter(a => !a.delta_match_expected);
if (preCommitAnomalies.length) {
  console.error(`\n✗ Anomalie pre-commit — abort, niente è stato committato:`);
  for (const a of preCommitAnomalies) console.error(`  ${a.slug}: atteso ${a.links_inseriti_attesi}, delta ${a.delta}`);
  process.exit(1);
}

// ---------- Transaction ----------
const started = Date.now();
console.log(`\n▶ Eseguo transazione (${updates.length} UPDATE)...`);
try {
  const queries = updates.map(u =>
    sql`UPDATE articoli SET contenuto = ${u.contenuto}, updated_at = NOW() WHERE id = ${u.id}`
  );
  await sql.transaction(queries);
} catch (err) {
  console.error(`\n✗ TRANSACTION FAILED — ROLLBACK automatico:`);
  console.error(err);
  process.exit(1);
}
const elapsed = ((Date.now() - started) / 1000).toFixed(2);

// ---------- Post-commit verify (rilegge dal DB) ----------
console.log(`\n▶ Verifica post-commit (SELECT dal DB)...`);
const verifyRows = await sql`SELECT id, slug, contenuto FROM articoli WHERE id = ANY(${updates.map(u => u.id)})`;
const verifyById = new Map(verifyRows.map(r => [r.id, r]));
let postCommitAnomalies = 0;
for (const a of audit) {
  const v = verifyById.get(a.id);
  if (!v) { console.error(`  ⚠ articolo ${a.slug} non rileggibile dal DB`); postCommitAnomalies++; continue; }
  const actual = (v.contenuto.match(/<a href=/gi) ?? []).length;
  a.post_commit_link_count = actual;
  a.post_commit_ok = actual === a.link_count_after;
  if (!a.post_commit_ok) postCommitAnomalies++;
}

// ---------- Log ----------
const logLines = [];
logLines.push(`# Internal linking applied log`);
logLines.push(`Avvio: ${new Date(started).toISOString()}`);
logLines.push(`Fine:  ${new Date().toISOString()}`);
logLines.push(`Durata: ${elapsed}s`);
logLines.push(``);
logLines.push(`Articoli modificati: ${updates.length}`);
logLines.push(`Link applicati totali: ${totalLinks}`);
logLines.push(`Anomalie pre-commit: 0`);
logLines.push(`Anomalie post-commit: ${postCommitAnomalies}`);
logLines.push(``);
logLines.push(`## Dettaglio per articolo`);
logLines.push(``);
for (const a of audit) {
  logLines.push(`### [${a.source_type}] ${a.slug}`);
  logLines.push(`  id: ${a.id}`);
  logLines.push(`  cluster: ${a.cluster_topic}`);
  logLines.push(`  link_count_before: ${a.link_count_before}`);
  logLines.push(`  link_count_after:  ${a.link_count_after}  (delta=${a.delta}, atteso=${a.links_inseriti_attesi})`);
  logLines.push(`  post_commit_count: ${a.post_commit_link_count}  (ok=${a.post_commit_ok})`);
  logLines.push(`  applied:`);
  for (const al of a.applied_links) logLines.push(`    - [${al.target_type}] ${al.href}  |  "${al.anchor}"  (H2#${al.h2_after}, wrap="${al.wrap}")`);
  logLines.push(``);
}

await fs.writeFile(LOG_PATH, logLines.join("\n"), "utf8");

console.log(`\n============ REPORT FASE 3 ============`);
console.log(`Articoli modificati:    ${updates.length}`);
console.log(`Link applicati totali:  ${totalLinks}`);
console.log(`Anomalie pre-commit:    0`);
console.log(`Anomalie post-commit:   ${postCommitAnomalies}`);
console.log(`Durata:                 ${elapsed}s`);
console.log(`Log salvato in:         ${path.relative(process.cwd(), LOG_PATH)}`);

if (postCommitAnomalies > 0) {
  console.error(`\n⚠ Post-commit anomalies: ${postCommitAnomalies} articoli con link_count post-commit diverso dall'atteso.`);
  process.exit(2);
}
console.log(`\n✓ FASE 3 completata senza anomalie.`);
