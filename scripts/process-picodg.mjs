#!/usr/bin/env node
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import Anthropic from "@anthropic-ai/sdk";
import pLimit from "p-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const INPUT_DIR = path.join(ROOT, "picodg");
const OUTPUT_BASE = path.join(ROOT, "app", "public", "img", "stock");
const MANIFEST_PATH = path.join(__dirname, "picodg-manifest.json");
const MODEL = "claude-haiku-4-5-20251001";
const CONCURRENCY = 3;
const SIZES = [
  { name: "thumb", width: 400, quality: 75 },
  { name: "card", width: 800, quality: 80 },
  { name: "hero", width: 1600, quality: 82 },
];
const CATEGORIES = new Set([
  "cani", "gatti", "persone-pet", "cuccioli",
  "ambienti-spiaggia", "ambienti-sentiero", "ambienti-hotel", "ambienti-interno",
  "oggetti-cibo", "oggetti-accessori", "veterinario", "altro",
]);
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("✗ ANTHROPIC_API_KEY non configurata nell'ambiente. Esco.");
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function slugify(name) {
  return name
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 80) || "img";
}

async function sha256File(p) {
  const h = createHash("sha256");
  await new Promise((res, rej) => {
    createReadStream(p).on("data", (d) => h.update(d)).on("end", res).on("error", rej);
  });
  return h.digest("hex");
}

async function loadManifest() {
  try {
    const txt = await fs.readFile(MANIFEST_PATH, "utf8");
    const data = JSON.parse(txt);
    if (!Array.isArray(data.foto)) data.foto = [];
    return data;
  } catch {
    return { generato_il: new Date().toISOString(), totale_processate: 0, foto: [] };
  }
}

async function saveManifest(manifest) {
  manifest.generato_il = new Date().toISOString();
  manifest.totale_processate = manifest.foto.length;
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
}

async function uniqueSlug(base, used) {
  let s = base;
  let i = 2;
  while (used.has(s)) { s = `${base}-${i++}`; }
  used.add(s);
  return s;
}

function outputPaths(slug, category) {
  const dir = path.join(OUTPUT_BASE, category);
  const out = {};
  for (const s of SIZES) {
    out[`${s.name}_webp`] = path.join(dir, `${slug}-${s.name}.webp`);
    out[`${s.name}_jpg`]  = path.join(dir, `${slug}-${s.name}.jpg`);
  }
  return { dir, out };
}

async function allExist(paths) {
  for (const p of Object.values(paths)) {
    try { await fs.access(p); } catch { return false; }
  }
  return true;
}

async function processImage(inputPath, slug) {
  const tmpDir = path.join(OUTPUT_BASE, "altro");
  await fs.mkdir(tmpDir, { recursive: true });
  const tmpOut = {};
  const meta = await sharp(inputPath).metadata();
  for (const s of SIZES) {
    const pipeline = sharp(inputPath, { failOn: "none" })
      .rotate()
      .resize({ width: s.width, height: s.width, fit: "inside", withoutEnlargement: true })
      .withMetadata({ icc: "srgb" });
    const webpPath = path.join(tmpDir, `${slug}-${s.name}.webp`);
    const jpgPath = path.join(tmpDir, `${slug}-${s.name}.jpg`);
    await pipeline.clone().webp({ quality: s.quality }).toFile(webpPath);
    await pipeline.clone().jpeg({ quality: s.quality, mozjpeg: true }).toFile(jpgPath);
    tmpOut[`${s.name}_webp`] = webpPath;
    tmpOut[`${s.name}_jpg`] = jpgPath;
  }
  return { tmpOut, originalMeta: { w: meta.width ?? 0, h: meta.height ?? 0 } };
}

function extractJson(text) {
  if (!text) return null;
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try { return JSON.parse(m[0]); } catch { return null; }
}

