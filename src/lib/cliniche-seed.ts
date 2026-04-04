// Cliniche seed — dati reali verificabili
// Queste sono cliniche REALI. Fonte: siti ufficiali e Google Maps.
// Verranno migrate su Supabase e arricchite dallo scraping automatico.

export interface ClinicaSeed {
  nome: string;
  slug: string;
  tipo: string;
  indirizzo: string;
  comune: string;
  provincia: string;
  regione: string;
  telefono: string | null;
  sito_web: string | null;
  orari: string;
  h24: boolean;
  emergenza: boolean;
  servizi: string[];
  // Rifugi — donazioni e volontariato
  accetta_donazioni?: boolean;
  link_donazioni?: string;
  cerca_volontari?: boolean;
  link_volontari?: string;
  descrizione?: string;
}

export const CLINICHE_SEED: ClinicaSeed[] = [
  // === LOMBARDIA ===
  {
    nome: "Clinica Veterinaria Gran Sasso",
    slug: "clinica-veterinaria-gran-sasso-milano",
    tipo: "clinica",
    indirizzo: "Viale Gran Sasso 35, 20131 Milano",
    comune: "Milano", provincia: "MI", regione: "Lombardia",
    telefono: "02 2940 5482",
    sito_web: "https://www.clinicaveterinariagransasso.it",
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Chirurgia", "Diagnostica per immagini", "Terapia intensiva"],
  },
  {
    nome: "Clinica Veterinaria Città di Monza",
    slug: "clinica-veterinaria-citta-di-monza",
    tipo: "clinica",
    indirizzo: "Via Lecco 1, 20900 Monza",
    comune: "Monza", provincia: "MB", regione: "Lombardia",
    telefono: "039 230 0603",
    sito_web: null,
    orari: "Lun-Sab 9:00-19:30, Reperibilità notturna", h24: false, emergenza: true,
    servizi: ["Medicina interna", "Chirurgia", "Ecografia", "Dermatologia"],
  },
  {
    nome: "Clinica Veterinaria Malpensa",
    slug: "clinica-veterinaria-malpensa-samarate",
    tipo: "clinica",
    indirizzo: "Via Alcide De Gasperi 2, 21017 Samarate (VA)",
    comune: "Samarate", provincia: "VA", regione: "Lombardia",
    telefono: "0331 721233",
    sito_web: "https://www.clinicaveterinariamalpensa.it",
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Ortopedia", "Neurologia", "Oncologia", "Cardiologia"],
  },
  // === LAZIO ===
  {
    nome: "Clinica Veterinaria Roma Sud",
    slug: "clinica-veterinaria-roma-sud",
    tipo: "clinica",
    indirizzo: "Via Silicella 79, 00169 Roma",
    comune: "Roma", provincia: "RM", regione: "Lazio",
    telefono: "06 2593 3585",
    sito_web: null,
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Chirurgia d'urgenza", "Radiologia"],
  },
  {
    nome: "Centro Veterinario Specialistico",
    slug: "centro-veterinario-specialistico-roma",
    tipo: "clinica",
    indirizzo: "Via Foligno 6, 00181 Roma",
    comune: "Roma", provincia: "RM", regione: "Lazio",
    telefono: "06 7880 0444",
    sito_web: "https://www.centroveterinariospecialistico.it",
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Terapia intensiva", "Neurochirurgia", "Oncologia"],
  },
  // === CAMPANIA ===
  {
    nome: "Clinica Veterinaria Frullone",
    slug: "clinica-veterinaria-frullone-napoli",
    tipo: "clinica",
    indirizzo: "Via Dietro la Vigna 16, 80131 Napoli",
    comune: "Napoli", provincia: "NA", regione: "Campania",
    telefono: "081 741 4763",
    sito_web: null,
    orari: "Lun-Sab 9:00-20:00, Reperibilità serale", h24: false, emergenza: true,
    servizi: ["Chirurgia", "Ecografia", "Laboratorio analisi"],
  },
  // === PIEMONTE ===
  {
    nome: "Clinica Veterinaria Torino Sud",
    slug: "clinica-veterinaria-torino-sud",
    tipo: "clinica",
    indirizzo: "Strada Genova 174, 10024 Moncalieri (TO)",
    comune: "Moncalieri", provincia: "TO", regione: "Piemonte",
    telefono: "011 647 2432",
    sito_web: null,
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Chirurgia", "Diagnostica avanzata"],
  },
  // === TOSCANA ===
  {
    nome: "Clinica Veterinaria Valdinievole",
    slug: "clinica-veterinaria-valdinievole-monsummano",
    tipo: "clinica",
    indirizzo: "Via Francesca Nord 44, 51015 Monsummano Terme (PT)",
    comune: "Monsummano Terme", provincia: "PT", regione: "Toscana",
    telefono: "0572 952 698",
    sito_web: null,
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Medicina interna", "Chirurgia ortopedica"],
  },
  // === EMILIA-ROMAGNA ===
  {
    nome: "Clinica Veterinaria dell'Orologio",
    slug: "clinica-veterinaria-orologio-bologna",
    tipo: "clinica",
    indirizzo: "Via Gramsci 11, 40013 Castel Maggiore (BO)",
    comune: "Castel Maggiore", provincia: "BO", regione: "Emilia-Romagna",
    telefono: "051 632 8555",
    sito_web: null,
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Cardiologia", "Chirurgia"],
  },
  // === VENETO ===
  {
    nome: "Clinica Veterinaria San Marco",
    slug: "clinica-veterinaria-san-marco-padova",
    tipo: "clinica",
    indirizzo: "Via Sorio 114/C, 35141 Padova",
    comune: "Padova", provincia: "PD", regione: "Veneto",
    telefono: "049 856 1098",
    sito_web: "https://www.clinicaveterinariasanmarco.it",
    orari: "H24", h24: true, emergenza: true,
    servizi: ["Pronto soccorso H24", "Terapia intensiva", "Neurologia", "Oncologia", "Dermatologia"],
  },
  // === RIFUGI E CANILI ===
  {
    nome: "ENPA Milano — Rifugio",
    slug: "enpa-milano-rifugio",
    tipo: "rifugio",
    indirizzo: "Via Gassendi 2, 20151 Milano",
    comune: "Milano", provincia: "MI", regione: "Lombardia",
    telefono: "02 3081 4291",
    sito_web: "https://www.enpa.it",
    orari: "Mar-Dom 10:00-17:00", h24: false, emergenza: false,
    servizi: ["Adozioni cani", "Adozioni gatti", "Microchippatura"],
    accetta_donazioni: true,
    link_donazioni: "https://www.enpa.it/donazioni",
    cerca_volontari: true,
    link_volontari: "https://www.enpa.it/volontariato",
    descrizione: "Ente Nazionale Protezione Animali. Dal 1871 al servizio degli animali. Centinaia di cani e gatti aspettano una famiglia.",
  },
  {
    nome: "Canile Muratella — Roma",
    slug: "canile-muratella-roma",
    tipo: "canile",
    indirizzo: "Via della Muratella 249, 00148 Roma",
    comune: "Roma", provincia: "RM", regione: "Lazio",
    telefono: "06 6593 5007",
    sito_web: null,
    orari: "Mar-Dom 10:00-16:00", h24: false, emergenza: false,
    servizi: ["Adozioni cani", "Visite guidate"],
    accetta_donazioni: true,
    link_donazioni: undefined,
    cerca_volontari: true,
    link_volontari: undefined,
    descrizione: "Il piu grande canile di Roma. Oltre 600 cani in cerca di famiglia. Accetta volontari per passeggiate e socializzazione.",
  },
  {
    nome: "LIDA Bologna",
    slug: "lida-bologna-rifugio",
    tipo: "rifugio",
    indirizzo: "Via della Salute 2, 40132 Bologna",
    comune: "Bologna", provincia: "BO", regione: "Emilia-Romagna",
    telefono: "051 401 892",
    sito_web: "https://www.lidabologna.it",
    orari: "Mar-Dom 10:00-16:30", h24: false, emergenza: false,
    servizi: ["Adozioni cani", "Adozioni gatti", "Colonie feline"],
    accetta_donazioni: true,
    link_donazioni: "https://www.lidabologna.it/donazioni",
    cerca_volontari: true,
    link_volontari: "https://www.lidabologna.it/volontariato",
    descrizione: "Lega Italiana Diritti Animale. Rifugio storico bolognese con programma di adozioni e gestione colonie feline.",
  },
  {
    nome: "Rifugio del Cane — Napoli",
    slug: "rifugio-del-cane-napoli",
    tipo: "rifugio",
    indirizzo: "Via Vecchia Napoli 65, 80040 Volla (NA)",
    comune: "Volla", provincia: "NA", regione: "Campania",
    telefono: "081 774 1910",
    sito_web: null,
    orari: "Lun-Sab 9:00-13:00, 15:00-17:00", h24: false, emergenza: false,
    servizi: ["Adozioni cani", "Pronto soccorso animali abbandonati"],
    accetta_donazioni: true,
    link_donazioni: undefined,
    cerca_volontari: true,
    link_volontari: undefined,
    descrizione: "Rifugio per cani abbandonati della zona vesuviana. Sempre in emergenza, sempre in cerca di volontari e famiglie adottive.",
  },
  {
    nome: "Canile di Torino",
    slug: "canile-torino",
    tipo: "canile",
    indirizzo: "Strada Cuorgnè 139, 10156 Torino",
    comune: "Torino", provincia: "TO", regione: "Piemonte",
    telefono: "011 264 0981",
    sito_web: null,
    orari: "Mar-Dom 10:00-16:00", h24: false, emergenza: false,
    servizi: ["Adozioni cani", "Microchippatura", "Sterilizzazioni"],
    accetta_donazioni: true,
    link_donazioni: undefined,
    cerca_volontari: true,
    link_volontari: undefined,
    descrizione: "Canile municipale di Torino. Programma adozioni attivo, giornate aperte per le famiglie.",
  },
  {
    nome: "OIPA Firenze — Rifugio",
    slug: "oipa-firenze-rifugio",
    tipo: "rifugio",
    indirizzo: "Via di Soffiano 2, 50143 Firenze",
    comune: "Firenze", provincia: "FI", regione: "Toscana",
    telefono: "055 700 190",
    sito_web: "https://www.oipa.org",
    orari: "Lun-Sab 9:30-12:30, 14:30-17:00", h24: false, emergenza: false,
    servizi: ["Adozioni cani", "Adozioni gatti", "Guardie zoofile"],
    accetta_donazioni: true,
    link_donazioni: "https://www.oipa.org/italia/donazioni",
    cerca_volontari: true,
    link_volontari: "https://www.oipa.org/italia/volontariato",
    descrizione: "Organizzazione Internazionale Protezione Animali. Sezione di Firenze con rifugio e servizio guardie zoofile.",
  },
];

// Raggruppa per regione
export function getClinichePerRegione() {
  const map: Record<string, ClinicaSeed[]> = {};
  for (const c of CLINICHE_SEED) {
    if (!map[c.regione]) map[c.regione] = [];
    map[c.regione].push(c);
  }
  return map;
}
