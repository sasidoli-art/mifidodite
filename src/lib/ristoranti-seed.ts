// Seed ristoranti pet-friendly in Italia
// Selezione editoriale: ristoranti con dehors, agriturismi-ristorante, dog cafe
// Pet-friendliness da verificare sempre con il locale prima di andare

import type { RistoranteSeed } from "./ristoranti-types";
import { slugifyRegioneR } from "./ristoranti-types";
export type { RistoranteSeed } from "./ristoranti-types";
export { slugifyRegioneR, RISTORANTE_TIPO_LABEL, RISTORANTE_TIPO_LABEL_SINGULAR, PREZZO_LABEL_RIST } from "./ristoranti-types";

export function getRistoranteBySlug(slug: string): RistoranteSeed | undefined {
  return RISTORANTI_SEED.find((s) => s.slug === slug);
}

export function getRistorantiByRegione(regioneSlug: string): RistoranteSeed[] {
  return RISTORANTI_SEED.filter((s) => slugifyRegioneR(s.regione) === regioneSlug);
}

export function getAllRegioniRistoranti(): string[] {
  return Array.from(new Set(RISTORANTI_SEED.map((s) => slugifyRegioneR(s.regione))));
}

export function unslugifyRegioneRistoranti(slug: string): string | null {
  const match = Array.from(new Set(RISTORANTI_SEED.map((s) => s.regione))).find(
    (r) => slugifyRegioneR(r) === slug
  );
  return match || null;
}

export function getRistoranteRegione(slug: string): string | undefined {
  const ristorante = getRistoranteBySlug(slug);
  return ristorante ? slugifyRegioneR(ristorante.regione) : undefined;
}

const IMG = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
];

const pickImg = (i: number) => IMG[i % IMG.length];