const CLASSIFY_PROMPT = `You are classifying a stock photo for an Italian pet-friendly portal.

Analyze the image and return ONLY a JSON object with this exact shape, no prose:

{
  "categoria": "cani" | "gatti" | "persone-pet" | "cuccioli" | "ambienti-spiaggia" | "ambienti-sentiero" | "ambienti-hotel" | "ambienti-interno" | "oggetti-cibo" | "oggetti-accessori" | "veterinario" | "altro",
  "sottosoggetti": [string, ...],
  "ambientazione": string,
  "mood": string,
  "persone_presenti": boolean,
  "num_animali": integer,
  "adatto_per": [string, ...],
  "alt_text_it": string,
  "confidenza": "alta" | "media" | "bassa"
}

Rules:
- "cuccioli" has priority over "cani"/"gatti" if the animals are clearly puppies/kittens.
- "persone-pet" only if a person is prominently visible WITH a pet. If the pet is in focus and the person is just a hand/leg, use "cani" or "gatti".
- "veterinario" for clinical/medical contexts (stethoscope, vet coat, clinic interior).
- "ambienti-*" only if the photo is a location WITHOUT prominent animals as subject.
- "altro" only if nothing else fits.
- alt_text_it must be descriptive for SEO and accessibility, in natural Italian, max 120 chars, no "foto di".`;

async function classify(thumbJpgPath) {
  const buf = await fs.readFile(thumbJpgPath);
  const b64 = buf.toString("base64");
  try {
    const resp = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 600,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } },
          { type: "text", text: CLASSIFY_PROMPT },
        ],
      }],
    });
    const text = resp.content.filter(b => b.type === "text").map(b => b.text).join("\n");
    const json = extractJson(text);
    if (!json || !CATEGORIES.has(json.categoria)) {
      return { fallback: true, raw: text, usage: resp.usage };
    }
    return { fallback: false, data: json, usage: resp.usage };
  } catch (err) {
    return { fallback: true, error: String(err?.message ?? err) };
  }
}

function fallbackClassification() {
  return {
    categoria: "altro",
    sottosoggetti: [],
    ambientazione: "",
    mood: "neutro",
    persone_presenti: false,
    num_animali: 0,
    adatto_per: [],
    alt_text_it: "Immagine stock pet-friendly",
    confidenza: "bassa",
  };
}

async function moveOutputs(tmpOut, slug, category) {
  const { dir, out } = outputPaths(slug, category);
  await fs.mkdir(dir, { recursive: true });
  for (const key of Object.keys(out)) {
    const src = tmpOut[key];
    const dst = out[key];
    if (src === dst) continue;
    await fs.rename(src, dst).catch(async (e) => {
      if (e.code === "EXDEV") { await fs.copyFile(src, dst); await fs.unlink(src); }
      else throw e;
    });
  }
  return out;
}

function toRel(p) {
  return path.relative(ROOT, p).split(path.sep).join("/");
}

let shuttingDown = false;
let manifestRef = null;
async function gracefulExit(code = 0) {
  if (manifestRef) await saveManifest(manifestRef);
  process.exit(code);
}
process.on("SIGINT", async () => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log("\n⚠ SIGINT ricevuto, salvo manifest e esco...");
  await gracefulExit(130);
});

