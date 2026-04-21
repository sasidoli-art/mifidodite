#!/usr/bin/env node
// Rescue batch add — Fase 1 prima (scan + diff con manifest esistente)
// Uso:
//   node scripts/add-rescue-batch.mjs          → solo scan (Fase 1)
//   node scripts/add-rescue-batch.mjs resize   → scan + resize in _pending (Fasi 1-2)
//   node scripts/add-rescue-batch.mjs commit   → integra manifest + sposta (Fasi 4-5)
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const INPUT_DIR = path.join(ROOT, "picodg");
const OUTPUT_BASE = path.join(ROOT, "app", "public", "img", "stock");
const PENDING_DIR = path.join(OUTPUT_BASE, "_pending");
const MANIFEST_PATH = path.join(__dirname, "picodg-manifest.json");
const MODE = (process.argv[2] ?? "scan").toLowerCase();
const BATCH_TYPE = (process.argv.find(a => a.startsWith("--batch=")) ?? "--batch=batch_rescue").slice(8);

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);
const SIZES = [
  { name: "thumb", width: 400, quality: 75 },
  { name: "card", width: 800, quality: 80 },
  { name: "hero", width: 1600, quality: 82 },
];
const CATEGORIES = new Set([
  "cani","gatti","persone-pet","cuccioli",
  "ambienti-spiaggia","ambienti-sentiero","ambienti-hotel","ambienti-interno",
  "oggetti-cibo","oggetti-accessori","veterinario","altro",
]);

function slugify(name) {
  return name
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-+/g, "-")
    .slice(0, 80) || "img";
}
async function sha256File(p) {
  const h = createHash("sha256");
  await new Promise((res, rej) => createReadStream(p).on("data", d => h.update(d)).on("end", res).on("error", rej));
  return h.digest("hex");
}
const toRel = p => path.relative(ROOT, p).split(path.sep).join("/");

async function loadManifest() {
  const txt = await fs.readFile(MANIFEST_PATH, "utf8");
  const m = JSON.parse(txt);
  if (!Array.isArray(m.foto)) m.foto = [];
  return m;
}
async function saveManifest(m) {
  m.generato_il = new Date().toISOString();
  m.totale_processate = m.foto.length;
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2), "utf8");
}

async function scanNew() {
  const manifest = await loadManifest();
  const knownHashes = new Set(manifest.foto.map(f => f.hash_originale));
  const knownSlugs = new Set(manifest.foto.map(f => f.slug));

  const entries = await fs.readdir(INPUT_DIR, { withFileTypes: true });
  const files = entries.filter(e => e.isFile()).map(e => e.name)
    .filter(n => IMG_EXT.has(path.extname(n).toLowerCase())).sort();

  const news = [];
  for (const name of files) {
    const p = path.join(INPUT_DIR, name);
    const hash = "sha256:" + await sha256File(p);
    if (knownHashes.has(hash)) continue;
    const stat = await fs.stat(p);
    let slug = slugify(name), i = 2;
    while (knownSlugs.has(slug)) slug = slugify(name) + "-" + i++;
    knownSlugs.add(slug);
    news.push({ name, path: p, hash, size: stat.size, slug });
  }
  return { manifest, files, news };
}

async function doResize(items) {
  await fs.mkdir(PENDING_DIR, { recursive: true });
  const out = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const tag = `[${i+1}/${items.length}]`;
    const meta = await sharp(it.path).metadata();
    const paths = {};
    for (const s of SIZES) {
      const pl = sharp(it.path, { failOn: "none" })
        .rotate()
        .resize({ width: s.width, height: s.width, fit: "inside", withoutEnlargement: true })
        .withMetadata({ icc: "srgb" });
      const webp = path.join(PENDING_DIR, `${it.slug}-${s.name}.webp`);
      const jpg  = path.join(PENDING_DIR, `${it.slug}-${s.name}.jpg`);
      await pl.clone().webp({ quality: s.quality }).toFile(webp);
      await pl.clone().jpeg({ quality: s.quality, mozjpeg: true }).toFile(jpg);
      paths[`${s.name}_webp`] = webp;
      paths[`${s.name}_jpg`] = jpg;
    }
    out.push({ ...it, paths, originalMeta: { w: meta.width ?? 0, h: meta.height ?? 0 } });
    console.log(`${tag} ✓ resize ${it.slug}`);
  }
  return out;
}

