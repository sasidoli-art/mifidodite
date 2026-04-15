// Helper per generare JSON-LD schema.org structured data
// Google usa questi markup per rich snippets, breadcrumb, FAQ, local business

const BASE_URL = "https://www.mifidodite.eu";
const ORG_NAME = "MifidoDiTe.eu";
const ORG_LOGO = `${BASE_URL}/icon`;

const COPYRIGHT_HOLDER = {
  "@type": "Organization",
  name: ORG_NAME,
  url: BASE_URL,
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export interface SpiaggiaJsonLd {
  nome: string;
  descrizione: string;
  comune: string;
  provincia: string;
  regione: string;
  lat: number;
  lng: number;
  img: string;
  url: string;
}

export function spiaggiaJsonLd(s: SpiaggiaJsonLd): object {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: s.nome,
    description: s.descrizione,
    image: s.img,
    url: s.url.startsWith("http") ? s.url : `${BASE_URL}${s.url}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: s.comune,
      addressRegion: s.regione,
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: s.lat,
      longitude: s.lng,
    },
    touristType: ["Dog owners", "Pet friendly"],
    isAccessibleForFree: true,
    copyrightHolder: COPYRIGHT_HOLDER,
    copyrightYear: new Date().getFullYear(),
    sourceOrganization: COPYRIGHT_HOLDER,
  };
}

export interface LodgingJsonLd {
  nome: string;
  descrizione: string;
  tipo: "hotel" | "agriturismo" | "bnb" | "camping" | "casa_vacanza";
  comune: string;
  provincia: string;
  regione: string;
  lat: number;
  lng: number;
  img: string;
  url: string;
  stelle?: number;
  fascia: "economico" | "medio" | "alto" | "luxury";
  amenities: string[];
}

const TIPO_TO_SCHEMA: Record<LodgingJsonLd["tipo"], string> = {
  hotel: "Hotel",
  agriturismo: "LodgingBusiness",
  bnb: "BedAndBreakfast",
  camping: "Campground",
  casa_vacanza: "LodgingBusiness",
};

const FASCIA_TO_PRICE: Record<LodgingJsonLd["fascia"], string> = {
  economico: "$",
  medio: "$$",
  alto: "$$$",
  luxury: "$$$$",
};

export function lodgingJsonLd(s: LodgingJsonLd): object {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": TIPO_TO_SCHEMA[s.tipo],
    name: s.nome,
    description: s.descrizione,
    image: s.img,
    url: s.url.startsWith("http") ? s.url : `${BASE_URL}${s.url}`,
    priceRange: FASCIA_TO_PRICE[s.fascia],
    address: {
      "@type": "PostalAddress",
      addressLocality: s.comune,
      addressRegion: s.regione,
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: s.lat,
      longitude: s.lng,
    },
    petsAllowed: true,
    amenityFeature: s.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    copyrightHolder: COPYRIGHT_HOLDER,
    copyrightYear: new Date().getFullYear(),
    sourceOrganization: COPYRIGHT_HOLDER,
  };
  if (s.stelle) {
    base.starRating = {
      "@type": "Rating",
      ratingValue: s.stelle,
      bestRating: 5,
    };
  }
  return base;
}

export interface ArticleJsonLd {
  titolo: string;
  descrizione: string;
  slug: string;
  categoria: string;
  img: string;
  datePublished: string;
  dateModified?: string;
}

export function articleJsonLd(a: ArticleJsonLd): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titolo,
    description: a.descrizione,
    image: [a.img],
    author: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO,
      },
    },
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/magazine/${a.slug}`,
    },
    articleSection: a.categoria,
    inLanguage: "it-IT",
    copyrightHolder: COPYRIGHT_HOLDER,
    copyrightYear: new Date(a.datePublished).getFullYear(),
    isAccessibleForFree: true,
    license: `${BASE_URL}/termini`,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqJsonLd(items: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function organizationJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: BASE_URL,
    logo: ORG_LOGO,
    description: "Il portale italiano per chi ama viaggiare e vivere con il proprio animale. Spiagge dog-friendly, hotel pet-friendly, professionisti e guide.",
    sameAs: [],
  };
}

export function collectionJsonLd(titolo: string, url: string, numberOfItems: number): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: titolo,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: ORG_NAME,
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems,
    },
  };
}

/**
 * Helper React per inserire JSON-LD in <script type="application/ld+json">
 * Usa dangerouslySetInnerHTML per evitare escape HTML degli operatori JSON.
 */
export function jsonLdScript(data: object | object[]): { __html: string } {
  const payload = Array.isArray(data) ? data : [data];
  return { __html: JSON.stringify(payload) };
}
