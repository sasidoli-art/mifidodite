// ============================================
// Seed annunci adozioni — dati realistici
// ============================================

export interface AnnuncioSeed {
  id: string;
  tipo: "adotta" | "offro" | "cerco";
  titolo: string;
  slug: string;
  nome_animale: string | null;
  specie: string;
  razza: string | null;
  sesso: "maschio" | "femmina" | "non_specificato";
  eta_mesi: number | null;
  taglia: "piccola" | "media" | "grande" | "gigante" | null;
  colore: string | null;
  descrizione: string;
  carattere: string | null;
  vaccinato: boolean;
  sterilizzato: boolean;
  microchip: boolean;
  compatibile_bambini: boolean | null;
  compatibile_cani: boolean | null;
  compatibile_gatti: boolean | null;
  note_salute: string | null;
  foto_principale: string;
  galleria: string[];
  comune: string;
  provincia: string;
  regione: string;
  nome_contatto: string;
  tipo_contatto: string;
  nome_organizzazione: string | null;
  richiesta_preaffido: boolean;
  costo_adozione: string | null;
  created_at: string;
}

export const ADOZIONI_SEED: AnnuncioSeed[] = [
  // =====================
  // ADOTTA (da rifugi/associazioni)
  // =====================
  {
    id: "ad1",
    tipo: "adotta",
    titolo: "Birillo cerca una famiglia che lo ami per sempre",
    slug: "birillo-meticcio-3-anni-milano",
    nome_animale: "Birillo",
    specie: "cane",
    razza: "Meticcio",
    sesso: "maschio",
    eta_mesi: 36,
    taglia: "media",
    colore: "Marrone e bianco",
    descrizione: "Birillo e stato trovato vagante sulla tangenziale di Milano 8 mesi fa. Inizialmente spaventato, oggi e un cane completamente trasformato: socievole, affettuoso e con una voglia matta di giocare. Ama le passeggiate lunghe e si siede a comando. Ha bisogno di una famiglia paziente che gli dia la stabilita che non ha mai avuto. Va d'accordo con le femmine, meno con i maschi dominanti.",
    carattere: "Affettuoso, giocherellone, un po' timido con gli estranei ma si scalda in fretta",
    vaccinato: true, sterilizzato: true, microchip: true,
    compatibile_bambini: true, compatibile_cani: true, compatibile_gatti: null,
    note_salute: "In perfetta salute. Leggera dermatite allergica gestita con alimentazione specifica.",
    foto_principale: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    galleria: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",
    ],
    comune: "Milano", provincia: "MI", regione: "Lombardia",
    nome_contatto: "ENPA Milano", tipo_contatto: "associazione",
    nome_organizzazione: "ENPA Milano — Protezione Animali",
    richiesta_preaffido: true,
    costo_adozione: "Gratuito (rimborso spese veterinarie 80€)",
    created_at: "2026-03-28",
  },
  {
    id: "ad2",
    tipo: "adotta",
    titolo: "Luna, dolcissima Labrador cerca casa con giardino",
    slug: "luna-labrador-5-anni-roma",
    nome_animale: "Luna",
    specie: "cane",
    razza: "Labrador Retriever",
    sesso: "femmina",
    eta_mesi: 60,
    taglia: "grande",
    colore: "Miele",
    descrizione: "Luna ha vissuto i primi 5 anni in un giardino senza mai entrare in casa. Quando i proprietari si sono trasferiti, l'hanno lasciata al canile. Non meritava questo. Luna e una Labrador pura, dolcissima, che ama l'acqua e i bambini. Ha bisogno di una casa con giardino (anche piccolo) e di una famiglia che le insegni cos'e vivere dentro casa. Si emoziona ancora quando le accarezzi la pancia.",
    carattere: "Docile, affettuosa, adora l'acqua, bravissima con i bambini",
    vaccinato: true, sterilizzato: true, microchip: true,
    compatibile_bambini: true, compatibile_cani: true, compatibile_gatti: true,
    note_salute: "Leggero sovrappeso (35 kg, peso ideale 30 kg). Dieta in corso.",
    foto_principale: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
    galleria: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    ],
    comune: "Roma", provincia: "RM", regione: "Lazio",
    nome_contatto: "Canile Muratella", tipo_contatto: "canile",
    nome_organizzazione: "Canile della Muratella — Roma",
    richiesta_preaffido: true,
    costo_adozione: "Gratuito",
    created_at: "2026-03-25",
  },
  {
    id: "ad3",
    tipo: "adotta",
    titolo: "Micio e Pallina, due gattini inseparabili cercano casa insieme",
    slug: "micio-pallina-gattini-4-mesi-napoli",
    nome_animale: "Micio e Pallina",
    specie: "gatto",
    razza: "Europeo",
    sesso: "non_specificato",
    eta_mesi: 4,
    taglia: "piccola",
    colore: "Tigrato grigio (Micio), bianca e arancione (Pallina)",
    descrizione: "Micio e Pallina sono fratello e sorella, trovati a 3 settimane in una scatola vicino a un cassonetto a Napoli. Allattati con il biberon dalla nostra volontaria Maria, ora hanno 4 mesi e sono pronti per una famiglia. Sono inseparabili: dormono abbracciati, giocano insieme, mangiano dalla stessa ciotola. Li affidiamo solo in coppia. Sono svezzati, sverminati e hanno fatto la prima vaccinazione.",
    carattere: "Vivaci, curiosi, affettuosissimi. Micio e il piu coraggioso, Pallina la piu coccolona",
    vaccinato: true, sterilizzato: false, microchip: true,
    compatibile_bambini: true, compatibile_cani: null, compatibile_gatti: true,
    note_salute: "In ottima salute. Sterilizzazione prevista a 6 mesi (inclusa nel rimborso).",
    foto_principale: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    galleria: [
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80",
    ],
    comune: "Napoli", provincia: "NA", regione: "Campania",
    nome_contatto: "Ass. Mici di Strada", tipo_contatto: "associazione",
    nome_organizzazione: "Associazione Mici di Strada — Napoli",
    richiesta_preaffido: true,
    costo_adozione: "Rimborso spese veterinarie 120€ (include sterilizzazione)",
    created_at: "2026-03-30",
  },
  {
    id: "ad4",
    tipo: "adotta",
    titolo: "Rex, Pastore Tedesco anziano cerca divano per la pensione",
    slug: "rex-pastore-tedesco-10-anni-torino",
    nome_animale: "Rex",
    specie: "cane",
    razza: "Pastore Tedesco",
    sesso: "maschio",
    eta_mesi: 120,
    taglia: "grande",
    colore: "Nero focato",
    descrizione: "Rex ha 10 anni e ha perso il suo umano 3 mesi fa. Il figlio non poteva tenerlo e lo ha portato da noi. Rex e un cane nobile, educatissimo, che conosce tutti i comandi base. Non tira al guinzaglio, non abbaia, non distrugge nulla. Cerca solo un divano caldo e qualcuno che lo accarezzi la sera. I cani anziani sono i piu difficili da piazzare, ma sono anche quelli che ti danno di piu. Rex ha ancora tanto amore da dare.",
    carattere: "Calmo, dignitoso, obbediente, affettuoso in modo discreto",
    vaccinato: true, sterilizzato: true, microchip: true,
    compatibile_bambini: true, compatibile_cani: true, compatibile_gatti: false,
    note_salute: "Artrosi all'anca destra, gestita con integratori. Visita cardiologica ok.",
    foto_principale: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80",
    galleria: [],
    comune: "Torino", provincia: "TO", regione: "Piemonte",
    nome_contatto: "Rifugio Amici per Sempre", tipo_contatto: "rifugio",
    nome_organizzazione: "Rifugio Amici per Sempre — Torino",
    richiesta_preaffido: true,
    costo_adozione: "Gratuito",
    created_at: "2026-03-20",
  },
  {
    id: "ad5",
    tipo: "adotta",
    titolo: "Pallino, simpatico Beagle cerca famiglia attiva",
    slug: "pallino-beagle-2-anni-bologna",
    nome_animale: "Pallino",
    specie: "cane",
    razza: "Beagle",
    sesso: "maschio",
    eta_mesi: 24,
    taglia: "media",
    colore: "Tricolore",
    descrizione: "Pallino e un Beagle di 2 anni ceduto dalla famiglia per problemi economici. E un cane allegro, sempre in movimento, con un naso che non si ferma mai. Perfetto per chi ama camminare, fare escursioni o semplicemente avere un compagno di vita che ti riempe la giornata. Ha bisogno di attivita fisica e stimolazione olfattiva. Non adatto a chi sta fuori casa tutto il giorno.",
    carattere: "Allegro, curioso, instancabile, golosissimo",
    vaccinato: true, sterilizzato: true, microchip: true,
    compatibile_bambini: true, compatibile_cani: true, compatibile_gatti: null,
    note_salute: "In perfetta salute.",
    foto_principale: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&q=80",
    galleria: [],
    comune: "Bologna", provincia: "BO", regione: "Emilia-Romagna",
    nome_contatto: "LIDA Bologna", tipo_contatto: "associazione",
    nome_organizzazione: "LIDA — Lega Italiana Diritti Animale Bologna",
    richiesta_preaffido: true,
    costo_adozione: "Rimborso spese 50€",
    created_at: "2026-04-01",
  },

  // =====================
  // OFFRO (privati)
  // =====================
  {
    id: "of1",
    tipo: "offro",
    titolo: "Devo trasferirmi all'estero, cerco famiglia per il mio Border Collie",
    slug: "offro-border-collie-4-anni-firenze",
    nome_animale: "Flash",
    specie: "cane",
    razza: "Border Collie",
    sesso: "maschio",
    eta_mesi: 48,
    taglia: "media",
    colore: "Bianco e nero",
    descrizione: "Mi si spezza il cuore a scrivere questo annuncio. Flash e il mio cane da 4 anni, ma mi trasferisco in Giappone per lavoro e non posso portarlo. Cerco una famiglia che lo ami come lo amo io. Flash e un Border Collie purissimo, intelligentissimo, conosce 30 comandi. Ha bisogno di attivita mentale e fisica ogni giorno. Ideale per chi fa agility o sport cinofili. Non va bene per vita in appartamento senza sfogo.",
    carattere: "Iperattivo, intelligentissimo, leale, vuole sempre lavorare",
    vaccinato: true, sterilizzato: true, microchip: true,
    compatibile_bambini: true, compatibile_cani: true, compatibile_gatti: false,
    note_salute: "Perfetta salute. Esami del sangue recenti ok.",
    foto_principale: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&q=80",
    galleria: [],
    comune: "Firenze", provincia: "FI", regione: "Toscana",
    nome_contatto: "Andrea", tipo_contatto: "privato",
    nome_organizzazione: null,
    richiesta_preaffido: true,
    costo_adozione: "Gratuito (regalo tutto: cuccia, ciotole, giochi, cibo per 3 mesi)",
    created_at: "2026-04-02",
  },
  {
    id: "of2",
    tipo: "offro",
    titolo: "Gatta persiana 6 anni, famiglia anziana non riesce piu a gestirla",
    slug: "offro-gatta-persiana-6-anni-padova",
    nome_animale: "Duchessa",
    specie: "gatto",
    razza: "Persiano",
    sesso: "femmina",
    eta_mesi: 72,
    taglia: "media",
    colore: "Bianca",
    descrizione: "I miei genitori (entrambi over 80) non riescono piu a gestire la toelettatura quotidiana di Duchessa. E una gatta Persiana bellissima, tranquilla, abituata a vivere in appartamento. Ha bisogno di spazzolatura giornaliera e controlli oculari regolari (tipici della razza). E stata sempre viziata e trattata come una regina — cerca qualcuno che continui a farlo.",
    carattere: "Regale, tranquilla, ama dormire al sole, fa le fusa fortissimo",
    vaccinato: true, sterilizzato: true, microchip: true,
    compatibile_bambini: false, compatibile_cani: false, compatibile_gatti: null,
    note_salute: "Lacrimazione oculare cronica (tipica della razza), gestita con pulizia quotidiana.",
    foto_principale: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&q=80",
    galleria: [],
    comune: "Padova", provincia: "PD", regione: "Veneto",
    nome_contatto: "Francesca", tipo_contatto: "privato",
    nome_organizzazione: null,
    richiesta_preaffido: true,
    costo_adozione: "Gratuito",
    created_at: "2026-03-27",
  },

  // =====================
  // CERCO (chi vuole adottare)
  // =====================
  {
    id: "ce1",
    tipo: "cerco",
    titolo: "Famiglia con bambini cerca cucciolo di taglia media",
    slug: "cerco-cucciolo-taglia-media-bergamo",
    nome_animale: null,
    specie: "cane",
    razza: null,
    sesso: "non_specificato",
    eta_mesi: null,
    taglia: "media",
    colore: null,
    descrizione: "Siamo una famiglia con 2 bambini (8 e 11 anni) e una casa con giardino a Bergamo. Cerchiamo un cucciolo o cane giovane di taglia media, possibilmente gia vaccinato. Siamo disposti a fare il percorso di pre-affido. Abbiamo esperienza: il nostro precedente cane (un meticcio) e mancato a 15 anni lo scorso anno. Preferiamo adottare da un rifugio piuttosto che comprare.",
    carattere: "Cerchiamo un cane socievole, buono con i bambini, che ami stare all'aperto",
    vaccinato: false, sterilizzato: false, microchip: false,
    compatibile_bambini: null, compatibile_cani: null, compatibile_gatti: null,
    note_salute: null,
    foto_principale: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
    galleria: [],
    comune: "Bergamo", provincia: "BG", regione: "Lombardia",
    nome_contatto: "Famiglia Moretti", tipo_contatto: "privato",
    nome_organizzazione: null,
    richiesta_preaffido: false,
    costo_adozione: null,
    created_at: "2026-04-03",
  },
  {
    id: "ce2",
    tipo: "cerco",
    titolo: "Cerco gatto adulto tranquillo per compagnia anziana",
    slug: "cerco-gatto-adulto-compagnia-genova",
    nome_animale: null,
    specie: "gatto",
    razza: null,
    sesso: "non_specificato",
    eta_mesi: null,
    taglia: null,
    colore: null,
    descrizione: "Sono una signora di 68 anni, vivo sola in un appartamento a Genova. Cerco un gatto adulto (3+ anni), tranquillo, che ami le coccole e la vita in appartamento. Non cerco un gattino vivace, ma un compagno calmo per le mie serate. Posso garantire cure veterinarie, alimentazione di qualita e tanto amore. Ho avuto gatti per 40 anni.",
    carattere: "Cerco un gatto calmo, coccolone, adatto alla vita in appartamento",
    vaccinato: false, sterilizzato: false, microchip: false,
    compatibile_bambini: null, compatibile_cani: null, compatibile_gatti: null,
    note_salute: null,
    foto_principale: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
    galleria: [],
    comune: "Genova", provincia: "GE", regione: "Liguria",
    nome_contatto: "Maria Teresa", tipo_contatto: "privato",
    nome_organizzazione: null,
    richiesta_preaffido: false,
    costo_adozione: null,
    created_at: "2026-04-01",
  },
];

// Helper per filtrare
export function getAnnunciPerTipo(tipo: "adotta" | "offro" | "cerco") {
  return ADOZIONI_SEED.filter((a) => a.tipo === tipo);
}

export function formatEta(mesi: number | null): string {
  if (!mesi) return "Non specificata";
  if (mesi < 12) return `${mesi} mesi`;
  const anni = Math.floor(mesi / 12);
  const resto = mesi % 12;
  if (resto === 0) return `${anni} ${anni === 1 ? "anno" : "anni"}`;
  return `${anni} ${anni === 1 ? "anno" : "anni"} e ${resto} mesi`;
}
