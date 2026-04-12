// Geocoding one-shot per le strutture ricettive pet-friendly
// Esegui: node scripts/geocode-dormire.mjs
// Output: scripts/dormire-coords.json

const STRUTTURE = [
  // === HOTEL / RESORT LUXURY ===
  { slug: "forte-village-resort-pula", nome: "Forte Village Resort", tipo: "hotel", comune: "Santa Margherita di Pula", provincia: "CA", regione: "Sardegna" },
  { slug: "belmond-hotel-splendido-portofino", nome: "Belmond Hotel Splendido", tipo: "hotel", comune: "Portofino", provincia: "GE", regione: "Liguria" },
  { slug: "grand-hotel-tremezzo-como", nome: "Grand Hotel Tremezzo", tipo: "hotel", comune: "Tremezzina", provincia: "CO", regione: "Lombardia" },
  { slug: "splendido-bay-padenghe", nome: "Splendido Bay Luxury Spa Resort", tipo: "hotel", comune: "Padenghe sul Garda", provincia: "BS", regione: "Lombardia" },
  { slug: "hotel-cala-di-volpe-porto-cervo", nome: "Hotel Cala di Volpe", tipo: "hotel", comune: "Porto Cervo", provincia: "SS", regione: "Sardegna" },
  { slug: "capri-palace-anacapri", nome: "Capri Palace Jumeirah", tipo: "hotel", comune: "Anacapri", provincia: "NA", regione: "Campania" },
  { slug: "jw-marriott-venice", nome: "JW Marriott Venice Resort", tipo: "hotel", comune: "Venezia", provincia: "VE", regione: "Veneto" },
  { slug: "palace-hotel-merano", nome: "Palace Hotel Merano", tipo: "hotel", comune: "Merano", provincia: "BZ", regione: "Trentino-Alto Adige" },
  { slug: "villa-deste-cernobbio", nome: "Villa d'Este", tipo: "hotel", comune: "Cernobbio", provincia: "CO", regione: "Lombardia" },
  { slug: "verdura-resort-sciacca", nome: "Verdura Resort", tipo: "hotel", comune: "Sciacca", provincia: "AG", regione: "Sicilia" },
  { slug: "four-seasons-milano", nome: "Four Seasons Hotel Milano", tipo: "hotel", comune: "Milano", provincia: "MI", regione: "Lombardia" },
  { slug: "hotel-le-agavi-positano", nome: "Hotel Le Agavi", tipo: "hotel", comune: "Positano", provincia: "SA", regione: "Campania" },
  { slug: "castello-di-velona-montalcino", nome: "Castello di Velona Resort", tipo: "hotel", comune: "Montalcino", provincia: "SI", regione: "Toscana" },
  { slug: "castello-di-casole-hotel", nome: "Hotel Castello di Casole", tipo: "hotel", comune: "Casole d'Elsa", provincia: "SI", regione: "Toscana" },
  { slug: "grand-hotel-rimini", nome: "Grand Hotel Rimini", tipo: "hotel", comune: "Rimini", provincia: "RN", regione: "Emilia-Romagna" },
  { slug: "altafiumara-resort-calabria", nome: "Altafiumara Resort", tipo: "hotel", comune: "Santa Trada di Cannitello", provincia: "RC", regione: "Calabria" },
  { slug: "abano-grand-hotel", nome: "Abano Grand Hotel", tipo: "hotel", comune: "Abano Terme", provincia: "PD", regione: "Veneto" },

  // === AGRITURISMI / MASSERIE ===
  { slug: "borgo-egnazia-savelletri", nome: "Borgo Egnazia", tipo: "agriturismo", comune: "Savelletri di Fasano", provincia: "BR", regione: "Puglia" },
  { slug: "masseria-torre-coccaro", nome: "Masseria Torre Coccaro", tipo: "agriturismo", comune: "Savelletri di Fasano", provincia: "BR", regione: "Puglia" },
  { slug: "masseria-san-domenico", nome: "Masseria San Domenico", tipo: "agriturismo", comune: "Savelletri di Fasano", provincia: "BR", regione: "Puglia" },
  { slug: "masseria-il-frantoio-ostuni", nome: "Masseria Il Frantoio", tipo: "agriturismo", comune: "Ostuni", provincia: "BR", regione: "Puglia" },
  { slug: "tenuta-spannocchia", nome: "Tenuta di Spannocchia", tipo: "agriturismo", comune: "Chiusdino", provincia: "SI", regione: "Toscana" },
  { slug: "podere-dionora-montepulciano", nome: "Podere Dionora", tipo: "agriturismo", comune: "Montepulciano", provincia: "SI", regione: "Toscana" },
  { slug: "borgo-santo-pietro-palazzetto", nome: "Relais Borgo Santo Pietro", tipo: "agriturismo", comune: "Palazzetto", provincia: "SI", regione: "Toscana" },
  { slug: "tenuta-poggio-ai-santi", nome: "Tenuta Poggio ai Santi", tipo: "agriturismo", comune: "San Vincenzo", provincia: "LI", regione: "Toscana" },
  { slug: "agriturismo-il-rigo", nome: "Agriturismo Il Rigo", tipo: "agriturismo", comune: "San Quirico d'Orcia", provincia: "SI", regione: "Toscana" },
  { slug: "masseria-susafa-polizzi", nome: "Masseria Susafa", tipo: "agriturismo", comune: "Polizzi Generosa", provincia: "PA", regione: "Sicilia" },
  { slug: "il-borro-valdarno", nome: "Il Borro", tipo: "agriturismo", comune: "San Giustino Valdarno", provincia: "AR", regione: "Toscana" },
  { slug: "castello-reschio-umbria", nome: "Castello di Reschio", tipo: "agriturismo", comune: "Lisciano Niccone", provincia: "PG", regione: "Umbria" },
  { slug: "borgo-pignano-volterra", nome: "Borgo Pignano", tipo: "agriturismo", comune: "Volterra", provincia: "PI", regione: "Toscana" },
  { slug: "castelfalfi-montaione", nome: "Castelfalfi", tipo: "agriturismo", comune: "Montaione", provincia: "FI", regione: "Toscana" },
  { slug: "relais-la-sommita-ostuni", nome: "Relais La Sommita", tipo: "agriturismo", comune: "Ostuni", provincia: "BR", regione: "Puglia" },
  { slug: "masseria-li-foggi-gallipoli", nome: "Masseria Li Foggi", tipo: "agriturismo", comune: "Gallipoli", provincia: "LE", regione: "Puglia" },

  // === B&B / BOUTIQUE ===
  { slug: "la-bandita-townhouse-pienza", nome: "La Bandita Townhouse", tipo: "bnb", comune: "Pienza", provincia: "SI", regione: "Toscana" },
  { slug: "monastero-santa-rosa-conca-marini", nome: "Monastero Santa Rosa Hotel & Spa", tipo: "bnb", comune: "Conca dei Marini", provincia: "SA", regione: "Campania" },
  { slug: "palazzo-monti-brescia", nome: "Palazzo Monti", tipo: "bnb", comune: "Brescia", provincia: "BS", regione: "Lombardia" },
  { slug: "villa-cattani-stuart-pesaro", nome: "Villa Cattani Stuart", tipo: "bnb", comune: "Pesaro", provincia: "PU", regione: "Marche" },
  { slug: "relais-villa-san-martino-martina", nome: "Relais Villa San Martino", tipo: "bnb", comune: "Martina Franca", provincia: "TA", regione: "Puglia" },

  // === CAMPING / VILLAGE / GLAMPING ===
  { slug: "union-lido-cavallino", nome: "Union Lido Park & Resort", tipo: "camping", comune: "Cavallino-Treporti", provincia: "VE", regione: "Veneto" },
  { slug: "marina-di-venezia-camping", nome: "Camping Marina di Venezia", tipo: "camping", comune: "Cavallino-Treporti", provincia: "VE", regione: "Veneto" },
  { slug: "ca-pasquali-village", nome: "Ca' Pasquali Village", tipo: "camping", comune: "Cavallino-Treporti", provincia: "VE", regione: "Veneto" },
  { slug: "fabulous-village-roma", nome: "Fabulous Camping Village", tipo: "camping", comune: "Roma", provincia: "RM", regione: "Lazio" },
  { slug: "park-albatros-san-vincenzo", nome: "Park Albatros Village", tipo: "camping", comune: "San Vincenzo", provincia: "LI", regione: "Toscana" },
  { slug: "argentario-camping-village", nome: "Argentario Camping Village", tipo: "camping", comune: "Orbetello", provincia: "GR", regione: "Toscana" },
  { slug: "santapomata-camping", nome: "Camping Village Santapomata", tipo: "camping", comune: "Castiglione della Pescaia", provincia: "GR", regione: "Toscana" },
  { slug: "baia-blu-tortuga-aglientu", nome: "Baia Blu La Tortuga", tipo: "camping", comune: "Aglientu", provincia: "SS", regione: "Sardegna" },
  { slug: "tiliguerta-camping-muravera", nome: "Camping Tiliguerta", tipo: "camping", comune: "Muravera", provincia: "SU", regione: "Sardegna" },
  { slug: "europa-silvella-garda", nome: "Camping Village Europa Silvella", tipo: "camping", comune: "San Felice del Benaco", provincia: "BS", regione: "Lombardia" },
  { slug: "torre-rinalda-lecce", nome: "Camping Torre Rinalda", tipo: "camping", comune: "Lecce", provincia: "LE", regione: "Puglia" },
  { slug: "camping-la-pineta-sicilia", nome: "Camping La Pineta sul Mare", tipo: "camping", comune: "Calatabiano", provincia: "CT", regione: "Sicilia" },
  { slug: "camping-baia-azzurra-scarlino", nome: "Camping Baia Azzurra", tipo: "camping", comune: "Scarlino", provincia: "GR", regione: "Toscana" },
  { slug: "isamar-camping-veneto", nome: "Isamar Holiday Village", tipo: "camping", comune: "Isolaverde di Chioggia", provincia: "VE", regione: "Veneto" },
  { slug: "camping-spiaggia-lunga-vieste", nome: "Camping Spiaggia Lunga", tipo: "camping", comune: "Vieste", provincia: "FG", regione: "Puglia" },

  // === CASE VACANZA / DIMORE ===
  { slug: "hotel-romazzino-porto-cervo", nome: "Hotel Romazzino", tipo: "casa_vacanza", comune: "Porto Cervo", provincia: "SS", regione: "Sardegna" },
  { slug: "falconara-resort-butera", nome: "Falconara Charming House", tipo: "casa_vacanza", comune: "Butera", provincia: "CL", regione: "Sicilia" },
  { slug: "hotel-paradise-pantelleria", nome: "Hotel Paradise", tipo: "casa_vacanza", comune: "Pantelleria", provincia: "TP", regione: "Sicilia" },
  { slug: "agriturismo-fagianaia-bolgheri", nome: "Agriturismo La Fagianaia", tipo: "agriturismo", comune: "Bolgheri", provincia: "LI", regione: "Toscana" },
  { slug: "hotel-splendido-bay-garda", nome: "Splendido Mare Portofino", tipo: "hotel", comune: "Portofino", provincia: "GE", regione: "Liguria" },
  { slug: "villa-la-massa-firenze", nome: "Villa La Massa", tipo: "hotel", comune: "Candeli Bagno a Ripoli", provincia: "FI", regione: "Toscana" },
  { slug: "locanda-sant-agostino-pietrasanta", nome: "Locanda Sant'Agostino", tipo: "bnb", comune: "Pietrasanta", provincia: "LU", regione: "Toscana" },
  { slug: "palazzo-seneca-norcia", nome: "Palazzo Seneca", tipo: "hotel", comune: "Norcia", provincia: "PG", regione: "Umbria" },
];

