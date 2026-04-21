#!/usr/bin/env node
// Fase 5 — matching foto↔master per hero articoli.
// Input: audit-consolidamento.json (18 master) + picodg-manifest.json (105 foto).
// Output: hero-assignment-preview.json (checkpoint, non tocca DB).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audit = JSON.parse(await fs.readFile(path.join(__dirname, "audit-consolidamento.json"), "utf8"));
const manifest = JSON.parse(await fs.readFile(path.join(__dirname, "picodg-manifest.json"), "utf8"));

// Index foto per categoria per lookup veloce
const photosByCat = new Map();
for (const f of manifest.foto) {
  const cat = f.classificazione?.categoria ?? "altro";
  if (!photosByCat.has(cat)) photosByCat.set(cat, []);
  photosByCat.get(cat).push(f);
}

// Lookup foto per slug
const photoBySlug = new Map(manifest.foto.map(f => [f.slug, f]));

function fotoRef(photo, extraRationale = "") {
  return {
    slug: photo.slug,
    path_card_jpg: photo.output.card_jpg,
    alt_text: photo.classificazione?.alt_text_it ?? photo.slug,
    origine: photo.classificazione?.origine ?? "non_specificato",
    categoria_foto: photo.classificazione?.categoria ?? "altro",
    sottosoggetti: photo.classificazione?.sottosoggetti ?? [],
    rationale: extraRationale,
  };
}

// ============================================================
// Assegnazioni curate per ciascuno dei 18 master
// ============================================================
// Ogni master → { foto_slug, cluster_topic, confidenza_match, rationale_extra }

