import { NextResponse } from "next/server";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const UNSPLASH_IMAGES: Record<string, string> = {
  guide: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  salute: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  comportamento: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80",
  curiosita: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
  razze: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
  gatti: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
  consigli: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
  aneddoti: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80",
  viaggi: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&q=80",
};

// Pool di temi da generare random
const TEMI = [
  // CODICE DELLA STRADA — IMPORTANTI
  {
    tema: "Trasporto cani in auto: cosa dice il Codice della Strada italiano (Art. 169 CDS). Obblighi del conducente, sanzioni (multe da 87€ a 345€ + decurtazione punti), sistemi di contenimento ammessi (gabbia/trasportino, cintura specifica per cani, rete divisoria). Differenze tra cane singolo e piu cani. Cosa rischia chi non rispetta la norma. Casi pratici e consigli del veterinario per viaggi sicuri.",
    categoria: "guide",
    keywords: ["trasporto cani auto", "art 169 codice strada", "multa cane in macchina", "cintura cani", "trasportino auto"],
  },
  {
    tema: "Trasporto gatti in auto: come fare in sicurezza secondo il Codice della Strada. Obblighi legali, multe, scelta del trasportino, abituare il gatto al viaggio, cosa portare in valigetta veterinaria. Cosa fare se il gatto si stressa o ha mal d'auto. Consigli per viaggi lunghi e brevi.",
    categoria: "gatti",
    keywords: ["trasporto gatti auto", "trasportino gatto", "gatto in macchina", "viaggio gatto"],
  },
  {
    tema: "Cani sull'autostrada e in vacanza: tutte le regole del Codice della Strada italiano per portare il tuo cane in viaggio. Aree di sosta pet-friendly, leggi nei traghetti (Grimaldi, Tirrenia, Moby), regole nelle gallerie. Documenti necessari (libretto sanitario, microchip, passaporto europeo). Come gestire le pause ogni 2 ore.",
    categoria: "viaggi",
    keywords: ["cani autostrada", "viaggio cane vacanza", "traghetti animali", "passaporto europeo cani"],
  },

  // TEMI BENESSERE & SALUTE
  {
    tema: "Microchip obbligatorio per cani: la legge italiana (Decreto 281/91, Legge 281/91), procedura veterinaria, costi (15-30€), iscrizione anagrafe canina regionale, sanzioni per chi non lo fa (multe da 78€ a 466€). Come funziona la lettura del chip. Differenze regionali. Cosa fare se trovi un cane microchippato.",
    categoria: "salute",
    keywords: ["microchip cane obbligatorio", "anagrafe canina", "multa no microchip", "legge 281"],
  },
  {
    tema: "Vaccinazioni del cane: il calendario completo dal cucciolo all'adulto. Vaccini obbligatori e facoltativi in Italia, costi medi, frequenza richiami. Effetti collaterali e quando preoccuparsi. Differenze tra vaccino monovalente e polivalente. Linee guida WSAVA.",
    categoria: "salute",
    keywords: ["vaccini cane", "calendario vaccinale cane", "vaccino cucciolo", "richiami vaccinali"],
  },
  {
    tema: "Alimentazione del gatto adulto: quanto deve mangiare al giorno, quante volte, dieta umido vs secco, cosa controllare nelle etichette dei croccantini, gli ingredienti da evitare. Differenze per gatti sterilizzati. Quando passare al senior food.",
    categoria: "gatti",
    keywords: ["alimentazione gatto", "dieta gatto", "croccantini gatto", "umido secco gatto"],
  },

  // EDUCAZIONE & COMPORTAMENTO
  {
    tema: "Come scegliere il primo cucciolo: razza, eta, allevatore o canile, dimensioni in eta adulta, esigenze di esercizio, costo iniziale e mensile, tempo che richiede ogni giorno. Errori da evitare. Domande da fare all'allevatore. Diritti del compratore secondo la legge.",
    categoria: "guide",
    keywords: ["primo cucciolo", "scelta cane razza", "allevatore vs canile", "guida cane principianti"],
  },
  {
    tema: "Educazione del cucciolo nei primi 6 mesi: socializzazione, gestione dei bisogni in casa, prime regole, primi comandi (seduto, terra, vieni, resta), abituare a guinzaglio e collare, come gestire i morsi. Periodo critico secondo gli etologi.",
    categoria: "comportamento",
    keywords: ["educazione cucciolo", "socializzazione cane", "comandi base cane", "primi mesi cucciolo"],
  },

  // RAZZE & STORIA
  {
    tema: "Le razze di cani italiane riconosciute ENCI: Cane Corso, Maremmano-Abruzzese, Bracco Italiano, Spinone, Volpino, Bolognese, Cirneco dell'Etna, Lagotto Romagnolo, Segugio Italiano, Piccolo Levriero Italiano. Caratteristiche, storia, esigenze, situazione attuale.",
    categoria: "razze",
    keywords: ["razze italiane cani", "cane italiano", "ENCI", "razze autoctone"],
  },
  {
    tema: "Le razze di gatti italiane: Siamese italiano, gatto delle Foreste italiano, Sokoke. Storia, caratteristiche, riconoscimenti FIFE/WCF.",
    categoria: "razze",
    keywords: ["razze gatti italiane", "siamese", "gatti autoctoni Italia"],
  },

  // CURIOSITA SCIENTIFICHE
  {
    tema: "Studio scientifico: i cani capiscono le parole come i bambini di 1-2 anni. Ricerca dell'Universita di Eotvos Lorand di Budapest pubblicata su Current Biology. Come comprendono il linguaggio umano. Implicazioni educative e affettive.",
    categoria: "curiosita",
    keywords: ["cani capiscono parole", "studio cani linguaggio", "comunicazione cane uomo"],
  },
  {
    tema: "Perche i gatti adorano le scatole di cartone: la spiegazione scientifica. Studi dell'Universita di Utrecht. Bisogno di sicurezza, termoregolazione, predazione, riduzione dello stress. Come sfruttarlo per migliorare il benessere del gatto a casa.",
    categoria: "curiosita",
    keywords: ["gatti scatole", "perche gatti adorano scatole", "comportamento gatto scientifico"],
  },

  // PRONTO SOCCORSO
  {
    tema: "Primo soccorso al cane: cosa fare in caso di colpo di calore, ferite, ingestione di corpi estranei, intossicazione. Manovre di primo soccorso (Heimlich per cani, RCP). Numeri utili (Centro Antiveleni Pavia: 0382 24444). Cosa NON fare. Kit di pronto soccorso casa.",
    categoria: "salute",
    keywords: ["primo soccorso cane", "colpo di calore cane", "antiveleni cani", "RCP cane"],
  },
  {
    tema: "Cibi VELENOSI per cani che molti non conoscono: cioccolato, uva e uvetta, cipolla e aglio, xilitolo, avocado, noci di macadamia, alcol, caffe, ossa cotte, lievito crudo. Sintomi di intossicazione. Cosa fare in emergenza. Numero Centro Antiveleni.",
    categoria: "salute",
    keywords: ["cibi velenosi cani", "cioccolato cane", "intossicazione cane", "antiveleni"],
  },
];

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = new URL(request.url);
  const numArticoli = Math.min(Number(url.searchParams.get("n") || "5"), 15);

  const sql = getDB();
  const results: Array<{ titolo: string; slug: string; stato: string }> = [];
  const errors: string[] = [];

  // Permette di forzare specifici temi: ?force=true (primi N), ?from=2 (skip primi 2)
  const forceFirst = url.searchParams.get("force") === "true";
  const from = Number(url.searchParams.get("from") || "0");
  const temiScelti = forceFirst
    ? TEMI.slice(from, from + numArticoli)
    : [...TEMI].sort(() => Math.random() - 0.5).slice(0, numArticoli);

  for (const t of temiScelti) {
    try {
      const metaPrompt = `Genera i metadati di un articolo per un magazine pet italiano.
TEMA: ${t.tema}
KEYWORD: ${t.keywords.join(", ")}

Rispondi SOLO con JSON puro (no markdown, no fences):
{"titolo":"titolo SEO max 80 char","slug":"formato-url-seo","estratto":"meta description 2 frasi max 160 char","tempo_lettura":"X min","tags":["3-5 keyword"]}`;

      const metaResponse = await askAI(metaPrompt, 400);
      const parsed = extractJSON(metaResponse);
      const meta = (Array.isArray(parsed) ? parsed[0] : parsed) as { titolo: string; slug: string; estratto: string; tempo_lettura: string; tags: string[] };

      if (!meta?.titolo) { errors.push(`No title: ${t.tema.slice(0, 40)}`); continue; }

      let slug = meta.slug || slugify(meta.titolo);
      const existing = await sql`SELECT id FROM articoli WHERE slug = ${slug} LIMIT 1`;
      if (existing.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

      const contentPrompt = `Scrivi un articolo completo per il magazine di MifidoDiTe.eu.

TITOLO: ${meta.titolo}
TEMA DETTAGLIATO: ${t.tema}

REGOLE IMPORTANTI:
- 1000-1500 parole, MAI meno
- HTML: usa h2 per sezioni principali, h3 per sotto-sezioni, p per paragrafi, ul/li per elenchi puntati, strong per i concetti chiave
- Paragrafi MAX 3-4 righe (leggibilita mobile)
- Tono: come un esperto che ti spiega con autorevolezza ma in modo amichevole
- Italiano fluente, ZERO anglicismi
- Se l'articolo riguarda LEGGI o NORMATIVE: cita SEMPRE i numeri di articolo precisi (es. Art. 169 Codice della Strada), le sanzioni esatte in euro, i decreti, le leggi
- Se citi studi scientifici: indica sempre universita, autori, rivista
- Includi una sezione "Cosa fare se..." con consigli pratici
- Includi una sezione FAQ con 3-4 domande comuni
- Chiudi con: "<p><strong>Su MifidoDiTe.eu trovi guide, consigli e tutto quello che serve per il tuo amico a 4 zampe.</strong></p>"
- Rispondi SOLO con HTML. Niente markdown, niente fences, niente commenti.`;

      const contenuto = await askAI(contentPrompt, 6000);
      let html = contenuto.replace(/^```html?\s*/i, "").replace(/```\s*$/i, "").trim();

      if (html.length < 800) { errors.push(`Short: ${meta.titolo}`); continue; }

      await sql`
        INSERT INTO articoli (titolo, slug, categoria, estratto, contenuto, tempo_lettura, tags, img, pubblicato)
        VALUES (${meta.titolo}, ${slug}, ${t.categoria}, ${meta.estratto || ""}, ${html}, ${meta.tempo_lettura || "7 min"}, ${meta.tags || t.keywords}, ${UNSPLASH_IMAGES[t.categoria] || UNSPLASH_IMAGES.curiosita}, true)
      `;

      results.push({ titolo: meta.titolo, slug, stato: "salvato" });
    } catch (err) {
      errors.push(`${t.tema.slice(0, 40)}: ${(err as Error).message}`);
    }
  }

  return NextResponse.json({
    success: results.length > 0,
    salvati: results.length,
    articoli: results,
    errors: errors.length > 0 ? errors : undefined,
  });
}