async function main() {
  const started = Date.now();
  await fs.mkdir(OUTPUT_BASE, { recursive: true });

  let entries;
  try {
    entries = await fs.readdir(INPUT_DIR, { withFileTypes: true });
  } catch (e) {
    console.error(`✗ Input dir non trovata: ${INPUT_DIR}`);
    process.exit(1);
  }

  const files = entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(n => IMG_EXT.has(path.extname(n).toLowerCase()))
    .sort();

  console.log(`📂 Input: ${INPUT_DIR}`);
  console.log(`📂 Output: ${OUTPUT_BASE}`);
  console.log(`🖼  ${files.length} immagini trovate\n`);

  const manifest = await loadManifest();
  manifestRef = manifest;
  const byHash = new Map(manifest.foto.map(f => [f.hash_originale, f]));
  const usedSlugs = new Set(manifest.foto.map(f => f.slug));

  let done = 0, skipped = 0, failed = 0;
  let totalOriginalBytes = 0, totalOutputBytes = 0;
  const distribution = new Map();
  const usage = { input_tokens: 0, output_tokens: 0 };
  const limit = pLimit(CONCURRENCY);

  const tasks = files.map((name, idx) => limit(async () => {
    if (shuttingDown) return;
    const tag = `[${String(idx + 1).padStart(3)}/${files.length}]`;
    const inputPath = path.join(INPUT_DIR, name);
    try {
      const stat = await fs.stat(inputPath);
      const hash = "sha256:" + await sha256File(inputPath);
      const existing = byHash.get(hash);
      if (existing) {
        const cat = existing.classificazione?.categoria ?? "altro";
        const { out } = outputPaths(existing.slug, cat);
        if (await allExist(out)) {
          skipped++;
          distribution.set(cat, (distribution.get(cat) ?? 0) + 1);
          console.log(`${tag} ⏭  ${name} (già in manifest, cat=${cat})`);
          return;
        }
      }

      const baseSlug = slugify(name);
      const slug = existing?.slug ?? await uniqueSlug(baseSlug, usedSlugs);

      console.log(`${tag} ⚙  ${name} → resize...`);
      const { tmpOut, originalMeta } = await processImage(inputPath, slug);

      console.log(`${tag} 🧠 ${name} → classify...`);
      const thumbJpg = tmpOut.thumb_jpg;
      const result = await classify(thumbJpg);

      let classData;
      if (result.fallback) {
        classData = fallbackClassification();
        console.log(`${tag} ⚠  classificazione fallback: ${result.error ?? "JSON invalido"}`);
      } else {
        classData = result.data;
        if (result.usage) {
          usage.input_tokens += result.usage.input_tokens ?? 0;
          usage.output_tokens += result.usage.output_tokens ?? 0;
        }
      }

      const cat = CATEGORIES.has(classData.categoria) ? classData.categoria : "altro";
      classData.categoria = cat;

      const outPaths = await moveOutputs(tmpOut, slug, cat);

      let outBytes = 0;
      for (const p of Object.values(outPaths)) {
        try { outBytes += (await fs.stat(p)).size; } catch {}
      }
      totalOriginalBytes += stat.size;
      totalOutputBytes += outBytes;
      distribution.set(cat, (distribution.get(cat) ?? 0) + 1);

      const entry = {
        slug,
        originale: toRel(inputPath),
        hash_originale: hash,
        output: Object.fromEntries(Object.entries(outPaths).map(([k, v]) => [k, toRel(v)])),
        dimensioni_originale: { w: originalMeta.w, h: originalMeta.h, bytes: stat.size },
        classificazione: classData,
        processato_il: new Date().toISOString(),
      };
      if (existing) {
        const i = manifest.foto.indexOf(existing);
        manifest.foto[i] = entry;
      } else {
        manifest.foto.push(entry);
        byHash.set(hash, entry);
      }
      await saveManifest(manifest);

      done++;
      console.log(`${tag} ✓  ${slug} → ${cat} (${classData.confidenza})`);
    } catch (err) {
      failed++;
      console.error(`${tag} ✗  ${name}: ${err?.message ?? err}`);
    }
  }));

  await Promise.all(tasks);
  await saveManifest(manifest);

  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  const savedMB = ((totalOriginalBytes - totalOutputBytes) / 1024 / 1024).toFixed(1);
  const origMB = (totalOriginalBytes / 1024 / 1024).toFixed(1);
  const outMB = (totalOutputBytes / 1024 / 1024).toFixed(1);

  console.log("\n============ REPORT ============");
  console.log(`Foto input:      ${files.length}`);
  console.log(`Processate:      ${done}`);
  console.log(`Skippate:        ${skipped}`);
  console.log(`Fallite:         ${failed}`);
  console.log(`Tempo totale:    ${elapsed}s`);
  console.log(`Originali:       ${origMB} MB`);
  console.log(`Output totali:   ${outMB} MB`);
  console.log(`Risparmio:       ${savedMB} MB`);
  console.log(`Token input:     ${usage.input_tokens}`);
  console.log(`Token output:    ${usage.output_tokens}`);
  console.log(`\nDistribuzione per categoria:`);
  const sorted = [...distribution.entries()].sort((a, b) => b[1] - a[1]);
  for (const [cat, n] of sorted) console.log(`  ${cat.padEnd(22)} ${n}`);
  const bassa = manifest.foto.filter(f => f.classificazione?.confidenza === "bassa").length;
  const media = manifest.foto.filter(f => f.classificazione?.confidenza === "media").length;
  const alta  = manifest.foto.filter(f => f.classificazione?.confidenza === "alta").length;
  console.log(`\nConfidenza: alta=${alta} media=${media} bassa=${bassa}`);
  console.log(`Manifest: ${toRel(MANIFEST_PATH)}`);
}

main().catch(async (e) => {
  console.error("Errore fatale:", e);
  if (manifestRef) await saveManifest(manifestRef);
  process.exit(1);
});
