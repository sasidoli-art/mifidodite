import { NextResponse } from "next/server";
import { askAI, extractJSON } from "@/lib/ai-agent";
import { slugify } from "@/lib/utils";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const UNSPLASH = {
  cani: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=800&q=80",
  ],
  gatti: [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80",
  ],
};

const TEMI_RAZZE = [
  // CANI MILITARI E DA GUERRA
  { tema: "Il Pastore del Caucaso: il cane da guerra dell'esercito russo. Usato per sorvegliare i gulag, pattugliare i confini sovietici e proteggere le basi militari. Peso fino a 100 kg, temperamento feroce ma leale. Come e diventato il cane da guardia piu temuto al mondo. Storie vere di Pastori del Caucaso in servizio. Situazione attuale in Russia e nel resto del mondo.", specie: "cani", categoria: "curiosita" },
  { tema: "Il Pastore Tedesco nell'esercito e nella polizia: la razza piu usata dalle forze armate di tutto il mondo. Da Rin Tin Tin (cane salvato dalle trincee della Prima Guerra Mondiale che divento star di Hollywood) ai cani anti-IED in Afghanistan. Come vengono addestrati, quanto costano, cosa succede quando vanno in pensione.", specie: "cani", categoria: "curiosita" },
  { tema: "Il Malinois Belga: il Navy SEAL dei cani. Ha partecipato all'operazione che ha ucciso Bin Laden (cane Cairo). Perche ha sostituito il Pastore Tedesco nelle operazioni speciali. Piu veloce, piu agile, piu resistente. Storie vere di Malinois in missione.", specie: "cani", categoria: "curiosita" },

  // CANI NELL'ANTICO EGITTO
  { tema: "I cani nell'antico Egitto: dal Basenji al Saluki, le razze sacre dei faraoni. I cani venivano mummificati come le persone. Il dio Anubi aveva la testa di sciacallo (o di cane?). Le tombe di Tutankhamon contenevano collari d'oro per i suoi cani. Il Greyhound egizio (Tesem) e forse la razza piu antica del mondo, raffigurata nelle tombe 4.000 anni fa. Come gli egizi vedevano il rapporto uomo-cane.", specie: "cani", categoria: "curiosita" },
  { tema: "Il gatto nell'antico Egitto: animale sacro, divinita e compagno di vita. La dea Bastet aveva la testa di gatto. Uccidere un gatto era punito con la morte. Quando un gatto moriva, la famiglia si radeva le sopracciglia in segno di lutto. Mummie di gatti trovate a migliaia. Come il gatto egizio (Mau) e diventato il gatto domestico che conosciamo.", specie: "gatti", categoria: "curiosita" },

  // CURIOSITA INCREDIBILI
  { tema: "Il Basenji: l'unico cane al mondo che non abbaia. Viene dal Congo, e una delle razze piu antiche (5.000 anni). Non abbaia ma fa un suono yodel chiamato 'baroo'. Era usato dalle tribu pigmee per cacciare nella foresta. Perche non abbaia? La scienza dice che la laringe e diversa. Curiosita: si pulisce come un gatto.", specie: "cani", categoria: "curiosita" },
  { tema: "Il Lagotto Romagnolo: l'unico cane al mondo certificato per la ricerca del tartufo. Razza italiana antichissima (XVI secolo, Romagna). Come funziona il fiuto del tartufo. Un Lagotto addestrato puo valere 5.000-15.000€. Il tartufo bianco d'Alba trovato da un Lagotto e stato venduto a 330.000€. La scienza dietro l'olfatto del Lagotto.", specie: "cani", categoria: "curiosita" },
  { tema: "Il Xoloitzcuintle (Xolo): il cane nudo sacro degli Aztechi. Nome impronunciabile, storia incredibile. Era considerato una guida per le anime dei morti nell'aldila. Frida Kahlo ne aveva diversi (presenti nei suoi quadri). Non ha pelo — temperatura corporea di 40°C usata come 'borsa dell'acqua calda' dai malati. Patrimonio culturale del Messico.", specie: "cani", categoria: "curiosita" },
  { tema: "Il Norwegian Lundehund: il cane con 6 dita per piede. L'unica razza al mondo con polidattilia naturale. Evoluto sulle scogliere norvegesi per cacciare i pulcinella di mare (puffin). Puo piegare la testa all'indietro fino a toccare la schiena. Quasi estinto negli anni '40 (solo 6 esemplari rimasti). Come e stato salvato.", specie: "cani", categoria: "curiosita" },
  { tema: "Il Mau Egizio: il gatto piu veloce del mondo domestico. Raggiunge i 48 km/h (il gatto medio arriva a 30). E l'unica razza di gatto domestico con macchie naturali (non selezionate dall'uomo). Discendente diretto dei gatti dell'antico Egitto. Il suo nome 'Mau' significa 'gatto' in egizio antico.", specie: "gatti", categoria: "curiosita" },
  { tema: "Il Maine Coon: il gigante gentile. Il gatto domestico piu grande del mondo (record: 120 cm di lunghezza). Leggenda: incrocio tra gatto e procione (falso, ma il nome viene da li). Originario del Maine, USA. Adora l'acqua (unico tra i gatti). Personalita da cane: viene quando lo chiami, gioca a riporto.", specie: "gatti", categoria: "curiosita" },

  // STORIE VERE INCREDIBILI
  { tema: "Hachiko, Fido, Greyfriars Bobby: le 3 storie piu commoventi di fedelta canina nella storia. Hachiko aspetto il padrone per 9 anni alla stazione di Shibuya (Giappone). Fido aspetto 14 anni alla fermata del bus a Borgo San Lorenzo (Italia). Bobby dormi sulla tomba del padrone per 14 anni a Edimburgo (Scozia). Cosa dice la scienza sulla fedelta del cane.", specie: "cani", categoria: "aneddoti" },
  { tema: "I cani dello spazio: Laika, Belka e Strelka. La storia vera dei cani sovietici lanciati nello spazio. Laika fu il primo essere vivente in orbita (1957) — non torno mai. Belka e Strelka tornarono vive (1960). Strelka ebbe cuccioli, uno fu regalato a Jackie Kennedy. Come furono selezionate e addestrate.", specie: "cani", categoria: "curiosita" },
  { tema: "Il gatto che eredito 13 milioni di dollari: la storia di Blackie, il gatto piu ricco del mondo secondo il Guinness. E non e l'unico: Tommaso, un gatto randagio di Roma, eredito 10 milioni di euro nel 2011. Come funziona il testamento a favore di un animale in Italia (si puo fare?).", specie: "gatti", categoria: "curiosita" },
];

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const numArticoli = Math.min(Number(url.searchParams.get("n") || "3"), 15);
  const from = Number(url.searchParams.get("from") || "0");

  const sql = getDB();
  const results: Array<{ titolo: string; slug: string; stato: string }> = [];
  const errors: string[] = [];

  const temiScelti = TEMI_RAZZE.slice(from, from + numArticoli);

  for (const t of temiScelti) {
    try {
      const metaPrompt = `Genera i metadati di un articolo per un magazine pet italiano.
TEMA: ${t.tema}
Rispondi SOLO con JSON puro (no markdown, no fences):
{"titolo":"titolo SEO max 80 char, accattivante e curioso","slug":"formato-url-seo","estratto":"meta description 2 frasi max 160 char che crei curiosita","tempo_lettura":"X min","tags":["5 keyword"]}`;

      const metaResponse = await askAI(metaPrompt, 400);
      const parsed = extractJSON(metaResponse);
      const meta = (Array.isArray(parsed) ? parsed[0] : parsed) as { titolo: string; slug: string; estratto: string; tempo_lettura: string; tags: string[] };

      if (!meta?.titolo) { errors.push(`No title: ${t.tema.slice(0, 40)}`); continue; }

      let slug = meta.slug || slugify(meta.titolo);
      const existing = await sql`SELECT id FROM articoli WHERE slug = ${slug} LIMIT 1`;
      if (existing.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

      const contentPrompt = `Scrivi un articolo per il magazine di MifidoDiTe.eu.

TITOLO: ${meta.titolo}
TEMA: ${t.tema}

STILE:
- Racconta come una STORIA, non come un'enciclopedia
- Apri con un fatto sorprendente che catturi subito ("Lo sapevi che..." o "Nel 1957, un cane randagio di Mosca...")
- 1000-1500 parole
- HTML: h2, h3, p, ul/li, strong
- Tono: come un documentario di Netflix narrato da un amico appassionato
- Paragrafi CORTI (3-4 righe max) per leggibilita mobile
- Inserisci date, nomi, luoghi reali — mai inventare
- Se citi studi o fatti storici, specifica la fonte
- Chiudi con un fatto poco conosciuto che lasci il lettore a bocca aperta
- Ultima riga: "<p><strong>Scopri altre curiosita sul mondo pet su MifidoDiTe.eu</strong></p>"
- Rispondi SOLO con HTML.`;

      const contenuto = await askAI(contentPrompt, 6000);
      let html = contenuto.replace(/^```html?\s*/i, "").replace(/```\s*$/i, "").trim();
      if (html.length < 500) { errors.push(`Short: ${meta.titolo}`); continue; }

      const imgs = UNSPLASH[t.specie as "cani" | "gatti"] || UNSPLASH.cani;
      const img = imgs[Math.floor(Math.random() * imgs.length)];

      await sql`
        INSERT INTO articoli (titolo, slug, categoria, estratto, contenuto, tempo_lettura, tags, img, pubblicato)
        VALUES (${meta.titolo}, ${slug}, ${t.categoria}, ${meta.estratto || ""}, ${html}, ${meta.tempo_lettura || "7 min"}, ${meta.tags || []}, ${img}, false)
      `;

      results.push({ titolo: meta.titolo, slug, stato: "bozza" });
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