const UA = "MifidoDiTe.eu/1.0 (contact: info@mifidodite.eu)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function nominatimQuery(q) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&countrycodes=it&format=json&limit=1&addressdetails=0`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.length === 0) return null;
  return { lat: Number(data[0].lat), lon: Number(data[0].lon), display: data[0].display_name };
}

async function geocode(s) {
  const queries = [
    `${s.nome} ${s.comune}`,
    `${s.nome}`,
    `${s.comune} ${s.regione}`,
  ];
  for (const q of queries) {
    const r = await nominatimQuery(q);
    await sleep(1100);
    if (r) return { ...s, ...r, query: q };
  }
  return { ...s, lat: null, lon: null, query: null };
}

async function main() {
  const results = [];
  for (let i = 0; i < STRUTTURE.length; i++) {
    const s = STRUTTURE[i];
    process.stdout.write(`[${i + 1}/${STRUTTURE.length}] ${s.slug}... `);
    try {
      const r = await geocode(s);
      results.push(r);
      console.log(r.lat ? `OK (${r.lat.toFixed(4)}, ${r.lon.toFixed(4)})` : "FAIL");
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      results.push({ ...s, lat: null, lon: null });
    }
  }
  const fs = await import("fs");
  const path = await import("path");
  const out = path.join(process.cwd(), "scripts", "dormire-coords.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} results to ${out}`);
  const ok = results.filter((r) => r.lat !== null).length;
  console.log(`Successes: ${ok}/${results.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
