export interface OffertaSeed {
  id: string;
  nome_negozio: string;
  comune: string;
  provincia: string;
  titolo: string;
  slug: string;
  descrizione: string;
  prezzo_originale: string | null;
  prezzo_scontato: string;
  sconto_percentuale: number | null;
  categoria_prodotto: string;
  marca: string | null;
  img: string;
  valido_dal: string;
  valido_al: string;
}

export const OFFERTE_SEED: OffertaSeed[] = [
  // === CIBO CANE ===
  {
    id: "off1", nome_negozio: "Arcaplanet", comune: "Milano", provincia: "MI",
    titolo: "Royal Canin Medium Adult 15kg — Offerta Aprile",
    slug: "royal-canin-medium-adult-15kg-arcaplanet-milano",
    descrizione: "Royal Canin Medium Adult per cani di taglia media (11-25 kg). Crocchette complete per il mantenimento. Formato risparmio 15 kg.",
    prezzo_originale: "72.90€", prezzo_scontato: "54.90€", sconto_percentuale: 25,
    categoria_prodotto: "cibo_cane", marca: "Royal Canin",
    img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80",
    valido_dal: "2026-04-01", valido_al: "2026-04-30",
  },
  {
    id: "off2", nome_negozio: "Isola dei Tesori", comune: "Roma", provincia: "RM",
    titolo: "Monge Natural Superpremium 12kg — 2x1 sulla seconda confezione",
    slug: "monge-natural-superpremium-isola-tesori-roma",
    descrizione: "Acquista 2 sacchi Monge Natural Superpremium da 12 kg e il secondo lo paghi la meta. Tutte le varianti disponibili.",
    prezzo_originale: "55.90€ cad.", prezzo_scontato: "41.90€ cad. (con 2x1)", sconto_percentuale: 25,
    categoria_prodotto: "cibo_cane", marca: "Monge",
    img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    valido_dal: "2026-04-01", valido_al: "2026-04-15",
  },
  {
    id: "off3", nome_negozio: "Zooplus", comune: "Online", provincia: "IT",
    titolo: "Acana Classics Prairie Poultry 11.4kg — Spedizione gratuita",
    slug: "acana-classics-prairie-poultry-zooplus",
    descrizione: "Crocchette grain-free con pollo allevato a terra. Ingredienti freschi e regionali. Spedizione gratuita sopra i 49€.",
    prezzo_originale: "74.99€", prezzo_scontato: "62.99€", sconto_percentuale: 16,
    categoria_prodotto: "cibo_cane", marca: "Acana",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    valido_dal: "2026-04-01", valido_al: "2026-04-30",
  },
  // === CIBO GATTO ===
  {
    id: "off4", nome_negozio: "Arcaplanet", comune: "Bologna", provincia: "BO",
    titolo: "Schesir Natural Selection gatto — Sconto 30% su tutta la linea",
    slug: "schesir-natural-selection-gatto-arcaplanet-bologna",
    descrizione: "Tutta la linea Schesir Natural Selection per gatto in offerta: umido, secco e snack. Ingredienti naturali, senza coloranti.",
    prezzo_originale: null, prezzo_scontato: "-30% su tutta la linea", sconto_percentuale: 30,
    categoria_prodotto: "cibo_gatto", marca: "Schesir",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
    valido_dal: "2026-04-05", valido_al: "2026-04-20",
  },
  // === ACCESSORI ===
  {
    id: "off5", nome_negozio: "Pet Shop Da Mario", comune: "Torino", provincia: "TO",
    titolo: "Cucce termiche invernali — Saldi di fine stagione 50%",
    slug: "cucce-termiche-saldi-pet-shop-mario-torino",
    descrizione: "Tutte le cucce termiche e cappottini invernali al 50%. Ultime scorte, fino a esaurimento. Taglie dalla XS alla XXL.",
    prezzo_originale: "da 39.90€", prezzo_scontato: "da 19.95€", sconto_percentuale: 50,
    categoria_prodotto: "accessori", marca: null,
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    valido_dal: "2026-03-15", valido_al: "2026-04-15",
  },
  // === IGIENE ===
  {
    id: "off6", nome_negozio: "Isola dei Tesori", comune: "Napoli", provincia: "NA",
    titolo: "Frontline Combo cane — 3+1 gratis",
    slug: "frontline-combo-cane-isola-tesori-napoli",
    descrizione: "Acquista 3 pipette Frontline Combo e la quarta e in omaggio. Tutte le taglie disponibili. Antiparassitario completo.",
    prezzo_originale: null, prezzo_scontato: "3+1 gratis", sconto_percentuale: 25,
    categoria_prodotto: "salute", marca: "Frontline",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
    valido_dal: "2026-04-01", valido_al: "2026-05-31",
  },
  {
    id: "off7", nome_negozio: "Arcaplanet", comune: "Firenze", provincia: "FI",
    titolo: "Kong Classic — Sconto 20% su tutti i Kong",
    slug: "kong-classic-sconto-arcaplanet-firenze",
    descrizione: "Tutti i giochi Kong (Classic, Extreme, Puppy) scontati del 20%. Il gioco piu amato dai cani del mondo.",
    prezzo_originale: "da 9.90€", prezzo_scontato: "da 7.92€", sconto_percentuale: 20,
    categoria_prodotto: "giochi", marca: "Kong",
    img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80",
    valido_dal: "2026-04-01", valido_al: "2026-04-30",
  },
  {
    id: "off8", nome_negozio: "Zooplus", comune: "Online", provincia: "IT",
    titolo: "Lettiera Catsan Hygiene Plus 18L — Prezzo speciale",
    slug: "catsan-hygiene-plus-18l-zooplus",
    descrizione: "Lettiera Catsan Hygiene Plus formato maxi 18L. Non agglomerante, alta assorbenza, lunga durata. Spedizione gratuita.",
    prezzo_originale: "13.49€", prezzo_scontato: "9.99€", sconto_percentuale: 26,
    categoria_prodotto: "igiene", marca: "Catsan",
    img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80",
    valido_dal: "2026-04-01", valido_al: "2026-04-30",
  },
];

export const CATEGORIE_PRODOTTO: Record<string, { label: string; emoji: string }> = {
  cibo_cane: { label: "Cibo cane", emoji: "🦴" },
  cibo_gatto: { label: "Cibo gatto", emoji: "🐟" },
  accessori: { label: "Accessori", emoji: "🎾" },
  giochi: { label: "Giochi", emoji: "🧸" },
  salute: { label: "Salute e igiene", emoji: "💊" },
  igiene: { label: "Igiene e lettiere", emoji: "🧹" },
};
