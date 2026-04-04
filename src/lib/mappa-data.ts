// Coordinate dei professionisti e strutture per la mappa
// In produzione verranno da Supabase con PostGIS

export interface MapPin {
  id: string;
  nome: string;
  slug: string;
  categoria: string;
  comune: string;
  provincia: string;
  lat: number;
  lng: number;
  rating: number;
  recensioni: number;
  descrizione: string;
  tipo: "professionista" | "spiaggia" | "clinica" | "evento";
}

export const MAP_PINS: MapPin[] = [
  // Pensioni
  { id: "p1", nome: "Pensione La Casa di Fido", slug: "pensione-la-casa-di-fido-bergamo", categoria: "pensione", comune: "Bergamo", provincia: "BG", lat: 45.694, lng: 9.670, rating: 4.8, recensioni: 127, descrizione: "Giardino recintato 3000mq, webcam 24h", tipo: "professionista" },
  { id: "p2", nome: "Dog Hotel Villa Margherita", slug: "dog-hotel-villa-margherita-roma", categoria: "pensione", comune: "Roma", provincia: "RM", lat: 41.902, lng: 12.496, rating: 4.9, recensioni: 203, descrizione: "Suite climatizzate, piscina, agility", tipo: "professionista" },
  { id: "p3", nome: "Pensione Il Giardino dei Cani", slug: "pensione-giardino-dei-cani-torino", categoria: "pensione", comune: "Moncalieri", provincia: "TO", lat: 44.999, lng: 7.682, rating: 4.6, recensioni: 89, descrizione: "Ambiente familiare, cani anziani e cuccioli", tipo: "professionista" },
  { id: "p4", nome: "Happy Tails Pet Hotel", slug: "happy-tails-pet-hotel-milano", categoria: "pensione", comune: "Segrate", provincia: "MI", lat: 45.489, lng: 9.294, rating: 4.7, recensioni: 156, descrizione: "Navetta, toelettatura, area indoor/outdoor", tipo: "professionista" },
  { id: "p5", nome: "Agriturismo Quattro Zampe", slug: "agriturismo-quattro-zampe-firenze", categoria: "pensione", comune: "Fiesole", provincia: "FI", lat: 43.806, lng: 11.294, rating: 4.9, recensioni: 74, descrizione: "Colline fiorentine, cani liberi tra gli ulivi", tipo: "professionista" },

  // Dog sitter
  { id: "ds1", nome: "Sara Colombo — Dog Sitter", slug: "sara-colombo-dog-sitter-milano", categoria: "dog_sitter", comune: "Milano", provincia: "MI", lat: 45.464, lng: 9.190, rating: 4.9, recensioni: 92, descrizione: "Certificata FICSS, cuccioli e cani reattivi", tipo: "professionista" },
  { id: "ds2", nome: "Marco Ferri — Pet Sitter", slug: "marco-ferri-pet-sitter-roma", categoria: "dog_sitter", comune: "Roma", provincia: "RM", lat: 41.914, lng: 12.466, rating: 4.7, recensioni: 64, descrizione: "Zona Prati/Flaminio, anche cat sitting", tipo: "professionista" },

  // Toelettatura
  { id: "t1", nome: "Toelettatura Zampe d'Oro", slug: "toelettatura-zampe-doro-bologna", categoria: "toelettatura", comune: "Bologna", provincia: "BO", lat: 44.494, lng: 11.347, rating: 4.7, recensioni: 112, descrizione: "Stripping, taglio razza, bagno ozono", tipo: "professionista" },
  { id: "t2", nome: "Dog Style Grooming", slug: "dog-style-grooming-napoli", categoria: "toelettatura", comune: "Napoli", provincia: "NA", lat: 40.836, lng: 14.249, rating: 4.6, recensioni: 78, descrizione: "Barboncini, shih-tzu, taglio creativo", tipo: "professionista" },

  // Educatori
  { id: "e1", nome: "Dott. Andrea Rossi — Educatore", slug: "andrea-rossi-educatore-cinofilo-padova", categoria: "educatore_cinofilo", comune: "Padova", provincia: "PD", lat: 45.407, lng: 11.876, rating: 4.9, recensioni: 67, descrizione: "Metodo gentile, puppy class, riabilitazione", tipo: "professionista" },

  // Veterinari
  { id: "v2", nome: "Clinica Veterinaria del Parco", slug: "clinica-veterinaria-del-parco-modena", categoria: "veterinario", comune: "Modena", provincia: "MO", lat: 44.647, lng: 10.925, rating: 4.8, recensioni: 187, descrizione: "Medicina preventiva, chirurgia, ortopedia", tipo: "professionista" },

  // Spiagge
  { id: "sp1", nome: "Rimini Dog No Problem", slug: "rimini-dog-no-problem-bagno-81", categoria: "spiaggia_dog_friendly", comune: "Rimini", provincia: "RN", lat: 44.059, lng: 12.563, rating: 4.6, recensioni: 203, descrizione: "2 aree gioco, educatori cinofili", tipo: "spiaggia" },
  { id: "sp2", nome: "BauBeach Maccarese", slug: "baubeach-maccarese", categoria: "spiaggia_dog_friendly", comune: "Fiumicino", provincia: "RM", lat: 41.876, lng: 12.207, rating: 4.8, recensioni: 312, descrizione: "La prima bau beach d'Italia, dal 1997", tipo: "spiaggia" },
  { id: "sp3", nome: "Dog Beach San Vincenzo", slug: "dog-beach-san-vincenzo", categoria: "spiaggia_dog_friendly", comune: "San Vincenzo", provincia: "LI", lat: 43.094, lng: 10.535, rating: 4.7, recensioni: 156, descrizione: "200m battigia, cani senza guinzaglio", tipo: "spiaggia" },
  { id: "sp4", nome: "La Spiaggia di Pluto", slug: "spiaggia-di-pluto-bibione", categoria: "spiaggia_dog_friendly", comune: "Bibione", provincia: "VE", lat: 45.638, lng: 13.044, rating: 4.9, recensioni: 278, descrizione: "La piu grande dog beach d'Italia", tipo: "spiaggia" },

  // Cliniche H24
  { id: "cl1", nome: "Clinica Vet. Gran Sasso H24", slug: "clinica-veterinaria-gran-sasso-milano", categoria: "clinica_h24", comune: "Milano", provincia: "MI", lat: 45.478, lng: 9.215, rating: 4.7, recensioni: 345, descrizione: "Pronto soccorso H24, chirurgia, terapia intensiva", tipo: "clinica" },
  { id: "cl2", nome: "Centro Vet. Specialistico H24", slug: "centro-veterinario-specialistico-roma", categoria: "clinica_h24", comune: "Roma", provincia: "RM", lat: 41.879, lng: 12.514, rating: 4.8, recensioni: 267, descrizione: "H24, neurochirurgia, oncologia", tipo: "clinica" },
  { id: "cl3", nome: "Clinica Vet. San Marco H24", slug: "clinica-veterinaria-san-marco-padova", categoria: "clinica_h24", comune: "Padova", provincia: "PD", lat: 45.398, lng: 11.892, rating: 4.9, recensioni: 198, descrizione: "H24, terapia intensiva, neurologia", tipo: "clinica" },
];

// Colori per tipo di pin
export const PIN_COLORS: Record<string, string> = {
  professionista: "#e67e22",
  spiaggia: "#3498db",
  clinica: "#e74c3c",
  evento: "#9b59b6",
};

export const CATEGORIE_MAPPA: Record<string, { label: string; emoji: string }> = {
  pensione: { label: "Pensioni", emoji: "🏠" },
  dog_sitter: { label: "Dog Sitter", emoji: "🐕" },
  toelettatura: { label: "Toelettatura", emoji: "✂️" },
  educatore_cinofilo: { label: "Educatori", emoji: "🎓" },
  veterinario: { label: "Veterinari", emoji: "🏥" },
  spiaggia_dog_friendly: { label: "Spiagge", emoji: "🏖️" },
  clinica_h24: { label: "Cliniche H24", emoji: "🚑" },
};
