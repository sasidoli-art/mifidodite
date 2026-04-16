// Types e helper per sentieri/escursioni dog-friendly

export type SentieroTipo = "trekking" | "passeggiata" | "ciclabile" | "anello" | "lungo_percorso";
export type Difficolta = "facile" | "media" | "difficile";

export interface SentieroSeed {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  tipo: SentieroTipo;
  descrizione: string;
  difficolta: Difficolta;
  lunghezzaKm: number;
  dislivelloM: number;
  durataOre: number;
  guinzaglioObbligatorio: boolean;
  acquaDisponibile: boolean;
  ombraPresente: boolean;
  adattoACuccioli: boolean;
  img: string;
  lat: number;
  lng: number;
  puntoPartenza?: string;
}

export const SENTIERO_TIPO_LABEL: Record<SentieroTipo, string> = {
  trekking: "Trekking",
  passeggiata: "Passeggiata",
  ciclabile: "Ciclabile",
  anello: "Anello",
  lungo_percorso: "Lungo percorso",
};

export const DIFFICOLTA_LABEL: Record<Difficolta, string> = {
  facile: "Facile",
  media: "Media",
  difficile: "Difficile",
};

export const DIFFICOLTA_COLOR: Record<Difficolta, string> = {
  facile: "bg-emerald-500",
  media: "bg-amber-500",
  difficile: "bg-red-500",
};

export function slugifyRegioneS(r: string): string {
  return r.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
}
