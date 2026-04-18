// Articoli magazine — guide shopping con link affiliate Amazon
// Tag affiliate: mifidodite-21 (placeholder finche non si riceve tag reale)
// Nota di trasparenza: ogni articolo include disclosure esplicita

const T = "mifidodite-21";
const A = (q: string) => `https://www.amazon.it/s?k=${encodeURIComponent(q)}&tag=${T}`;

export const ARTICOLI_SHOPPING = [
  // ============================================================
  // CROCCHETTE
  // ============================================================
  {
    slug: "migliori-crocchette-cani-2026",
    titolo: "Le migliori 10 crocchette per cani 2026: classifica, ingredienti e prezzi",
    categoria: "alimentazione",
    estratto: "Quali sono le crocchette migliori per il cane nel 2026? Guida con etichette reali, grain-free, monoproteiche, super premium. Confronto prezzi e link affiliati.",
    img: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80",
    tempo_lettura: "9 min",
    data: "17 Apr 2026",
    tags: ["alimentazione", "crocchette", "cane", "shopping", "review"],
    contenuto: `
<p><em>Trasparenza: questo articolo contiene link affiliati Amazon. Se acquisti attraverso i nostri link riceviamo una piccola commissione senza costi aggiuntivi per te. Questo non influenza la selezione: scegliamo i prodotti in base a ingredienti, reputazione e rapporto qualita-prezzo.</em></p>

<p>Scegliere le crocchette giuste per il tuo cane significa guardare oltre al packaging: ingredienti reali, percentuali di carne fresca, assenza di cereali non necessari. Abbiamo confrontato 40 brand venduti in Italia nel 2026. Ecco i 10 che riteniamo i migliori, divisi per fascia di prezzo e tipologia.</p>

<h2>Come leggere un'etichetta di crocchette</h2>
<ol>
<li><strong>Il primo ingrediente deve essere carne</strong> (meglio se specificata: "pollo disidratato 40%") non "sottoprodotti animali"</li>
<li><strong>Proteine grezze</strong>: 25-32% per adulto, 28-35% per cucciolo</li>
<li><strong>Grassi</strong>: 14-18% adulto, 18-22% cucciolo</li>
<li><strong>Cereali</strong>: non sono il diavolo, ma se ci sono devono essere integri (riso integrale, avena) non generici "cereali"</li>
<li><strong>Conservanti</strong>: naturali (tocoferoli, rosmarino) non chimici (BHA, BHT, etossichina)</li>
</ol>

<h2>Fascia super premium (50-90 euro/15kg)</h2>

<h3>1. Orijen Original</h3>
<p>Top di gamma canadese. 85% ingredienti di origine animale, 6 fonti di carne fresca (pollo, tacchino, aringa). Ideale per cani sportivi o con pelo opaco. <a href="${A("orijen original 11.4kg")}" target="_blank" rel="noopener sponsored">Vedi prezzo su Amazon</a>.</p>

<h3>2. Acana Classics Prairie Harvest</h3>
<p>Ricetta stesso stabilimento Orijen, piu accessibile. Pollo ruspante, uova locali, verdure fresche. <a href="${A("acana classics prairie harvest")}" target="_blank" rel="noopener sponsored">Vedi prezzo su Amazon</a>.</p>

<h3>3. Taste of the Wild Pacific Stream</h3>
<p>Grain-free con salmone come prima fonte proteica. Ottimo per cani con allergie al pollo. Prezzo contenuto per la qualita. <a href="${A("taste of the wild pacific stream 12kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Fascia premium (35-50 euro/15kg)</h2>

<h3>4. Farmina N&D Low Ancestral Grain</h3>
<p>Italiana, low grain con farro e avena. Varie ricette (pollo/agnello/pesce). Stabilimento Mezzocorona. <a href="${A("farmina n&d low ancestral grain 12kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>5. Pro Plan Sensitive Digestion</h3>
<p>Nestle Purina. Adatto a cani con stomaco sensibile, agnello e riso. Facilmente reperibile, supporto veterinario. <a href="${A("pro plan sensitive digestion 14kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>6. Eukanuba Adult Medium Breed</h3>
<p>Classico brand premium con ricette specifiche per taglia. Pollo primo ingrediente. <a href="${A("eukanuba adult medium breed 15kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Fascia media (20-35 euro/15kg)</h2>

<h3>7. Monge All Breeds Adult Pollo e Riso</h3>
<p>Italiana, stabilimento Monasterolo di Savigliano. Rapporto qualita-prezzo top, ingredienti locali. <a href="${A("monge all breeds adult pollo riso 12kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>8. Natural Trainer Adult Medium</h3>
<p>Nova Foods, Veneto. Ingredienti italiani riconosciuti. Tante referenze specifiche (sensitive, breed-specific). <a href="${A("natural trainer adult medium 12kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Fascia economica (15-25 euro/15kg)</h2>

<h3>9. Purina One Adult</h3>
<p>Supermercato-friendly, comunque decente. Pollo primo ingrediente, sufficiente per la maggior parte dei cani in salute. <a href="${A("purina one adult 14kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>10. Hill's Science Plan Adult</h3>
<p>Marchio veterinario molto diffuso, formulazioni specifiche (gastrointestinal, renal). Leggermente piu caro ma consigliato per cani con patologie. <a href="${A("hills science plan adult medium 14kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Casi specifici</h2>

<h3>Cuccioli (2-12 mesi)</h3>
<p>Servono piu proteine e calcio. Migliore scelta: <a href="${A("orijen puppy")}" target="_blank" rel="noopener sponsored">Orijen Puppy</a> o <a href="${A("farmina n&d puppy medium")}" target="_blank" rel="noopener sponsored">Farmina N&D Puppy Medium</a>.</p>

<h3>Cani anziani (senior)</h3>
<p>Meno grassi, piu articolazioni. Scegli: <a href="${A("hill's science plan senior")}" target="_blank" rel="noopener sponsored">Hill's Science Plan Senior</a> o <a href="${A("monge senior all breeds")}" target="_blank" rel="noopener sponsored">Monge Senior</a>.</p>

<h3>Cani con allergie</h3>
<p>Monoproteico, spesso grain-free. <a href="${A("farmina vet life ultra hypo")}" target="_blank" rel="noopener sponsored">Farmina Vet Life Ultra Hypo</a> e tra i migliori in Italia.</p>

<h3>Cani grandi in crescita (>25kg da adulti)</h3>
<p>Proteine moderate per non stressare le articolazioni. <a href="${A("royal canin giant puppy")}" target="_blank" rel="noopener sponsored">Royal Canin Giant Puppy</a> e lo standard veterinario.</p>

<h2>Quanto dare?</h2>
<p>La dose giornaliera dipende da peso, eta e attivita. <strong>Vai al nostro <a href="/razioni-cane">calcolatore razione cane</a></strong>: inserisci razza, peso e livello di attivita per la dose esatta.</p>

<h2>Errori comuni</h2>
<ol>
<li><strong>Cambiare marca bruscamente</strong>: sempre transizione di 7-10 giorni</li>
<li><strong>Comprare solo in base al prezzo</strong>: risparmiare 10 euro al mese significa spendere 500 euro di veterinario a 8 anni</li>
<li><strong>Farsi ingannare dal packaging "naturale"</strong>: leggi SEMPRE gli ingredienti</li>
<li><strong>Dare solo secco</strong>: 1-2 volte a settimana un po' di umido aiuta idratazione</li>
</ol>

<h2>FAQ</h2>
<p><strong>Meglio grain-free o con cereali?</strong><br/>Se il cane non ha allergie, i cereali integrali vanno bene. Il grain-free e utile solo in caso di intolleranze.</p>
<p><strong>Posso mischiare marche?</strong><br/>Si, ma transizione graduale. Mischiare per variare nutrienti e OK, ma sempre della stessa fascia di qualita.</p>
<p><strong>Crocchette al supermercato vanno bene?</strong><br/>Dipende. Purina One, Monge, Hill's sono decenti. Marche senza specifiche o con carne generica: evita.</p>

<p>Hai un cane con esigenze particolari? <a href="/cliniche">Consulta un veterinario nutrizionista</a> vicino a te per una dieta personalizzata.</p>
    `,
  },

  // ============================================================
  // ANTIPARASSITARI
  // ============================================================
  {
    slug: "migliori-antiparassitari-cani-2026",
    titolo: "I migliori antiparassitari per cani 2026: pipette, collari, compresse a confronto",
    categoria: "salute",
    estratto: "Pulci, zecche, filariasi: quali antiparassitari funzionano davvero nel 2026? Confronto tra Bravecto, Frontline, Seresto, Nexgard. Prezzi e consigli veterinari.",
    img: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&q=80",
    tempo_lettura: "8 min",
    data: "17 Apr 2026",
    tags: ["salute", "antiparassitari", "zecche", "pulci", "filaria"],
    contenuto: `
<p><em>Trasparenza: articolo con link affiliati Amazon. Tutti i prodotti menzionati richiedono prescrizione o consiglio veterinario — non auto-medicare mai. Il nostro ruolo e informativo, non sostituisce il parere del tuo veterinario.</em></p>

<p>La protezione antiparassitaria e fondamentale per la salute del cane, soprattutto in Italia dove zecche, pulci, pappataci e filaria sono diffusi ovunque tranne alle quote piu alte. Nel 2026 l'offerta e ampia: compresse masticabili, pipette spot-on, collari a lunga durata. Ecco il confronto dei prodotti piu usati.</p>

<h2>Da cosa proteggere il cane</h2>
<ul>
<li><strong>Pulci</strong> — infestazioni dell'ambiente, dermatiti allergiche</li>
<li><strong>Zecche</strong> — veicolo di Piroplasmosi, Ehrlichiosi, Lyme</li>
<li><strong>Pappataci/flebotomi</strong> — trasmettono la Leishmaniosi (sud Italia, costa)</li>
<li><strong>Zanzare</strong> — trasmettono la Filariasi cardiopolmonare</li>
<li><strong>Acari</strong> — rogna demodettica e sarcoptica</li>
</ul>

<h2>Compresse masticabili (sistemiche)</h2>

<h3>1. Bravecto (fluralaner)</h3>
<p>Compressa masticabile, dura <strong>12 settimane</strong> contro pulci e zecche. Praticissimo. Non copre pappataci e zanzare (va abbinato a collare o repellente esterno). <a href="${A("bravecto cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>2. NexGard Spectra (afoxolaner + milbemicina)</h3>
<p>Compressa mensile che copre pulci, zecche, filaria e vermi intestinali. Molto completa. <a href="${A("nexgard spectra cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>3. Simparica Trio</h3>
<p>Come Nexgard Spectra ma formulazione diversa. Mensile, pulci + zecche + filaria + vermi. <a href="${A("simparica trio cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Pipette spot-on (topiche)</h2>

<h3>4. Frontline Combo</h3>
<p>Classico storico. Mensile, pulci e zecche. Non copre pappataci, non ha piu l'efficacia degli anni '90 (alcune zone d'Italia hanno resistenze). Buon prezzo. <a href="${A("frontline combo cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>5. Advantix</h3>
<p>Pipetta con imidacloprid+permetrina. Mensile, <strong>copre pappataci</strong> (essenziale per sud e coste) oltre a pulci/zecche/zanzare. Tossico per i gatti, attenzione se hai entrambi. <a href="${A("advantix cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>6. Vectra 3D</h3>
<p>Simile ad Advantix, tre principi attivi. Ottimo rapporto qualita-prezzo. Anche questo tossico per gatti. <a href="${A("vectra 3d cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Collari a lunga durata</h2>

<h3>7. Seresto</h3>
<p>Collare Bayer Elanco, dura <strong>8 mesi</strong>. Copre pulci, zecche, pappataci. Molto comodo per chi dimentica pipette/compresse. Esiste versione piccola (<8kg) e grande. <a href="${A("seresto collare cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>8. Scalibor</h3>
<p>Collare MSD con deltametrina. Dura <strong>6 mesi</strong>. Molto usato nelle zone endemiche di Leishmaniosi (sud Italia). <a href="${A("scalibor collare")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Filariasi — protezione mensile obbligatoria</h2>
<p>La filaria cardiopolmonare e <strong>mortale</strong> e si trasmette con le zanzare. In Italia e endemica in tutto il nord (pianura Padana soprattutto) e sta risalendo al sud. Protezione da aprile a ottobre (tutto l'anno al sud).</p>
<ul>
<li><strong>Cardotek Plus / Interceptor</strong>: compressa mensile masticabile. <a href="${A("cardotek plus")}" target="_blank" rel="noopener sponsored">Vedi</a></li>
<li><strong>Stronghold</strong>: spot-on mensile, copre anche acari/pulci. <a href="${A("stronghold spot on cane")}" target="_blank" rel="noopener sponsored">Vedi</a></li>
<li><strong>Simparica Trio / Nexgard Spectra</strong>: compresse piu complete (copre anche filaria)</li>
</ul>
<p><strong>Prima di iniziare</strong>: test filaria obbligatorio (se positivo, il protocollo e diverso e va seguito da veterinario).</p>

<h2>Cosa scegliere in base alla zona</h2>

<h3>Nord Italia (pianura, zanzare intense)</h3>
<p>Nexgard Spectra o Simparica Trio (compresse complete) + Scalibor/Seresto se d'estate vai al sud.</p>

<h3>Centro Italia (mix, Toscana/Umbria)</h3>
<p>Bravecto + antifilaria + repellente pappataci in aree costiere.</p>

<h3>Sud Italia e coste (Leishmaniosi endemica)</h3>
<p>Advantix + Scalibor <strong>insieme</strong> (permetrina rinforzata). Vaccino Leishmaniosi consigliato. Vedi un <a href="/cliniche">veterinario locale</a> per protocollo zona-specifico.</p>

<h3>Montagna (oltre 1000 m)</h3>
<p>Zanzare e pappataci rari. Zecche e pulci si. Bravecto + antifilaria sufficienti.</p>

<h2>Come rimuovere una zecca</h2>
<ol>
<li>Usa una <a href="${A("pinza zecche o'tom")}" target="_blank" rel="noopener sponsored">pinza specifica O'Tom</a> (8-10 euro, indispensabile)</li>
<li>Inserisci sotto la zecca, ruota lentamente per 1-2 giri</li>
<li>Tira via completamente, disinfetta la zona</li>
<li><strong>Non</strong> usare alcol, fiamma, olio: la zecca rigurgita e aumenta il rischio di trasmissione</li>
<li>Se possibile, conserva la zecca in un contenitore per analisi</li>
<li>Monitora il cane per 2-3 settimane (apatia, febbre, sangue nelle urine)</li>
</ol>

<h2>Errori da evitare</h2>
<ul>
<li><strong>Fermare il trattamento in inverno</strong>: zecche attive anche a 5-10 gradi</li>
<li><strong>Usare antiparassitari per cani sui gatti</strong>: la permetrina li uccide</li>
<li><strong>Bagnare il cane nelle 48 ore dopo la pipetta</strong>: riduce l'efficacia</li>
<li><strong>Antiparassitari naturali da soli</strong> (neem, aglio): non bastano in zone endemiche</li>
<li><strong>Sovraddosaggio</strong>: una pipetta taglia grande su un cane piccolo = tossica</li>
</ul>

<h2>Quanto costa l'anno</h2>
<p>Budget medio per un cane di 15 kg in zona centro Italia:</p>
<ul>
<li><strong>Bravecto</strong> 4 compresse/anno: ~120 euro</li>
<li><strong>Cardotek Plus</strong> 7 mesi: ~50 euro</li>
<li><strong>Pipetta pappataci</strong> estate: ~40 euro</li>
<li><strong>Totale</strong>: ~210 euro/anno</li>
</ul>

<h2>FAQ</h2>
<p><strong>Posso usare prodotti da banco?</strong><br/>Alcuni si (Frontline, Advantix in molti casi sono OTC). Bravecto, Simparica, Nexgard richiedono ricetta veterinaria in Italia.</p>
<p><strong>Il cane puo essere allergico?</strong><br/>Raramente. Sintomi: arrossamento, gonfiore, vomito. Sospendi e contatta vet.</p>

<p>Per un protocollo personalizzato in base alla tua zona, <a href="/cliniche">trova un veterinario</a> su MifidoDiTe.</p>
    `,
  },

  // ============================================================
  // TRASPORTINI
  // ============================================================
  {
    slug: "migliori-trasportini-cani-2026",
    titolo: "I migliori trasportini per cani: guida aereo, auto e moto 2026",
    categoria: "accessori",
    estratto: "Trasportini IATA per l'aereo, kennel auto omologati, zaini da moto: la guida 2026 completa con modelli, taglie, prezzi e link Amazon.",
    img: "https://images.unsplash.com/photo-1583337426008-2fef51aa841e?w=800&q=80",
    tempo_lettura: "8 min",
    data: "17 Apr 2026",
    tags: ["accessori", "trasportini", "viaggio", "aereo", "auto"],
    contenuto: `
<p><em>Trasparenza: questo articolo contiene link affiliati Amazon.</em></p>

<p>Il trasportino giusto dipende dall'uso: aereo, auto, moto, treno. Un trasportino da cabina aerea e molto diverso da un kennel auto omologato crash-test. Ecco la guida completa 2026 per scegliere senza sbagliare.</p>

<h2>Per l'aereo (in cabina)</h2>
<p>Serve <strong>omologazione IATA</strong>: dimensioni standard, 4 lati areati, serratura. Materiale rigido o morbido con struttura interna.</p>

<h3>1. Sherpa Original Deluxe</h3>
<p>Il riferimento mondiale per cabina. Omologato da tutte le compagnie (incluso US). Leggero, fodera lavabile. Taglie S/M/L. <a href="${A("sherpa original deluxe trasportino")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>2. Kurgo Wander Carrier</h3>
<p>Morbido ma strutturato, stile zaino. Cani fino a 9 kg. Compatto e leggero. <a href="${A("kurgo wander carrier")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>3. Petmate Sky Kennel (cabina small + stiva)</h3>
<p>Serve chiarire: esiste versione cabina piccola e versione stiva (IATA rigida). Controlla bene prima di comprare. <a href="${A("petmate sky kennel")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Per l'aereo (in stiva)</h2>
<p>Kennel rigido IATA con serrature a vite (no clip), ventilazione su 4 lati, ciotole interne per acqua e cibo.</p>

<h3>4. Petmate Vari Kennel Ultra</h3>
<p>Il classico da stiva. Omologato IATA, varie taglie fino a L600 (cani fino a 45 kg). <a href="${A("petmate vari kennel ultra")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>5. Trixie Kennel IATA</h3>
<p>Alternativa europea economica. Omologato IATA, ciotole incluse. Cani medi. <a href="${A("trixie kennel iata")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Per l'auto</h2>
<p>Sicurezza prima di tutto. Un cane libero in auto in caso di incidente a 50 km/h diventa un proiettile. <strong>Il Codice della Strada impone il contenimento</strong> (rete divisoria, trasportino o cintura).</p>

<h3>6. 4pets Proline Eco Large</h3>
<p>Trasportino auto crash-tested, plastica riciclata, porta posteriore. Taglie M/L/XL per cani fino a 45 kg. Si fissa con cinghie di sicurezza. <a href="${A("4pets proline eco")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>7. MIM Safe Variocage</h3>
<p>Il top di gamma europeo per auto. Crash-tested con risultati eccezionali (consigliato anche per cani molto grandi). Costa 300-600 euro, ma salva la vita. <a href="${A("mim safe variocage")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>8. Ferplast Atlas Car</h3>
<p>Soluzione economica italiana per cani piccoli/medi. Non crash-tested ma ok per uso cittadino a basse velocita. <a href="${A("ferplast atlas car")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>9. Trixie Ride Like A Pro</h3>
<p>Pettorina + cintura di sicurezza auto (alternativa al trasportino). Per cani adulti in contenimento temporaneo. Non valido se il cane preferisce sedersi dietro. <a href="${A("trixie cintura sicurezza auto")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Per la moto / bici</h2>
<p>Solo per cani piccoli (fino a 8-10 kg). Serve zaino strutturato con finestre e imbottitura.</p>

<h3>10. K9 Sport Sack Air 2</h3>
<p>Zaino-trasportino top di gamma, struttura rigida interna, cani fino a 13 kg. <a href="${A("k9 sport sack air")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>11. Trixie Front Carrier</h3>
<p>Zaino frontale per cani piccoli (max 7-8 kg). Economico, ottimo per cuccioli o cani anziani per passeggiate lunghe. <a href="${A("trixie front carrier cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>12. Ferplast Atlas Bike</h3>
<p>Trasportino da fissare al portapacchi della bici, cani fino a 8 kg. Italiano. <a href="${A("ferplast atlas bike")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Per il treno</h2>
<p>Trenitalia: cani piccoli in trasportino massimo 70x30x50 cm sul sedile, gratis. Cani grandi in corridoio con museruola+guinzaglio, ticket 50%.</p>
<p>Italo: simile. Solo trasportino di piccole dimensioni ammesso in cabina.</p>
<p>Trasportino consigliato: <a href="${A("trasportino cane cabina treno")}" target="_blank" rel="noopener sponsored">Sherpa o simili</a> con misure compatibili.</p>

<h2>Come scegliere la taglia</h2>
<p>Il cane deve potersi <strong>alzare senza toccare il soffitto, girarsi su se stesso e sdraiarsi comodamente</strong>. Misura:</p>
<ul>
<li>Lunghezza (muso-coda): + 15 cm = lunghezza trasportino</li>
<li>Altezza (orecchie alzate-terra): + 10 cm = altezza trasportino</li>
<li>Larghezza (spalle): + 10 cm = larghezza trasportino</li>
</ul>

<h2>Come abituare il cane al trasportino</h2>
<ol>
<li>Lascialo aperto in casa, con coperta e giochi dentro</li>
<li>Dai pasti dentro il trasportino per 1 settimana</li>
<li>Chiudilo per 30 secondi, poi 1 minuto, poi 5 minuti</li>
<li>Fai brevi tragitti in auto (5, 10, 30 min) con rinforzo positivo</li>
<li>Non usarlo SOLO per andare dal vet: associazione negativa</li>
</ol>

<h2>Accessori utili</h2>
<ul>
<li><a href="${A("ciotola pieghevole cane")}" target="_blank" rel="noopener sponsored">Ciotola pieghevole</a> — 5 euro, indispensabile per viaggi</li>
<li><a href="${A("tappetino rinfrescante cane")}" target="_blank" rel="noopener sponsored">Tappetino rinfrescante</a> — per auto d'estate</li>
<li><a href="${A("copertura auto sedile cane")}" target="_blank" rel="noopener sponsored">Copertura sedile auto</a> — impermeabile, protegge il sedile</li>
<li><a href="${A("parasole cane auto")}" target="_blank" rel="noopener sponsored">Parasole auto</a> — evita colpi di calore</li>
</ul>

<h2>Errori comuni</h2>
<ol>
<li>Comprare trasportino troppo piccolo per "risparmiare" — il cane soffre</li>
<li>Usare il trasportino solo dal veterinario — associazione negativa a vita</li>
<li>Non assicurarlo in auto — in caso di frenata o incidente e pericolosissimo</li>
<li>Trasportino in stiva d'estate senza prenotare climatizzata — temperature estreme</li>
</ol>

<p>Prima di un viaggio in aereo, leggi la <a href="/magazine/viaggio-aereo-cane-2026-guida-completa">guida completa al viaggio aereo con il cane</a> con regole ENAC e prezzi compagnie.</p>
    `,
  },

  // ============================================================
  // CUCCIA E LETTIERE
  // ============================================================
  {
    slug: "migliori-cuccia-lettiera-cane-gatto-2026",
    titolo: "Migliori cucce per cani e lettiere per gatti 2026: modelli, materiali, prezzi",
    categoria: "accessori",
    estratto: "Cucce ortopediche, cucce da esterno, lettiere autopulenti e fondi per gatti: la selezione 2026 con link affiliati Amazon.",
    img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    tempo_lettura: "7 min",
    data: "17 Apr 2026",
    tags: ["accessori", "cuccia", "lettiera", "cane", "gatto"],
    contenuto: `
<p><em>Trasparenza: articolo con link affiliati Amazon.</em></p>

<p>La cuccia e la lettiera sono acquisti che durano anni. Sbagliare taglia o materiale significa spendere due volte. Ecco la selezione 2026 tra cucce ortopediche, lettiere autopulenti e accessori.</p>

<h2>Cucce per cani interno</h2>

<h3>1. Il marchio Bedsure (top qualita-prezzo)</h3>
<p>Cuccia ortopedica memory foam, rivestimento sfoderabile lavabile. Taglie fino a XL (cani 50+ kg). Ottimo rapporto qualita-prezzo. <a href="${A("bedsure cuccia ortopedica cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>2. Ferplast Dandy</h3>
<p>Cuscinone classico italiano, cotone lavabile. Vari colori e taglie. Pratico e resistente. <a href="${A("ferplast dandy cuccia")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>3. Fable Pets Bed (design)</h3>
<p>Cuccia semi-aperta a nicchia, materiale premium. Per cani piccoli/medi con ansia (si sentono protetti). <a href="${A("fable pets bed")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>4. Trixie Samoa Sky</h3>
<p>Cuccia-divano con bordi alti, peluche caldo. Cani anziani e cuccioli adorano. <a href="${A("trixie samoa sky cuccia")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Cucce ortopediche (per cani anziani o con displasia)</h2>

<h3>5. PetFusion Ultimate Dog Bed</h3>
<p>Memory foam 10 cm di spessore, rivestimento impermeabile. Consigliata da veterinari per cani con artrite, displasia, post-operatorio. <a href="${A("petfusion ultimate dog bed")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>6. Big Barker Orthopedic</h3>
<p>Top di gamma americana per cani grandi (>40 kg). Cuscino memory foam 17 cm, 10 anni di garanzia. Prezzo alto ma imbattibile. <a href="${A("big barker orthopedic")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Cucce da esterno (giardino)</h2>

<h3>7. Ferplast Koda</h3>
<p>Cuccia in plastica resistente, isolata, facile da pulire. Taglie fino a L (cani 30 kg). Ideale come cuccia estiva in giardino (non lasciare cane fuori d'inverno!). <a href="${A("ferplast koda cuccia esterno")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>8. Trixie Natura Log Cabin</h3>
<p>Cuccia in legno tipo chalet, tetto impermeabile. Vera casetta da giardino, ma sempre: il cane deve poter entrare in casa sempre. <a href="${A("trixie natura log cabin")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Lettiere per gatti</h2>

<h3>9. Petkit Pura X (autopulente smart)</h3>
<p>Lettiera autopulente con app, sensori di peso. Alta fascia (500+ euro), ma per chi lavora molto e ha piu gatti e investimento. <a href="${A("petkit pura x lettiera")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>10. Curver PetLife</h3>
<p>Lettiera classica chiusa con tetto, filtro carboni attivi, pala inclusa. Economica e affidabile. <a href="${A("curver petlife lettiera")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>11. IRIS Top Entry</h3>
<p>Lettiera con apertura dall'alto, evita lanci di sabbia in giro. Ottima per gatti che sporcano fuori. <a href="${A("iris top entry lettiera")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Fondi/sabbia per lettiera</h2>

<h3>12. Cat's Best Original (vegetale)</h3>
<p>Fibre vegetali, agglomerante, biodegradabile. Il piu venduto in Europa. Un sacco da 17 kg dura 4-6 settimane per un gatto. <a href="${A("cat's best original 17kg")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>13. Tigerino Ultra Bentonite</h3>
<p>Argilla agglomerante economica. Ottimo rapporto qualita-prezzo. Un po' polverosa per gatti con allergie respiratorie. <a href="${A("tigerino ultra bentonite")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>14. Sepiolite Sabbia Silicata</h3>
<p>Sabbia leggera al silicio, assorbe molto. Ideale per gatti anziani o con problemi respiratori. <a href="${A("sabbia silicata lettiera gatto")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Accessori correlati</h2>
<ul>
<li><a href="${A("paletta lettiera gatto")}" target="_blank" rel="noopener sponsored">Paletta ergonomica</a> — 5 euro, indispensabile</li>
<li><a href="${A("tappetino esterno lettiera")}" target="_blank" rel="noopener sponsored">Tappetino esterno lettiera</a> — cattura granuli sulle zampe</li>
<li><a href="${A("spray neutralizzatore odori gatto")}" target="_blank" rel="noopener sponsored">Spray neutralizzatore odori</a> — enzimatico, non copre l'odore, lo elimina</li>
<li><a href="${A("coprisedia impermeabile cane")}" target="_blank" rel="noopener sponsored">Coprisedia impermeabile</a> — se il cane sale sul divano</li>
</ul>

<h2>Come scegliere la cuccia giusta</h2>
<ol>
<li><strong>Taglia</strong>: misura il cane sdraiato + 20%</li>
<li><strong>Bordi</strong>: cani anziani preferiscono bordi bassi per salire</li>
<li><strong>Materiale</strong>: memory foam per cani anziani/grandi, cotone per cuccioli</li>
<li><strong>Sfoderabile</strong>: sempre. Lavaggio frequente evita pulci e odori</li>
<li><strong>Posizione</strong>: zona tranquilla ma vicino alla famiglia, lontano da correnti</li>
</ol>

<h2>Come scegliere la lettiera giusta</h2>
<ol>
<li><strong>Dimensione</strong>: almeno 1,5 volte il gatto in lunghezza</li>
<li><strong>Chiusa o aperta?</strong> Gatti giovani e curiosi preferiscono aperte, anziani le chiuse</li>
<li><strong>Quante ne servono?</strong> Regola d'oro: 1 lettiera per gatto + 1. 2 gatti = 3 lettiere</li>
<li><strong>Posizione</strong>: tranquilla, lontana da cibo e acqua</li>
<li><strong>Pulizia</strong>: quotidiana. Cambio totale ogni 7-10 giorni</li>
</ol>

<h2>Errori comuni</h2>
<ul>
<li>Cuccia troppo piccola — il cane si rannicchia, dorme male, male a lungo termine</li>
<li>Lettiera in garage/balcone — il gatto sporca dove preferisce, non dove decidi tu</li>
<li>Sabbia profumata artificiale — molti gatti la rifiutano</li>
<li>Non lavare mai la cuccia — accumulo di pulci, zecche, odori</li>
</ul>

<p>Cerchi un <a href="/cliniche">veterinario comportamentalista</a> se il tuo gatto sporca fuori lettiera nonostante le accortezze? Puo essere sintomo di stress o cistite.</p>
    `,
  },

  // ============================================================
  // ASSICURAZIONI
  // ============================================================
  {
    slug: "migliori-assicurazioni-sanitarie-cani-2026",
    titolo: "Migliori assicurazioni sanitarie per cani 2026: confronto, prezzi, coperture",
    categoria: "salute",
    estratto: "Assicurazione cane: vale la pena? Confronto tra Santevet, ConTe, Figo, Zurich. Cosa coprono, franchigie, massimali. Guida al risparmio sul veterinario.",
    img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
    tempo_lettura: "8 min",
    data: "17 Apr 2026",
    tags: ["salute", "assicurazione", "veterinario", "costi"],
    contenuto: `
<p><em>Trasparenza: articolo informativo. Le compagnie citate non sono partner commerciali. I prodotti Amazon segnalati sono accessori correlati, non polizze.</em></p>

<p>Una visita veterinaria urgente puo costare 150-300 euro. Un intervento chirurgico 1.000-5.000 euro. Una chemioterapia per un tumore: 6.000-15.000 euro. Non tutti possono affrontare queste cifre all'improvviso. Ecco perche le assicurazioni sanitarie per cani stanno crescendo in Italia. Guida 2026 al confronto e ai tranelli da evitare.</p>

<h2>Vale la pena un'assicurazione?</h2>
<p>Dipende da:</p>
<ul>
<li><strong>Eta del cane</strong> — sotto 5 anni le premi sono basse, sopra 8 anni possono superare 600 euro/anno</li>
<li><strong>Razza</strong> — Bulldog, Carlino, Boxer, Golden hanno premi alti per predisposizioni genetiche</li>
<li><strong>La tua capacita di gestire spese impreviste</strong> — se potresti non sostenere 5.000 euro all'improvviso, l'assicurazione ha senso</li>
<li><strong>Cane di valore affettivo</strong> — la polizza riduce il rischio di dover scegliere tra economia e trattamento</li>
</ul>

<h3>Quando NON serve</h3>
<ul>
<li>Cane anziano con patologie gia sviluppate — le compagnie escludono il preesistente</li>
<li>Se hai gia un fondo di emergenza di almeno 3.000-5.000 euro accantonato</li>
<li>Cane sano, giovane, razza senza predisposizioni, proprietario con reddito alto</li>
</ul>

<h2>Le 5 principali compagnie in Italia</h2>

<h3>1. Santevet</h3>
<p>Francese, leader in UE. Piano Classico e Premium. Rimborsi 70-90% spese veterinarie. Franchigia opzionale. Copre malattia, incidenti, interventi, esami.</p>
<ul>
<li>Premio annuo Labrador 4 anni: ~300-500 euro</li>
<li>Massimale annuo: 1.500-3.000 euro (piano base), fino a 7.000 (premium)</li>
<li>Non copre: castrazione/sterilizzazione, vaccini, profilassi</li>
</ul>

<h3>2. ConTe.it (Generali)</h3>
<p>Italiana, comparazione facile online. 3 piani (Essenziale, Comfort, Top). Rimborso 70%, franchigia 50 euro.</p>
<ul>
<li>Premio annuo: 150-400 euro</li>
<li>Massimale annuo: 1.000-5.000 euro</li>
<li>Include responsabilita civile (se il cane morde)</li>
</ul>

<h3>3. Petsure (UnipolSai)</h3>
<p>Italiana, varie formule. Rimborso 80%, massimali da 1.500 a 6.000 euro/anno.</p>
<ul>
<li>Premio medio: 250-450 euro/anno</li>
<li>Copre anche comportamentale e fisioterapia (piano alto)</li>
<li>Cani fino a 9 anni (sottoscrizione iniziale)</li>
</ul>

<h3>4. Zurich Pet</h3>
<p>Recentemente uscita. Formule flessibili, rimborso fino al 90%. Piu costosa della media ma coperture ampie.</p>
<ul>
<li>Premio annuo: 300-600 euro</li>
<li>Copre anche medicina preventiva (piano premium)</li>
</ul>

<h3>5. Figo Pet Insurance</h3>
<p>Compagnia USA con sede italiana dal 2024. Rimborso fino a 100% dopo franchigia. Buona app mobile.</p>
<ul>
<li>Premio annuo: 250-500 euro</li>
<li>Tempi rimborso veloci (7-15 giorni)</li>
</ul>

<h2>Cosa guardare in una polizza</h2>

<h3>Franchigia</h3>
<p>Somma a tuo carico per ogni sinistro. Piu alta = premio basso, ma tu paghi piu di tasca. Valore tipico: 50-150 euro per evento.</p>

<h3>Percentuale rimborso</h3>
<p>70%, 80%, 90%. Piu alta = premio alto. Una fattura di 1.000 euro con franchigia 100 e rimborso 80%: ricevi 720 euro, paghi 280.</p>

<h3>Massimale annuo</h3>
<p>Tetto massimo rimborsabile in 1 anno. Da 1.000 euro (base) a 7.000 euro (premium). Per cani grandi con problemi articolari, sotto 3.000 e poco.</p>

<h3>Periodo di carenza</h3>
<p>Tempo in cui la polizza non copre. Tipico: 15 gg per incidenti, 60 gg per malattia. Leggi bene.</p>

<h3>Esclusioni</h3>
<p>Patologie preesistenti, malattie congenite/ereditarie (cruciale per razze predisposte), odontologia, comportamento. Ogni polizza le specifica.</p>

<h2>Quanto risparmi davvero? Caso reale</h2>
<p>Labrador di 6 anni con rottura del legamento crociato (problema molto comune):</p>
<ul>
<li>Intervento TPLO: 2.500-3.500 euro</li>
<li>Fisioterapia post-op: 800 euro</li>
<li>Controlli + farmaci: 400 euro</li>
<li><strong>Totale fattura: ~4.000 euro</strong></li>
<li>Rimborso polizza media (80% dopo franchigia 100 euro): ~3.120 euro</li>
<li><strong>Risparmio: ~3.120 euro</strong></li>
</ul>
<p>Con un premio annuale di 350 euro, dopo <strong>9 anni di assicurazione</strong> sei pari in caso di <em>un unico grosso sinistro</em>. Se ne capita uno prima, sei in guadagno.</p>

<h2>Alternative al risparmio</h2>

<h3>Fondo di emergenza personale</h3>
<p>Metti da parte 30-50 euro al mese su un conto deposito. Dopo 5 anni hai 2.000-3.000 euro disponibili. Se nulla succede, sono tuoi.</p>

<h3>Pre-pagamento veterinario</h3>
<p>Alcuni veterinari offrono pacchetti annui con sconto: vaccini + profilassi + 2 visite a 250 euro. Conviene per cane giovane sano.</p>

<h3>Carta convenzionata</h3>
<p>Alcune catene (Cani Vet, Anicura) offrono carte con sconti del 10-20% su tutto. Gratis o a basso costo.</p>

<h2>Cosa NON copre praticamente nessuna polizza</h2>
<ul>
<li>Vaccini ordinari, antiparassitari di routine</li>
<li>Castrazione/sterilizzazione</li>
<li>Patologie esistenti prima della sottoscrizione</li>
<li>Malattie ereditarie (varia per compagnia)</li>
<li>Parto e patologie della gravidanza</li>
<li>Patologie comportamentali (a volte coperte nei piani premium)</li>
<li>Estetica (pulizia denti, spazzolatura)</li>
</ul>

<h2>Come sottoscrivere</h2>
<ol>
<li>Visita veterinaria completa (certifica salute del cane)</li>
<li>Confronto online tra 3-4 compagnie (simulatori gratuiti su Conte.it, Santevet.it)</li>
<li>Leggi condizioni generali, soprattutto esclusioni</li>
<li>Firma polizza, invio microchip e libretto sanitario</li>
<li>Attendi carenza, poi sei coperto</li>
</ol>

<h2>Tool correlati MifidoDiTe</h2>
<ul>
<li><a href="/costo-cane">Calcolatore costo cane annuale</a> — include anche spesa vet media</li>
<li><a href="/cliniche">Directory veterinari</a> — cerca per zona e specializzazione</li>
<li><a href="/magazine/migliori-antiparassitari-cani-2026">Guida antiparassitari</a> — prevenzione riduce sinistri</li>
</ul>

<h2>Accessori per emergenze</h2>
<ul>
<li><a href="${A("kit primo soccorso cane")}" target="_blank" rel="noopener sponsored">Kit primo soccorso cane</a> — bendaggi, pinza zecche, siringa orale</li>
<li><a href="${A("termometro digitale cane")}" target="_blank" rel="noopener sponsored">Termometro digitale</a> — normale 38-39 C</li>
<li><a href="${A("museruola morbida cane")}" target="_blank" rel="noopener sponsored">Museruola morbida</a> — per situazioni di stress o dolore</li>
<li><a href="${A("cono post operatorio cane")}" target="_blank" rel="noopener sponsored">Collare post-operatorio</a> — morbido, meglio del classico cono di plastica</li>
</ul>

<h2>FAQ</h2>
<p><strong>Quando sottoscrivere?</strong><br/>Il prima possibile. I cuccioli hanno premi bassi e nessuna patologia preesistente.</p>
<p><strong>Posso cambiare compagnia?</strong><br/>Si, ma ogni volta hai un periodo di carenza nuovo. Non farlo con leggerezza.</p>
<p><strong>Copre anche all'estero?</strong><br/>Dipende. Santevet si, ConTe solo UE 90 giorni. Leggi sempre il contratto.</p>

<p>Per una stima personalizzata dei costi del tuo cane, usa il <a href="/costo-cane">calcolatore costi</a>.</p>
    `,
  },

  // ============================================================
  // GUINZAGLI
  // ============================================================
  {
    slug: "migliori-guinzagli-pettorine-cane-2026",
    titolo: "Migliori guinzagli e pettorine per cani 2026: tipi, materiali, come scegliere",
    categoria: "accessori",
    estratto: "Guinzagli fissi, longhi, scorrevoli. Pettorine anti-tiro, a H, step-in. La selezione 2026 con prezzi, taglie e link Amazon.",
    img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
    tempo_lettura: "7 min",
    data: "17 Apr 2026",
    tags: ["accessori", "guinzaglio", "pettorina", "shopping"],
    contenuto: `
<p><em>Trasparenza: articolo con link affiliati Amazon.</em></p>

<p>Guinzaglio e pettorina sono gli accessori piu usati nella vita del cane. Una scelta sbagliata puo causare: tirate, strappi al collo, pelle irritata, fughe pericolose. Ecco la selezione 2026 per ogni esigenza: passeggiata urbana, trekking, educazione, cuccioli.</p>

<h2>Guinzaglio vs collare vs pettorina</h2>
<p>Per quasi tutti i cani la scelta migliore e <strong>pettorina + guinzaglio fisso</strong>. Il collare solo per identificazione (con medaglietta) e solo su cani educati al guinzaglio che non tirano.</p>

<h3>Cani che DEVONO usare pettorina</h3>
<ul>
<li>Cuccioli (collo fragile in crescita)</li>
<li>Razze brachicefale (Bulldog, Carlino, Boxer)</li>
<li>Cani che tirano</li>
<li>Cani con problemi alla trachea o alla cervicale</li>
<li>Cani anziani</li>
</ul>

<h2>Pettorine consigliate</h2>

<h3>1. Ruffwear Front Range</h3>
<p>Top di gamma americana. Imbottita, regolabile, due punti di attacco (dorso + petto anti-tiro). Taglie XXS-XL. Reggica un Pastore Tedesco adulto senza stress. <a href="${A("ruffwear front range pettorina")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>2. Julius-K9 IDC Power</h3>
<p>Tedesca, usata anche dalla polizia. Regge fino a 60 kg di trazione. Maniglia sul dorso per aiutare il cane a salire in auto. Scritta personalizzabile. <a href="${A("julius k9 idc power")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>3. Kurgo Tru-Fit Smart Harness</h3>
<p>Crash-tested per auto — funge anche da cintura di sicurezza. Ottima per chi viaggia spesso in macchina. <a href="${A("kurgo tru-fit smart harness")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>4. PoyPet No Pull Pettorina anti-tiro</h3>
<p>Economica, reflective, anti-tiro con punto frontale. Ottima per cuccioli in addestramento. <a href="${A("poypet pettorina no pull")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>5. Trixie Premium (H)</h3>
<p>Pettorina a H classica europea. Economica, robusta, facile da indossare. Buon rapporto qualita-prezzo per cani educati. <a href="${A("trixie premium pettorina h")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Guinzagli</h2>

<h3>6. Guinzaglio fisso tessile 3 m (Ferplast Ergocomfort)</h3>
<p>Il classico che serve sempre. Imbottito, moschettone resistente. Lunghezza 1,2-3 m. <a href="${A("ferplast ergocomfort guinzaglio")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>7. Guinzaglio doppio attacco (Halti Training Lead)</h3>
<p>Doppia lunghezza, doppio moschettone: usa a 1,5 m in citta, 3 m nei parchi, tieni il cane libero mentre ti arrotola. Geniale. <a href="${A("halti training lead")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>8. Guinzaglio corda trekking (Ruffwear Knot-a-Leash)</h3>
<p>Corda da arrampicata, moschettone twist-lock (non si apre mai). Per trekking, spiagge libere, ambienti difficili. <a href="${A("ruffwear knot a leash")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>9. Longhina 5-10 m (Tau Longhina)</h3>
<p>Per addestramento richiamo, controllo in spiagge off-leash, campi. Tau e italiana, nylon plastificato lavabile. <a href="${A("tau longhina addestramento")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>10. Guinzaglio riavvolgibile Flexi New Classic</h3>
<p>ATTENZIONE: <strong>sconsigliato in citta</strong>. Va bene SOLO in aree aperte controllate. In citta e pericoloso (scatti improvvisi, dita tagliate, impossibilita di trattenere in emergenza). Per campagna e OK. <a href="${A("flexi new classic guinzaglio")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>11. Guinzaglio mani libere (Ruffwear Trail Runner)</h3>
<p>Per runner. Cintura elastica attorno ai fianchi, guinzaglio ammortizzato. <a href="${A("ruffwear trail runner")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Collari</h2>
<p>Solo per identificazione. Mai per uso quotidiano su cani che tirano.</p>

<h3>12. Collare reflective (Ruffwear Front Range Collar)</h3>
<p>Leggero, catarifrangente, taglie small-large. Per portare medaglietta identificativa. <a href="${A("ruffwear front range collar")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h3>13. Collare in pelle classico</h3>
<p>Estetico per cane educato. Cuoio pieno fiore italiano dura 10+ anni. <a href="${A("collare pelle cuoio cane")}" target="_blank" rel="noopener sponsored">Vedi su Amazon</a>.</p>

<h2>Accessori utili</h2>
<ul>
<li><a href="${A("medaglietta personalizzata cane")}" target="_blank" rel="noopener sponsored">Medaglietta personalizzata</a> — nome + numero telefono</li>
<li><a href="${A("gps tracker cane tractive")}" target="_blank" rel="noopener sponsored">GPS Tracker Tractive</a> — se il cane scappa lo ritrovi</li>
<li><a href="${A("led collare cane")}" target="_blank" rel="noopener sponsored">Collare LED ricaricabile</a> — visibilita in notturna</li>
<li><a href="${A("porta sacchetti cane")}" target="_blank" rel="noopener sponsored">Porta sacchetti da guinzaglio</a> — sempre dietro</li>
</ul>

<h2>Come scegliere la taglia</h2>

<h3>Pettorina</h3>
<ol>
<li>Misura il <strong>giro torace</strong> subito dietro le zampe anteriori</li>
<li>Misura il <strong>giro collo</strong> alla base</li>
<li>Aggiungi 2-3 cm di margine</li>
<li>Pettorina ben regolata: ci passano 2 dita sotto le cinghie</li>
</ol>

<h3>Guinzaglio</h3>
<ul>
<li><strong>1,2-1,5 m</strong>: citta, strada trafficata</li>
<li><strong>2-3 m</strong>: parchi, boschi, sentieri stretti</li>
<li><strong>5-10 m</strong>: addestramento, spiagge libere, campi</li>
</ul>

<h2>Errori comuni</h2>
<ol>
<li><strong>Collare strangolatore</strong>: vietato per cani educati, pericoloso (trachea)</li>
<li><strong>Guinzaglio troppo corto in trekking</strong>: cane sbilanciato, cadute</li>
<li><strong>Pettorina solo con cinghia ventrale</strong>: scappa spingendo indietro. Scegli pettorina a H o con chiusura dorsale</li>
<li><strong>Moschettone debole</strong>: cani grandi possono aprirli con uno strappo</li>
<li><strong>Flexi in citta</strong>: incidenti, dita tagliate, cane sotto auto</li>
</ol>

<h2>Come abituare un cane al guinzaglio</h2>
<p>Vai alla guida <a href="/magazine/cane-tira-guinzaglio-esercizi-condotta">"Cane che tira al guinzaglio: 5 esercizi"</a> per il protocollo completo in 3 settimane.</p>

<h2>FAQ</h2>
<p><strong>Pettorina o collare per cuccioli?</strong><br/>SEMPRE pettorina. Il collo e fragile fino ai 6-8 mesi.</p>
<p><strong>Pettorina ferma la crescita del petto?</strong><br/>Falso mito. Pettorine a H ben regolate non causano problemi.</p>
<p><strong>Meglio pettorina o halti/museruola gentile?</strong><br/>L'halti (testiera) e uno strumento di educazione temporaneo. Non e l'accessorio da usare ogni giorno.</p>

<p>Cerchi un <a href="/professionisti">educatore cinofilo</a> per aiutare il tuo cane con la condotta al guinzaglio? Su MifidoDiTe.eu trovi professionisti verificati nella tua zona.</p>
    `,
  },
];
