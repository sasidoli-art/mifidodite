// Seed sentieri/escursioni dog-friendly in Italia
// Sentieri noti dove i cani al guinzaglio sono ammessi

import type { SentieroSeed } from "./sentieri-types";
import { slugifyRegioneS } from "./sentieri-types";
export type { SentieroSeed } from "./sentieri-types";
export { slugifyRegioneS, SENTIERO_TIPO_LABEL, DIFFICOLTA_LABEL, DIFFICOLTA_COLOR } from "./sentieri-types";

export function getSentieroBySlug(slug: string): SentieroSeed | undefined {
  return SENTIERI_SEED.find((s) => s.slug === slug);
}

export function getSentieriByRegione(regioneSlug: string): SentieroSeed[] {
  return SENTIERI_SEED.filter((s) => slugifyRegioneS(s.regione) === regioneSlug);
}

export function getAllRegioniSentieri(): string[] {
  return Array.from(new Set(SENTIERI_SEED.map((s) => slugifyRegioneS(s.regione))));
}

export function unslugifyRegioneSentieri(slug: string): string | null {
  const match = Array.from(new Set(SENTIERI_SEED.map((s) => s.regione))).find(
    (r) => slugifyRegioneS(r) === slug
  );
  return match || null;
}

const IMG = [
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80",
  "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80",
];
const pickImg = (i: number) => IMG[i % IMG.length];

