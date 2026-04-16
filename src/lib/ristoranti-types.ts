// Types e helper per ristoranti pet-friendly

export type RistoranteTipo =
  | "ristorante"      // classico con dehors pet-friendly
  | "agriturismo"     // ristoro agriturismo (che non da pernotto)
  | "dog_cafe"        // caffe/bar tematico cani
  | "cat_cafe"        // caffe tematico gatti
  | "pizzeria"        // pizzeria con dehors
  | "osteria"         // osteria tradizionale con cortile
  | "brewery"         // birrificio/pub
  | "bistrot";        // bistrot/brasserie

export type FasciaPrezzo = "economico" | "medio" | "alto" | "luxury";

export interface RistoranteSeed {
  slug: string;
  nome: string;
  comune: string;
  provincia: string;
  regione: string;
  tipo: RistoranteTipo;
  descrizione: string;
  fascia: FasciaPrezzo;
  cucina: string; // "italiana tradizionale", "pizza napoletana", "specialita", ecc.
  conDehors: boolean;
  conGiardino: boolean;
  menuCane: boolean; // ha un menu dedicato ai cani
  ciotoleAcqua: boolean;
  areaRecintata: boolean;
  img: string;
  lat: number;
  lng: number;
  sito?: string;
  telefono?: string;
}

export const RISTORANTE_TIPO_LABEL: Record<RistoranteTipo, string> = {
  ristorante: "Ristoranti",
  agriturismo: "Agriturismi",
  dog_cafe: "Dog cafe",
  cat_cafe: "Cat cafe",
  pizzeria: "Pizzerie",
  osteria: "Osterie",
  brewery: "Brewery/Pub",
  bistrot: "Bistrot",
};

export const RISTORANTE_TIPO_LABEL_SINGULAR: Record<RistoranteTipo, string> = {
  ristorante: "Ristorante",
  agriturismo: "Agriturismo",
  dog_cafe: "Dog cafe",
  cat_cafe: "Cat cafe",
  pizzeria: "Pizzeria",
  osteria: "Osteria",
  brewery: "Brewery",
  bistrot: "Bistrot",
};

export const PREZZO_LABEL_RIST: Record<FasciaPrezzo, string> = {
  economico: "€",
  medio: "€€",
  alto: "€€€",
  luxury: "€€€€",
};

export function slugifyRegioneR(r: string): string {
  return r.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
}
