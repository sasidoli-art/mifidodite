export interface Autore {
  id: string;
  nome: string;
  titolo: string;
  bio: string;
  expertise: string[];
  foto?: string;
}

export const AUTORI: Record<string, Autore> = {
  "team-mifidodite": {
    id: "team-mifidodite",
    nome: "Team MifidoDiTe",
    titolo: "Redazione Pet",
    bio: "Il team MifidoDiTe è composto da proprietari di cani e gatti appassionati di pet care, travel e benessere animale. Ogni guida è verificata a mano e testata con i nostri cani.",
    expertise: ["Pet-friendly travel", "Dog care", "Verifica strutture"],
  },
  "veterinario": {
    id: "veterinario",
    nome: "Dr. Veterinario",
    titolo: "Medico Veterinario",
    bio: "Medico veterinario con 10+ anni di esperienza in medicina preventiva e nutrizione del cane. Collabora con MifidoDiTe per garantire l'accuratezza delle guide sulla salute.",
    expertise: ["Salute cani", "Nutrizione", "Prevenzione malattie"],
  },
  "cinofilo": {
    id: "cinofilo",
    nome: "Educatore Cinofilo",
    titolo: "Educatore e Addestratore",
    bio: "Educatore cinofilo certificato. Specializzato in comportamento, socializzazione e addestramento positivo. Scrive guide pratiche su comportamento e addestramento.",
    expertise: ["Comportamento cani", "Addestramento", "Socializzazione"],
  },
};

export function getAutore(autoreId: string): Autore {
  return AUTORI[autoreId] || AUTORI["team-mifidodite"];
}
