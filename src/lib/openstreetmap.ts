// ============================================
// OpenStreetMap — Overpass API integration
// Recupera attivita pet da OSM (legale, gratis, ODbL)
// ============================================

// Mirror Overpass — proviamo in cascata in caso uno sia lento
const OVERPASS_MIRRORS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.openstreetmap.fr/api/interpreter",
];

// Mapping categorie MifidoDiTe → tag OSM
const OSM_TAGS: Record<string, { key: string; value: string }> = {
  veterinario: { key: "amenity", value: "veterinary" },
  pet_shop: { key: "shop", value: "pet" },
  pet_grooming: { key: "shop", value: "pet_grooming" },
  toelettatura: { key: "shop", value: "pet_grooming" },
  parco_cani: { key: "leisure", value: "dog_park" },
  spiaggia_dog_friendly: { key: "natural", value: "beach" }, // poi filtrare per dog=yes
  pensione: { key: "amenity", value: "animal_boarding" },
};

export interface OSMPlace {
  id: string;
  source: "openstreetmap";
  osm_type: "node" | "way";
  osm_id: number;
  nome: string;
  categoria: string;
  lat: number;
  lon: number;
  indirizzo: string | null;
  cap: string | null;
  comune: string | null;
  telefono: string | null;
  email: string | null;
  website: string | null;
  orari: string | null;
  osm_url: string;
}

interface OSMNode {
  type: "node" | "way";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

/**
 * Cerca attivita pet OSM in una bounding box.
 * @param categoria categoria MifidoDiTe (es. "veterinario")
 * @param bbox [south, west, north, east]
 * @param limit max risultati (default 50)
 */
export async function searchOSM(
  categoria: string,
  bbox: [number, number, number, number],
  limit: number = 50,
): Promise<OSMPlace[]> {
  const tag = OSM_TAGS[categoria];
  if (!tag) return [];

  const [south, west, north, east] = bbox;
  const query = `[out:json][timeout:30];
(
  node["${tag.key}"="${tag.value}"](${south},${west},${north},${east});
  way["${tag.key}"="${tag.value}"](${south},${west},${north},${east});
);
out center ${limit};`;

  // Prova ogni mirror in cascata
  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const url = `${mirror}?data=${encodeURIComponent(query)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "MifidoDiTe.eu/1.0 (info@mifidodite.eu)",
          "Accept": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        console.error(`[OSM] ${mirror} HTTP error:`, res.status);
        continue;
      }

      const data = await res.json() as { elements: OSMNode[] };
      const elements = data.elements || [];
      console.log(`[OSM] ${mirror} returned ${elements.length} elements`);

      return elements
        .filter((e) => e.tags)
        .map((e) => mapOSMtoPlace(e, categoria))
        .filter((p): p is OSMPlace => p !== null);
    } catch (err) {
      console.error(`[OSM] ${mirror} fallito:`, (err as Error).message);
      continue;
    }
  }

  console.error("[OSM] Tutti i mirror falliti");
  return [];
}

function mapOSMtoPlace(node: OSMNode, categoria: string): OSMPlace | null {
  const tags = node.tags || {};
  const lat = node.lat ?? node.center?.lat;
  const lon = node.lon ?? node.center?.lon;

  if (!lat || !lon) return null;

  // Costruisci indirizzo
  const street = tags["addr:street"];
  const housenumber = tags["addr:housenumber"];
  const indirizzo = street ? `${street}${housenumber ? ` ${housenumber}` : ""}` : null;

  return {
    id: `osm-${node.type}-${node.id}`,
    source: "openstreetmap",
    osm_type: node.type,
    osm_id: node.id,
    nome: tags.name || tags["brand"] || "Senza nome",
    categoria,
    lat,
    lon,
    indirizzo,
    cap: tags["addr:postcode"] || null,
    comune: tags["addr:city"] || null,
    telefono: tags.phone || tags["contact:phone"] || null,
    email: tags.email || tags["contact:email"] || null,
    website: tags.website || tags["contact:website"] || null,
    orari: tags.opening_hours || null,
    osm_url: `https://www.openstreetmap.org/${node.type}/${node.id}`,
  };
}

/**
 * Bounding box di una citta italiana (~10km raggio dal centro).
 * Usa Nominatim per geocoding del nome/CAP.
 */
export async function geocodeItaly(query: string): Promise<{ lat: number; lon: number; bbox: [number, number, number, number]; nome: string } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=it&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "MifidoDiTe.eu/1.0 (info@mifidodite.eu)" },
    });
    if (!res.ok) return null;

    const data = await res.json() as Array<{ lat: string; lon: string; boundingbox: string[]; display_name: string }>;
    if (data.length === 0) return null;

    const r = data[0];
    const lat = Number(r.lat);
    const lon = Number(r.lon);
    // Bbox ~25km (0.25 deg lat ~ 28km, 0.3 deg lon a Milano ~ 23km)
    const radiusLat = 0.25;
    const radiusLon = 0.3;
    return {
      lat,
      lon,
      bbox: [lat - radiusLat, lon - radiusLon, lat + radiusLat, lon + radiusLon],
      nome: r.display_name,
    };
  } catch (err) {
    console.error("[Nominatim] Errore:", (err as Error).message);
    return null;
  }
}

/**
 * Cerca attivita pet in una citta italiana per nome/CAP.
 */
export async function searchOSMByCity(
  categoria: string,
  citta: string,
  limit: number = 30,
): Promise<{ places: OSMPlace[]; cityInfo: { lat: number; lon: number; nome: string } | null }> {
  const geo = await geocodeItaly(citta);
  if (!geo) return { places: [], cityInfo: null };

  const places = await searchOSM(categoria, geo.bbox, limit);
  return { places, cityInfo: { lat: geo.lat, lon: geo.lon, nome: geo.nome } };
}