const ASSIGNMENTS = {
  // ---- ADEMPIMENTI LEGALI (foto neutre: cani generici, veterinario) ----
  "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina": {
    photo: "dog-resting-on-the-garden-2026-03-18-17-45-57-utc",
    cluster_topic: "Adempimenti legali",
    confidenza: "media",
    rationale_extra: "Cane che riposa in giardino: foto neutra, mood domestico tranquillo. Adempimento burocratico non deve evocare dramma — il microchip è un gesto di cura ordinario.",
  },
  "vaccinazioni-cane-calendario-completo": {
    photo: "five-dogheads-from-big-to-small-in-a-row-2026-03-09-09-18-22-utc",
    cluster_topic: "Adempimenti legali + Salute",
    confidenza: "media",
    rationale_extra: "Cinque muso di taglie diverse su bianco: visivamente suggerisce 'calendario per tutti i cani' (cucciolo → adulto). Foto clinica/tassonomica adatta a un articolo WSAVA.",
  },
  "vendere-regalare-cane-legge-italia-obblighi": {
    photo: "portrait-of-golden-retriever-dog-2026-03-17-00-04-36-utc",
    cluster_topic: "Adempimenti legali",
    confidenza: "media",
    rationale_extra: "Ritratto Golden Retriever su fondo neutro: foto istituzionale non-evocativa, coerente con argomento legale di cessione tra privati.",
  },
  "passaggio-proprieta-cane-guida-procedura-italiana": {
    photo: "happy-little-dog-in-the-arms-of-its-owners-2026-03-19-09-28-30-utc",
    cluster_topic: "Adempimenti legali",
    confidenza: "media",
    rationale_extra: "Piccolo cane in braccio ai proprietari: evoca il passaggio di responsabilità/affidamento. Foto delicata, non transazionale-commerciale.",
  },
  "trasporto-cani-auto-art-169-codice-strada": {
    photo: "senior-man-using-laptop-sitting-on-sofa-with-his-t-2026-03-11-00-54-12-utc",
    cluster_topic: "Adempimenti legali + Viaggi",
    confidenza: "bassa",
    rationale_extra: "Uomo con due cani da compagnia su divano: foto persone-pet domestica neutra. Copertura sub-ottimale: scaricare foto dedicate cane-con-cintura/trasportino in auto nei prossimi batch.",
  },

  // ---- VIAGGI (foto ambiente appropriate) ----
  "trasporto-gatti-auto-sicurezza-codice-strada-consigli": {
    photo: "striped-cat-sits-on-a-wooden-floor-paws-whis-2026-01-07-01-29-39-utc",
    cluster_topic: "Viaggi (gatti)",
    confidenza: "bassa",
    rationale_extra: "Gatto tabby adulto seduto, soggetto singolo in posa composta: foto neutra per articolo normativo. Copertura sub-ottimale: scaricare gatto-in-trasportino dedicato nei prossimi batch.",
  },
  "cani-autostrada-vacanza-regole-codice-strada": {
    photo: "beautiful-dog-golden-retriever-labrador-in-autumn-2026-03-16-22-37-08-utc",
    cluster_topic: "Viaggi + Adempimenti legali",
    confidenza: "bassa",
    rationale_extra: "Golden Retriever su terrazza in legno, sfondo verde sfocato, mood sereno/elegante. Foto neutra non-evocativa — la v1 (family-beach) era vacanza-estiva, la v2 (couple-beagle-greyhound) era interno domestico. Nel catalogo NON esistono foto cane-in-auto/trasportino/traghetto/autostrada: ripiego su portrait neutro come da brief. Copertura sub-ottimale: scaricare foto dedicate cane-in-viaggio (trasportino, traghetto, sosta autogrill) nei prossimi batch.",
  },

  // ---- CANI EROI / MILITARI (foto cane forti — sub-ottimale da batch) ----
  "pastore-caucaso-cane-guerra-russo": {
    photo: "border-collie-portrait-on-black-2026-03-09-08-44-55-utc",
    cluster_topic: "Cani eroi/militari",
    confidenza: "bassa",
    rationale_extra: "Ritratto su sfondo nero, mood drammatico: la foto migliore disponibile per mood militare/eroico. Copertura sub-ottimale: scaricare foto dedicate pastore caucaso nei prossimi batch.",
  },
  "pastore-tedesco-esercito-polizia-addestramento": {
    photo: "head-shot-of-australian-shepherd-sitting-and-panti-2026-01-09-11-01-54-utc",
    cluster_topic: "Cani eroi/militari",
    confidenza: "bassa",
    rationale_extra: "Australian Shepherd al posto del Pastore Tedesco — stesso gruppo cinofilo 'cani da pastore/lavoro'. Copertura sub-ottimale: scaricare foto dedicate pastore tedesco nei prossimi batch.",
  },
  "malinois-belga-navy-seal-cani": {
    photo: "selective-focus-shot-of-an-adorable-kooikerhondje-2026-03-18-06-44-27-utc",
    cluster_topic: "Cani eroi/militari",
    confidenza: "bassa",
    rationale_extra: "Cane di taglia media su fondo neutro. Nessun Malinois nel catalogo. Copertura sub-ottimale: scaricare foto dedicate Malinois Belga nei prossimi batch.",
  },

  // ---- COMPORTAMENTO / COGNITIVO (cane/gatto generico) ----
  "cani-capiscono-emozioni-umane-ricerca": {
    photo: "happy-stylish-hipster-family-hugging-with-their-ca-2026-03-23-23-02-41-utc",
    cluster_topic: "Comportamento/cognitivo",
    confidenza: "media",
    rationale_extra: "Famiglia che abbraccia il cane: visualizza il legame emotivo cane-umano, tema centrale dell'articolo. Buon match semantico.",
  },
  "perche-cani-inclinano-testa-studio": {
    photo: "domestic-adorable-dog-with-multicolored-eyes-in-wh-2026-03-17-03-30-52-utc",
    cluster_topic: "Comportamento/cognitivo",
    confidenza: "bassa",
    rationale_extra: "Cane che guarda in camera (mood 'curioso'). Non mostra testa inclinata specificamente. Copertura sub-ottimale: scaricare foto dedicate 'cane che inclina la testa' nei prossimi batch.",
  },
  "perche-gatti-fanno-fusa-benefici-salute": {
    photo: "cat-needing-affection-2026-03-17-20-43-13-utc",
    cluster_topic: "Comportamento/cognitivo gatti",
    confidenza: "alta",
    rationale_extra: "Gatto che cerca affetto: perfetto per articolo sulle fusa come comportamento di benessere e richiesta interazione.",
  },

  // ---- SALUTE/ALIMENTAZIONE ----
  "microbioma-cane-alimentazione-ricerche": {
    photo: "golden-retriever-dog-2026-03-25-02-53-24-utc",
    cluster_topic: "Salute/alimentazione",
    confidenza: "bassa",
    rationale_extra: "Cane marrone su sentiero boschivo, luce naturale: mood 'naturale/salute'. NOTA: nel catalogo non esistono foto food per cani (ciotola/crocchette/cane che mangia) — le 2 oggetti-cibo sono cibo umano (thanksgiving + cocktail) inadatte. Copertura sub-ottimale: scaricare foto dedicate alimentazione-cane (ciotola, crocchette, cane che mangia) nei prossimi batch.",
  },

  // ---- RAZZE / LONGEVITÀ ----
  "razze-cani-longevi-studio-internazionale-italia-enci": {
    photo: "large-group-of-head-shot-dogs-looking-at-the-camer-2026-01-05-04-42-31-utc",
    cluster_topic: "Razze/Salute (longevità)",
    confidenza: "alta",
    rationale_extra: "8 cani di razze diverse allineati: match perfetto per articolo che confronta razze per longevità (Jack Russell, Golden, Bulldog ecc. tutti presenti nella foto).",
  },

  // ---- RAZZE GATTI ----
  "razze-gatti-italiane-siamese-foreste-sokoke": {
    photo: "cats-portrait-obedient-devon-rex-cat-with-bright-2026-03-20-03-41-36-utc",
    cluster_topic: "Razze (gatti)",
    confidenza: "media",
    rationale_extra: "Ritratto gatto studio: visualizza 'razza felina di standard'. Non è italiana specificamente ma lo standard fotografico è coerente con l'articolo.",
  },

  // ---- EDUCAZIONE & SCELTA (cuccioli/cani generici) ----
  "scegliere-primo-cucciolo-guida-cane-principianti": {
    photo: "group-portrait-of-adorable-puppies-2026-01-08-00-07-46-utc",
    cluster_topic: "Educazione & scelta",
    confidenza: "alta",
    rationale_extra: "Gruppo di cuccioli vari: perfetto per l'articolo che aiuta a scegliere il PRIMO cucciolo. Mostra varietà razza/taglia senza puntare su una singola.",
  },
  "educazione-cucciolo-primi-6-mesi-socializzazione-comandi": {
    photo: "friends-playing-with-cute-puppies-2026-03-20-04-28-19-utc",
    cluster_topic: "Educazione & scelta",
    confidenza: "alta",
    rationale_extra: "Persone che giocano con cuccioli: evoca socializzazione + rinforzo positivo, i 2 pilastri dell'articolo sui primi 6 mesi.",
  },
};

