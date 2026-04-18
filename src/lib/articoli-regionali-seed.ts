// Articoli magazine — hub nazionali e guide regionali/citta
// Target: query come "sentieri dog friendly Toscana", "ristoranti pet friendly Milano"

export const ARTICOLI_REGIONALI = [
  // ============================================================
  // HUB SENTIERI NAZIONALE
  // ============================================================
  {
    slug: "migliori-sentieri-dog-friendly-italia-2026",
    titolo: "I migliori sentieri dog-friendly in Italia 2026: 20 escursioni da nord a sud",
    categoria: "sentieri",
    estratto: "Dalle Dolomiti all'Etna, 20 sentieri dove portare il cane in Italia: difficolta, lunghezza, ombra, acqua. La selezione completa regione per regione.",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    tempo_lettura: "10 min",
    data: "17 Apr 2026",
    tags: ["sentieri", "trekking", "dog-friendly", "italia", "escursioni"],
    contenuto: `
<p>L'Italia ha oltre 60.000 km di sentieri CAI e una varieta paesaggistica che non ha eguali in Europa. Ma quali sono quelli <strong>davvero percorribili con il cane</strong>? Ecco la nostra selezione, aggiornata al 2026, di 20 escursioni regione per regione: tutte accettano cani al guinzaglio, molte hanno ombra e acqua, alcune sono adatte anche ai cuccioli.</p>

<h2>Come abbiamo scelto i sentieri</h2>
<p>Ogni sentiero in questa lista rispetta 4 criteri:</p>
<ul>
<li><strong>Cani ammessi al guinzaglio</strong> (non solo "tollerati")</li>
<li>Acqua potabile disponibile o fontane lungo il percorso</li>
<li>Difficolta accessibile (abbiamo escluso vie ferrate e tratti attrezzati)</li>
<li>Segnaletica CAI ufficiale o alternative tracciate</li>
</ul>
<p>La lista completa di tutti i sentieri schedati con mappe interattive e nella sezione <a href="/sentieri">Sentieri dog-friendly</a>.</p>

<h2>Nord — Dolomiti e Alpi</h2>

<h3>1. Giro del Lago di Braies (Trentino-Alto Adige)</h3>
<p>3,5 km pianeggianti intorno al lago piu fotografato delle Dolomiti. Passerelle in legno, acqua dappertutto, ombra dei larici. Adatto a cuccioli e cani anziani. <a href="/sentieri/lago-braies-escursione">Dettagli, mappa e meteo</a>.</p>

<h3>2. Sentiero del Ponale (Trentino)</h3>
<p>5 km ricavati nella roccia a picco sul Lago di Garda. Ex strada militare, asfaltata e comoda. Vista mozzafiato, ombra parziale. <a href="/sentieri/sentiero-del-ponale-riva">Apri scheda</a>.</p>

<h3>3. Giro delle Tre Cime di Lavaredo (Veneto)</h3>
<p>10 km ad anello, il classico delle Dolomiti. Dislivello 400 m, paesaggio iconico. Attenzione al sole in alta quota: porta acqua extra. <a href="/sentieri/giro-tre-cime-lavaredo">Scheda completa</a>.</p>

<h3>4. Sentiero del Viandante (Lombardia)</h3>
<p>45 km lungo il Lago di Como, da Abbadia Lariana a Colico. Percorribile a tappe di 8-10 km. Boschi ombrosi, borghi e vista lago costante.</p>

<h3>5. Giro di Monte Isola (Lombardia)</h3>
<p>9 km intorno all'isola lacustre piu grande d'Europa (Lago d'Iseo). Senza auto, ombra degli ulivi, fontane. Ideale per cani anziani.</p>

<h2>Centro — Liguria, Toscana, Umbria, Lazio</h2>

<h3>6. Sentiero Azzurro — Cinque Terre (Liguria)</h3>
<p>12 km tra i 5 borghi liguri. Alcuni tratti sono a pagamento (Cinque Terre Card), cani al guinzaglio corto. Molto frequentato: parti presto. <a href="/sentieri/sentiero-azzurro-cinque-terre">Mappa e info</a>.</p>

<h3>7. Via Francigena — tappa San Gimignano (Toscana)</h3>
<p>18 km tra le colline senesi, arrivo alle celebri torri medievali. Sterrato, fontane nei borghi. <a href="/sentieri/via-francigena-san-gimignano">Scheda sentiero</a>.</p>

<h3>8. Sentiero della Bonifica (Toscana)</h3>
<p>62 km piatti lungo il Canale Maestro della Chiana, da Arezzo a Chiusi. Anche in bici. Perfetto per cani con problemi articolari. <a href="/sentieri/sentiero-della-bonifica-valdichiana">Apri</a>.</p>

<h3>9. Anello del Monte Amiata (Toscana)</h3>
<p>10 km nel faggeto secolare del vulcano spento. Ombra totale anche a Ferragosto: il sentiero piu fresco d'estate nel centro Italia.</p>

<h3>10. Cammino di San Benedetto (Umbria/Lazio)</h3>
<p>300 km da Norcia a Montecassino, percorribile in 3-16 giorni a seconda delle tappe. Ospitalita pet-friendly in molte strutture.</p>

<h3>11. Sentiero del Monte Circeo (Lazio)</h3>
<p>7 km ad anello nel Parco Nazionale del Circeo. Vista mare, macchia mediterranea. Evita luglio-agosto (sole forte).</p>

<h2>Sud — Campania, Puglia, Abruzzo, Sicilia, Sardegna</h2>

<h3>12. Sentiero degli Dei (Campania)</h3>
<p>8 km sulla Costiera Amalfitana, da Agerola a Nocelle. Dislivello 400 m, vista sui Faraglioni di Capri. <a href="/sentieri/sentiero-degli-dei-costiera">Scheda</a>.</p>

<h3>13. Foresta Umbra — Gargano (Puglia)</h3>
<p>Anelli da 1h a 4h nel Parco del Gargano. Faggeto denso, ombra totale. Ideale per cuccioli nelle prime uscite lunghe.</p>

<h3>14. Campo Imperatore (Abruzzo)</h3>
<p>10 km sull'altopiano del Gran Sasso, il "Piccolo Tibet". Cavalli selvaggi, vista Corno Grande. Attenzione al vento.</p>

<h3>15. Sentiero del Cuore a Scanno (Abruzzo)</h3>
<p>3 km facili al punto panoramico del lago a forma di cuore. Adatto a tutti, anche famiglie con bambini. <a href="/sentieri/sentiero-del-cuore-scanno">Apri</a>.</p>

<h3>16. Riserva dello Zingaro (Sicilia)</h3>
<p>14 km lungo 7 km di costa incontaminata. Cani al guinzaglio, no in acqua (tutela nidificazione). Porta molta acqua: nessuna fonte.</p>

<h3>17. Sentiero Schiena dell'Asino — Etna (Sicilia)</h3>
<p>5 km verso il cratere Valle del Bove. Paesaggio lunare, roccia lavica (attenzione ai cuscinetti del cane). Bella al tramonto.</p>

<h3>18. Gola di Gorropu (Sardegna)</h3>
<p>Il canyon piu profondo d'Europa. 8 km impegnativi, solo cani allenati e adulti. Scarpone trekking obbligatorio anche per te.</p>

<h3>19. Trekking Cala Luna (Sardegna)</h3>
<p>10 km costieri nel Supramonte, arrivo alla spiaggia di Cala Luna. Difficile, tratti esposti. Solo cani esperti.</p>

<h3>20. Sentiero Rilke — Trieste (Friuli)</h3>
<p>2 km facili a picco sul Carso, vista Golfo di Trieste. Perfetto per una passeggiata serale. <a href="/sentieri/sentiero-rilke-trieste">Apri scheda</a>.</p>

<h2>Cosa portare sempre</h2>
<ul>
<li>Acqua (almeno 500 ml per cane + ciotola pieghevole)</li>
<li>Guinzaglio da 3 m (obbligatorio in quasi tutti i parchi)</li>
<li>Sacchetti per i bisogni</li>
<li>Pettorina (mai collare su sentieri tecnici)</li>
<li>Kit primo soccorso con pinza leva-zecche</li>
<li>Documento cane (microchip + libretto sanitario)</li>
</ul>

<h2>FAQ rapide</h2>
<p><strong>Il cane puo andare libero sui sentieri?</strong><br/>Quasi mai. In tutti i Parchi Nazionali e regionali il guinzaglio e obbligatorio (max 1,5-3 m secondo l'area).</p>
<p><strong>Quali sentieri sono vietati ai cani?</strong><br/>Il Parco Nazionale d'Abruzzo (aree orso marsicano), alcune riserve WWF con nidificazioni, tratti attrezzati con scale e ferrate.</p>
<p><strong>Quali razze sono piu adatte al trekking?</strong><br/>Vedi la nostra <a href="/razze">guida alle razze</a>: Border Collie, Pastore Australiano, Labrador, meticci di taglia media sono ideali.</p>

<p>Cerchi un sentiero nella tua regione? Sfoglia la mappa interattiva dei <a href="/sentieri">sentieri dog-friendly</a> con filtri per difficolta, lunghezza e ombra.</p>
    `,
  },

  // ============================================================
  // SENTIERI TRENTINO-ALTO ADIGE
  // ============================================================
  {
    slug: "sentieri-dog-friendly-trentino-alto-adige-2026",
    titolo: "Sentieri dog-friendly in Trentino-Alto Adige: le 10 escursioni migliori",
    categoria: "sentieri",
    estratto: "Dolomiti, Val di Funes, Alpe di Siusi, Lago di Braies: i 10 sentieri del Trentino-Alto Adige dove il cane e ammesso al guinzaglio. Difficolta, altimetria, consigli.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    tempo_lettura: "8 min",
    data: "17 Apr 2026",
    tags: ["sentieri", "trentino", "alto adige", "dolomiti", "trekking"],
    contenuto: `
<p>Trentino-Alto Adige e una delle regioni piu pet-friendly d'Italia per chi ama il trekking. Tra Dolomiti UNESCO, altopiani verdi e laghi alpini, i cani sono ammessi al guinzaglio praticamente ovunque — a eccezione delle riserve con bestiame pascolante e alcuni tratti attrezzati. Ecco le 10 escursioni imperdibili del 2026.</p>

<h2>1. Alpe di Siusi (Castelrotto, BZ)</h2>
<p>Il piu grande altipiano d'Europa (56 km2) ai piedi dello Sciliar. Sentieri facili tra prati fioriti, malghe e vista Dolomiti. Circuito base: 8 km, dislivello 200 m, adatto anche a cuccioli. <a href="/sentieri/sentiero-alpe-siusi-dolomiti">Apri scheda completa</a>.</p>
<p><strong>Attenzione mucche</strong>: da giugno a settembre i prati sono pascolati. Tieni il cane al guinzaglio corto e lontano da vitelli e cani da pastore.</p>

<h2>2. Giro del Lago di Braies</h2>
<p>Il lago piu fotografato delle Dolomiti, 3,5 km ad anello. Passerelle in legno, acqua ovunque, molta ombra. Perfetto con cani anziani. <a href="/sentieri/lago-braies-escursione">Scheda</a>.</p>
<p>Parcheggio a pagamento e regolamentato da giugno a settembre (prenotazione obbligatoria): arriva prima delle 9 o dopo le 16 per evitare folla.</p>

<h2>3. Val di Funes — Sentiero delle Odle</h2>
<p>12 km con dislivello 600 m. Trekking di media difficolta con vista sul gruppo UNESCO delle Odle. Cani ammessi ma tratti esposti: no a cuccioli e cani con problemi articolari. <a href="/sentieri/val-di-funes-odle">Apri</a>.</p>

<h2>4. Sentiero del Ponale (Riva del Garda, TN)</h2>
<p>5 km asfaltati a picco sul Lago di Garda. Ex strada militare con una vista tra le piu fotografate d'Italia. Ombra parziale, dislivello dolce. <a href="/sentieri/sentiero-del-ponale-riva">Scheda</a>.</p>

<h2>5. Giro delle Cascate di Riva (BZ)</h2>
<p>Anello di 4 km intorno al borgo di Riva di Tures, 3 cascate in successione. Bosco fitto, sempre all'ombra, fontane abbondanti. Ottimo d'estate.</p>

<h2>6. Sentiero dei Castagni — Foiana (BZ)</h2>
<p>7 km tra i castagneti secolari sopra Lana. Panorama su Merano e Val d'Adige, ombra totale, adatto a tutti. Periodo migliore: ottobre, con i colori autunnali.</p>

<h2>7. Altopiano del Renon — Trenino storico + sentiero</h2>
<p>Sali in funivia da Bolzano, poi trenino storico, poi sentieri pianeggianti a 1200 m. Circuito del Corno del Renon: 6 km facili con panorama su Dolomiti. Cani sulle funivie sono ammessi.</p>

<h2>8. Lago di Carezza — Trekking Latemar</h2>
<p>Il lago arcobaleno del Latemar e punto di partenza di diverse escursioni. Giro del lago: 1,5 km facilissimi. Trekking al Rifugio Fronza: 7 km, dislivello 500 m.</p>

<h2>9. Val di Fassa — Sentiero Panorama</h2>
<p>Da Canazei al Rifugio Vajolet, 10 km con cabinovia per risparmiare dislivello. Vista sul Catinaccio, fiori alpini a giugno. Difficolta media.</p>

<h2>10. Altopiano di Pine — Laghi di Serraia e Piazze</h2>
<p>Circuito dei 2 laghi, 9 km totali. Sterrato, pianeggiante, mucche al pascolo. Ristoro ogni 3 km. Tra i piu famigliari del Trentino.</p>

<h2>Regole regionali per cani sui sentieri</h2>
<ul>
<li><strong>Guinzaglio obbligatorio</strong> in quasi tutti i parchi, max 1,5 m in aree SIC/ZPS</li>
<li>Museruola non obbligatoria ma consigliata in aree con bestiame</li>
<li><strong>Sacchetti per i bisogni</strong>: multe fino a 500 euro in alcuni comuni</li>
<li>Alcuni rifugi accettano cani solo in spazi esterni (controlla prima)</li>
</ul>

<h2>Dove dormire con il cane</h2>
<p>Vedi la selezione di <a href="/vacanze/regione/trentino-alto-adige">hotel e agriturismi pet-friendly in Trentino-Alto Adige</a>. Segnaliamo il <a href="/vacanze/palace-hotel-merano">Palace Hotel Merano</a> (5 stelle termale, cani di tutte le taglie in camera).</p>

<h2>Cosa portare in montagna</h2>
<ul>
<li>Pettorina H (mai collare in salita)</li>
<li>Scarpine per terreni rocciosi a quote alte</li>
<li>Giubbotto leggero sopra i 2000 m (anche d'estate la sera fa fresco)</li>
<li>Pinza leva-zecche (a quote basse, sotto i 1500 m)</li>
<li>Acqua extra: oltre 2000 m le fonti sono rare</li>
</ul>

<p>La mappa completa dei <a href="/sentieri">sentieri in Italia</a> include altri 20 percorsi verificati in altre regioni.</p>
    `,
  },

  // ============================================================
  // SENTIERI TOSCANA
  // ============================================================
  {
    slug: "sentieri-dog-friendly-toscana-2026",
    titolo: "Sentieri dog-friendly in Toscana: 10 escursioni tra colline, mare e parchi",
    categoria: "sentieri",
    estratto: "Via Francigena, Amiata, Val d'Orcia, Costa degli Etruschi: la selezione dei migliori sentieri toscani pet-friendly, con difficolta, ombra e servizi.",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    tempo_lettura: "8 min",
    data: "17 Apr 2026",
    tags: ["sentieri", "toscana", "trekking", "val d'orcia", "via francigena"],
    contenuto: `
<p>La Toscana dei cipressi e delle crete senesi si presta perfettamente al trekking con il cane. Sentieri dolci, molta ombra, borghi ogni 10 km e una tradizione di accoglienza pet-friendly radicata. Ecco 10 escursioni selezionate, dai dolci della Val d'Orcia alle foreste dell'Amiata alla costa etrusca.</p>

<h2>1. Via Francigena — tappa San Gimignano</h2>
<p>18 km da Gambassi Terme a San Gimignano. Sterrato, colline coltivate, arrivo alle torri medievali patrimonio UNESCO. Tante fontane nei borghi. <a href="/sentieri/via-francigena-san-gimignano">Scheda con mappa</a>.</p>
<p>La Francigena toscana e percorribile a tappe: 15 giorni totali da Passo della Cisa a Radicofani. Molti ostelli accettano cani.</p>

<h2>2. Sentiero della Bonifica (Arezzo-Chiusi)</h2>
<p>62 km pianeggianti lungo il Canale Maestro della Chiana. Percorribile a piedi o in bici, fontane ogni 5 km. <strong>Il sentiero piu facile della Toscana</strong>, perfetto per cani anziani o con displasia. <a href="/sentieri/sentiero-della-bonifica-valdichiana">Apri</a>.</p>

<h2>3. Anello del Monte Amiata</h2>
<p>10 km nel faggeto secolare del vulcano spento. <strong>Ombra totale anche in pieno agosto</strong>: il sentiero piu fresco del centro Italia. Dislivello 500 m. <a href="/sentieri/anello-monte-amiata">Scheda</a>.</p>

<h2>4. Parco dell'Uccellina — Maremma</h2>
<p>Il Parco della Maremma consente cani al guinzaglio nei sentieri A1 e A2 (costa sud). Sentiero A2 "Le Torri": 8 km, pineta marittima e duna, vista su Punta Ala. Ombra parziale.</p>
<p>Da ottobre a maggio: cani ammessi anche sui sentieri dell'entroterra. D'estate: solo itinerari costieri (tutela fauna).</p>

<h2>5. Foreste Casentinesi — Sentiero delle Foreste Sacre</h2>
<p>Anello di 12 km nel Parco Nazionale delle Foreste Casentinesi (AR). Abetina monumentale, ombra al 100%, fontane. Difficolta media.</p>
<p>Il parco ha mappe dedicate con sentieri dog-friendly segnalati — chiedi al centro visite di Pratovecchio.</p>

<h2>6. Val d'Orcia — Pienza-Monticchiello</h2>
<p>Classico di 9 km tra i cipressi della Val d'Orcia UNESCO. Sterrato, poca ombra (perfetto a marzo-aprile e ottobre). Vista su Monte Amiata.</p>
<p>Partenza da Pienza (parcheggio gratuito), arrivo a Monticchiello (ristoro pet-friendly al rientro).</p>

<h2>7. Costa degli Etruschi — Golfo di Baratti</h2>
<p>Anello 7 km dal Golfo di Baratti alle tombe etrusche di Populonia. Pineta marittima, ombra, accesso alla <a href="/spiagge">spiaggia</a> dopo il trekking. Da settembre a maggio cani liberi sulla battigia.</p>
<p>Base ideale: <a href="/vacanze/tenuta-poggio-ai-santi">Tenuta Poggio ai Santi a San Vincenzo</a>, a 10 minuti dalla Dog Beach.</p>

<h2>8. Apuane — Monte Forato</h2>
<p>Trekking di 8 km con dislivello 600 m sulle Alpi Apuane. Roccia calcarea (attenzione ai cuscinetti), panorama su mare e montagne. Solo cani adulti allenati.</p>

<h2>9. Mugello — Laghi di Bilancino</h2>
<p>Giro di 15 km intorno al lago artificiale di Bilancino. Tratti ciclabili, ombra degli ulivi, aree sosta. Adatto a famiglie, tanti punti ristoro pet-friendly.</p>

<h2>10. Garfagnana — Orrido di Botri</h2>
<p>Canyon del Rio Pelago nel Parco delle Apuane. 5 km dentro la gola con acqua cristallina. <strong>Cani ammessi ma serve kit di guado</strong>: scarpine e asciugamano. Da giugno a settembre.</p>

<h2>Quando andare</h2>
<ul>
<li><strong>Primavera (marzo-maggio)</strong>: temperature ideali, fioriture, ombra ancora non necessaria. Il periodo top.</li>
<li><strong>Estate</strong>: scegli solo sentieri con ombra totale (Amiata, Casentinesi) o quote sopra 1000 m. Parti all'alba.</li>
<li><strong>Autunno</strong>: i colori toscani piu belli, ristoranti aperti, pochi turisti.</li>
<li><strong>Inverno</strong>: Maremma, costa, bonifica sono ancora percorribili. Colline centrali fangose.</li>
</ul>

<h2>Pericoli da conoscere</h2>
<ul>
<li><strong>Processionaria del pino</strong> (feb-apr): tossica per i cani, non far annusare nidi o file a terra</li>
<li><strong>Zecche</strong>: diffuse da aprile a ottobre, controlla il pelo a fine sentiero</li>
<li><strong>Vipere</strong>: zone aride collinari, cani sempre al guinzaglio</li>
<li><strong>Caldo estivo</strong>: portare il doppio dell'acqua prevista</li>
</ul>

<h2>Dove dormire</h2>
<p>La Toscana ha la piu alta densita di <a href="/vacanze/regione/toscana">agriturismi pet-friendly in Italia</a>: ~40 strutture verificate, dalla Val d'Orcia alla Costa. Segnaliamo:</p>
<ul>
<li><a href="/vacanze/villa-la-massa-firenze">Villa La Massa</a> — villa rinascimentale a 15 min da Firenze, cani di tutte le taglie</li>
<li><a href="/vacanze/castello-di-velona-montalcino">Castello di Velona</a> — spa termale e Brunello in Val d'Orcia</li>
<li><a href="/vacanze/tenuta-spannocchia">Tenuta di Spannocchia</a> — biologica dal 1225 nelle crete senesi</li>
</ul>

<p>Cerchi altri <a href="/sentieri">sentieri in Italia</a>? Filtra per regione, difficolta e ombra sulla mappa interattiva.</p>
    `,
  },

  // ============================================================
  // HUB RISTORANTI NAZIONALE
  // ============================================================
  {
    slug: "dove-mangiare-con-cane-italia-2026",
    titolo: "Dove mangiare con il cane in Italia: regole, consigli e i 30 migliori ristoranti 2026",
    categoria: "ristoranti",
    estratto: "Normativa regionale, galateo al tavolo, ristoranti top in 10 citta italiane. Tutto cio che serve sapere per cenare fuori con il cane senza problemi.",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    tempo_lettura: "9 min",
    data: "17 Apr 2026",
    tags: ["ristoranti", "pet-friendly", "italia", "normativa", "guida"],
    contenuto: `
<p>Portare il cane al ristorante in Italia e piu facile di quanto si pensi, ma ci sono regole poco conosciute e differenze regionali importanti. Questa guida copre tutto: cosa dice la legge, il galateo da rispettare, e la nostra selezione di 30 locali pet-friendly top in 10 citta italiane.</p>

<h2>Cosa dice la legge italiana</h2>
<p>Non esiste una legge nazionale che vieta i cani nei ristoranti. La decisione e del singolo esercente, purche il cane sia al guinzaglio e non disturbi gli altri clienti. Nessuna ordinanza ministeriale o norma ASL lo impedisce.</p>
<p>Questo significa che: se un ristoratore ti dice "non posso per la legge" o "me lo proibiscono i NAS", ti sta mentendo. Puo dire "preferisco di no" — quello si e una sua scelta legittima.</p>

<h3>Differenze regionali</h3>
<ul>
<li><strong>Veneto (dal 2013)</strong>: legge regionale 7/2010 esplicitamente <em>incoraggia</em> i ristoratori ad accettare cani</li>
<li><strong>Trentino-Alto Adige</strong>: in quasi tutti i locali i cani sono benvenuti, cultura diffusa</li>
<li><strong>Lombardia, Piemonte, Liguria</strong>: liberta totale ai ristoratori, pratica diffusa</li>
<li><strong>Sud Italia</strong>: dipende molto, meglio chiamare prima</li>
<li><strong>Sicilia</strong>: in forte crescita la rete pet-friendly a Palermo e Catania</li>
</ul>

<h2>Il galateo al ristorante con il cane</h2>
<ol>
<li><strong>Chiama prima</strong>: "Posso venire con il mio cane?" evita figure</li>
<li><strong>Guinzaglio corto</strong> sempre, anche nel dehors</li>
<li><strong>Posizione</strong>: sotto il tavolo o al tuo fianco, mai sulle sedie</li>
<li><strong>Niente cibo dal tavolo</strong>: degradante per il cane e fastidioso per gli altri</li>
<li><strong>Porta la sua ciotola dell'acqua</strong>: non tutti i locali la hanno</li>
<li><strong>Se abbaia, esci</strong>: non insistere, non punire davanti ad altri, semplicemente esci</li>
<li><strong>Mancia al cameriere</strong>: se vedi che apprezza la presenza del cane, lascia qualcosa in piu</li>
</ol>

<h2>30 ristoranti pet-friendly top — le 10 citta</h2>

<h3>Milano</h3>
<ul>
<li><a href="/ristoranti/cascina-cuccagna-milano">Cascina Cuccagna</a> — cascina del 1695, biologico</li>
<li><a href="/ristoranti/ratana-milano">Ratana</a> — lombarda contemporanea, dehors Isola</li>
<li><a href="/ristoranti/osteria-del-binari-milano">Osteria del Binari</a> — giardino sui Navigli</li>
</ul>

<h3>Roma</h3>
<ul>
<li><a href="/ristoranti/eataly-roma">Eataly Roma Ostiense</a> — terrazza panoramica, aree esterne</li>
<li><a href="/ristoranti/pierluigi-roma">Pierluigi</a> — pesce, centro storico</li>
<li><a href="/ristoranti/da-enzo-al-29-roma">Da Enzo al 29</a> — trattoria romana, Trastevere</li>
</ul>

<h3>Firenze</h3>
<ul>
<li><a href="/ristoranti/il-santo-bevitore-firenze">Il Santo Bevitore</a> — osteria raffinata, Oltrarno</li>
<li><a href="/ristoranti/zeb-firenze">ZEB Gastronomia</a> — bistrot creativo, San Nicolo</li>
<li><a href="/ristoranti/obica-firenze">Obica Mozzarella Bar</a> — terrazza pet-friendly</li>
</ul>

<h3>Venezia</h3>
<ul>
<li><a href="/ristoranti/osteria-al-cicheto-venezia">Osteria al Cicheto</a> — bacaro tipico</li>
<li>Tanti bar in campo di San Polo con dehors cani OK</li>
</ul>

<h3>Napoli</h3>
<ul>
<li><a href="/ristoranti/pizzeria-da-michele-napoli">L'Antica Pizzeria da Michele</a> — la pizzeria dal 1870</li>
<li><a href="/ristoranti/starita-materdei-napoli">Starita a Materdei</a> — storica dal 1901</li>
</ul>

<h3>Torino, Bologna, Verona, Padova, Palermo</h3>
<p>Tutte le schede con mappe, orari e contatti sono nella <a href="/ristoranti">directory ristoranti pet-friendly</a>.</p>

<h2>I 5 criteri per un ristorante veramente dog-friendly</h2>
<ol>
<li><strong>Ciotole d'acqua fresca</strong> offerte di default</li>
<li><strong>Area recintata o dehors</strong> dove il cane puo stare a terra</li>
<li><strong>Personale formato</strong>: sa che non deve accarezzarlo senza permesso</li>
<li><strong>Menu cane opzionale</strong>: una crocchetta di pollo, una ciotola di riso in bianco</li>
<li><strong>Nessuna tassa di ingresso</strong> per il cane (se c'e, segnale di accoglienza solo commerciale)</li>
</ol>

<h2>Cosa portare</h2>
<ul>
<li>Tappetino o coperta (dimostra rispetto, molti ristoratori lo apprezzano molto)</li>
<li>Acqua e ciotola pieghevole</li>
<li>Snack per tenerlo impegnato quando arriva il cibo tuo</li>
<li>Kong farcito: se prevedi una cena lunga e geniale per cucciolo/cane attivo</li>
</ul>

<h2>FAQ</h2>
<p><strong>Al McDonald's posso entrare col cane?</strong><br/>Solo cani guida. Alcuni McDonald's con drive-in hanno tavoli esterni dove non ti mandano via.</p>
<p><strong>Nei bar posso portarlo?</strong><br/>Sempre al guinzaglio, sui dehors in pratica sempre OK. All'interno dipende dal gestore.</p>
<p><strong>In treno/stazione si puo mangiare col cane al FreshCorner?</strong><br/>Trenitalia ammette cani nei ristoranti di stazione che hanno dehors. Dentro i negozi chiusi no.</p>

<p>Cerchi un ristorante pet-friendly vicino a casa? Usa la mappa interattiva su <a href="/ristoranti">mifidodite.eu/ristoranti</a> con filtri per citta, tipo cucina e servizi (dehors, giardino, area recintata).</p>
    `,
  },

  // ============================================================
  // RISTORANTI MILANO
  // ============================================================
  {
    slug: "ristoranti-pet-friendly-milano-2026",
    titolo: "Ristoranti pet-friendly a Milano: i 12 locali dove il tuo cane e benvenuto nel 2026",
    categoria: "ristoranti",
    estratto: "Navigli, Isola, Brera, Porta Venezia: i migliori ristoranti, osterie e bistrot di Milano che accolgono cani. Fascia di prezzo, dehors, menu cane.",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    tempo_lettura: "7 min",
    data: "17 Apr 2026",
    tags: ["ristoranti", "milano", "pet-friendly", "dog-friendly"],
    contenuto: `
<p>Milano e una delle citta italiane piu pet-friendly per quanto riguarda la ristorazione: su circa 7.000 ristoranti, oltre 900 dichiarano esplicitamente di accogliere cani (stima Confcommercio 2025). La nostra selezione 2026 si concentra su 12 locali verificati, con dehors o giardino, dove il tuo cane non e "tollerato" ma <strong>davvero benvenuto</strong>.</p>

<h2>Navigli e Darsena</h2>

<h3>1. Osteria del Binari</h3>
<p>Osteria storica vicino a Porta Genova con ampio giardino interno, uno dei pochi "oasi verdi" della zona. Cucina milanese tradizionale, cassoeula e risotto giallo tra i top. <a href="/ristoranti/osteria-del-binari-milano">Scheda</a>.</p>

<h3>2. Temakinho Navigli</h3>
<p>Catena brasiliano-giapponese con dehors sull'alzaia. Politica pet-friendly ufficiale su tutte le sedi italiane. Atmosfera giovane, prezzi medi. <a href="/ristoranti/temakinho-milano-navigli">Apri</a>.</p>

<h3>3. Cascina Cuccagna</h3>
<p>Cascina del 1695 in zona Porta Romana, giardino e cortile interno. Cucina biologica stagionale, brunch weekend. Cani benvenuti nel dehors. <a href="/ristoranti/cascina-cuccagna-milano">Scheda</a>.</p>

<h2>Isola e Porta Nuova</h2>

<h3>4. Ratana</h3>
<p>Ristorante del gruppo dell'Osteria Brunello, cucina lombarda contemporanea in edificio storico con dehors. Cani ammessi solo all'esterno. Fascia alta. <a href="/ristoranti/ratana-milano">Scheda</a>.</p>

<h3>5. Berberè Isola</h3>
<p>Pizzeria gourmet con lievitazioni lunghe. Dehors pedonalizzato, prezzi medi. Ciotole d'acqua all'ingresso.</p>

<h2>Brera e Quadrilatero</h2>

<h3>6. Giannino dal 1899</h3>
<p>Ristorante storico milanese dal 1899, cucina italiana classica. Cani di piccola taglia ammessi all'interno, medi/grandi nel dehors. Fascia luxury. <a href="/ristoranti/giannino-milano">Scheda</a>.</p>

<h3>7. Il Salumaio di Montenapoleone</h3>
<p>Ristorante nel cuore del Quadrilatero della Moda con giardino-corte interno. Dehors top per portare il cane durante shopping. Fascia alta.</p>

<h2>Porta Venezia e Corso Buenos Aires</h2>

<h3>8. California Bakery</h3>
<p>American diner con diverse sedi a Milano, tutte pet-friendly nei dehors. Cucina internazionale, brunch e pancakes. Prezzi medi.</p>

<h3>9. Il Cantinone</h3>
<p>Osteria tradizionale vicino a Porta Venezia, dehors estivo sulla via. Pasta fresca fatta in casa, vini regionali. Prezzi medi.</p>

<h2>Porta Romana e Porta Ticinese</h2>

<h3>10. Trippa</h3>
<p>Osteria di Diego Rossi, una delle piu acclamate di Milano. <strong>Cani ammessi solo con prenotazione</strong> e nel dehors. Fascia media, prenotazione obbligatoria con 2-3 settimane di anticipo.</p>

<h3>11. Rita & Cocktails</h3>
<p>Bistrot con cocktail bar sui Navigli, dehors sulla via. Finger food e piatti leggeri, prezzi medi. Cani ammessi all'esterno.</p>

<h2>Zona Washington / Fiera</h2>

<h3>12. Osteria Porta Cicca</h3>
<p>Osteria familiare storica, giardino interno. Cucina milanese casalinga. Tra i piu pet-friendly di Milano da decenni. Prezzi economici.</p>

<h2>Parchi dove portare il cane (dopo cena)</h2>
<ul>
<li><strong>Parco Sempione</strong>: area cani grande vicino alla Triennale</li>
<li><strong>Parco Lambro</strong>: 3 aree cani, tra cui la "Prateria del Bau"</li>
<li><strong>Parco Montanelli (Giardini Indro Montanelli)</strong>: area cani storica in Porta Venezia</li>
<li><strong>Area cani CityLife</strong>: moderna, recintata, zona nuova</li>
</ul>

<h2>Dove dormire a Milano con il cane</h2>
<p>Il <a href="/vacanze/four-seasons-milano">Four Seasons Hotel Milano</a> (ex convento del XV secolo nel Quadrilatero) e uno degli hotel 5 stelle piu pet-friendly d'Europa: cuccia in camera, menu cane gratuito, nessun supplemento. <a href="/vacanze/citta/milano">Altri hotel pet-friendly a Milano</a>.</p>

<h2>Consigli pratici</h2>
<ul>
<li>A Milano i dehors sono aperti da aprile a ottobre. In inverno: bistrot con interno ampio e accogliente</li>
<li>Prenotazione sempre, e <strong>specifica "con cane"</strong>: ti mettono a un tavolo piu comodo</li>
<li>Metropolitana: ATM ammette cani di ogni taglia con museruola+guinzaglio (gratis)</li>
<li>Taxi: a Milano molti autisti non prendono cani grandi, usa NCC o app dedicate</li>
</ul>

<p>Tutta la lista aggiornata dei <a href="/ristoranti/regione/lombardia">ristoranti pet-friendly in Lombardia</a> con filtri per zona e prezzi.</p>
    `,
  },

  // ============================================================
  // RISTORANTI ROMA
  // ============================================================
  {
    slug: "ristoranti-pet-friendly-roma-2026",
    titolo: "Ristoranti pet-friendly a Roma: 12 locali dove cenare con il cane",
    categoria: "ristoranti",
    estratto: "Trastevere, Testaccio, centro storico, Prati: la selezione di trattorie, ristoranti e pizzerie pet-friendly nella Capitale, con prezzi e orari.",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    tempo_lettura: "7 min",
    data: "17 Apr 2026",
    tags: ["ristoranti", "roma", "pet-friendly", "trastevere"],
    contenuto: `
<p>Roma e la citta con piu cani d'Italia in proporzione agli abitanti (oltre 400.000 cani registrati su 2,8 milioni di residenti). Ovunque vai nel centro storico trovi ristoratori abituati alla presenza dei cani nei dehors. Ecco 12 locali verificati dove il tuo amico a 4 zampe e davvero benvenuto.</p>

<h2>Trastevere</h2>

<h3>1. Da Enzo al 29</h3>
<p>Trattoria romana autentica, cacio e pepe leggendaria. Tavolini all'aperto in via del 29. Cani tollerati nel dehors. Prenotazione difficile, solo di persona. <a href="/ristoranti/da-enzo-al-29-roma">Scheda</a>.</p>

<h3>2. Osteria der Belli</h3>
<p>Osteria familiare da generazioni, piazza Sant'Apollonia. Dehors ampio, cani benvenuti. Carbonara, coda alla vaccinara, prezzi medio-bassi.</p>

<h3>3. La Prosciutteria Trastevere</h3>
<p>Catena di taglieri e vini, dehors sulla via. Cani ammessi all'esterno. Atmosfera informale, prezzi economici. Ottimo per aperitivo lungo.</p>

<h2>Centro Storico</h2>

<h3>4. Pierluigi</h3>
<p>Ristorante iconico di pesce in piazza de' Ricci. Dehors raffinato, cani ammessi. Fascia luxury, prenotazione con settimane di anticipo. <a href="/ristoranti/pierluigi-roma">Scheda</a>.</p>

<h3>5. Salumeria Roscioli</h3>
<p>Salumeria-ristorante con vini d'autore e formaggi artigianali. Pochi tavolini all'esterno, cani piccoli ammessi. Fascia alta. <a href="/ristoranti/roscioli-roma">Scheda</a>.</p>

<h3>6. Ditirambo</h3>
<p>Ristorante nel cuore di Campo de' Fiori, cucina laziale contemporanea. Dehors pedonalizzato. Cani ammessi all'esterno. Fascia media.</p>

<h2>Ostiense e Testaccio</h2>

<h3>7. Eataly Roma Ostiense</h3>
<p>Il grande food market con 20 ristoranti interni. Terrazza panoramica e aree esterne aperte ai cani. Prezzi dal medio al luxury (stellato al 4° piano). <a href="/ristoranti/eataly-roma">Scheda</a>.</p>

<h3>8. Flavio al Velavevodetto</h3>
<p>Storica trattoria testaccina, cucina romana classica. Dehors sulla piazza, cani ammessi. Prezzi medi. Prenotazione consigliata.</p>

<h2>Prati e Vaticano</h2>

<h3>9. Il Sorpasso</h3>
<p>Bistrot di Vicolo dei Gracchi, taglieri e piatti veloci. Dehors ampio, cani benvenuti. Ottima carta vini. Prezzi medi.</p>

<h3>10. Pastasciutta</h3>
<p>Pastificio-ristorante in Prati, pasta fresca a vista. Piccolo dehors, cani ammessi. Prezzi economici, perfetto per pranzo veloce.</p>

<h2>Testaccio e Garbatella</h2>

<h3>11. Checchino dal 1887</h3>
<p>Ristorante storico del Testaccio, cucina del Quinto Quarto (trippa, pajata). Dehors con vista sul Monte Testaccio. Fascia alta, cani nel dehors.</p>

<h3>12. Pizzeria da Remo</h3>
<p>Pizzeria romana tipica, pizza croccante. Grandi dehors in Piazza Santa Maria Liberatrice. Cani sempre benvenuti. Prezzi economici, niente prenotazione.</p>

<h2>Aperitivo pet-friendly</h2>
<ul>
<li><strong>Bar del Fico</strong> — piazza del Fico, dehors storico</li>
<li><strong>Jerry Thomas Speakeasy</strong> — cocktail bar, giardino interno</li>
<li><strong>Etabli Roma</strong> — via della Vetrina, dehors su via tranquilla</li>
</ul>

<h2>Parchi di Roma dove portare il cane</h2>
<ul>
<li><strong>Villa Borghese</strong>: aree cani multiple, posti preferiti tra i romani</li>
<li><strong>Villa Pamphili</strong>: il parco piu grande di Roma, aree cani enormi</li>
<li><strong>Parco degli Acquedotti</strong>: area archeologica + natura, cani liberi in molte zone</li>
<li><strong>Parco della Caffarella</strong>: campagna romana, molto frequentato da cinofili</li>
</ul>

<h2>Dove dormire a Roma con il cane</h2>
<p>Vedi la <a href="/vacanze/citta/roma">selezione di hotel pet-friendly a Roma</a>. Hotel boutique in zona Trastevere e Prati sono generalmente piu accoglienti dei grandi catene del centro.</p>

<h2>Trasporti ATAC</h2>
<ul>
<li><strong>Metropolitana</strong>: cani piccoli nel trasportino gratis, cani grandi con museruola+guinzaglio (ticket normale)</li>
<li><strong>Bus e tram</strong>: stesse regole, 1 cane per mezzo</li>
<li><strong>Treni regionali Lazio</strong>: ticket cane 50% del prezzo adulto</li>
</ul>

<p>Mappa completa dei <a href="/ristoranti/regione/lazio">ristoranti pet-friendly nel Lazio</a> con filtri per zona, cucina e fascia di prezzo.</p>
    `,
  },

  // ============================================================
  // RISTORANTI FIRENZE
  // ============================================================
  {
    slug: "ristoranti-pet-friendly-firenze-2026",
    titolo: "Ristoranti pet-friendly a Firenze: 10 locali dove portare il cane",
    categoria: "ristoranti",
    estratto: "Oltrarno, centro, San Niccolo: la selezione delle osterie e trattorie di Firenze che accolgono cani, con dehors e giardini.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tempo_lettura: "6 min",
    data: "17 Apr 2026",
    tags: ["ristoranti", "firenze", "pet-friendly", "toscana"],
    contenuto: `
<p>Firenze e una citta a misura di cane: distanze brevi, Arno con passeggiate lunghe, parchi come le Cascine. La ristorazione locale ha una tradizione pet-friendly consolidata, soprattutto in Oltrarno e San Niccolo. Ecco 10 locali verificati dove il tuo cane non avra problemi.</p>

<h2>Oltrarno (Santo Spirito / San Frediano)</h2>

<h3>1. Il Santo Bevitore</h3>
<p>Osteria raffinata in via Santo Spirito, prodotti toscani di stagione. Tavoli all'aperto nel dehors estivo. Cani benvenuti. Fascia media. <a href="/ristoranti/il-santo-bevitore-firenze">Scheda</a>.</p>

<h3>2. All'Antico Ristoro di Cambi</h3>
<p>Trattoria storica dal 1946, bistecca fiorentina top. Ampio giardino interno. Cani ammessi. Fascia media, prenotazione consigliata.</p>

<h3>3. Trattoria Camillo</h3>
<p>Storica trattoria fiorentina in Borgo San Jacopo, gestione familiare. Pochi tavoli ma atmosfera autentica. Cani ammessi.</p>

<h2>San Niccolo e Porta Romana</h2>

<h3>4. ZEB Gastronomia</h3>
<p>Gastronomia creativa nel quartiere di San Niccolo, piatti toscani rivisitati. Tavolini all'esterno. Cani benvenuti. <a href="/ristoranti/zeb-firenze">Scheda</a>.</p>

<h3>5. La Beppa Fioraia</h3>
<p>Ristorante-giardino storico ai piedi del Forte Belvedere. Ampio giardino, cani liberi se sotto controllo. Fascia alta. Imperdibile d'estate.</p>

<h2>Centro storico</h2>

<h3>6. Obica Mozzarella Bar</h3>
<p>Catena italiana specializzata in mozzarella di bufala, terrazza panoramica. Politica pet-friendly esplicita. Fascia media. <a href="/ristoranti/obica-firenze">Scheda</a>.</p>

<h3>7. Trattoria Da Burde</h3>
<p>Trattoria storica dal 1901 fuori centro (zona Novoli), celebrata da Mario Cecchi Gori. Cucina fiorentina, giardino estivo. Cani benvenuti.</p>

<h3>8. Osteria Belle Donne</h3>
<p>Osteria storica a pochi passi da piazza Santa Trinita, dehors pedonalizzato. Cucina toscana classica. Prezzi medio-bassi.</p>

<h2>Campo di Marte e Cascine</h2>

<h3>9. Enoteca Pinchiorri <em>(solo giardino eventi)</em></h3>
<p>Il 3 stelle Michelin di Firenze ha un magnifico giardino interno: su richiesta, per eventi speciali, cani piccoli sono ammessi. Da chiamare direttamente.</p>

<h3>10. Il Ristoro dell'Isola d'Elba — Le Cascine</h3>
<p>Tratto-bistrot dentro il Parco delle Cascine. Cucina di pesce, dehors sul parco. Cani liberi al guinzaglio. Prezzi medi.</p>

<h2>Pizzerie pet-friendly</h2>
<ul>
<li><strong>Gusta Pizza</strong> (Oltrarno) — pizzeria storica, dehors su piazza Santo Spirito</li>
<li><strong>Il Pizzaiuolo</strong> — autentica pizza napoletana, dehors estivo, vicino a Santa Croce</li>
</ul>

<h2>Aperitivo con il cane</h2>
<ul>
<li><strong>Piazza Santo Spirito</strong>: quasi tutti i bar accettano cani nei dehors</li>
<li><strong>Ditta Artigianale</strong> (via dei Neri e via dello Sprone): caffetteria-cocktail bar, cani benvenuti</li>
<li><strong>Le Murate</strong>: complesso culturale con caffe e dehors nel chiostro</li>
</ul>

<h2>Parchi dove portare il cane</h2>
<ul>
<li><strong>Giardino delle Rose</strong> (Piazzale Michelangelo) — panorama sulla citta, cani ammessi al guinzaglio</li>
<li><strong>Parco delle Cascine</strong> — il parco piu grande di Firenze, 160 ettari, aree cani multiple</li>
<li><strong>Giardino Bardini</strong> — a pagamento, pero cani ammessi, vista top</li>
<li><strong>Giardino di Boboli</strong> — cani solo al guinzaglio corto, no in alcune aree giardino storico</li>
</ul>

<h2>Dove dormire a Firenze con il cane</h2>
<p>La <a href="/vacanze/villa-la-massa-firenze">Villa La Massa</a> (XVI secolo sulle rive dell'Arno, 15 min dal centro) accetta cani di tutte le taglie senza supplemento. In centro, molti hotel boutique in Oltrarno sono naturalmente pet-friendly. <a href="/vacanze/citta/firenze">Altri hotel</a>.</p>

<h2>Gite dai dintorni</h2>
<p>Se sei a Firenze con il cane, considera questi itinerari giornalieri:</p>
<ul>
<li><a href="/vacanze/regione/toscana">San Gimignano e Val d'Orcia</a> — 1h 30 min, sentieri e agriturismi pet-friendly</li>
<li><a href="/sentieri/via-francigena-san-gimignano">Via Francigena a San Gimignano</a> — 18 km di trekking medievale</li>
<li>Chianti — decine di cantine accolgono cani nelle degustazioni all'aperto</li>
</ul>

<p>Lista completa dei <a href="/ristoranti/regione/toscana">ristoranti pet-friendly in Toscana</a> con mappa e filtri.</p>
    `,
  },

  // ============================================================
  // HOTEL MILANO
  // ============================================================
  {
    slug: "hotel-pet-friendly-milano-2026",
    titolo: "Hotel pet-friendly a Milano 2026: dove dormire con il cane senza supplementi assurdi",
    categoria: "vacanze",
    estratto: "Four Seasons, boutique hotel, B&B: la guida completa agli hotel di Milano che accolgono cani. Fasce di prezzo, zone, servizi e supplementi.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    tempo_lettura: "7 min",
    data: "17 Apr 2026",
    tags: ["hotel", "milano", "pet-friendly", "vacanze"],
    contenuto: `
<p>Dormire a Milano con il cane non e piu un problema. Booking.com censisce oltre 800 strutture pet-friendly in citta, ma la qualita varia molto: da "cane tollerato con supplemento di 40 euro/notte" a "ciotole in camera, menu dedicato, cuccia". Ecco la nostra selezione 2026 degli hotel davvero pet-friendly a Milano, divisi per fascia di prezzo e zona.</p>

<h2>Fascia luxury (5 stelle)</h2>

<h3>Four Seasons Hotel Milano</h3>
<p>Ex convento del XV secolo nel Quadrilatero della Moda, via Gesu 6. Tra i piu pet-friendly d'Europa: ciotola personalizzata, cuccia in camera, menu cane gratuito (pollo, riso, verdure), <strong>nessun supplemento</strong> per il cane. Cani di tutte le taglie. <a href="/vacanze/four-seasons-milano">Scheda e prenotazione</a>.</p>

<h3>Bulgari Hotel Milano</h3>
<p>Boutique hotel di design in via Privata Fratelli Gabba, giardino privato di 4.000 m2 nel centro. Cani piccoli in camera, medi/grandi su richiesta. Supplemento variabile.</p>

<h3>Park Hyatt Milano</h3>
<p>A due passi dal Duomo, lounge elegante e spa. Cani fino a 10 kg gratis, oltre supplemento di 50 euro/notte (include amenity kit).</p>

<h2>Fascia alta (4 stelle boutique)</h2>

<h3>Hotel Senato</h3>
<p>Boutique hotel moderno vicino a Porta Venezia. Piscina a cielo aperto, cortile interno pet-friendly. Supplemento 30 euro/notte, cani fino a 15 kg.</p>

<h3>Hotel Principe di Savoia</h3>
<p>Storico 5 stelle in piazza della Repubblica. Cani di tutte le taglie ammessi, cuccia e ciotole disponibili a richiesta. Supplemento 40 euro/notte.</p>

<h3>Hotel Viu Milan</h3>
<p>Design hotel con piscina rooftop in zona Isola, quartiere molto pet-friendly. Supplemento 25 euro/notte, cani fino a 20 kg.</p>

<h2>Fascia media (3-4 stelle)</h2>

<h3>NH Milano Touring</h3>
<p>Catena affidabile, zona Porta Venezia. Politica NH ufficiale: cani fino a 8 kg gratis, oltre 15 euro/notte. Parchi vicini (Giardini Indro Montanelli).</p>

<h3>B&B Hotel Milano</h3>
<p>Low cost affidabile. Cani sempre ammessi, supplemento 10 euro/notte fisso. 3 sedi: Centrale, Sesto Marelli, Cenisio. Perfetto se cerchi economia.</p>

<h3>Starhotels Echo</h3>
<p>Vicino alla Stazione Centrale, spazioso e moderno. Cani fino a 15 kg 25 euro/notte, oltre 40 euro/notte. Area cani comune al piano terra.</p>

<h2>B&B e appartamenti (low cost)</h2>
<p>Per soggiorni di 3+ notti, gli appartamenti su Airbnb o Booking sono spesso la scelta migliore: piu spazio, cucina, giardino o balcone.</p>
<p>Zone top per soggiorni con cane:</p>
<ul>
<li><strong>Isola-Porta Nuova</strong>: parchi, locali pet-friendly, metro M5</li>
<li><strong>Navigli</strong>: passeggiate sul naviglio, locali aperti fino a tardi</li>
<li><strong>Porta Venezia</strong>: Giardini Indro Montanelli, varieta di ristoranti</li>
<li><strong>CityLife</strong>: moderna, ampi spazi aperti, area cani nuova</li>
</ul>

<h2>Cosa chiedere prima di prenotare</h2>
<ol>
<li><strong>Taglia massima ammessa</strong>: spesso c'e un limite di peso (10/15/20 kg)</li>
<li><strong>Supplemento</strong>: una tantum o per notte? Per soggiorni lunghi fa grande differenza</li>
<li><strong>Camera dedicata</strong>: alcuni hotel hanno camere specifiche per ospiti con cani (zone ground floor, pavimenti facili da pulire)</li>
<li><strong>Lasciato solo in camera</strong>: alcuni lo consentono, altri no. Per te che esci a cena e importante saperlo</li>
<li><strong>Accesso ad ascensori/aree comuni</strong>: ristorante, piscina, spa spesso vietati</li>
</ol>

<h2>Quanto costa l'aggiunta del cane?</h2>
<ul>
<li><strong>Gratis</strong>: Four Seasons, alcune strutture boutique che fanno della pet-friendliness un marchio</li>
<li><strong>10-20 euro/notte</strong>: fascia standard per hotel 3 stelle e catene budget</li>
<li><strong>25-50 euro/notte</strong>: fascia alta per 4-5 stelle tradizionali</li>
<li><strong>40-100 euro una tantum</strong>: formula usata da catene internazionali (Marriott, Hilton) con amenity kit inclusa</li>
</ul>

<h2>Servizi pet inclusi nei migliori hotel</h2>
<ul>
<li>Ciotola e tappetino in camera</li>
<li>Menu cane in room service</li>
<li>Cuccia su richiesta</li>
<li>Dog walker (a pagamento) — alcuni 5 stelle offrono questo servizio</li>
<li>Pet sitter per quando esci alla Scala senza poterlo portare</li>
<li>Mappa delle aree cani e sentieri del quartiere</li>
</ul>

<h2>Come muoversi a Milano con il cane</h2>
<ul>
<li><strong>Metro/bus/tram ATM</strong>: cani piccoli in trasportino gratis. Cani grandi con museruola+guinzaglio, 1 per mezzo, ticket normale</li>
<li><strong>Taxi</strong>: molti autisti non prendono cani grandi. App come <em>FreeNow</em> permettono di filtrare "cane ammesso"</li>
<li><strong>Monopattini/bici sharing</strong>: no cani grandi, cuccioli OK in trasportino</li>
<li><strong>Tram pedonale</strong>: a Milano molti tram sono accessibili anche con cani medio-grandi, soprattutto quelli storici (vedi ATM.it)</li>
</ul>

<h2>Ristoranti abbinati agli hotel</h2>
<p>Vedi la nostra selezione di <a href="/magazine/ristoranti-pet-friendly-milano-2026">ristoranti pet-friendly a Milano</a> con 12 locali verificati.</p>

<p>Lista completa degli <a href="/vacanze/citta/milano">hotel pet-friendly a Milano</a> con filtri per fascia di prezzo, zona, taglia cane ammessa.</p>
    `,
  },

  // ============================================================
  // HOTEL ROMA
  // ============================================================
  {
    slug: "hotel-pet-friendly-roma-2026",
    titolo: "Hotel pet-friendly a Roma 2026: dove dormire con il cane nella Capitale",
    categoria: "vacanze",
    estratto: "Hotel 5 stelle vicino al Colosseo, boutique a Trastevere, B&B in Prati: la selezione completa degli hotel di Roma che accolgono cani.",
    img: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80",
    tempo_lettura: "7 min",
    data: "17 Apr 2026",
    tags: ["hotel", "roma", "pet-friendly", "vacanze"],
    contenuto: `
<p>Roma e la capitale italiana del turismo pet-friendly: oltre 700 strutture dichiarano di accogliere cani su Booking.com. La citta stessa e incredibilmente a misura di cane, con parchi enormi (Villa Borghese, Villa Pamphili) e un clima che favorisce i dehors 9 mesi all'anno. Ecco la selezione 2026 degli hotel davvero pet-friendly.</p>

<h2>Fascia luxury (5 stelle)</h2>

<h3>Hotel de Russie</h3>
<p>Giardini segreti tra Piazza del Popolo e via del Babuino. Cani di tutte le taglie ammessi senza supplemento. Menu cane dedicato, cuccia disponibile. Tra i piu pet-friendly di Roma.</p>

<h3>Hotel Hassler Roma</h3>
<p>Sopra Piazza di Spagna, vista mozzafiato su Trinita dei Monti. Cani ammessi con supplemento 50 euro/notte, amenity kit inclusa. Cuccia in camera.</p>

<h3>Rocco Forte Hotel de la Ville</h3>
<p>Sopra Piazza del Popolo, design contemporaneo. Tutti i cani ammessi, kit di benvenuto dedicato. Politica pet-friendly ufficiale in tutto il gruppo Rocco Forte.</p>

<h3>Palazzo Navona Hotel</h3>
<p>Palazzo storico accanto a Piazza Navona. Cani ammessi fino a 20 kg, supplemento 30 euro/notte. Vicino a Campo de' Fiori.</p>

<h2>Fascia alta (4 stelle)</h2>

<h3>Hotel Trevi</h3>
<p>A due passi dalla Fontana di Trevi, boutique di 29 camere. Cani fino a 15 kg 25 euro/notte, cuccia su richiesta.</p>

<h3>Martis Palace Hotel</h3>
<p>Vicino a Piazza Navona, moderno e elegante. Politica pet-friendly chiara, supplemento 20 euro/notte, cani fino a 10 kg.</p>

<h3>Hotel Capo d'Africa</h3>
<p>Di fronte al Colosseo, terrazza con vista. Cani di tutte le taglie ammessi su richiesta, supplemento variabile.</p>

<h2>Trastevere e Testaccio (fascia media)</h2>

<h3>Hotel Santa Maria in Trastevere</h3>
<p>Ex monastero del XVI secolo, giardino interno con agrumi. Cani ammessi, supplemento 15 euro/notte. Passeggiate direttamente in Trastevere.</p>

<h3>Casa San Calisto</h3>
<p>B&B nel cuore di Trastevere, gestione familiare. Cani di tutte le taglie ammessi, nessun supplemento. Massimo 15 camere.</p>

<h3>Hotel Sant'Anselmo</h3>
<p>Boutique sull'Aventino, villa liberty con giardino privato. Cani fino a 12 kg ammessi. Quartiere residenziale elegante, perfetto per passeggiate serali.</p>

<h2>B&B e appartamenti (low cost)</h2>
<ul>
<li><strong>Prati / Vaticano</strong>: residenziale, economico, molti B&B accettano cani</li>
<li><strong>San Lorenzo / Pigneto</strong>: giovane, vivace, prezzi bassi</li>
<li><strong>Testaccio</strong>: quartiere autentico, mercato storico, molti B&B familiari</li>
<li><strong>Garbatella</strong>: residenziale, parchi, zona film "Mai dire Sabato"</li>
</ul>

<h2>Quartieri top per dormire con il cane</h2>

<h3>Centro storico</h3>
<p>Bellissimo ma caotico. Bene per vacanze corte (2-3 notti), rumoroso di notte. Pochi spazi verdi in centro — spostarsi spesso.</p>

<h3>Trastevere</h3>
<p>Il mix perfetto: centro pedonale, fascino, ristoranti pet-friendly ovunque. Villa Pamphili a 15 minuti a piedi. Prezzi medio-alti.</p>

<h3>Aventino / San Saba</h3>
<p>Residenziale, silenzioso, Giardino degli Aranci, Circo Massimo. Perfetto per chi cerca tranquillita. Prezzi alti.</p>

<h3>Prati / Vaticano</h3>
<p>Ampi marciapiedi, parco di Villa Doria Pamphili vicino. Molto pet-friendly, prezzi medi.</p>

<h2>Cosa chiedere prima di prenotare</h2>
<ol>
<li>Supplemento per notte o una tantum?</li>
<li>Taglia massima? (Roma ha piu hotel che accettano cani grandi di Milano)</li>
<li>Possibilita di lasciarlo solo in camera quando vai al Vaticano/Colosseo?</li>
<li>Pet sitter o dog walker disponibili (molti 5 stelle li offrono)?</li>
<li>Ristorante interno: cani ammessi?</li>
</ol>

<h2>Trasporti ATAC</h2>
<ul>
<li>Metro A/B/C: cani piccoli in trasportino gratis. Cani grandi con museruola+guinzaglio, ticket normale</li>
<li>Bus/tram: stesse regole, 1 cane per mezzo</li>
<li>Treni regionali Lazio: ticket 50%</li>
<li>Taxi: variabile, chiama prima se cane grande</li>
</ul>

<h2>Parchi consigliati per ogni quartiere</h2>
<ul>
<li><strong>Centro</strong>: Villa Borghese (da P.za di Spagna o Flaminio)</li>
<li><strong>Trastevere</strong>: Villa Pamphili (il parco piu grande di Roma, 184 ettari)</li>
<li><strong>Aventino</strong>: Parco Savello (Giardino degli Aranci)</li>
<li><strong>Prati</strong>: Parco Adriano (Castel Sant'Angelo)</li>
<li><strong>Testaccio</strong>: Monte Testaccio, Parco Caffarella</li>
<li><strong>EUR</strong>: Laghetto dell'EUR, grandi spazi verdi</li>
</ul>

<h2>Ristoranti abbinati</h2>
<p>Vedi la nostra <a href="/magazine/ristoranti-pet-friendly-roma-2026">selezione di 12 ristoranti pet-friendly a Roma</a>, divisi per quartiere.</p>

<p>Lista completa degli <a href="/vacanze/citta/roma">hotel pet-friendly a Roma</a> con filtri per zona, prezzo e servizi.</p>
    `,
  },

  // ============================================================
  // HOTEL FIRENZE
  // ============================================================
  {
    slug: "hotel-pet-friendly-firenze-2026",
    titolo: "Hotel pet-friendly a Firenze 2026: dormire con il cane in citta e dintorni",
    categoria: "vacanze",
    estratto: "Hotel boutique in centro, ville rinascimentali nei dintorni, B&B in Oltrarno: dove dormire a Firenze con il cane senza compromessi.",
    img: "https://images.unsplash.com/photo-1534445967719-8ae7b972b1a5?w=800&q=80",
    tempo_lettura: "6 min",
    data: "17 Apr 2026",
    tags: ["hotel", "firenze", "pet-friendly", "vacanze", "toscana"],
    contenuto: `
<p>Firenze e una delle citta italiane dove e piu piacevole soggiornare con il cane: distanze brevi, tantissimi ristoranti con dehors, Arno per passeggiate serali e parchi monumentali (Cascine, Bardini, Boboli). La ricettivita si e adeguata: boutique hotel in centro, ville rinascimentali nei dintorni, B&B familiari in Oltrarno. Ecco la selezione 2026.</p>

<h2>Fascia luxury (5 stelle e boutique)</h2>

<h3>Villa La Massa</h3>
<p>Villa rinascimentale del XVI secolo sulle rive dell'Arno, a 15 minuti dal centro. Parco privato immenso per passeggiate. Cani di tutte le taglie ammessi, nessun supplemento. Ristorante stellato. <a href="/vacanze/villa-la-massa-firenze">Scheda</a>.</p>

<h3>Four Seasons Firenze</h3>
<p>Palazzo Gherardesca del XV secolo, il giardino privato piu grande di Firenze. Cani fino a 15 kg gratis, oltre su richiesta. Amenity kit, menu cane in room service.</p>

<h3>Portrait Firenze</h3>
<p>Hotel Ferragamo sull'Arno, vista Ponte Vecchio. Cani piccoli ammessi, supplemento 40 euro/notte. Cuccia e ciotole su richiesta.</p>

<h3>Hotel Savoy</h3>
<p>Rocco Forte in piazza della Repubblica. Politica pet-friendly del gruppo: cani di tutte le taglie, menu dedicato, nessun supplemento per cani piccoli.</p>

<h2>Fascia alta (4 stelle centro)</h2>

<h3>Hotel Lungarno</h3>
<p>Hotel Ferragamo con vista Ponte Vecchio e Arno. Cani fino a 10 kg 30 euro/notte. Collezione d'arte privata, bistrot stellato.</p>

<h3>Hotel Continentale</h3>
<p>Design contemporaneo con terrazza rooftop vista Duomo. Cani piccoli/medi ammessi, supplemento 25 euro/notte.</p>

<h3>J.K. Place Firenze</h3>
<p>Boutique di lusso in piazza Santa Maria Novella. Cani fino a 8 kg gratis, oltre su richiesta. Atmosfera residenziale.</p>

<h2>Oltrarno e dintorni (fascia media)</h2>

<h3>Hotel La Scaletta</h3>
<p>Hotel storico in via Guicciardini, vicino a Ponte Vecchio lato Oltrarno. Terrazza con vista Palazzo Pitti. Cani ammessi, supplemento 15 euro/notte.</p>

<h3>Hotel Orto de' Medici</h3>
<p>Vicino a Piazza San Marco, 4 stelle con giardino interno di 600 m2. Cani di tutte le taglie, supplemento 20 euro/notte.</p>

<h3>Hotel Villa Liberty</h3>
<p>Villa liberty nel quartiere Campo di Marte, zona tranquilla. Giardino privato, parcheggio. Cani ammessi, supplemento 10 euro/notte.</p>

<h2>Agriturismi e ville dintorni (chi ha l'auto)</h2>

<h3>Chianti</h3>
<p>A 30-45 minuti da Firenze, il Chianti e pieno di agriturismi pet-friendly: tenute vinicole dove il cane puo correre libero. Prezzi medi, ideale per 4-7 notti.</p>

<h3>Colline fiorentine</h3>
<p>Fiesole, Settignano, Bagno a Ripoli hanno ville trasformate in boutique hotel con giardini e piscine. 15-20 minuti dal centro, ma tranquillita massima.</p>

<h3>Verso Siena</h3>
<p>Per chi vuole combinare Firenze + Toscana: base a <a href="/vacanze/regione/toscana">San Gimignano o Val d'Orcia</a>, giornate a Firenze in treno (45-60 min).</p>

<h2>Zone top per dormire con il cane</h2>

<h3>Oltrarno (Santo Spirito / San Frediano)</h3>
<p>Il quartiere piu autentico e pet-friendly. Piazza Santo Spirito ha decine di ristoranti con dehors. Lontano dalla folla turistica del centro.</p>

<h3>San Niccolo</h3>
<p>Ai piedi di Piazzale Michelangelo, Giardino delle Rose a 5 minuti. Ristoranti pet-friendly ovunque, atmosfera residenziale.</p>

<h3>Campo di Marte / Coverciano</h3>
<p>Zona residenziale tranquilla, parchi piu grandi, prezzi piu bassi. Tramvia verso il centro in 15 minuti.</p>

<h3>Le Cascine (zona ovest)</h3>
<p>Vicino al parco piu grande di Firenze (160 ettari). Hotel di fascia media, area tranquilla, buon trasporto pubblico.</p>

<h2>Quanto costa</h2>
<ul>
<li><strong>Luxury</strong>: 600-1500 euro/notte (Villa La Massa, Four Seasons)</li>
<li><strong>Fascia alta</strong>: 250-500 euro/notte (boutique 4 stelle centro)</li>
<li><strong>Fascia media</strong>: 120-250 euro/notte (hotel 3-4 stelle Oltrarno/periferia)</li>
<li><strong>B&B/appartamenti</strong>: 70-150 euro/notte</li>
<li>Supplemento cane tipico: <strong>10-30 euro/notte</strong></li>
</ul>

<h2>Trasporti pubblici</h2>
<ul>
<li><strong>Tramvia ATAF</strong>: cani con museruola+guinzaglio ammessi, ticket normale</li>
<li><strong>Bus</strong>: stesse regole, 1 cane per mezzo</li>
<li><strong>Treni regionali</strong> (per Fiesole, Pisa, Lucca, Siena): cani ammessi, ticket 50%</li>
<li><strong>Frecciarossa/Italo</strong> (Milano, Roma, Venezia): cani grandi nel vagone apposito, piccoli in trasportino gratis</li>
</ul>

<h2>Gite dai Firenze con il cane</h2>
<ul>
<li><a href="/magazine/sentieri-dog-friendly-toscana-2026">Sentieri dog-friendly in Toscana</a> — 10 escursioni selezionate</li>
<li><a href="/sentieri/via-francigena-san-gimignano">Via Francigena a San Gimignano</a> — 18 km di trekking medievale</li>
<li>Mugello (Barberino, Scarperia) — 40 minuti in auto, lago Bilancino pet-friendly</li>
</ul>

<h2>Ristoranti in zona</h2>
<p>Vedi la <a href="/magazine/ristoranti-pet-friendly-firenze-2026">selezione di 10 ristoranti pet-friendly a Firenze</a>.</p>

<p>Lista completa degli <a href="/vacanze/citta/firenze">hotel pet-friendly a Firenze</a> con filtri per zona, prezzo e taglia cane.</p>
    `,
  },
];