async function commit(newEntries) {
  // newEntries = [{ slug, originale, hash_originale, paths (in _pending), originalMeta, size, classificazione }]
  const manifest = await loadManifest();

  // retro-fit batch_log if missing
  if (!manifest.batch_log) {
    const earliest = manifest.foto.reduce((min, f) =>
      !min || new Date(f.processato_il) < new Date(min) ? f.processato_il : min, null);
    manifest.batch_log = [{
      data: earliest ?? new Date(0).toISOString(),
      tipo: "batch_iniziale",
      foto_aggiunte: manifest.foto.length,
    }];
  }

  let totalIn = 0, totalOut = 0;
  for (const e of newEntries) {
    const cat = CATEGORIES.has(e.classificazione?.categoria) ? e.classificazione.categoria : "altro";
    e.classificazione.categoria = cat;
    const destDir = path.join(OUTPUT_BASE, cat);
    await fs.mkdir(destDir, { recursive: true });
    const movedOut = {};
    let outBytes = 0;
    for (const [key, src] of Object.entries(e.paths)) {
      const dst = path.join(destDir, path.basename(src));
      await fs.rename(src, dst).catch(async err => {
        if (err.code === "EXDEV") { await fs.copyFile(src, dst); await fs.unlink(src); }
        else throw err;
      });
      movedOut[key] = toRel(dst);
      outBytes += (await fs.stat(dst)).size;
    }
    totalIn += e.size;
    totalOut += outBytes;
    manifest.foto.push({
      slug: e.slug,
      originale: toRel(e.path),
      hash_originale: e.hash,
      output: movedOut,
      dimensioni_originale: { w: e.originalMeta.w, h: e.originalMeta.h, bytes: e.size },
      classificazione: e.classificazione,
      processato_il: new Date().toISOString(),
    });
  }

  manifest.batch_log.push({
    data: new Date().toISOString(),
    tipo: BATCH_TYPE,
    foto_aggiunte: newEntries.length,
  });

  await saveManifest(manifest);

  try { const rest = await fs.readdir(PENDING_DIR); if (!rest.length) await fs.rmdir(PENDING_DIR); } catch {}

  return { totalIn, totalOut };
}

