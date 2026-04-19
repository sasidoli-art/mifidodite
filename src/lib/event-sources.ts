// Lista fonti RSS/HTML da cui il cron scan-eventi-pet attinge settimanalmente.
// RSS "Today network" (Citynews): tutti hanno feed /rss/eventi
// Federazioni pet: ANFI, FIAF pubblicano calendario in pagine statiche

export interface EventSource {
  nome: string;
  tipo: "rss" | "html";
  url: string;
  citta: string;
  regione: string;
  // Parser hint per HTML (selector) — non usato per RSS
  htmlSelector?: string;
}

export const EVENT_SOURCES: EventSource[] = [
  // ========== RSS Today network (Citynews) ==========
  { nome: "MonzaToday", tipo: "rss", url: "https://www.monzatoday.it/rss/eventi/", citta: "Monza", regione: "Lombardia" },
  { nome: "MilanoToday", tipo: "rss", url: "https://www.milanotoday.it/rss/eventi/", citta: "Milano", regione: "Lombardia" },
  { nome: "BergamoToday", tipo: "rss", url: "https://www.bergamonews.it/feed/", citta: "Bergamo", regione: "Lombardia" },
  { nome: "BresciaToday", tipo: "rss", url: "https://www.bresciatoday.it/rss/eventi/", citta: "Brescia", regione: "Lombardia" },
  { nome: "VeronaSera", tipo: "rss", url: "https://www.veronasera.it/rss/eventi/", citta: "Verona", regione: "Veneto" },
  { nome: "PadovaOggi", tipo: "rss", url: "https://www.padovaoggi.it/rss/eventi/", citta: "Padova", regione: "Veneto" },
  { nome: "VeneziaToday", tipo: "rss", url: "https://www.veneziatoday.it/rss/eventi/", citta: "Venezia", regione: "Veneto" },
  { nome: "TorinoToday", tipo: "rss", url: "https://www.torinotoday.it/rss/eventi/", citta: "Torino", regione: "Piemonte" },
  { nome: "GenovaToday", tipo: "rss", url: "https://www.genovatoday.it/rss/eventi/", citta: "Genova", regione: "Liguria" },
  { nome: "BolognaToday", tipo: "rss", url: "https://www.bolognatoday.it/rss/eventi/", citta: "Bologna", regione: "Emilia-Romagna" },
  { nome: "ModenaToday", tipo: "rss", url: "https://www.modenatoday.it/rss/eventi/", citta: "Modena", regione: "Emilia-Romagna" },
  { nome: "ParmaToday", tipo: "rss", url: "https://www.parmatoday.it/rss/eventi/", citta: "Parma", regione: "Emilia-Romagna" },
  { nome: "FirenzeToday", tipo: "rss", url: "https://www.firenzetoday.it/rss/eventi/", citta: "Firenze", regione: "Toscana" },
  { nome: "PisaToday", tipo: "rss", url: "https://www.pisatoday.it/rss/eventi/", citta: "Pisa", regione: "Toscana" },
  { nome: "RomaToday", tipo: "rss", url: "https://www.romatoday.it/rss/eventi/", citta: "Roma", regione: "Lazio" },
  { nome: "NapoliToday", tipo: "rss", url: "https://www.napolitoday.it/rss/eventi/", citta: "Napoli", regione: "Campania" },
  { nome: "BariToday", tipo: "rss", url: "https://www.baritoday.it/rss/eventi/", citta: "Bari", regione: "Puglia" },
  { nome: "PalermoToday", tipo: "rss", url: "https://www.palermotoday.it/rss/eventi/", citta: "Palermo", regione: "Sicilia" },
  { nome: "CataniaToday", tipo: "rss", url: "https://www.cataniatoday.it/rss/eventi/", citta: "Catania", regione: "Sicilia" },
  { nome: "CagliariNews", tipo: "rss", url: "https://www.cagliaritoday.it/rss/eventi/", citta: "Cagliari", regione: "Sardegna" },
];
