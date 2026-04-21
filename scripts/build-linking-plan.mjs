#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inv = JSON.parse(await fs.readFile(path.join(__dirname, "internal-linking-inventory.json"), "utf8"));
const masterBySlug = new Map(inv.master.map(m => [m.slug, m]));
const candBySlug = new Map(inv.candidati.map(c => [c.slug, c]));
const toolByUrl = new Map(inv.pagine_strumento.map(t => [t.url, t]));

// Fetch contenuto dei 3 singleton bridge dal DB (non sono in inventory)
if (!process.env.DATABASE_URL) { console.error("DATABASE_URL mancante"); process.exit(1); }
const sql = neon(process.env.DATABASE_URL);
const BRIDGE_SLUGS = [
  "microchip-sottocutaneo-obbligatorio-guida-completa-a-funzionamento-costi-e-rischi",
  "il-potere-curativo-delle-fusa-quando-il-ronzio-del-gatto-diventa-terapia-per-le-ossa",
  "animali-longevi-studi-internazionali-italia",
];
const bridgeRows = await sql`SELECT slug, titolo, categoria, contenuto FROM articoli WHERE slug = ANY(${BRIDGE_SLUGS})`;
const bridgeBySlug = new Map(bridgeRows.map(r => [r.slug, r]));

// Piano curato a mano — cluster topic + criteri Antonio.
// Per ogni master: 3-5 link con target, anchor text vario, H2 di inserimento,
// target_type, rationale. Segnalazioni = candidati cannibalization residui.

