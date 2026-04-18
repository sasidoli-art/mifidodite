// Professionisti seed — dati realistici basati su attivita italiane reali
// Quando il DB Supabase sara attivo, verranno migrati e arricchiti dallo scraping

import type { StrutturaCard } from "@/lib/types";

export const PROFESSIONISTI_SEED: StrutturaCard[] = [
  // === PENSIONI ===
  {
    id: "p1", nome: "Pensione La Casa di Fido", slug: "pensione-la-casa-di-fido-bergamo",
    descrizione: "Pensione familiare per cani a Bergamo. Giardino recintato 3000mq, box riscaldati, webcam 24h. Max 15 ospiti per garantire attenzione individuale.",
    descrizione_storytelling: "Immagina un posto dove il tuo cane corre libero in un giardino enorme, circondato dal verde delle colline bergamasche. Ogni ospite ha il suo spazio, le sue coccole, la sua routine.",
    categoria: "pensione", comune: "Bergamo", provincia: "BG",
    foto_copertina: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: true, distanza_km: 2.3,
  },
  {
    id: "p2", nome: "Dog Hotel Villa Margherita", slug: "dog-hotel-villa-margherita-roma",
    descrizione: "Hotel per cani e gatti nel cuore del Lazio. Suite individuali climatizzate, piscina estiva, area agility, servizio veterinario interno.",
    descrizione_storytelling: "Non e una pensione, e un hotel a 5 stelle per il tuo amico. Suite con cuccia ortopedica, piscina per i bagni estivi, e un team che lo tratta come il VIP che e.",
    categoria: "pensione", comune: "Roma", provincia: "RM",
    foto_copertina: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium_plus", in_evidenza: true, distanza_km: 5.1,
  },
  {
    id: "p3", nome: "Pensione Il Giardino dei Cani", slug: "pensione-giardino-dei-cani-torino",
    descrizione: "Pensione per cani a Moncalieri (TO). Ambiente familiare, passeggiate quotidiane, socializzazione controllata. Specializzati in cani anziani e cuccioli.",
    descrizione_storytelling: null,
    categoria: "pensione", comune: "Moncalieri", provincia: "TO",
    foto_copertina: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: false, distanza_km: 8.0,
  },
  {
    id: "p4", nome: "Happy Tails Pet Hotel", slug: "happy-tails-pet-hotel-milano",
    descrizione: "Pet hotel a Segrate (MI) con servizio navetta, toelettatura interna, area gioco indoor e outdoor. Accettiamo cani, gatti e piccoli animali.",
    descrizione_storytelling: null,
    categoria: "pensione", comune: "Segrate", provincia: "MI",
    foto_copertina: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: true, distanza_km: 3.5,
  },
  {
    id: "p5", nome: "Agriturismo Pensione Quattro Zampe", slug: "agriturismo-quattro-zampe-firenze",
    descrizione: "Pensione in agriturismo sulle colline fiorentine. I cani vivono liberi tra gli ulivi. Pasti casalinghi, passeggiate nei boschi.",
    descrizione_storytelling: null,
    categoria: "pensione", comune: "Fiesole", provincia: "FI",
    foto_copertina: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "free", in_evidenza: false, distanza_km: 12.0,
  },

  // === DOG SITTER ===
  {
    id: "ds1", nome: "Sara Colombo — Dog Sitter Certificata", slug: "sara-colombo-dog-sitter-milano",
    descrizione: "Dog sitter a domicilio su Milano e hinterland. Certificata FICSS. Esperienza con cuccioli, cani anziani e cani reattivi. Disponibile weekend e festivi.",
    descrizione_storytelling: null,
    categoria: "dog_sitter", comune: "Milano", provincia: "MI",
    foto_copertina: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: true, distanza_km: 1.2,
  },
  {
    id: "ds2", nome: "Marco Ferri — Pet Sitter Professionale", slug: "marco-ferri-pet-sitter-roma",
    descrizione: "Pet sitter a Roma (zona Prati/Flaminio). Passeggiate, pasti, compagnia. Anche cat sitting. Referenze verificabili. Assicurato.",
    descrizione_storytelling: null,
    categoria: "dog_sitter", comune: "Roma", provincia: "RM",
    foto_copertina: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "free", in_evidenza: false, distanza_km: 4.5,
  },
  {
    id: "ds3", nome: "Giulia Bianchi — Dog Walking Torino", slug: "giulia-bianchi-dog-walking-torino",
    descrizione: "Servizio di dog walking e pet sitting a Torino centro. Passeggiate individuali o in piccoli gruppi (max 3 cani compatibili). Reportage fotografico incluso.",
    descrizione_storytelling: null,
    categoria: "dog_walking", comune: "Torino", provincia: "TO",
    foto_copertina: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: false, distanza_km: 2.0,
  },

  // === TOELETTATURA ===
  {
    id: "t1", nome: "Toelettatura Zampe d'Oro", slug: "toelettatura-zampe-doro-bologna",
    descrizione: "Toelettatura professionale a Bologna. Stripping, taglio di razza, bagno ozono, trattamenti antipulci. Prodotti naturali e biologici.",
    descrizione_storytelling: null,
    categoria: "toelettatura", comune: "Bologna", provincia: "BO",
    foto_copertina: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: true, distanza_km: 3.2,
  },
  {
    id: "t2", nome: "Dog Style Grooming", slug: "dog-style-grooming-napoli",
    descrizione: "Centro di toelettatura a Napoli Vomero. Specializzati in barboncini, shih-tzu e razze a pelo lungo. Bagno con idromassaggio, taglio creativo.",
    descrizione_storytelling: null,
    categoria: "toelettatura", comune: "Napoli", provincia: "NA",
    foto_copertina: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "free", in_evidenza: false, distanza_km: 6.0,
  },
  {
    id: "t3", nome: "Pelo & Contropelo", slug: "pelo-contropelo-verona",
    descrizione: "Toelettatura a Verona. Bagno, asciugatura, taglio, stripping e defueling. Trattamento delicato per cani paurosi. Su appuntamento.",
    descrizione_storytelling: null,
    categoria: "toelettatura", comune: "Verona", provincia: "VR",
    foto_copertina: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "free", in_evidenza: false, distanza_km: 9.5,
  },

  // === EDUCATORI CINOFILI ===
  {
    id: "e1", nome: "Dott. Andrea Rossi — Educatore Cinofilo", slug: "andrea-rossi-educatore-cinofilo-padova",
    descrizione: "Educatore cinofilo CSEN a Padova. Metodo gentile, approccio cognitivo-relazionale. Corsi individuali, puppy class, riabilitazione comportamentale.",
    descrizione_storytelling: null,
    categoria: "educatore_cinofilo", comune: "Padova", provincia: "PD",
    foto_copertina: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: true, distanza_km: 5.0,
  },
  {
    id: "e2", nome: "Scuola Cinofila Il Branco Felice", slug: "scuola-cinofila-branco-felice-brescia",
    descrizione: "Scuola cinofila a Brescia. Corsi di educazione base e avanzata, agility, obedience, ricerca olfattiva. Campo di addestramento 5000mq.",
    descrizione_storytelling: null,
    categoria: "educatore_cinofilo", comune: "Brescia", provincia: "BS",
    foto_copertina: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: false, distanza_km: 7.0,
  },

  // === VETERINARI ===
  {
    id: "v1", nome: "Ambulatorio Veterinario San Francesco", slug: "ambulatorio-veterinario-san-francesco-genova",
    descrizione: "Ambulatorio veterinario a Genova Nervi. Medicina interna, chirurgia, ecografia, laboratorio analisi. Dott.ssa Maria Grazia Parodi.",
    descrizione_storytelling: null,
    categoria: "veterinario", comune: "Genova", provincia: "GE",
    foto_copertina: null,
    rating_medio: 0, numero_recensioni: 0, piano: "free", in_evidenza: false, distanza_km: 4.0,
  },
  {
    id: "v2", nome: "Clinica Veterinaria del Parco", slug: "clinica-veterinaria-del-parco-modena",
    descrizione: "Clinica veterinaria a Modena. Medicina preventiva, chirurgia, ortopedia, cardiologia, dermatologia. Servizio di reperibilita serale.",
    descrizione_storytelling: null,
    categoria: "veterinario", comune: "Modena", provincia: "MO",
    foto_copertina: null,
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: true, distanza_km: 2.5,
  },

  // === FOTOGRAFI PET ===
  {
    id: "f1", nome: "PawShot — Fotografia Pet Professionale", slug: "pawshot-fotografia-pet-firenze",
    descrizione: "Servizi fotografici professionali per cani e gatti a Firenze. In studio, all'aperto o a domicilio. Book, ritratti, foto famiglia con pet.",
    descrizione_storytelling: null,
    categoria: "fotografo_pet", comune: "Firenze", provincia: "FI",
    foto_copertina: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "premium_plus", in_evidenza: true, distanza_km: 3.2,
  },

  // === CAT SITTER ===
  {
    id: "cs1", nome: "Valentina Gatti — Cat Sitter a Domicilio", slug: "valentina-gatti-cat-sitter-roma",
    descrizione: "Cat sitter professionale a Roma. Visite a domicilio 1-2 volte al giorno, somministrazione farmaci, gioco e coccole. Il tuo gatto resta nel suo ambiente.",
    descrizione_storytelling: null,
    categoria: "cat_sitter", comune: "Roma", provincia: "RM",
    foto_copertina: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
    rating_medio: 0, numero_recensioni: 0, piano: "free", in_evidenza: false, distanza_km: 6.0,
  },

  // === PET TAXI ===
  {
    id: "pt1", nome: "PetBus — Trasporto Animali Milano", slug: "petbus-trasporto-animali-milano",
    descrizione: "Servizio di trasporto animali a Milano e Lombardia. Trasferimenti aeroporto, viaggi dal veterinario, trasporti a lunga distanza. Veicoli climatizzati.",
    descrizione_storytelling: null,
    categoria: "pet_taxi", comune: "Milano", provincia: "MI",
    foto_copertina: null,
    rating_medio: 0, numero_recensioni: 0, piano: "premium", in_evidenza: false, distanza_km: 0.0,
  },
];
