// Geocoding round 2 — nuove spiagge curate da ENPA + hdsalento
// Output: scripts/spiagge-coords-v2.json
// Esegui: node scripts/geocode-spiagge-v2.mjs

const SPIAGGE = [
  // === ABRUZZO ===
  { slug: "lido-riccio-ortona", nome: "Lido Riccio", comune: "Ortona", provincia: "CH", regione: "Abruzzo", tipo: "Stabilimento" },
  { slug: "la-prora-bau-village-pescara", nome: "La Prora Estatinfinite Bau Village", comune: "Pescara", provincia: "PE", regione: "Abruzzo", tipo: "Stabilimento" },
  { slug: "bau-beach-martinsicuro", nome: "Bau Beach", comune: "Martinsicuro", provincia: "TE", regione: "Abruzzo", tipo: "Stabilimento" },
  { slug: "yochi-beach-fossacesia", nome: "Yochi Beach Dog & Family", comune: "Fossacesia", provincia: "CH", regione: "Abruzzo", tipo: "Stabilimento" },
  { slug: "eucaliptus-spiaggia-alba-adriatica", nome: "Eucaliptus Spiaggia", comune: "Alba Adriatica", provincia: "TE", regione: "Abruzzo", tipo: "Stabilimento" },

  // === BASILICATA ===
  { slug: "lido-san-basilio-pisticci", nome: "Lido San Basilio", comune: "Marina di Pisticci", provincia: "MT", regione: "Basilicata", tipo: "Stabilimento" },
  { slug: "lido-spiaggia-nera-maratea", nome: "Lido Spiaggia Nera", comune: "Maratea", provincia: "PZ", regione: "Basilicata", tipo: "Stabilimento" },
  { slug: "lido-cala-jannita-maratea", nome: "Lido Cala Jannita", comune: "Maratea", provincia: "PZ", regione: "Basilicata", tipo: "Stabilimento" },
  { slug: "lido-acquamarina-maratea", nome: "Lido Acquamarina", comune: "Maratea", provincia: "PZ", regione: "Basilicata", tipo: "Stabilimento" },
  { slug: "lido-afrodite-metaponto", nome: "Lido Afrodite", comune: "Metaponto", provincia: "MT", regione: "Basilicata", tipo: "Stabilimento" },

  // === CALABRIA ===
  { slug: "lido-isola-bella-tropea", nome: "Lido Isola Bella", comune: "Tropea", provincia: "VV", regione: "Calabria", tipo: "Stabilimento" },
  { slug: "pirate-dog-beach-amantea", nome: "Pirate Dog Beach", comune: "Amantea", provincia: "CS", regione: "Calabria", tipo: "Stabilimento" },
  { slug: "hang-loose-beach-gizzeria", nome: "Hang Loose Beach", comune: "Gizzeria Lido", provincia: "CZ", regione: "Calabria", tipo: "Stabilimento" },
  { slug: "valentino-beach-club-catanzaro", nome: "Valentino Beach Club", comune: "Catanzaro", provincia: "CZ", regione: "Calabria", tipo: "Stabilimento" },
  { slug: "thomas-glauco-beach-soverato", nome: "Thomas Glauco Beach Club", comune: "Soverato", provincia: "CZ", regione: "Calabria", tipo: "Stabilimento" },

  // === CAMPANIA (oltre Palinuro) ===
  { slug: "baia-rocce-verdi-napoli", nome: "Baia delle Rocce Verdi", comune: "Napoli", provincia: "NA", regione: "Campania", tipo: "Stabilimento" },
  { slug: "bau-beach-village-eboli", nome: "Bau Beach Village", comune: "Eboli", provincia: "SA", regione: "Campania", tipo: "Stabilimento" },
  { slug: "il-timoniere-ascea", nome: "Il Timoniere", comune: "Marina di Ascea", provincia: "SA", regione: "Campania", tipo: "Stabilimento" },
  { slug: "lido-laura-paestum", nome: "Lido Laura", comune: "Capaccio Paestum", provincia: "SA", regione: "Campania", tipo: "Stabilimento" },

  // === FRIULI-VENEZIA GIULIA ===
  { slug: "lido-di-fido-grado", nome: "Spiaggia Lido di Fido", comune: "Grado", provincia: "GO", regione: "Friuli-Venezia Giulia", tipo: "Stabilimento" },
  { slug: "doggy-beach-lignano", nome: "Doggy Beach", comune: "Lignano Sabbiadoro", provincia: "UD", regione: "Friuli-Venezia Giulia", tipo: "Stabilimento" },
  { slug: "dog-beach-muggia", nome: "Dog Beach Muggia", comune: "Muggia", provincia: "TS", regione: "Friuli-Venezia Giulia", tipo: "Stabilimento" },
  { slug: "costa-dei-barbari-sistiana", nome: "Spiaggia Costa dei Barbari", comune: "Sistiana", provincia: "TS", regione: "Friuli-Venezia Giulia", tipo: "Spiaggia libera" },

  // === LAZIO (oltre Maccarese + Tequila) ===
  { slug: "torre-flavia-dog-beach-ladispoli", nome: "Torre Flavia Dog Beach", comune: "Ladispoli", provincia: "RM", regione: "Lazio", tipo: "Stabilimento" },
  { slug: "sabau-beach-sabaudia", nome: "Sabau Beach", comune: "Sabaudia", provincia: "LT", regione: "Lazio", tipo: "Stabilimento" },
  { slug: "spiaggia-bufalara-sabaudia", nome: "Spiaggia della Bufalara", comune: "Sabaudia", provincia: "LT", regione: "Lazio", tipo: "Spiaggia libera" },
  { slug: "gabbiani-dog-beach-bracciano", nome: "Spiaggia dei Gabbiani Dog Beach", comune: "Bracciano", provincia: "RM", regione: "Lazio", tipo: "Stabilimento" },

  // === LIGURIA (oltre Albenga) ===
  { slug: "baubau-village-sole-luna-albissola", nome: "Bau Bau Village Sole e Luna", comune: "Albissola Marina", provincia: "SV", regione: "Liguria", tipo: "Stabilimento" },
  { slug: "pluto-beach-spotorno", nome: "Pluto Beach", comune: "Spotorno", provincia: "SV", regione: "Liguria", tipo: "Stabilimento" },
  { slug: "lido-di-fido-chiavari", nome: "Lido di Fido", comune: "Chiavari", provincia: "GE", regione: "Liguria", tipo: "Stabilimento" },
  { slug: "bagni-capo-marina-genova", nome: "Bagni Capo Marina", comune: "Genova", provincia: "GE", regione: "Liguria", tipo: "Stabilimento" },
  { slug: "rin-tin-beach-pietra-ligure", nome: "Rin Tin Beach", comune: "Pietra Ligure", provincia: "SV", regione: "Liguria", tipo: "Stabilimento" },

  // === MARCHE ===
  { slug: "islamorada-dog-beach-fano", nome: "Islamorada Dog Beach", comune: "Fano", provincia: "PU", regione: "Marche", tipo: "Stabilimento" },
  { slug: "baia-canaria-senigallia", nome: "Baia Canaria", comune: "Senigallia", provincia: "AN", regione: "Marche", tipo: "Stabilimento" },
  { slug: "animalido-dog-beach-fano", nome: "Animalido Dog Beach", comune: "Fano", provincia: "PU", regione: "Marche", tipo: "Stabilimento" },
  { slug: "numana-blu", nome: "Numana Blu", comune: "Numana", provincia: "AN", regione: "Marche", tipo: "Stabilimento" },
  { slug: "scooby-doo-beach-senigallia", nome: "Scooby Doo Beach", comune: "Senigallia", provincia: "AN", regione: "Marche", tipo: "Stabilimento" },

  // === MOLISE ===
  { slug: "scooby-doo-beach-campomarino", nome: "Scooby Doo Beach", comune: "Campomarino Lido", provincia: "CB", regione: "Molise", tipo: "Stabilimento" },
  { slug: "bau-beach-termoli", nome: "Bau Beach Termoli", comune: "Termoli", provincia: "CB", regione: "Molise", tipo: "Stabilimento" },

  // === PUGLIA (oltre Bari + Torre Canne) ===
  { slug: "eden-salento-agri-beach-pescoluse", nome: "Eden Salento Agri Beach", comune: "Marina di Pescoluse", provincia: "LE", regione: "Puglia", tipo: "Stabilimento" },
  { slug: "soleluna-bau-beach-san-cataldo", nome: "Soleluna Lido Bau Beach", comune: "San Cataldo di Lecce", provincia: "LE", regione: "Puglia", tipo: "Stabilimento" },
  { slug: "lido-coiba-san-foca", nome: "Lido Coiba", comune: "San Foca", provincia: "LE", regione: "Puglia", tipo: "Stabilimento" },
  { slug: "dog-beach-costa-merlata-ostuni", nome: "Dog Beach Costa Merlata", comune: "Ostuni", provincia: "BR", regione: "Puglia", tipo: "Stabilimento" },
  { slug: "porto-selvaggio-nardo", nome: "Porto Selvaggio", comune: "Nardo", provincia: "LE", regione: "Puglia", tipo: "Spiaggia libera" },
  { slug: "torre-san-giovanni-ugento", nome: "Torre San Giovanni", comune: "Ugento", provincia: "LE", regione: "Puglia", tipo: "Spiaggia libera" },
  { slug: "lido-fantasy-beach-vieste", nome: "Lido Fantasy Beach", comune: "Vieste", provincia: "FG", regione: "Puglia", tipo: "Stabilimento" },
  { slug: "spiaggia-verde-barletta", nome: "Spiaggia Verde", comune: "Barletta", provincia: "BT", regione: "Puglia", tipo: "Spiaggia libera" },

  // === SARDEGNA (oltre Costa Rei) ===
  { slug: "ira-dog-beach-olbia", nome: "Ira Dog Beach", comune: "Olbia", provincia: "SS", regione: "Sardegna", tipo: "Stabilimento" },
  { slug: "dog-beach-calasetta", nome: "Dog Beach Calasetta", comune: "Calasetta", provincia: "SU", regione: "Sardegna", tipo: "Stabilimento" },
  { slug: "porto-pino-sant-anna-arresi", nome: "Spiaggia di Porto Pino", comune: "Sant'Anna Arresi", provincia: "SU", regione: "Sardegna", tipo: "Spiaggia libera" },
  { slug: "bau-beach-bari-sardo", nome: "Bau Beach La Planargia", comune: "Bari Sardo", provincia: "NU", regione: "Sardegna", tipo: "Stabilimento" },
  { slug: "dog-beach-costa-caddu-san-teodoro", nome: "Dog Beach Costa Caddu", comune: "San Teodoro", provincia: "SS", regione: "Sardegna", tipo: "Stabilimento" },
  { slug: "dog-beach-punta-nera-palau", nome: "Dog Beach Punta Nera", comune: "Palau", provincia: "SS", regione: "Sardegna", tipo: "Stabilimento" },
  { slug: "oasi-biderosa-orosei", nome: "Oasi di Biderosa", comune: "Orosei", provincia: "NU", regione: "Sardegna", tipo: "Spiaggia libera" },
  { slug: "dog-beach-orvile-posada", nome: "Dog Beach Orvile", comune: "Posada", provincia: "NU", regione: "Sardegna", tipo: "Stabilimento" },

  // === SICILIA (oltre Mondello) ===
  { slug: "lido-le-palme-catania", nome: "Lido Le Palme", comune: "Catania", provincia: "CT", regione: "Sicilia", tipo: "Stabilimento" },
  { slug: "dog-paradise-palermo", nome: "Dog Paradise", comune: "Palermo", provincia: "PA", regione: "Sicilia", tipo: "Stabilimento" },
  { slug: "bau-beach-messina", nome: "Bau Beach Messina", comune: "Messina", provincia: "ME", regione: "Sicilia", tipo: "Stabilimento" },
  { slug: "isola-blu-marzamemi", nome: "Isola Blu", comune: "Marzamemi", provincia: "SR", regione: "Sicilia", tipo: "Stabilimento" },
  { slug: "lido-punta-burrone-favignana", nome: "Lido Punta Burrone", comune: "Favignana", provincia: "TP", regione: "Sicilia", tipo: "Stabilimento" },
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
    `${s.comune} spiaggia`,
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
  for (let i = 0; i < SPIAGGE.length; i++) {
    const s = SPIAGGE[i];
    process.stdout.write(`[${i + 1}/${SPIAGGE.length}] ${s.slug}... `);
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
  const out = path.join(process.cwd(), "scripts", "spiagge-coords-v2.json");
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log(`\nSaved ${results.length} results to ${out}`);
  const ok = results.filter((r) => r.lat !== null).length;
  console.log(`Successes: ${ok}/${results.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