// ============================================================
// Costruisci preview
// ============================================================
const preview = [];
const missing = [];

for (const cluster of audit.azioni) {
  const masterSlug = cluster.master.slug;
  const a = ASSIGNMENTS[masterSlug];
  if (!a) {
    missing.push(masterSlug);
    continue;
  }
  const photo = photoBySlug.get(a.photo);
  if (!photo) {
    missing.push(`${masterSlug} → foto mancante: ${a.photo}`);
    continue;
  }
  preview.push({
    master_slug: masterSlug,
    master_title: cluster.master.titolo,
    master_categoria: cluster.master.categoria,
    cluster_topic: a.cluster_topic,
    foto_scelta: fotoRef(photo, a.rationale_extra),
    confidenza_match: a.confidenza,
  });
}

if (missing.length) {
  console.error(`⚠ Missing assignments:`);
  for (const m of missing) console.error(`  - ${m}`);
}

// Write preview
const out = {
  generato_il: new Date().toISOString(),
  totale_master: preview.length,
  conf_distribution: {
    alta: preview.filter(p => p.confidenza_match === "alta").length,
    media: preview.filter(p => p.confidenza_match === "media").length,
    bassa: preview.filter(p => p.confidenza_match === "bassa").length,
  },
  preview,
};
await fs.writeFile(path.join(__dirname, "hero-assignment-preview.json"), JSON.stringify(out, null, 2), "utf8");

// Distribuzione per cluster
const clusterDist = new Map();
for (const p of preview) clusterDist.set(p.cluster_topic, (clusterDist.get(p.cluster_topic) ?? 0) + 1);

console.log(`✓ Preview scritto in scripts/hero-assignment-preview.json`);
console.log(`  Master coperti: ${preview.length}/18`);
console.log(`  Confidenza: alta=${out.conf_distribution.alta}, media=${out.conf_distribution.media}, bassa=${out.conf_distribution.bassa}`);
console.log(`  Missing:       ${missing.length}`);
console.log(`\nDistribuzione per cluster:`);
for (const [c, n] of [...clusterDist.entries()].sort((a,b) => b[1]-a[1])) console.log(`  ${c.padEnd(40)} ${n}`);
console.log(`\nDistribuzione categorie foto usate:`);
const catDist = new Map();
for (const p of preview) catDist.set(p.foto_scelta.categoria_foto, (catDist.get(p.foto_scelta.categoria_foto) ?? 0) + 1);
for (const [c, n] of [...catDist.entries()].sort((a,b) => b[1]-a[1])) console.log(`  ${c.padEnd(20)} ${n}`);
