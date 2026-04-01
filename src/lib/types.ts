// ============================================
// MifidoDiTe.it - Type Definitions
// ============================================

export type CategoriaTipo =
  | "pensione"
  | "hotel_pet_friendly"
  | "spiaggia_dog_friendly"
  | "toelettatura"
  | "dog_sitter"
  | "cat_sitter"
  | "educatore_cinofilo"
  | "veterinario"
  | "fotografo_pet"
  | "groomer"
  | "dog_walking"
  | "pet_taxi"
  | "altro";

export type TipoAnimale = "cane" | "gatto" | "entrambi";

export type PianoTipo = "free" | "premium" | "premium_plus";

export type LeadStato =
  | "nuovo"
  | "inviato"
  | "visualizzato"
  | "risposto"
  | "convertito"
  | "scaduto";

export type AffiliazioneStato =
  | "non_invitato"
  | "invitato"
  | "registrato"
  | "attivo"
  | "sospeso";

export type FonteDati =
  | "scraping_facebook"
  | "scraping_google"
  | "scraping_sito"
  | "inserimento_manuale"
  | "registrazione_diretta";

export interface Struttura {
  id: string;
  nome: string;
  slug: string;
  descrizione: string | null;
  descrizione_storytelling: string | null;
  categoria: CategoriaTipo;
  sotto_categorie: string[];
  tipo_animale: TipoAnimale;
  indirizzo: string | null;
  cap: string | null;
  comune: string;
  provincia: string | null;
  regione: string | null;
  latitudine: number | null;
  longitudine: number | null;
  telefono: string | null;
  email: string | null;
  sito_web: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  google_maps_url: string | null;
  foto_copertina: string | null;
  galleria: string[];
  servizi: string[];
  prezzi_indicativi: Record<string, string>;
  orari_apertura: Record<string, string>;
  taglie_accettate: string[];
  affiliazione: AffiliazioneStato;
  piano: PianoTipo;
  rating_medio: number;
  numero_recensioni: number;
  numero_lead_ricevuti: number;
  fonte: FonteDati;
  verificato: boolean;
  attivo: boolean;
  in_evidenza: boolean;
  created_at: string;
  updated_at: string;
}

export interface StrutturaCard {
  id: string;
  nome: string;
  slug: string;
  descrizione: string | null;
  descrizione_storytelling: string | null;
  categoria: CategoriaTipo;
  comune: string;
  provincia: string | null;
  foto_copertina: string | null;
  rating_medio: number;
  numero_recensioni: number;
  piano: PianoTipo;
  in_evidenza: boolean;
  distanza_km?: number;
}

export interface Recensione {
  id: string;
  struttura_id: string;
  autore_nome: string;
  rating: number;
  titolo: string | null;
  testo: string | null;
  tipo_animale: TipoAnimale | null;
  nome_animale: string | null;
  created_at: string;
}

export interface LeadRequest {
  struttura_id: string;
  nome: string;
  email: string;
  telefono?: string;
  data_inizio?: string;
  data_fine?: string;
  numero_animali: number;
  tipo_animale: TipoAnimale;
  taglia?: string;
  note?: string;
}

export interface NewsletterIscrizione {
  email: string;
  nome?: string;
  cap?: string;
  comune?: string;
  tipo_animale: TipoAnimale;
  categorie_interesse: CategoriaTipo[];
}

// Mappa categorie per UI
export const CATEGORIE_LABELS: Record<CategoriaTipo, string> = {
  pensione: "Pensioni per animali",
  hotel_pet_friendly: "Hotel pet-friendly",
  spiaggia_dog_friendly: "Spiagge dog-friendly",
  toelettatura: "Toelettatura",
  dog_sitter: "Dog sitter",
  cat_sitter: "Cat sitter",
  educatore_cinofilo: "Educatori cinofili",
  veterinario: "Veterinari",
  fotografo_pet: "Fotografi pet",
  groomer: "Groomer",
  dog_walking: "Dog walking",
  pet_taxi: "Pet taxi",
  altro: "Altro",
};

export const CATEGORIE_ICONS: Record<CategoriaTipo, string> = {
  pensione: "🏠",
  hotel_pet_friendly: "🏨",
  spiaggia_dog_friendly: "🏖️",
  toelettatura: "✂️",
  dog_sitter: "🐕",
  cat_sitter: "🐈",
  educatore_cinofilo: "🎓",
  veterinario: "🏥",
  fotografo_pet: "📸",
  groomer: "🧴",
  dog_walking: "🦮",
  pet_taxi: "🚗",
  altro: "📋",
};
