// Types e helper per vacanze pet-friendly (strutture ricettive)

export type VacanzeTipo = "hotel" | "agriturismo" | "bnb" | "camping" | "casa_vacanza";

export type PrezzoFascia = "economico" | "medio" | "alto" | "luxury";

export type TagliaMax = "piccola" | "media" | "grande" | "tutte";

export interface VacanzeSeed {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  tipo: VacanzeTipo;
  descrizione: string;
  fascia: PrezzoFascia;
  stelle?: 1 | 2 | 3 | 4 | 5;
  animaliAmmessi: "cane" | "gatto" | "entrambi";
  tagliaMax: TagliaMax;
  supplementoCane?: number | "variabile"; // €/notte o "variabile"
  amenities: string[];
  img: string;
  lat: number;
  lng: number;
  // Affiliate link: la query che passeremo a Booking per la ricerca
  bookingQuery: string;
}

export const VACANZE_TIPO_LABEL: Record<VacanzeTipo, string> = {
  hotel: "Hotel & Resort",
  agriturismo: "Agriturismo & Masserie",
  bnb: "B&B & Boutique",
  camping: "Camping & Glamping",
  casa_vacanza: "Case vacanza & Dimore",
};

export const VACANZE_TIPO_LABEL_SINGULAR: Record<VacanzeTipo, string> = {
  hotel: "Hotel",
  agriturismo: "Agriturismo",
  bnb: "B&B",
  camping: "Camping",
  casa_vacanza: "Casa vacanza",
};

export const PREZZO_LABEL: Record<PrezzoFascia, string> = {
  economico: "€",
  medio: "€€",
  alto: "€€€",
  luxury: "€€€€",
};

export const PREZZO_DESCRIZIONE: Record<PrezzoFascia, string> = {
  economico: "Budget (< 80€/notte)",
  medio: "Medio (80-180€/notte)",
  alto: "Alto (180-400€/notte)",
  luxury: "Luxury (400€+/notte)",
};

// Booking affiliate ID — ATTENZIONE: placeholder. Sostituire con vero AID quando registrati.
// Istruzioni setup: https://www.booking.com/affiliate-program/v2/index.html
export const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "";

export function buildBookingUrl(query: string): string {
  const params = new URLSearchParams({
    ss: query,
    sb_travel_purpose: "leisure",
  });
  if (BOOKING_AID) params.set("aid", BOOKING_AID);
  return `https://www.booking.com/searchresults.it.html?${params.toString()}`;
}

export function slugifyRegioneV(r: string): string {
  return r
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/\s+/g, "-");
}