export const RISTORANTI_SEED: RistoranteSeed[] = [
  // === LOMBARDIA ===
  { slug: "cascina-cuccagna-milano", nome: "Cascina Cuccagna", comune: "Milano", provincia: "MI", regione: "Lombardia", tipo: "ristorante", descrizione: "Cascina storica del 1695 nel cuore di Milano, ristorante biologico con cortile e giardino. Cani benvenuti nel dehors.", fascia: "medio", cucina: "Italiana biologica", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 45.4512, lng: 9.2116 },
  { slug: "ratana-milano", nome: "Ratana", comune: "Milano", provincia: "MI", regione: "Lombardia", tipo: "ristorante", descrizione: "Ristorante di cucina lombarda contemporanea nel quartiere Isola, edificio storico con dehors. Cani ammessi all'esterno.", fascia: "alto", cucina: "Lombarda contemporanea", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(1), lat: 45.4865, lng: 9.1882 },
  { slug: "giannino-milano", nome: "Giannino dal 1899", comune: "Milano", provincia: "MI", regione: "Lombardia", tipo: "ristorante", descrizione: "Ristorante storico milanese dal 1899, cucina italiana classica. Cani di piccola taglia ammessi nel ristorante.", fascia: "luxury", cucina: "Italiana classica", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(2), lat: 45.4707, lng: 9.2025 },
  { slug: "osteria-del-binari-milano", nome: "Osteria del Binari", comune: "Milano", provincia: "MI", regione: "Lombardia", tipo: "osteria", descrizione: "Osteria storica in zona Navigli con grande giardino interno. Atmosfera rilassata, cani benvenuti.", fascia: "medio", cucina: "Milanese tradizionale", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(3), lat: 45.4494, lng: 9.1658 },
  { slug: "temakinho-milano-navigli", nome: "Temakinho Navigli", comune: "Milano", provincia: "MI", regione: "Lombardia", tipo: "ristorante", descrizione: "Catena di cucina brasiliano-giapponese con dehors sui Navigli. Politica pet-friendly esplicita in tutti i locali.", fascia: "medio", cucina: "Brasiliana-giapponese", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(4), lat: 45.4508, lng: 9.1714 },
  { slug: "lido-pace-como", nome: "Lido di Villa Olmo", comune: "Como", provincia: "CO", regione: "Lombardia", tipo: "ristorante", descrizione: "Ristorante con vista mozzafiato sul Lago di Como, nel parco di Villa Olmo. Dehors con cani ammessi.", fascia: "alto", cucina: "Italiana", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 45.7856, lng: 9.0789 },

  // === LAZIO ===
  { slug: "eataly-roma", nome: "Eataly Roma Ostiense", comune: "Roma", provincia: "RM", regione: "Lazio", tipo: "ristorante", descrizione: "Il grande food market con diversi ristoranti, terrazza panoramica e area esterna. Cani ammessi nelle aree esterne.", fascia: "medio", cucina: "Italiana multi-regionale", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(1), lat: 41.8695, lng: 12.4780 },
  { slug: "pierluigi-roma", nome: "Pierluigi", comune: "Roma", provincia: "RM", regione: "Lazio", tipo: "ristorante", descrizione: "Ristorante iconico di pesce nel centro storico romano, piazza esterna. Cani ammessi nel dehors.", fascia: "luxury", cucina: "Pesce", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(2), lat: 41.8978, lng: 12.4715 },
  { slug: "da-enzo-al-29-roma", nome: "Da Enzo al 29", comune: "Roma", provincia: "RM", regione: "Lazio", tipo: "osteria", descrizione: "Trattoria romana autentica a Trastevere, pochi tavoli all'aperto. Cucina romana doc, cani tollerati nel dehors.", fascia: "medio", cucina: "Romana tradizionale", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: false, areaRecintata: false, img: pickImg(3), lat: 41.8869, lng: 12.4742 },
  { slug: "roscioli-roma", nome: "Salumeria Roscioli", comune: "Roma", provincia: "RM", regione: "Lazio", tipo: "bistrot", descrizione: "Salumeria-ristorante con vini eccezionali e formaggi artigianali. Tavolini all'esterno, cani piccoli ammessi.", fascia: "alto", cucina: "Gastronomia italiana", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: false, areaRecintata: false, img: pickImg(4), lat: 41.8934, lng: 12.4752 },

  // === TOSCANA ===
  { slug: "il-santo-bevitore-firenze", nome: "Il Santo Bevitore", comune: "Firenze", provincia: "FI", regione: "Toscana", tipo: "osteria", descrizione: "Osteria raffinata in Oltrarno, prodotti toscani di stagione. Tavoli all'esterno in via, cani benvenuti.", fascia: "medio", cucina: "Toscana contemporanea", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 43.7683, lng: 11.2448 },
  { slug: "zeb-firenze", nome: "ZEB Gastronomia", comune: "Firenze", provincia: "FI", regione: "Toscana", tipo: "bistrot", descrizione: "Gastronomia creativa nel quartiere di San Nicolo, piatti della tradizione rivisitati. Cani ammessi.", fascia: "medio", cucina: "Toscana creativa", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(1), lat: 43.7627, lng: 11.2607 },
  { slug: "obica-firenze", nome: "Obica Mozzarella Bar", comune: "Firenze", provincia: "FI", regione: "Toscana", tipo: "ristorante", descrizione: "Catena italiana specializzata in mozzarella di bufala, con terrazza in centro. Pet-friendly esplicito.", fascia: "medio", cucina: "Mozzarella e insalate", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(2), lat: 43.7728, lng: 11.2531 },
  { slug: "agriturismo-fattoria-fibbiano", nome: "Fattoria Fibbiano", comune: "Terricciola", provincia: "PI", regione: "Toscana", tipo: "agriturismo", descrizione: "Azienda agricola biologica tra le colline pisane, ristorante con prodotti propri. Ampi spazi esterni, cani liberi.", fascia: "medio", cucina: "Toscana bio", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(3), lat: 43.5078, lng: 10.7088 },

  // === VENETO ===
  { slug: "osteria-al-cicheto-venezia", nome: "Osteria al Cicheto", comune: "Venezia", provincia: "VE", regione: "Veneto", tipo: "osteria", descrizione: "Bacaro tipico veneziano con cicchetti e vino, tavolini all'esterno sul campo. Cani benvenuti come a Venezia.", fascia: "economico", cucina: "Cicchetti veneziani", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(4), lat: 45.4409, lng: 12.3311 },
  { slug: "ristorante-giorgione-padova", nome: "Ristorante Giorgione", comune: "Padova", provincia: "PD", regione: "Veneto", tipo: "ristorante", descrizione: "Ristorante elegante a Padova con giardino interno, cucina veneta raffinata. Cani ammessi nel giardino.", fascia: "alto", cucina: "Veneta raffinata", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 45.4113, lng: 11.8803 },
  { slug: "bar-pocol-cortina", nome: "Baita Pie Tofana", comune: "Cortina d'Ampezzo", provincia: "BL", regione: "Veneto", tipo: "ristorante", descrizione: "Baita ai piedi delle Tofane a Cortina, cucina di montagna. Cani ammessi in terrazza e nel dehors estivo.", fascia: "alto", cucina: "Alpina dolomitica", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(1), lat: 46.5445, lng: 12.1382 },

  // === CAMPANIA ===
  { slug: "pizzeria-da-michele-napoli", nome: "L'Antica Pizzeria da Michele", comune: "Napoli", provincia: "NA", regione: "Campania", tipo: "pizzeria", descrizione: "La pizzeria piu famosa di Napoli dal 1870, solo Margherita e Marinara. Tavolini all'esterno, cani al guinzaglio tollerati.", fascia: "economico", cucina: "Pizza napoletana", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: false, areaRecintata: false, img: pickImg(2), lat: 40.8503, lng: 14.2621 },
  { slug: "starita-materdei-napoli", nome: "Pizzeria Starita a Materdei", comune: "Napoli", provincia: "NA", regione: "Campania", tipo: "pizzeria", descrizione: "Pizzeria storica dal 1901 nel quartiere Materdei. Pizza fritta leggendaria, cani ammessi nel dehors esterno.", fascia: "economico", cucina: "Pizza napoletana", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: false, areaRecintata: false, img: pickImg(3), lat: 40.8564, lng: 14.2434 },
  { slug: "don-alfonso-1890-santagata", nome: "Don Alfonso 1890", comune: "Sant'Agata sui Due Golfi", provincia: "NA", regione: "Campania", tipo: "ristorante", descrizione: "Ristorante stellato Michelin dal 1890, vista sul golfo. Giardino mediterraneo, cani ammessi negli spazi esterni.", fascia: "luxury", cucina: "Campana stellata", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(4), lat: 40.6144, lng: 14.3658 },

  // === EMILIA-ROMAGNA ===
  { slug: "trattoria-anna-maria-bologna", nome: "Trattoria Anna Maria", comune: "Bologna", provincia: "BO", regione: "Emilia-Romagna", tipo: "osteria", descrizione: "Trattoria storica bolognese, pasta fresca fatta a mano. Dehors sulla via, cani al guinzaglio benvenuti.", fascia: "medio", cucina: "Bolognese tradizionale", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 44.4980, lng: 11.3503 },
  { slug: "osteria-bottega-bologna", nome: "Osteria Bottega", comune: "Bologna", provincia: "BO", regione: "Emilia-Romagna", tipo: "osteria", descrizione: "Cucina emiliana raffinata in un contesto elegante ma informale. Cani ammessi nel dehors.", fascia: "alto", cucina: "Emiliana raffinata", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(1), lat: 44.4942, lng: 11.3496 },
  { slug: "pizzeria-palaz-parma", nome: "Pizzeria Palaz", comune: "Parma", provincia: "PR", regione: "Emilia-Romagna", tipo: "pizzeria", descrizione: "Pizzeria di qualita a Parma con ampio dehors. Nella citta del Prosciutto di Parma, cani al guinzaglio benvenuti.", fascia: "economico", cucina: "Pizza", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(2), lat: 44.8050, lng: 10.3374 },

  // === PUGLIA ===
  { slug: "osteria-piazzetta-cattedrale-ostuni", nome: "Osteria Piazzetta Cattedrale", comune: "Ostuni", provincia: "BR", regione: "Puglia", tipo: "osteria", descrizione: "Osteria nella piazzetta della Cattedrale di Ostuni, la Citta Bianca. Cucina pugliese con prodotti locali, cani ammessi.", fascia: "medio", cucina: "Pugliese tradizionale", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(3), lat: 40.7302, lng: 17.5730 },
  { slug: "la-sommita-ostuni-ristorante", nome: "La Sommita Ristorante", comune: "Ostuni", provincia: "BR", regione: "Puglia", tipo: "ristorante", descrizione: "Ristorante stellato nel Relais La Sommita, terrazza panoramica sulla Valle d'Itria. Cani piccoli ammessi.", fascia: "luxury", cucina: "Pugliese stellata", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(4), lat: 40.7343, lng: 17.5780 },
  { slug: "trullo-sovrano-alberobello", nome: "Trullo d'Oro", comune: "Alberobello", provincia: "BA", regione: "Puglia", tipo: "ristorante", descrizione: "Ristorante in un trullo autentico di Alberobello, cucina pugliese casalinga. Spazio esterno, cani benvenuti.", fascia: "medio", cucina: "Pugliese casalinga", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 40.7790, lng: 17.2351 },

  // === SICILIA ===
  { slug: "antica-focacceria-san-francesco-palermo", nome: "Antica Focacceria San Francesco", comune: "Palermo", provincia: "PA", regione: "Sicilia", tipo: "osteria", descrizione: "Osteria storica del 1834 nel centro di Palermo, street food siciliano elevato. Tavolini in piazza, cani al guinzaglio.", fascia: "economico", cucina: "Street food siciliano", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: false, areaRecintata: false, img: pickImg(1), lat: 38.1147, lng: 13.3681 },
  { slug: "osteria-mercato-catania", nome: "Osteria Antica Marina", comune: "Catania", provincia: "CT", regione: "Sicilia", tipo: "osteria", descrizione: "Osteria di pesce fresco al mercato del pesce di Catania. Tavoli all'aperto, cani piccoli ammessi.", fascia: "medio", cucina: "Pesce fresco siciliano", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: false, areaRecintata: false, img: pickImg(2), lat: 37.5071, lng: 15.0902 },
  { slug: "dolci-dolcerie-taormina", nome: "Bam Bar Taormina", comune: "Taormina", provincia: "ME", regione: "Sicilia", tipo: "bistrot", descrizione: "Bar celebre per le granite artigianali di Taormina, terrazza con vista Etna. Cani benvenuti.", fascia: "economico", cucina: "Granite e dolci siciliani", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(3), lat: 37.8523, lng: 15.2866 },

  // === LIGURIA ===
  { slug: "trattoria-rosmarino-genova", nome: "Trattoria Rosmarino", comune: "Genova", provincia: "GE", regione: "Liguria", tipo: "osteria", descrizione: "Trattoria genovese con pesto fatto a mano e focaccia di Recco. Tavolini sulla piazzetta, cani ammessi.", fascia: "medio", cucina: "Ligure tradizionale", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(4), lat: 44.4076, lng: 8.9335 },
  { slug: "il-marin-genova", nome: "Il Marin Eataly Genova", comune: "Genova", provincia: "GE", regione: "Liguria", tipo: "ristorante", descrizione: "Ristorante di pesce nel complesso Eataly al Porto Antico di Genova. Vista porto, cani ammessi in terrazza.", fascia: "alto", cucina: "Pesce ligure", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 44.4073, lng: 8.9339 },
  { slug: "la-brinca-ne", nome: "La Brinca", comune: "Ne", provincia: "GE", regione: "Liguria", tipo: "osteria", descrizione: "Agriturismo-ristorante nell'entroterra del Tigullio, cucina ligure autentica con prodotti dell'orto. Giardino, cani benvenuti.", fascia: "medio", cucina: "Ligure dell'entroterra", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(1), lat: 44.3539, lng: 9.3892 },

  // === PIEMONTE ===
  { slug: "del-cambio-torino", nome: "Del Cambio", comune: "Torino", provincia: "TO", regione: "Piemonte", tipo: "ristorante", descrizione: "Ristorante storico dal 1757 in Piazza Carignano a Torino, dove mangiava Cavour. Cani piccoli ammessi su richiesta.", fascia: "luxury", cucina: "Piemontese d'alta cucina", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(2), lat: 45.0695, lng: 7.6849 },
  { slug: "eataly-torino", nome: "Eataly Torino Lingotto", comune: "Torino", provincia: "TO", regione: "Piemonte", tipo: "ristorante", descrizione: "Il primo Eataly al mondo, nell'ex stabilimento Fiat Lingotto. Diversi ristoranti e aree esterne pet-friendly.", fascia: "medio", cucina: "Italiana multi-regionale", conDehors: true, conGiardino: false, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(3), lat: 45.0678, lng: 7.6825 },

  // === SARDEGNA ===
  { slug: "agriturismo-locci-zuddas-dolianova", nome: "Agriturismo Locci Zuddas", comune: "Dolianova", provincia: "CA", regione: "Sardegna", tipo: "agriturismo", descrizione: "Agriturismo tradizionale sardo nell'entroterra cagliaritano, cucina tipica con porceddu e culurgiones. Ampi spazi, cani benvenuti.", fascia: "economico", cucina: "Sarda tradizionale", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(4), lat: 39.3782, lng: 9.1786 },
  { slug: "sa-domu-antiga-asuni", nome: "Sa Domu Antiga", comune: "Asuni", provincia: "OR", regione: "Sardegna", tipo: "agriturismo", descrizione: "Agriturismo nella Sardegna centrale, cucina pastorale con formaggi artigianali e arrosti. Ambiente rurale, cani liberi.", fascia: "economico", cucina: "Sarda pastorale", conDehors: true, conGiardino: true, menuCane: false, ciotoleAcqua: true, areaRecintata: false, img: pickImg(0), lat: 39.6984, lng: 9.0995 },
];