export const SENTIERI_SEED: SentieroSeed[] = [
  // === TRENTINO-ALTO ADIGE ===
  { slug: "sentiero-alpe-siusi-dolomiti", nome: "Sentiero dell'Alpe di Siusi", comune: "Castelrotto", provincia: "BZ", regione: "Trentino-Alto Adige", tipo: "passeggiata", descrizione: "Il piu grande altipiano d'Europa ai piedi del massiccio dello Sciliar. Sentieri facili tra prati fioriti e malghe con vista Dolomiti. Cani al guinzaglio ammessi ovunque.", difficolta: "facile", lunghezzaKm: 8, dislivelloM: 200, durataOre: 2.5, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: false, adattoACuccioli: true, img: pickImg(0), lat: 46.5413, lng: 11.6240 },
  { slug: "sentiero-del-ponale-riva", nome: "Sentiero del Ponale", comune: "Riva del Garda", provincia: "TN", regione: "Trentino-Alto Adige", tipo: "passeggiata", descrizione: "Ex strada militare scavata nella roccia a picco sul Lago di Garda. Vista mozzafiato, ombra parziale. Uno dei sentieri piu fotografati d'Italia.", difficolta: "facile", lunghezzaKm: 5, dislivelloM: 150, durataOre: 1.5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: true, img: pickImg(1), lat: 45.8826, lng: 10.8222 },
  { slug: "lago-braies-escursione", nome: "Giro del Lago di Braies", comune: "Braies", provincia: "BZ", regione: "Trentino-Alto Adige", tipo: "anello", descrizione: "Giro completo del lago piu fotografato delle Dolomiti. Sentiero pianeggiante con tratti su passerelle. Cani al guinzaglio ammessi.", difficolta: "facile", lunghezzaKm: 3.5, dislivelloM: 50, durataOre: 1, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: true, img: pickImg(2), lat: 46.6947, lng: 12.0856 },
  { slug: "val-di-funes-odle", nome: "Sentiero delle Odle", comune: "Funes", provincia: "BZ", regione: "Trentino-Alto Adige", tipo: "trekking", descrizione: "Trekking nella Val di Funes con vista sul gruppo delle Odle, patrimonio UNESCO. Sentiero di media difficolta con tratti esposti.", difficolta: "media", lunghezzaKm: 12, dislivelloM: 600, durataOre: 5, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: false, img: pickImg(3), lat: 46.6435, lng: 11.7024 },

  // === VENETO ===
  { slug: "giro-tre-cime-lavaredo", nome: "Giro delle Tre Cime di Lavaredo", comune: "Auronzo di Cadore", provincia: "BL", regione: "Veneto", tipo: "anello", descrizione: "L'escursione piu iconica delle Dolomiti: giro completo delle Tre Cime con panorama a 360 gradi. Cani ammessi al guinzaglio.", difficolta: "media", lunghezzaKm: 10, dislivelloM: 400, durataOre: 4, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: false, adattoACuccioli: false, img: pickImg(4), lat: 46.6186, lng: 12.3069 },

  // === LOMBARDIA ===
  { slug: "sentiero-viandante-lago-como", nome: "Sentiero del Viandante", comune: "Abbadia Lariana", provincia: "LC", regione: "Lombardia", tipo: "lungo_percorso", descrizione: "45 km lungo la sponda orientale del Lago di Como, da Abbadia Lariana a Colico. Percorribile a tappe, ombreggiato e panoramico.", difficolta: "media", lunghezzaKm: 45, dislivelloM: 1200, durataOre: 16, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: false, img: pickImg(0), lat: 45.8988, lng: 9.3381 },
  { slug: "monte-isola-sentiero", nome: "Giro di Monte Isola", comune: "Monte Isola", provincia: "BS", regione: "Lombardia", tipo: "anello", descrizione: "Giro dell'isola lacustre piu grande d'Europa, nel Lago d'Iseo. Sentiero facile tra oliveti e borghi pescatori, cani ammessi.", difficolta: "facile", lunghezzaKm: 9, dislivelloM: 100, durataOre: 3, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: true, img: pickImg(1), lat: 45.7216, lng: 10.0747 },

  // === PIEMONTE ===
  { slug: "sentiero-balcone-monviso", nome: "Sentiero Balcone del Monviso", comune: "Crissolo", provincia: "CN", regione: "Piemonte", tipo: "trekking", descrizione: "Trekking panoramico alla base del Re di Pietra (Monviso, 3841m). Paesaggi alpini, laghi d'alta quota, marmotte. Cani al guinzaglio.", difficolta: "difficile", lunghezzaKm: 14, dislivelloM: 800, durataOre: 6, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: false, adattoACuccioli: false, img: pickImg(2), lat: 44.6627, lng: 7.0948 },
  { slug: "sacra-san-michele-sentiero", nome: "Sentiero per la Sacra di San Michele", comune: "Sant'Ambrogio di Torino", provincia: "TO", regione: "Piemonte", tipo: "trekking", descrizione: "Salita all'abbazia medievale che ha ispirato 'Il Nome della Rosa' di Eco. Sentiero nel bosco, cani ammessi al guinzaglio.", difficolta: "media", lunghezzaKm: 6, dislivelloM: 500, durataOre: 2.5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: false, img: pickImg(3), lat: 45.0983, lng: 7.3429 },

  // === LIGURIA ===
  { slug: "sentiero-azzurro-cinque-terre", nome: "Sentiero Azzurro (Cinque Terre)", comune: "Riomaggiore", provincia: "SP", regione: "Liguria", tipo: "lungo_percorso", descrizione: "Il sentiero costiero piu famoso d'Italia, collega i 5 borghi delle Cinque Terre. Cani al guinzaglio ammessi ma alcuni tratti sono a pagamento.", difficolta: "media", lunghezzaKm: 12, dislivelloM: 500, durataOre: 5, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: false, img: pickImg(4), lat: 44.0990, lng: 9.7368 },
  { slug: "alta-via-monti-liguri", nome: "Alta Via dei Monti Liguri", comune: "Ventimiglia", provincia: "IM", regione: "Liguria", tipo: "lungo_percorso", descrizione: "440 km da Ventimiglia a Ceparana sullo spartiacque ligure. Percorribile a tappe di 1-2 giorni, vista mare e Alpi. Cani ammessi.", difficolta: "difficile", lunghezzaKm: 440, dislivelloM: 15000, durataOre: 168, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: false, img: pickImg(0), lat: 43.7904, lng: 7.6073 },

  // === FRIULI-VENEZIA GIULIA ===
  { slug: "sentiero-rilke-trieste", nome: "Sentiero Rilke", comune: "Sistiana", provincia: "TS", regione: "Friuli-Venezia Giulia", tipo: "passeggiata", descrizione: "Sentiero a picco sul mare tra Sistiana e Duino, intitolato a Rainer Maria Rilke. Falesie del Carso, vista Golfo di Trieste. Cani ammessi.", difficolta: "facile", lunghezzaKm: 2, dislivelloM: 50, durataOre: 0.5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: false, adattoACuccioli: true, img: pickImg(1), lat: 45.7677, lng: 13.6310 },

  // === TOSCANA ===
  { slug: "via-francigena-san-gimignano", nome: "Via Francigena — tappa San Gimignano", comune: "San Gimignano", provincia: "SI", regione: "Toscana", tipo: "lungo_percorso", descrizione: "Tappa della storica Via Francigena che attraversa le colline senesi con arrivo a San Gimignano e le sue torri medievali.", difficolta: "media", lunghezzaKm: 18, dislivelloM: 400, durataOre: 6, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: false, img: pickImg(2), lat: 43.4677, lng: 11.0439 },
  { slug: "sentiero-della-bonifica-valdichiana", nome: "Sentiero della Bonifica", comune: "Arezzo", provincia: "AR", regione: "Toscana", tipo: "ciclabile", descrizione: "62 km pianeggianti lungo il Canale Maestro della Chiana, da Arezzo a Chiusi. Percorribile a piedi o in bici, perfetto per cani.", difficolta: "facile", lunghezzaKm: 62, dislivelloM: 50, durataOre: 4, guinzaglioObbligatorio: false, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: true, img: pickImg(3), lat: 43.3117, lng: 11.8805 },
  { slug: "anello-monte-amiata", nome: "Anello del Monte Amiata", comune: "Abbadia San Salvatore", provincia: "SI", regione: "Toscana", tipo: "anello", descrizione: "Escursione nel faggeto secolare del Monte Amiata, il vulcano spento della Toscana. Ombra totale, fresco anche in agosto.", difficolta: "media", lunghezzaKm: 10, dislivelloM: 500, durataOre: 4, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: false, img: pickImg(4), lat: 42.8851, lng: 11.6330 },

  // === UMBRIA ===
  { slug: "cammino-san-benedetto", nome: "Cammino di San Benedetto", comune: "Norcia", provincia: "PG", regione: "Umbria", tipo: "lungo_percorso", descrizione: "300 km da Norcia a Montecassino attraverso Umbria e Lazio. Percorribile a tappe da 3 a 16 giorni. Cani al guinzaglio ammessi.", difficolta: "media", lunghezzaKm: 300, dislivelloM: 8000, durataOre: 100, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: false, img: pickImg(0), lat: 42.7925, lng: 13.0920 },

  // === LAZIO ===
  { slug: "sentiero-monte-circeo", nome: "Sentiero del Monte Circeo", comune: "San Felice Circeo", provincia: "LT", regione: "Lazio", tipo: "anello", descrizione: "Anello del promontorio del Circeo nel Parco Nazionale. Vista su mare e laghi, macchia mediterranea. Cani al guinzaglio ammessi.", difficolta: "media", lunghezzaKm: 7, dislivelloM: 500, durataOre: 3, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: false, img: pickImg(1), lat: 41.2326, lng: 13.0894 },

  // === CAMPANIA ===
  { slug: "sentiero-degli-dei-costiera", nome: "Sentiero degli Dei", comune: "Agerola", provincia: "NA", regione: "Campania", tipo: "trekking", descrizione: "Il trekking piu famoso della Costiera Amalfitana: da Agerola a Nocelle con vista su Capri. Cani al guinzaglio ammessi.", difficolta: "media", lunghezzaKm: 8, dislivelloM: 400, durataOre: 3.5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: false, img: pickImg(2), lat: 40.6374, lng: 14.5254 },
  { slug: "monte-faito-sentieri", nome: "Monte Faito", comune: "Vico Equense", provincia: "NA", regione: "Campania", tipo: "trekking", descrizione: "Escursioni sulla cima del Monte Faito (1131m), raggiungibile in funivia da Castellammare. Boschi di faggi, vista golfo di Napoli.", difficolta: "media", lunghezzaKm: 6, dislivelloM: 350, durataOre: 2.5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: false, img: pickImg(3), lat: 40.6628, lng: 14.4629 },

  // === PUGLIA ===
  { slug: "gargano-foresta-umbra-sentieri", nome: "Sentieri della Foresta Umbra", comune: "Vieste", provincia: "FG", regione: "Puglia", tipo: "passeggiata", descrizione: "La Foresta Umbra nel Parco del Gargano: faggi secolari, ombra totale anche in estate. Diversi anelli da 1h a 4h. Cani al guinzaglio.", difficolta: "facile", lunghezzaKm: 5, dislivelloM: 100, durataOre: 2, guinzaglioObbligatorio: true, acquaDisponibile: true, ombraPresente: true, adattoACuccioli: true, img: pickImg(4), lat: 41.8361, lng: 16.0501 },

  // === SICILIA ===
  { slug: "etna-sentiero-schiena-asino", nome: "Sentiero Schiena dell'Asino (Etna)", comune: "Zafferana Etnea", provincia: "CT", regione: "Sicilia", tipo: "trekking", descrizione: "Vista dalla cresta della Valle del Bove, il piu grande cratere dell'Etna. Paesaggio lunare, cani ammessi al guinzaglio.", difficolta: "media", lunghezzaKm: 5, dislivelloM: 300, durataOre: 2.5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: false, adattoACuccioli: false, img: pickImg(0), lat: 37.7293, lng: 15.0771 },
  { slug: "riserva-zingaro-sentiero", nome: "Riserva dello Zingaro", comune: "San Vito Lo Capo", provincia: "TP", regione: "Sicilia", tipo: "trekking", descrizione: "La prima riserva naturale della Sicilia: 7 km di costa con calette incontaminate. Cani ammessi al guinzaglio (non in acqua).", difficolta: "media", lunghezzaKm: 14, dislivelloM: 400, durataOre: 5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: false, adattoACuccioli: false, img: pickImg(1), lat: 38.1005, lng: 12.7791 },

  // === SARDEGNA ===
  { slug: "trekking-gola-gorropu", nome: "Trekking Gola di Gorropu", comune: "Urzulei", provincia: "NU", regione: "Sardegna", tipo: "trekking", descrizione: "Il canyon piu profondo d'Europa (500m di pareti). Trekking impegnativo nel cuore della Sardegna selvaggia. Cani al guinzaglio.", difficolta: "difficile", lunghezzaKm: 8, dislivelloM: 600, durataOre: 5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: false, img: pickImg(2), lat: 40.1552, lng: 9.5241 },
  { slug: "cala-luna-trekking-sardegna", nome: "Trekking per Cala Luna", comune: "Baunei", provincia: "NU", regione: "Sardegna", tipo: "trekking", descrizione: "Sentiero costiero che porta alla celebre Cala Luna nel Supramonte. Tratti esposti, panorami mozzafiato. Cani ammessi.", difficolta: "difficile", lunghezzaKm: 10, dislivelloM: 500, durataOre: 5, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: false, adattoACuccioli: false, img: pickImg(3), lat: 40.2076, lng: 9.6278 },

  // === ABRUZZO ===
  { slug: "sentiero-del-cuore-scanno", nome: "Sentiero del Cuore", comune: "Scanno", provincia: "AQ", regione: "Abruzzo", tipo: "passeggiata", descrizione: "Passeggiata panoramica che arriva al punto di vista del lago a forma di cuore. Facile, adatto a tutti, cani benvenuti.", difficolta: "facile", lunghezzaKm: 3, dislivelloM: 100, durataOre: 1, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: true, adattoACuccioli: true, img: pickImg(4), lat: 41.9161, lng: 13.8706 },
  { slug: "campo-imperatore-gran-sasso", nome: "Campo Imperatore", comune: "Castel del Monte", provincia: "AQ", regione: "Abruzzo", tipo: "trekking", descrizione: "Il 'Piccolo Tibet d'Italia': altopiano a 1800m nel massiccio del Gran Sasso. Pascoli, cavalli selvaggi, escursioni. Cani ammessi.", difficolta: "media", lunghezzaKm: 10, dislivelloM: 400, durataOre: 4, guinzaglioObbligatorio: true, acquaDisponibile: false, ombraPresente: false, adattoACuccioli: false, img: pickImg(0), lat: 42.3650, lng: 13.7266 },
];