const PLAN = [
  // ============ ADEMPIMENTI LEGALI ============
  {
    master_slug: "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina",
    cluster_topic: "Adempimenti legali",
    links: [
      { target: "passaggio-proprieta-cane-guida-procedura-italiana", type: "master", anchor: "la procedura di passaggio di proprietà del cane", h2_after: 5, rationale: "Il microchip è lo strumento tecnico del passaggio di proprietà: link naturale dal paragrafo sull'Anagrafe Canina al processo formale di cessione." },
      { target: "vaccinazioni-cane-calendario-completo",          type: "master", anchor: "il calendario vaccinale del cane",                      h2_after: 4, rationale: "Microchip e vaccinazioni sono i due adempimenti base del primo anno: richiamo cross dal H2 sui documenti al libretto sanitario." },
      { target: "vendere-regalare-cane-legge-italia-obblighi",    type: "master", anchor: "gli obblighi di legge per chi cede un cane",            h2_after: 7, rationale: "Cluster legali: chi trova un cane microchippato può risalire al vecchio proprietario tramite contratto di cessione." },
      { target: "adottare-cane-canile-procedura-modulo-affido",   type: "singleton", anchor: "la procedura di adozione da canile",                h2_after: 5, rationale: "L'adozione da canile prevede trasferimento microchip + iscrizione Anagrafe: completamento pratico del H2 sull'Anagrafe." },
      { target: "/professionisti",                                 type: "tool_page", anchor: "un veterinario iscritto al registro professionale", h2_after: 2, rationale: "Il microchip lo applica solo un veterinario abilitato: CTA al tool elenco professionisti dal H2 sui costi." },
      { target: "microchip-sottocutaneo-obbligatorio-guida-completa-a-funzionamento-costi-e-rischi", type: "singleton", anchor: "aspetti medici del microchip sottocutaneo", h2_after: 6, rationale: "Bridge keep_separate (risolve segnalazione post-audit caso 1): H2 tecnico 'Come si legge il microchip e cosa contiene' apre al complementare sugli aspetti medici/rischi." },
    ],
    segnalazioni: [
      "bridge-keep_separate applicato: 'microchip-sottocutaneo-obbligatorio-guida-completa-a-funzionamento-costi-e-rischi' mantenuto come articolo autonomo (angolo medico vs legale). Link reciproco aggiunto come link #6 del master e come entry singleton_bridge.",
    ],
  },
  {
    master_slug: "vaccinazioni-cane-calendario-completo",
    cluster_topic: "Adempimenti legali + Salute",
    links: [
      { target: "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina", type: "master", anchor: "l'identificazione obbligatoria tramite microchip", h2_after: 2, rationale: "Microchip precede le vaccinazioni come primo adempimento del cucciolo: link dal H2 sul calendario iniziale." },
      { target: "scegliere-primo-cucciolo-guida-cane-principianti", type: "master", anchor: "guida per chi sta scegliendo il primo cucciolo",        h2_after: 2, rationale: "I nuovi proprietari arrivano qui dopo l'acquisto: cross-link al cluster Educazione & Scelta." },
      { target: "prima-visita-dal-veterinario-la-guida-completa-per-accogliere-il-tuo-cucciolo", type: "singleton", anchor: "la prima visita veterinaria del cucciolo", h2_after: 5, rationale: "Le reazioni vaccinali vanno gestite dal veterinario: rinforzo al singleton 'prima visita' (top match score 7)." },
      { target: "/professionisti",                                  type: "tool_page", anchor: "trovare un veterinario di fiducia vicino a te",      h2_after: 3, rationale: "Paragrafo sui costi deve convertire: link al tool che mappa veterinari per zona." },
      { target: "/costo-cane",                                      type: "tool_page", anchor: "quanto costa mantenere un cane in un anno",          h2_after: 3, rationale: "Il costo vaccini è parte del budget annuo: funnel verso il calcolatore (conversion driver)." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "vendere-regalare-cane-legge-italia-obblighi",
    cluster_topic: "Adempimenti legali",
    links: [
      { target: "passaggio-proprieta-cane-guida-procedura-italiana", type: "master", anchor: "la procedura formale di passaggio di proprietà",        h2_after: 3, rationale: "Naturale deep-dive: il contratto di cessione è il documento che innesca il passaggio di proprietà." },
      { target: "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina", type: "master", anchor: "registrare il microchip al nuovo proprietario", h2_after: 6, rationale: "Il H2 sul cambio di intestatario del microchip è il punto esatto dove approfondire con la guida microchip." },
      { target: "vaccinazioni-cane-calendario-completo",             type: "master", anchor: "il libretto sanitario con le vaccinazioni",            h2_after: 8, rationale: "Il libretto sanitario è parte della cessione: link dal H2 dedicato al calendario vaccinale completo." },
      { target: "adottare-cane-canile-procedura-modulo-affido",      type: "singleton", anchor: "l'adozione da canile come scelta etica",            h2_after: 2, rationale: "Alternative alla vendita/regalo tra privati: apertura editoriale al singleton sull'adozione." },
      { target: "/professionisti",                                   type: "tool_page", anchor: "il veterinario come testimone della cessione",      h2_after: 3, rationale: "Il contratto di cessione può essere controfirmato dal veterinario: link al tool elenco vet." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "passaggio-proprieta-cane-guida-procedura-italiana",
    cluster_topic: "Adempimenti legali",
    links: [
      { target: "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina", type: "master", anchor: "i dettagli sul microchip obbligatorio per legge", h2_after: 10, rationale: "H2 'Microchip: Inserimento e Registrazione' è il pitch perfetto per il master microchip." },
      { target: "vendere-regalare-cane-legge-italia-obblighi",     type: "master", anchor: "i vincoli legali della cessione tra privati",             h2_after: 2, rationale: "H2 'Quando Scatta l'Obbligo di Passaggio': link diretto al master cessione per capire i casi concreti." },
      { target: "adottare-cane-canile-procedura-modulo-affido",    type: "singleton", anchor: "l'iter dell'adozione da canile rispetto alla cessione privata", h2_after: 3, rationale: "H2 documenti: aprire al caso specifico adozione rispetto alla cessione tra privati." },
      { target: "passaggio-proprieta-gatto-anagrafe-felina",       type: "singleton", anchor: "la procedura analoga per i gatti con l'Anagrafe Felina", h2_after: 11, rationale: "Falso positivo audit (topic gatto, non cane) ma cross-reference legittimo: link verso articolo gemello per i felini." },
      { target: "/professionisti",                                  type: "tool_page", anchor: "i veterinari abilitati alla registrazione",           h2_after: 8, rationale: "H2 'Procedura Online vs ASL Fisica': il vet è alternativa per registrazione microchip, link al tool." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "trasporto-cani-auto-art-169-codice-strada",
    cluster_topic: "Adempimenti legali + Viaggi",
    links: [
      { target: "cani-autostrada-vacanza-regole-codice-strada",    type: "master", anchor: "le regole specifiche per l'autostrada e i traghetti",    h2_after: 6, rationale: "Naturale continuazione cluster viaggi: dal generale (art. 169) al caso specifico autostrada/traghetti." },
      { target: "trasporto-gatti-auto-sicurezza-codice-strada-consigli", type: "master", anchor: "le stesse regole applicate al trasporto del gatto", h2_after: 1, rationale: "H2 sistemi di ritenuta: cross-specie, rimando all'articolo parallelo gatti per completezza." },
      { target: "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina", type: "master", anchor: "identificazione obbligatoria del cane", h2_after: 3, rationale: "In caso di incidente il cane va identificato: link al master microchip dal H2 sulle distrazioni in guida." },
      { target: "/vacanze",                                         type: "tool_page", anchor: "strutture pet-friendly dove soggiornare",             h2_after: 6, rationale: "CTA di conversione dal paragrafo conclusivo sull'articolo 169 verso il motore di ricerca strutture." },
      { target: "/spiagge",                                         type: "tool_page", anchor: "le spiagge dog-friendly d'Italia",                   h2_after: 6, rationale: "Chi studia le regole per viaggiare cerca anche destinazioni: secondo CTA verso /spiagge." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "trasporto-gatti-auto-sicurezza-codice-strada-consigli",
    cluster_topic: "Adempimenti legali + Viaggi (gatti)",
    links: [
      { target: "trasporto-cani-auto-art-169-codice-strada",       type: "master", anchor: "le regole del Codice della Strada applicate ai cani",    h2_after: 1, rationale: "Cross-specie: stesso impianto normativo (art. 169), link all'articolo parallelo per i cani." },
      { target: "razze-gatti-italiane-siamese-foreste-sokoke",     type: "master", anchor: "le razze feline italiane e le loro caratteristiche",      h2_after: 4, rationale: "H2 su come abituare il gatto al viaggio: le razze italiane (Siamese, Sokoke) hanno tempismi diversi di adattamento." },
      { target: "perche-gatti-fanno-fusa-benefici-salute",         type: "master", anchor: "i segnali di benessere del gatto",                        h2_after: 6, rationale: "H2 su mal d'auto e stress: le fusa sono segnale di rilassamento o al contrario di autoconsolazione." },
      { target: "/professionisti",                                  type: "tool_page", anchor: "un veterinario comportamentalista",                   h2_after: 6, rationale: "Per gatti che soffrono molto il viaggio serve il vet comportamentalista: CTA al tool." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "cani-autostrada-vacanza-regole-codice-strada",
    cluster_topic: "Viaggi + Adempimenti legali",
    links: [
      { target: "trasporto-cani-auto-art-169-codice-strada",       type: "master", anchor: "cosa prescrive l'articolo 169 per i cani in auto",        h2_after: 2, rationale: "L'autostrada applica l'art. 169 come base: link al master normativo dal H2 sul trasporto in sicurezza." },
      { target: "vaccinazioni-cane-calendario-completo",           type: "master", anchor: "il libretto sanitario aggiornato con tutti i vaccini",    h2_after: 7, rationale: "H2 'Quando chiamare il veterinario prima di un viaggio' è il punto naturale per richiamare il master vaccini." },
      { target: "/vacanze",                                         type: "tool_page", anchor: "dove dormire con il cane in Italia",                 h2_after: 6, rationale: "Dopo aver capito come arrivarci: CTA al motore strutture. Cluster viaggi deve sempre linkare pagine prodotto." },
      { target: "/spiagge",                                         type: "tool_page", anchor: "le spiagge libere dove il cane è benvenuto",           h2_after: 6, rationale: "Destinazione più cercata in estate: CTA diretto da articolo autostrada-vacanza." },
      { target: "/sentieri",                                        type: "tool_page", anchor: "i sentieri escursionistici dog-friendly",             h2_after: 6, rationale: "Alternativa mare: chi viaggia col cane cerca anche escursioni. Terzo CTA verso pagine tool." },
    ],
    segnalazioni: [],
  },

  // ============ CANI EROI / MILITARI ============
  {
    master_slug: "pastore-caucaso-cane-guerra-russo",
    cluster_topic: "Cani eroi/militari",
    links: [
      { target: "pastore-tedesco-esercito-polizia-addestramento",  type: "master", anchor: "il Pastore Tedesco nelle forze armate occidentali",       h2_after: 3, rationale: "H2 sul Patto di Varsavia apre il parallelo Est vs Ovest: link naturale al Pastore Tedesco." },
      { target: "malinois-belga-navy-seal-cani",                   type: "master", anchor: "il Malinois Belga dei Navy SEAL",                         h2_after: 5, rationale: "H2 'situazione oggi': dal cane da guerra sovietico alle unità elite occidentali moderne." },
      { target: "cani-spazio-laika-belka-strelova-storia",         type: "singleton", anchor: "le imprese spaziali dei cani sovietici Laika e Belka",  h2_after: 1, rationale: "H2 origini sovietiche: altra pagina gloriosa della storia dei cani nell'URSS." },
      { target: "razze-cani-italiani-enci-caratteristiche-storia-esigenze", type: "singleton", anchor: "le razze canine italiane riconosciute dall'ENCI", h2_after: 4, rationale: "H2 'Come riconoscere un vero Pastore del Caucaso': parallelismo con le razze autoctone italiane, stesso angolo standard/pedigree." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "pastore-tedesco-esercito-polizia-addestramento",
    cluster_topic: "Cani eroi/militari",
    links: [
      { target: "malinois-belga-navy-seal-cani",                   type: "master", anchor: "il Malinois Belga che lo ha sostituito nelle operazioni speciali", h2_after: 4, rationale: "H2 Anti-IED Afghanistan: naturale handoff al successore moderno del Pastore Tedesco nei reparti elite." },
      { target: "pastore-caucaso-cane-guerra-russo",               type: "master", anchor: "il cane da guerra sovietico Pastore del Caucaso",         h2_after: 2, rationale: "H2 sui numeri: contestualizza con la contro-parte sovietica nella stessa epoca." },
      { target: "le-5-razze-migliori-come-cani-guida-labrador-golden-pastore-tedesco-e-altre", type: "singleton", anchor: "il Pastore Tedesco nel mondo dei cani guida", h2_after: 5, rationale: "H2 'Pensionamento dei Nostri Eroi': dopo la carriera militare molti PT vanno a servire come cani guida." },
      { target: "cani-spazio-laika-belka-strelova-storia",         type: "singleton", anchor: "dalla trincea allo spazio: altri cani nella storia militare-scientifica", h2_after: 1, rationale: "H2 origini in trincea: richiamo storico ad altre missioni scientifico-militari con cani." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "malinois-belga-navy-seal-cani",
    cluster_topic: "Cani eroi/militari",
    links: [
      { target: "pastore-tedesco-esercito-polizia-addestramento",  type: "master", anchor: "perché i Navy SEAL hanno scelto il Malinois al posto del Pastore Tedesco", h2_after: 1, rationale: "H2 'Il Cane Che Ha Cambiato Tutto': spiega la transizione Pastore Tedesco → Malinois con link al predecessore." },
      { target: "pastore-caucaso-cane-guerra-russo",               type: "master", anchor: "il gigante sovietico Pastore del Caucaso",                h2_after: 3, rationale: "H2 'Altre Leggende Su Quattro Zampe': rassegna cani militari moderni include il contraltare russo." },
      { target: "animali-domestici-eroi-storie-vere",              type: "singleton", anchor: "altre storie vere di animali eroi che hanno salvato vite", h2_after: 3, rationale: "H2 rassegna eroi: link singleton correlato per lettori emotivi." },
      { target: "storie-fedelta-cani-hachiko-fido-bobby",          type: "singleton", anchor: "tre storie di fedeltà canina che hanno commosso il mondo", h2_after: 5, rationale: "H2 'Dopo la Missione: la Vita Segreta di Cairo': tema fedeltà/legame con il proprio umano, link a storie iconiche." },
    ],
    segnalazioni: [],
  },

  // ============ COMPORTAMENTO / COGNITIVO ============
  {
    master_slug: "cani-capiscono-emozioni-umane-ricerca",
    cluster_topic: "Comportamento/cognitivo",
    links: [
      { target: "perche-cani-inclinano-testa-studio",              type: "master", anchor: "perché i cani inclinano la testa quando parliamo",         h2_after: 5, rationale: "H2 'Come Rafforzare la Connessione Emotiva': gesto empatico più riconoscibile, link al master gemello del cluster cognitivo." },
      { target: "cani-capiscono-parole-studio-budapest",           type: "singleton", anchor: "comprendere le parole come un bambino di 1-2 anni",    h2_after: 1, rationale: "Stesso filone di ricerca (Budapest): link alla scoperta sulle parole dal H2 introduttivo sulla scienza." },
      { target: "il-legame-invisibile-come-i-cani-sentono-e-assorbono-il-nostro-stress", type: "singleton", anchor: "la capacità di assorbire lo stress umano", h2_after: 2, rationale: "H2 sulla risposta emotiva: approfondimento specifico sul meccanismo stress-contagio." },
      { target: "etologia-comportamento-cani-gatti-lorenz",        type: "singleton", anchor: "i fondamenti dell'etologia applicata al cane",          h2_after: 1, rationale: "H2 introduttivo: dà cornice accademica (Lorenz) al lettore che arriva qui per la prima volta." },
      { target: "/razze",                                          type: "tool_page", anchor: "le caratteristiche delle principali razze",             h2_after: 3, rationale: "H2 'Differenze Individuali tra Cani': include anche differenze di razza, CTA alla pagina schede razze." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "perche-cani-inclinano-testa-studio",
    cluster_topic: "Comportamento/cognitivo",
    links: [
      { target: "cani-capiscono-emozioni-umane-ricerca",           type: "master", anchor: "come i cani decodificano le nostre emozioni",              h2_after: 3, rationale: "H2 'Perché il cane inclina la testa quando parlo': l'inclinazione è parte del decoding emotivo, link al master gemello." },
      { target: "cani-capiscono-parole-studio-budapest",           type: "singleton", anchor: "gli studi di Budapest sui cani che capiscono le parole", h2_after: 1, rationale: "H2 introduttivo sullo studio: dà spessore citando un altro lavoro del team Eötvös di Budapest." },
      { target: "cani-sognano-scienza-sonno-cervello",             type: "singleton", anchor: "cosa accade nel cervello del cane durante il sonno",    h2_after: 5, rationale: "H2 finale sull'interpretazione del gesto: approfondimento sul funzionamento del cervello canino." },
      { target: "/razze",                                          type: "tool_page", anchor: "le caratteristiche cognitive delle diverse razze",       h2_after: 2, rationale: "H2 'Il cane che inclina la testa è più intelligente?': aprire al confronto tra razze via pagina tool." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "perche-gatti-fanno-fusa-benefici-salute",
    cluster_topic: "Comportamento/cognitivo gatti",
    links: [
      { target: "benefici-scientifici-animali-domestici-salute",   type: "singleton", anchor: "i benefici scientificamente provati della convivenza con un animale", h2_after: 4, rationale: "H2 'Le fusa fanno bene anche agli umani?': link naturale all'articolo hub sui benefici pet-salute umana." },
      { target: "cani-capiscono-emozioni-umane-ricerca",           type: "master", anchor: "come anche i cani percepiscono le nostre emozioni",        h2_after: 4, rationale: "Cross-specie: le fusa dei gatti + empatia dei cani sono due facce della stessa coin 'pet sentiunt'." },
      { target: "siamese-il-gatto-che-parla-e-non-smette-mai",     type: "singleton", anchor: "l'inconfondibile vocalità del Siamese",                h2_after: 7, rationale: "H2 'Tutti i felini fanno le fusa?': rassegna razze feline con particolarità vocali." },
      { target: "/professionisti",                                  type: "tool_page", anchor: "il tuo veterinario di fiducia",                        h2_after: 6, rationale: "H2 'Quando chiamare il veterinario': CTA al tool elenco professionisti." },
      { target: "il-potere-curativo-delle-fusa-quando-il-ronzio-del-gatto-diventa-terapia-per-le-ossa", type: "singleton", anchor: "le proprietà terapeutiche delle fusa sulla salute ossea", h2_after: 3, rationale: "Bridge keep_separate (risolve segnalazione post-audit caso 3): H2 sui benefici per il gatto si apre al sub-topic specifico sull'effetto terapeutico sulle ossa (vibrazioni 25-150 Hz)." },
    ],
    segnalazioni: [
      "bridge-keep_separate applicato: 'il-potere-curativo-delle-fusa-...-terapia-per-le-ossa' mantenuto come sub-topic autonomo (angolo terapeutico osso vs comportamento generale). Link reciproco aggiunto.",
    ],
  },

  // ============ SALUTE / ALIMENTAZIONE ============
  {
    master_slug: "microbioma-cane-alimentazione-ricerche",
    cluster_topic: "Salute/alimentazione",
    links: [
      { target: "razze-cani-longevi-studio-internazionale-italia-enci", type: "master", anchor: "l'aspettativa di vita delle diverse razze",           h2_after: 1, rationale: "Cross-cluster salute: microbioma → longevità. Link dall'H2 sulle strategie dietetiche alla ricerca longevità." },
      { target: "alimentazione-casalinga-per-cani-si-o-no-la-guida-completa-del-tuo-veterinario-di-fiducia", type: "singleton", anchor: "i pro e i contro della dieta casalinga", h2_after: 1, rationale: "H2 'Come migliorare il microbioma': dieta casalinga è intervento concreto che impatta il microbioma." },
      { target: "come-scegliere-il-cibo-giusto-per-il-tuo-cane-la-guida-definitiva-del-tuo-amico-veterinario", type: "singleton", anchor: "come leggere l'etichetta delle crocchette", h2_after: 5, rationale: "H2 'Quali ingredienti danneggiano il microbioma': link operativo alla scelta del cibo commerciale." },
      { target: "/razioni-cane",                                    type: "tool_page", anchor: "il calcolatore delle razioni quotidiane",             h2_after: 1, rationale: "CTA tool: dopo aver parlato di strategia dietetica, offrire il calcolatore come output pratico." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "razze-cani-longevi-studio-internazionale-italia-enci",
    cluster_topic: "Razze/Salute (longevità)",
    links: [
      { target: "microbioma-cane-alimentazione-ricerche",          type: "master", anchor: "l'equilibrio del microbioma intestinale",                  h2_after: 5, rationale: "H2 'Cosa Posso Fare Concretamente per il Mio Cane': l'alimentazione è la leva più importante per la longevità." },
      { target: "razze-cani-italiani-enci-caratteristiche-storia-esigenze", type: "singleton", anchor: "le dieci razze canine autoctone italiane",     h2_after: 3, rationale: "H2 'Confronto tra Dati Mondiali e Realtà Italiana': le razze autoctone italiane sono un sottoinsieme dei dati ENCI." },
      { target: "/quiz-razza",                                     type: "tool_page", anchor: "il quiz per trovare la razza più adatta al tuo stile di vita", h2_after: 5, rationale: "CTA funnel primario: chi legge sulla longevità delle razze è in fase di scelta, bounce verso il quiz conversione." },
      { target: "/costo-cane",                                     type: "tool_page", anchor: "la stima dei costi veterinari e di mantenimento",       h2_after: 4, rationale: "H2 'Eccezioni che Confermano la Regola': lifetime cost varia con la longevità, CTA al calcolatore." },
      { target: "animali-longevi-studi-internazionali-italia",     type: "singleton", anchor: "confronto internazionale sulla longevità animale",      h2_after: 1, rationale: "Bridge keep_separate (risolve segnalazione post-audit caso 4): H2 'Studio Internazionale' è naturale handoff al hub cross-specie generalista sulla longevità animale." },
    ],
    segnalazioni: [
      "bridge-keep_separate applicato: 'animali-longevi-studi-internazionali-italia' mantenuto come hub generalista cross-specie (include gatti/altri pet). Link reciproco aggiunto.",
    ],
  },

  // ============ EDUCAZIONE & SCELTA ============
  {
    master_slug: "scegliere-primo-cucciolo-guida-cane-principianti",
    cluster_topic: "Educazione & scelta",
    links: [
      { target: "educazione-cucciolo-primi-6-mesi-socializzazione-comandi", type: "master", anchor: "l'educazione nei primi sei mesi del cucciolo", h2_after: 5, rationale: "H2 'Quanto tempo richiede un cucciolo': naturale prosecuzione nel master gemello del cluster Educazione." },
      { target: "/quiz-razza",                                     type: "tool_page", anchor: "fai il quiz per capire quale razza fa al caso tuo",    h2_after: 1, rationale: "H2 'Quale razza scegliere per un principiante': CTA primario del funnel — lead magnet principale del sito." },
      { target: "/costo-cane",                                     type: "tool_page", anchor: "il calcolatore dei costi annui del cane",              h2_after: 2, rationale: "H2 'Quanto costa un cucciolo all'anno': bounce al tool che risponde con numeri personalizzati." },
      { target: "prima-visita-dal-veterinario-la-guida-completa-per-accogliere-il-tuo-cucciolo", type: "singleton", anchor: "tutto quello che serve per la prima visita dal veterinario", h2_after: 4, rationale: "H2 'Quali documenti servono': la prima visita è il momento dove si consegnano/completano i documenti." },
      { target: "vaccinazioni-cane-calendario-completo",           type: "master", anchor: "il calendario delle vaccinazioni obbligatorie",           h2_after: 4, rationale: "H2 documenti: libretto vaccinale è parte dei documenti del cucciolo, link al master cluster Legali." },
    ],
    segnalazioni: [],
  },
  {
    master_slug: "educazione-cucciolo-primi-6-mesi-socializzazione-comandi",
    cluster_topic: "Educazione & scelta",
    links: [
      { target: "scegliere-primo-cucciolo-guida-cane-principianti", type: "master", anchor: "come scegliere un cucciolo adatto alla tua vita",         h2_after: 1, rationale: "H2 introduttivo sulla socializzazione: precondizione = aver scelto il cucciolo giusto. Link al master gemello." },
      { target: "/quiz-razza",                                     type: "tool_page", anchor: "scopri con il quiz quale razza si adatta alla tua casa", h2_after: 1, rationale: "Funnel: i lettori interessati all'educazione spesso stanno ancora scegliendo. Secondo touch sul quiz razza." },
      { target: "vaccinazioni-cane-calendario-completo",           type: "master", anchor: "vaccinazioni complete per uscire in sicurezza",            h2_after: 2, rationale: "H2 'Come socializzare un cucciolo': socializzazione richiede vaccinazioni complete, link al master." },
      { target: "/professionisti",                                 type: "tool_page", anchor: "un educatore cinofilo certificato",                     h2_after: 6, rationale: "H2 'Quando è necessario rivolgersi a un educatore cinofilo': CTA al tool elenco professionisti." },
      { target: "/costo-cane",                                     type: "tool_page", anchor: "quanto spenderai ogni anno per il cane",                h2_after: 5, rationale: "H2 sugli errori comuni: sottovalutare i costi è uno degli errori, CTA al calcolatore." },
    ],
    segnalazioni: [],
  },

  // ============ RAZZE GATTI (isolato) ============
  {
    master_slug: "razze-gatti-italiane-siamese-foreste-sokoke",
    cluster_topic: "Razze (gatti)",
    links: [
      { target: "perche-gatti-fanno-fusa-benefici-salute",         type: "master", anchor: "il comportamento sociale dei gatti e le fusa",             h2_after: 3, rationale: "H2 'Come riconoscere un vero Gatto Europeo': tratti razza includono vocalizzazione/fusa, link al master comportamento." },
      { target: "siamese-il-gatto-che-parla-e-non-smette-mai",     type: "singleton", anchor: "l'indole chiacchierona del Siamese",                    h2_after: 1, rationale: "H2 'Quali sono le vere razze': il Siamese è citato, approfondimento sul singleton dedicato." },
      { target: "mau-egizio-gatto-veloce-mondo",                   type: "singleton", anchor: "altre razze dal passato antico come il Mau Egizio",     h2_after: 3, rationale: "H2 sul Gatto Europeo: parallelismo con altre razze ancestrali del Mediterraneo/Nord Africa." },
      { target: "razze-cani-italiani-enci-caratteristiche-storia-esigenze", type: "singleton", anchor: "il panorama delle razze italiane nel mondo canino", h2_after: 2, rationale: "H2 sui costi: parallelismo editoriale con l'articolo gemello sulle razze canine italiane." },
    ],
    segnalazioni: [],
  },
];

// Bridge inverso: 3 singleton che linkano ai rispettivi master (risolve casi 1, 3, 4 post-audit)
const SINGLETON_BRIDGES = [
  {
    source_slug: "microchip-sottocutaneo-obbligatorio-guida-completa-a-funzionamento-costi-e-rischi",
    cluster_topic: "Adempimenti legali (bridge)",
    link: {
      target: "microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina", type: "master",
      anchor: "la legge italiana che rende il microchip obbligatorio",
      h2_after: 4,
      rationale: "Bridge reciproco (caso 1): H2 'Cosa rischio se non metto il microchip' del singleton tecnico rimanda al master legale-normativo per gli aspetti di legge/sanzioni.",
    },
  },
  {
    source_slug: "il-potere-curativo-delle-fusa-quando-il-ronzio-del-gatto-diventa-terapia-per-le-ossa",
    cluster_topic: "Comportamento/cognitivo gatti (bridge)",
    link: {
      target: "perche-gatti-fanno-fusa-benefici-salute", type: "master",
      anchor: "il meccanismo fisiologico delle fusa felini",
      h2_after: 2,
      rationale: "Bridge reciproco (caso 3): H2 'Benefici scientifici' del singleton terapeutico rimanda al master comportamento per la spiegazione fisiologica base delle fusa.",
    },
  },
  {
    source_slug: "animali-longevi-studi-internazionali-italia",
    cluster_topic: "Salute/longevità (bridge)",
    link: {
      target: "razze-cani-longevi-studio-internazionale-italia-enci", type: "master",
      anchor: "le razze di cani più longeve secondo gli studi ENCI",
      h2_after: 3,
      rationale: "Bridge reciproco (caso 4): H2 'Razza e Genetica' del singleton generalista rimanda al master specifico cane+ENCI per il deep-dive sulla longevità canina.",
    },
  },
];

// ===================================================
// Script: arricchisce il PLAN con contesto_pre/post
// ===================================================

function htmlToMarked(html) {
  // Inserisce marker prima di ogni <h2> per poter localizzare posizioni
  let marked = html;
  let idx = 0;
  marked = marked.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, inner) => {
    idx++;
    const txt = inner.replace(/<[^>]+>/g, "").trim();
    return `\n[[H2#${idx}:${txt}]]\n${inner}\n`;
  });
  // Chiudi i paragrafi con newline per facilitare split
  marked = marked.replace(/<\/p>/gi, "\n");
  // Rimuovi altri tag
  marked = marked.replace(/<script[\s\S]*?<\/script>/gi, " ")
                 .replace(/<style[\s\S]*?<\/style>/gi, " ")
                 .replace(/<[^>]+>/g, " ")
                 .replace(/&nbsp;/g, " ")
                 .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
                 .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                 .replace(/[ \t]+/g, " ");
  return marked;
}

function contextAround(marked, h2Number) {
  // Inserimento "subito dopo il paragrafo che segue H2#N" = in fondo al primo paragrafo successivo all'H2 specificato
  if (h2Number === 0) {
    // Prima di tutti gli H2 (intro)
    const firstH2 = marked.indexOf("[[H2#1:");
    const pre = marked.slice(0, firstH2).trim();
    const post = marked.slice(firstH2).replace(/\[\[H2#\d+:[^\]]+\]\]/g, "").trim();
    return { pre: truncate(pre.split(/\s+/).slice(-40).join(" "), 300), post: truncate(post.split(/\s+/).slice(0, 40).join(" "), 300) };
  }
  const marker = `[[H2#${h2Number}:`;
  const start = marked.indexOf(marker);
  if (start < 0) return { pre: "", post: "" };
  const lineEnd = marked.indexOf("\n", start);
  const afterTitle = marked.indexOf("\n", lineEnd + 1); // fine prima riga testo sotto H2
  const nextH2 = marked.indexOf("[[H2#", start + marker.length);
  // Paragrafo di inserimento = tutto ciò che sta tra titolo H2 e prossimo H2
  const sectionBody = marked.slice(lineEnd + 1, nextH2 > 0 ? nextH2 : marked.length).trim();
  const sectionClean = sectionBody.replace(/\[\[H2#\d+:[^\]]+\]\]/g, "").trim();
  // contesto_pre = ultime ~40 parole della section (dove si inserirà il link alla fine)
  const preWords = sectionClean.split(/\s+/);
  const pre = preWords.slice(Math.max(0, preWords.length - 40)).join(" ");
  // contesto_post = prime ~40 parole della section successiva (o del paragrafo dopo)
  let postText = "";
  if (nextH2 > 0) {
    const after = marked.slice(nextH2).replace(/\[\[H2#\d+:[^\]]+\]\]/g, "").trim();
    postText = after.split(/\s+/).slice(0, 40).join(" ");
  } else {
    postText = "(fine articolo)";
  }
  return { pre: truncate(pre, 400), post: truncate(postText, 400) };
}

function truncate(s, maxChars) {
  if (!s) return "";
  s = s.replace(/\s+/g, " ").trim();
  if (s.length <= maxChars) return s;
  return s.slice(0, maxChars).replace(/\s+\S*$/, "") + "…";
}

let totalLinks = 0;
const piano = [];

for (const entry of PLAN) {
  const master = masterBySlug.get(entry.master_slug);
  if (!master) {
    console.error(`⚠ Master mancante: ${entry.master_slug}`);
    continue;
  }
  const marked = htmlToMarked(master.contenuto);

  const linksOut = [];
  for (const l of entry.links) {
    // Verifica che il target esista
    let targetValid = false;
    let targetTitle = "";
    if (l.type === "master") {
      const m = masterBySlug.get(l.target);
      if (m) { targetValid = true; targetTitle = m.titolo; }
    } else if (l.type === "singleton") {
      const c = candBySlug.get(l.target);
      if (c) { targetValid = true; targetTitle = c.titolo; }
    } else if (l.type === "tool_page") {
      const t = toolByUrl.get(l.target);
      if (t) { targetValid = true; targetTitle = t.label; }
    }
    if (!targetValid) {
      console.error(`⚠ Target non trovato: ${l.target} (tipo ${l.type}) nel master ${entry.master_slug}`);
      continue;
    }

    const { pre, post } = contextAround(marked, l.h2_after);
    linksOut.push({
      target_slug: l.target,
      target_type: l.type,
      target_title: targetTitle,
      anchor_text: l.anchor,
      h2_di_inserimento: l.h2_after,
      contesto_pre: pre,
      contesto_post: post,
      rationale: l.rationale,
    });
    totalLinks++;
  }

  piano.push({
    source_type: "master",
    master_slug: master.slug,
    master_title: master.titolo,
    master_categoria: master.categoria,
    cluster_topic: entry.cluster_topic,
    links_proposti: linksOut,
    segnalazioni: entry.segnalazioni ?? [],
  });
}

// Processa SINGLETON_BRIDGES: ogni singleton diventa sorgente di 1 link verso il master
let bridgeLinks = 0;
for (const b of SINGLETON_BRIDGES) {
  const art = bridgeBySlug.get(b.source_slug);
  if (!art) {
    console.error(`⚠ Singleton bridge mancante nel DB: ${b.source_slug}`);
    continue;
  }
  const marked = htmlToMarked(art.contenuto);
  const targetMaster = masterBySlug.get(b.link.target);
  if (!targetMaster) {
    console.error(`⚠ Master target non trovato: ${b.link.target}`);
    continue;
  }
  const { pre, post } = contextAround(marked, b.link.h2_after);
  piano.push({
    source_type: "singleton_bridge",
    master_slug: art.slug,
    master_title: art.titolo,
    master_categoria: art.categoria,
    cluster_topic: b.cluster_topic,
    links_proposti: [{
      target_slug: b.link.target,
      target_type: b.link.type,
      target_title: targetMaster.titolo,
      anchor_text: b.link.anchor,
      h2_di_inserimento: b.link.h2_after,
      contesto_pre: pre,
      contesto_post: post,
      rationale: b.link.rationale,
    }],
    segnalazioni: [],
  });
  bridgeLinks++;
  totalLinks++;
}

// Verifica completezza: tutti i 18 master presenti
const pianoSlugs = new Set(piano.map(p => p.master_slug));
const missing = inv.master.filter(m => !pianoSlugs.has(m.slug));
if (missing.length) {
  console.error(`⚠ Master non coperti dal plan: ${missing.map(m => m.slug).join(", ")}`);
}

// Verifica anchor text variety per target ripetuti
const targetAnchors = new Map();
for (const p of piano) {
  for (const l of p.links_proposti) {
    if (!targetAnchors.has(l.target_slug)) targetAnchors.set(l.target_slug, []);
    targetAnchors.get(l.target_slug).push({ master: p.master_slug, anchor: l.anchor_text });
  }
}
const anchorIssues = [];
for (const [tgt, uses] of targetAnchors.entries()) {
  if (uses.length < 2) continue;
  const anchors = uses.map(u => u.anchor.toLowerCase());
  const dupe = anchors.filter((a, i) => anchors.indexOf(a) !== i);
  if (dupe.length) anchorIssues.push({ target: tgt, duplicati: [...new Set(dupe)] });
}

const masterEntries = piano.filter(p => p.source_type === "master").length;
const bridgeEntries = piano.filter(p => p.source_type === "singleton_bridge").length;

const out = {
  generato_il: new Date().toISOString(),
  totale_sorgenti: piano.length,
  totale_master_sorgente: masterEntries,
  totale_singleton_bridge: bridgeEntries,
  totale_link_proposti: totalLinks,
  anchor_text_duplicati: anchorIssues,
  piano,
};

await fs.writeFile(path.join(__dirname, "internal-linking-plan.json"), JSON.stringify(out, null, 2), "utf8");
console.log(`✓ Plan scritto in scripts/internal-linking-plan.json`);
console.log(`  Sorgenti totali:        ${piano.length} (${masterEntries} master + ${bridgeEntries} singleton_bridge)`);
console.log(`  Link totali:            ${totalLinks}`);
console.log(`  Anchor duplicati:       ${anchorIssues.length}`);

// Sommario cluster
const byCluster = new Map();
for (const p of piano) byCluster.set(p.cluster_topic, (byCluster.get(p.cluster_topic) ?? 0) + 1);
console.log(`\nCluster topic distribution:`);
for (const [c, n] of [...byCluster.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${c.padEnd(40)} ${n} master`);

// Segnalazioni totali
let totalSeg = 0;
for (const p of piano) totalSeg += p.segnalazioni.length;
console.log(`\nSegnalazioni candidato-post-audit: ${totalSeg}`);
for (const p of piano) for (const s of p.segnalazioni) console.log(`  [${p.master_slug}] ${s}`);

// Link per tipo
let mCount = 0, sCount = 0, tCount = 0;
for (const p of piano) for (const l of p.links_proposti) {
  if (l.target_type === "master") mCount++;
  else if (l.target_type === "singleton") sCount++;
  else tCount++;
}
console.log(`\nLink per tipo: master=${mCount}, singleton=${sCount}, tool_page=${tCount}`);
