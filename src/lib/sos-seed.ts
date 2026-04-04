export interface SOSSeed {
  id: string;
  tipo: "perso" | "trovato";
  nome_animale: string | null;
  specie: string;
  razza: string | null;
  colore: string;
  taglia: string;
  descrizione: string;
  data_evento: string;
  ora_evento: string | null;
  indirizzo_evento: string;
  comune: string;
  provincia: string;
  lat: number;
  lng: number;
  foto: string;
  nome_contatto: string;
  telefono_contatto: string;
  ricompensa: string | null;
  created_at: string;
}

export const SOS_SEED: SOSSeed[] = [
  {
    id: "sos1", tipo: "perso",
    nome_animale: "Rocky", specie: "cane", razza: "Jack Russell", colore: "Bianco e marrone", taglia: "piccola",
    descrizione: "Rocky e scappato dal giardino durante un temporale. Ha il collare blu con medaglietta ma senza numero. E molto spaventato dai tuoni. Se lo vedete NON rincorretelo, si spaventa. Provate ad attirarlo con del cibo e chiamatemi subito.",
    data_evento: "2026-04-03", ora_evento: "18:30",
    indirizzo_evento: "Via Roma 45, zona centro",
    comune: "Bergamo", provincia: "BG", lat: 45.694, lng: 9.670,
    foto: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    nome_contatto: "Luca M.", telefono_contatto: "+39 333 1234567",
    ricompensa: "Offro ricompensa",
    created_at: "2026-04-03",
  },
  {
    id: "sos2", tipo: "perso",
    nome_animale: "Mina", specie: "gatto", razza: "Europeo", colore: "Tigrata grigia", taglia: "media",
    descrizione: "Mina non e tornata a casa da 3 giorni. E una gatta tigrata grigia sterilizzata con un piccolo taglio sull'orecchio sinistro (segno del programma TNR). E molto timida con gli estranei. Vive tra via Garibaldi e piazza Duomo.",
    data_evento: "2026-04-01", ora_evento: null,
    indirizzo_evento: "Zona via Garibaldi / piazza Duomo",
    comune: "Milano", provincia: "MI", lat: 45.464, lng: 9.188,
    foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",
    nome_contatto: "Anna R.", telefono_contatto: "+39 340 9876543",
    ricompensa: null,
    created_at: "2026-04-01",
  },
  {
    id: "sos3", tipo: "trovato",
    nome_animale: null, specie: "cane", razza: "Meticcio", colore: "Nero con petto bianco", taglia: "media",
    descrizione: "Trovato cane meticcio nero con macchia bianca sul petto, senza collare, vagante in zona stazione. Sembra spaventato ma non aggressivo. Lo abbiamo portato a casa nostra temporaneamente. Ha fame e sete, sembra in buone condizioni. Se e il vostro cane chiamateci.",
    data_evento: "2026-04-04", ora_evento: "09:00",
    indirizzo_evento: "Zona Stazione Centrale",
    comune: "Bologna", provincia: "BO", lat: 44.506, lng: 11.343,
    foto: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
    nome_contatto: "Marco e Giulia", telefono_contatto: "+39 328 5551234",
    ricompensa: null,
    created_at: "2026-04-04",
  },
  {
    id: "sos4", tipo: "perso",
    nome_animale: "Leo", specie: "cane", razza: "Golden Retriever", colore: "Dorato", taglia: "grande",
    descrizione: "Leo e scappato durante una passeggiata al parco, inseguendo un gatto. Ha il microchip (numero: 380260000123456). Porta un collare rosso. E molto socievole con tutti. Se lo vedete potete avvicinarvi tranquillamente, adora le persone.",
    data_evento: "2026-04-04", ora_evento: "11:00",
    indirizzo_evento: "Parco della Favorita",
    comune: "Palermo", provincia: "PA", lat: 38.153, lng: 13.349,
    foto: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
    nome_contatto: "Giuseppe T.", telefono_contatto: "+39 347 1112233",
    ricompensa: "Ricompensa 200€",
    created_at: "2026-04-04",
  },
];