async function main() {
  const { manifest, files, news } = await scanNew();
  console.log(`📂 Input: ${toRel(INPUT_DIR)}`);
  console.log(`🖼  Totale in picodg: ${files.length}`);
  console.log(`✓  Già processate (hash match nel manifest): ${files.length - news.length}`);
  console.log(`🆕 Nuove da processare: ${news.length}\n`);
  if (!news.length) {
    console.log("Niente di nuovo. Esco.");
    return;
  }
  for (const n of news) console.log(`  • ${n.name}  →  ${n.slug}  (${(n.size/1024/1024).toFixed(1)}MB)`);

  if (MODE === "scan") {
    console.log("\nModalità scan: nessun resize. Usa 'node scripts/add-rescue-batch.mjs resize' per procedere.");
    return;
  }

  if (MODE === "resize") {
    console.log("\n⚙  Resize in _pending...");
    const done = await doResize(news);
    const plan = {
      generato_il: new Date().toISOString(),
      da_classificare: done.map(d => ({
        slug: d.slug,
        originale: toRel(d.path),
        hash: d.hash,
        size: d.size,
        originalMeta: d.originalMeta,
        paths: Object.fromEntries(Object.entries(d.paths).map(([k,v]) => [k, toRel(v)])),
      })),
    };
    await fs.writeFile(path.join(__dirname, "_rescue-pending.json"), JSON.stringify(plan, null, 2), "utf8");
    console.log(`\n💾 Piano salvato in scripts/_rescue-pending.json`);
    console.log(`👁  Prossimo step: classificazione visuale delle thumb, poi 'commit'.`);
    return;
  }

  if (MODE === "commit") {
    const planPath = path.join(__dirname, "_rescue-pending.json");
    const classifPath = path.join(__dirname, "_rescue-classif.json");
    const plan = JSON.parse(await fs.readFile(planPath, "utf8"));
    const classif = JSON.parse(await fs.readFile(classifPath, "utf8"));
    const bySlug = new Map(classif.map(c => [c.slug, c]));
    const entries = plan.da_classificare.map(p => {
      const c = bySlug.get(p.slug);
      if (!c) throw new Error(`Classificazione mancante per ${p.slug}`);
      const { slug: _discard, ...classOnly } = c;
      const absPaths = Object.fromEntries(Object.entries(p.paths).map(([k,v]) => [k, path.join(ROOT, v)]));
      return {
        slug: p.slug,
        path: path.join(ROOT, p.originale),
        hash: p.hash,
        size: p.size,
        originalMeta: p.originalMeta,
        paths: absPaths,
        classificazione: classOnly,
      };
    });
    const { totalIn, totalOut } = await commit(entries);

    const newBatch = entries;
    const catDist = new Map();
    for (const e of newBatch) catDist.set(e.classificazione.categoria, (catDist.get(e.classificazione.categoria) ?? 0) + 1);

    const manifest = await loadManifest();
    const totalDist = new Map();
    for (const f of manifest.foto) totalDist.set(f.classificazione.categoria, (totalDist.get(f.classificazione.categoria) ?? 0) + 1);

    console.log("\n============ REPORT ============");
    console.log(`Foto nuove processate: ${newBatch.length}`);
    console.log(`Originali: ${(totalIn/1024/1024).toFixed(1)} MB → Output: ${(totalOut/1024/1024).toFixed(1)} MB (risparmio ${((totalIn-totalOut)/1024/1024).toFixed(1)} MB)`);
    console.log(`\nDistribuzione batch rescue:`);
    for (const [c,n] of [...catDist.entries()].sort((a,b) => b[1]-a[1])) console.log(`  ${c.padEnd(22)} ${n}`);
    console.log(`\nDistribuzione totale manifest (${manifest.foto.length} foto):`);
    for (const [c,n] of [...totalDist.entries()].sort((a,b) => b[1]-a[1])) console.log(`  ${c.padEnd(22)} ${n}`);
    const origineDist = new Map();
    for (const e of newBatch) {
      const o = e.classificazione.origine ?? "non_specificato";
      origineDist.set(o, (origineDist.get(o) ?? 0) + 1);
    }
    console.log(`\nDistribuzione per origine (solo batch ${BATCH_TYPE}):`);
    for (const [o, n] of [...origineDist.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${o.padEnd(15)} ${n}`);
    }
    const origineTotal = new Map();
    for (const f of manifest.foto) {
      const o = f.classificazione?.origine ?? "non_specificato";
      origineTotal.set(o, (origineTotal.get(o) ?? 0) + 1);
    }
    console.log(`\nDistribuzione per origine (catalogo totale):`);
    for (const [o, n] of [...origineTotal.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`  ${o.padEnd(15)} ${n}`);
    }

    const lowConf = newBatch.filter(e => e.classificazione.confidenza !== "alta");
    if (lowConf.length) {
      console.log(`\n⚠ Confidenza non-alta (${lowConf.length}), verifica manuale suggerita:`);
      for (const e of lowConf) console.log(`  - [${e.classificazione.confidenza}] ${e.slug} → ${e.classificazione.categoria}`);
    } else {
      console.log(`\n✓ Tutte con confidenza 'alta'.`);
    }
    console.log(`\nBatch log aggiornato.`);
    return;
  }

  console.error(`Modo sconosciuto: ${MODE}. Usa scan|resize|commit`);
  process.exit(1);
}

main().catch(e => { console.error("Errore fatale:", e); process.exit(1); });
