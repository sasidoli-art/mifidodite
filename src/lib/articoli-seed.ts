// Articoli seed — contenuti reali per il magazine
// Verranno migrati su Supabase quando il DB e configurato

import { ARTICOLI_SPIAGGE } from "./articoli-spiagge-seed";
import { ARTICOLI_VACANZE } from "./articoli-vacanze-seed";
import { ARTICOLI_EVERGREEN } from "./articoli-evergreen-seed";
import { ARTICOLI_REGIONALI } from "./articoli-regionali-seed";
import { ARTICOLI_SHOPPING } from "./articoli-shopping-seed";

export const ARTICOLI_SEED = [
  ...ARTICOLI_EVERGREEN,
  ...ARTICOLI_REGIONALI,
  ...ARTICOLI_SHOPPING,
  ...ARTICOLI_VACANZE,
  ...ARTICOLI_SPIAGGE,
  {
    slug: "come-scegliere-pensione-cani-7-domande",
    titolo: "Come scegliere la pensione giusta: 7 domande da fare prima di prenotare",
    categoria: "guide",
    estratto: "Non tutte le pensioni sono uguali. Ecco le domande che ogni proprietario dovrebbe fare prima di affidare il proprio cane.",
    img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
    tempo_lettura: "6 min",
    data: "28 Mar 2026",
    tags: ["pensione", "cane", "vacanza", "consigli"],
    contenuto: `
<p>Stai per partire e devi lasciare il tuo cane in pensione? La scelta non va fatta all'ultimo momento. Una pensione sbagliata puo trasformare la tua vacanza in un incubo di sensi di colpa. Ecco le 7 domande da fare <strong>prima</strong> di prenotare.</p>

<h2>1. Posso visitare la struttura prima del soggiorno?</h2>
<p>Questa e la domanda piu importante. Una pensione seria ti invita a visitarla senza problemi. Se ti dicono "non e possibile" o "non serve", cambia struttura. Punto.</p>
<p>Durante la visita osserva: gli spazi sono puliti? I cani presenti sembrano sereni? C'e un giardino recintato? L'odore e accettabile?</p>

<h2>2. Quanti cani ospitate contemporaneamente?</h2>
<p>Questo ti dice molto sulla qualita dell'attenzione. Una pensione familiare con 5-10 cani offre un'esperienza diversa da una struttura con 50 box. Nessuna delle due e sbagliata, ma devi sapere cosa aspettarti.</p>

<h2>3. Come gestite i pasti e le diete speciali?</h2>
<p>Se il tuo cane mangia crocchette specifiche o ha intolleranze, la pensione deve essere in grado di gestirle. Molte pensioni di qualita ti chiedono di portare il cibo abituale del cane — e questo e un buon segno.</p>

<h2>4. C'e un veterinario convenzionato?</h2>
<p>Le emergenze non avvisano. Chiedi se la pensione ha un veterinario di riferimento, quanto dista, e come gestiscono una situazione di emergenza. Idealmente dovrebbero chiamarti subito e portare il cane dal veterinario senza aspettare.</p>

<h2>5. Come sono organizzati gli spazi?</h2>
<p>Box singoli o condivisi? Accesso al giardino quanto spesso? I cani stanno insieme o separati per taglia? Un buon equilibrio prevede momenti di socializzazione controllata e spazi individuali per il riposo.</p>

<h2>6. Posso ricevere aggiornamenti durante il soggiorno?</h2>
<p>Le migliori pensioni inviano foto e video quotidiani. Alcune hanno webcam accessibili 24 ore. Non e un vezzo: sapere che il tuo cane sta bene ti permette di goderti davvero la vacanza.</p>

<h2>7. Qual e la politica di cancellazione?</h2>
<p>Controlla sempre le condizioni: caparra, cancellazione, penali. Una pensione trasparente ha regole chiare scritte nero su bianco.</p>

<h2>Il consiglio in piu</h2>
<p>Fai un <strong>soggiorno di prova</strong> di una notte prima del periodo lungo. Vedrai come reagisce il tuo cane e se ti senti tranquillo. E il modo migliore per testare la pensione senza rischi.</p>

<p>Su MifidoDiTe.eu puoi cercare pensioni vicino a te, leggere le recensioni di altri proprietari e chiedere disponibilita in pochi secondi.</p>
    `,
  },
  {
    slug: "ansia-separazione-cane-cause-soluzioni",
    titolo: "Ansia da separazione nel cane: perche succede e cosa puoi fare",
    categoria: "comportamento",
    estratto: "Il tuo cane piange quando esci? Distrugge casa? Non e dispetto — e ansia. Ecco come aiutarlo davvero.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    tempo_lettura: "7 min",
    data: "25 Mar 2026",
    tags: ["comportamento", "ansia", "cane", "educazione"],
    contenuto: `
<p>Torni a casa e trovi il divano distrutto, le scarpe masticate, i vicini che si lamentano per i latrati. Il tuo primo pensiero e "lo fa per dispetto". Sbagliato. Il tuo cane non e arrabbiato con te. Ha <strong>paura</strong>.</p>

<h2>Cos'e l'ansia da separazione</h2>
<p>L'ansia da separazione e una vera e propria condizione comportamentale. Il cane, quando resta solo, entra in uno stato di panico. Non riesce a gestire l'assenza del suo umano di riferimento. I comportamenti distruttivi, i vocalizzi e i bisogni in casa non sono vendetta: sono sintomi.</p>

<h2>Come riconoscerla</h2>
<p>I segnali piu comuni sono:</p>
<ul>
<li>Abbaiare, ululare o piangere appena esci (o anche prima)</li>
<li>Distruggere oggetti, porte, mobili</li>
<li>Fare i bisogni in casa anche se e abituato a farli fuori</li>
<li>Ipersalivazione, tremore, respirazione affannosa</li>
<li>Seguirti ossessivamente per casa quando sei presente</li>
</ul>
<p>Un dettaglio importante: questi comportamenti avvengono <strong>solo</strong> quando il cane e solo. Se distrugge cose anche quando sei presente, il problema e un altro.</p>

<h2>Perche succede</h2>
<p>Le cause sono diverse:</p>
<ul>
<li><strong>Cambiamento improvviso di routine</strong> — hai iniziato un nuovo lavoro, ti sei trasferito</li>
<li><strong>Iperattaccamento</strong> — il cane non ha mai imparato a stare solo</li>
<li><strong>Esperienze traumatiche</strong> — abbandono, canile, cambio di famiglia</li>
<li><strong>Mancanza di stimoli</strong> — noia e assenza di attivita mentale</li>
</ul>

<h2>Cosa NON fare</h2>
<p><strong>Non punirlo.</strong> Mai. Sgridare il cane quando torni a casa non serve a nulla — non collega la punizione al comportamento di ore prima. Peggio ancora: aumenti la sua ansia perche il tuo ritorno diventa imprevedibile.</p>
<p><strong>Non fare drammi quando esci.</strong> Niente saluti lunghi, niente "mamma torna presto". Piu enfasi dai alla partenza, piu il cane capisce che sta per succedere qualcosa di brutto.</p>

<h2>Cosa FARE</h2>
<p><strong>Desensibilizzazione graduale.</strong> Inizia con assenze brevissime (30 secondi) e aumenta progressivamente. Il cane deve imparare che esci, ma torni sempre.</p>
<p><strong>Arricchimento ambientale.</strong> Kong farciti, tappetini olfattivi, giochi di intelligenza. Un cane stanco mentalmente e un cane piu sereno.</p>
<p><strong>Routine prevedibile.</strong> Stessi orari, stessi rituali. La prevedibilita rassicura.</p>
<p><strong>Consulta un educatore cinofilo.</strong> I casi gravi richiedono un professionista. Non c'e nulla di male nel chiedere aiuto — anzi, e la cosa piu responsabile che puoi fare.</p>

<p>Su MifidoDiTe.eu puoi trovare educatori cinofili specializzati in problemi comportamentali nella tua zona.</p>
    `,
  },
  {
    slug: "cane-ha-salvato-bambino-dal-fiume-vicenza",
    titolo: "Il cane che ha salvato un bambino dal fiume: la storia di Thor a Vicenza",
    categoria: "aneddoti",
    estratto: "Un Pastore Tedesco si tuffa nel Bacchiglione e riporta a riva un bambino di 6 anni. Una storia vera che commuove l'Italia.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    tempo_lettura: "4 min",
    data: "22 Mar 2026",
    tags: ["aneddoti", "cane", "salvataggio", "storie vere"],
    contenuto: `
<p>Ci sono storie che ti ricordano perche il cane e il migliore amico dell'uomo. Questa e una di quelle.</p>

<h2>Cosa e successo</h2>
<p>Vicenza, una domenica pomeriggio di marzo. Marco, 6 anni, gioca lungo la riva del Bacchiglione con la famiglia. Un momento di distrazione, un piede che scivola, e il bambino finisce nell'acqua gelida. La corrente lo trascina.</p>
<p>Thor, il Pastore Tedesco di 4 anni della famiglia, non aspetta un secondo. Si lancia nel fiume, raggiunge il bambino, lo afferra per la giacca e lo riporta verso riva. I genitori, nel panico, lo aiutano a uscire dall'acqua.</p>

<h2>Nessun addestramento specifico</h2>
<p>La cosa straordinaria? Thor non e un cane da salvataggio. Non ha mai fatto corsi di soccorso in acqua. E "semplicemente" un cane di famiglia che ha reagito d'istinto quando ha percepito il pericolo.</p>
<p>"Non ci ha pensato un attimo" racconta Lucia, la mamma di Marco. "Ha visto Marco nell'acqua e si e buttato. Noi eravamo paralizzati dalla paura. Thor no."</p>

<h2>Il legame invisibile</h2>
<p>I veterinari comportamentalisti spiegano che il legame tra cane e bambino e uno dei piu forti in natura. Il cane percepisce il bambino come un cucciolo del branco — qualcuno da proteggere a ogni costo.</p>
<p>Non e telepatia. E evoluzione. Migliaia di anni di convivenza hanno creato un legame che va oltre le parole. Il cane legge le nostre emozioni dal tono di voce, dal linguaggio del corpo, dall'odore della paura.</p>

<h2>Thor oggi</h2>
<p>Marco sta bene. Thor ha ricevuto una visita veterinaria (tutto ok, solo un po' di freddo) e una scorta a vita di biscotti. La famiglia ha raccontato la storia sui social, dove e diventata virale in poche ore.</p>
<p>"Le persone ci scrivono da tutta Italia" dice Lucia. "Ma Thor non capisce tutta questa attenzione. Per lui era normale. Era il suo bambino."</p>

<p><em>Questa storia ci ricorda una cosa semplice: quando dici "mi fido di te" al tuo cane, lui lo dice anche a te. Ogni giorno, senza parole.</em></p>
    `,
  },
  {
    slug: "golden-retriever-tutto-sulla-razza",
    titolo: "Golden Retriever: la guida completa alla razza piu amata d'Italia",
    categoria: "razze",
    estratto: "Dolce, intelligente, instancabile. Tutto quello che devi sapere sul Golden Retriever prima di adottarne uno.",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
    tempo_lettura: "8 min",
    data: "20 Mar 2026",
    tags: ["golden retriever", "razze", "cane", "guida"],
    contenuto: `
<p>Se esiste un cane "da copertina", e il Golden Retriever. Sorriso contagioso, pelo dorato, scodinzolio perpetuo. Ma dietro quell'aspetto da peluche c'e un cane con esigenze precise. Ecco tutto quello che devi sapere.</p>

<h2>Origini e storia</h2>
<p>Il Golden Retriever nasce in Scozia nella seconda meta dell'800. Lord Tweedmouth voleva un cane da riporto che fosse efficace sia in acqua che sulla terra. Il risultato? Un cane atletico, intelligente e con un amore innato per l'acqua.</p>

<h2>Carattere</h2>
<p>Il Golden e il cane "tutti amici". Socievole con persone, bambini, altri cani, gatti — praticamente con chiunque. Questa socievolezza estrema ha un rovescio della medaglia: <strong>non e un cane da guardia</strong>. Se un ladro entra in casa, probabilmente gli portera la pallina.</p>
<p>E intelligentissimo (al 4° posto nella classifica di Stanley Coren) e desideroso di compiacere. Questo lo rende facilissimo da addestrare ma anche sensibile ai rimproveri — bastano un tono di voce e uno sguardo.</p>

<h2>Esigenze fisiche</h2>
<p>Qui molti proprietari cadono. Il Golden <strong>non</strong> e un cane da divano. Ha bisogno di:</p>
<ul>
<li>Almeno 1-2 ore di attivita fisica al giorno</li>
<li>Nuoto (lo adora, e nel suo DNA)</li>
<li>Giochi di riporto e ricerca olfattiva</li>
<li>Stimolazione mentale quotidiana</li>
</ul>
<p>Un Golden annoiato e un Golden distruttivo. E con quella bocca morbida da riporto, puo fare danni seri a scarpe, cuscini e telecomandi.</p>

<h2>Salute</h2>
<p>Come molte razze pure, il Golden ha alcune predisposizioni genetiche:</p>
<ul>
<li><strong>Displasia dell'anca e del gomito</strong> — controlla sempre i genitori</li>
<li><strong>Problemi cardiaci</strong> — stenosi subaortica</li>
<li><strong>Tumori</strong> — purtroppo il Golden ha un'incidenza tumorale superiore alla media</li>
<li><strong>Obesita</strong> — mangerebbe qualsiasi cosa, sempre. Attenzione alle dosi</li>
</ul>
<p>Aspettativa di vita: 10-12 anni. Le visite veterinarie regolari sono fondamentali.</p>

<h2>Il pelo, questo sconosciuto</h2>
<p>Se non ami i peli, il Golden non fa per te. Perde pelo tutto l'anno, con due mute stagionali epiche. Servono:</p>
<ul>
<li>Spazzolatura 3-4 volte a settimana (quotidiana in muta)</li>
<li>Bagni ogni 4-6 settimane</li>
<li>Mai rasarlo — il sottopelo lo protegge dal caldo e dal freddo</li>
</ul>

<h2>Per chi e adatto</h2>
<p>Famiglie attive, persone sportive, chi ha tempo e spazio. Non e adatto a chi sta fuori casa 10 ore al giorno o a chi cerca un cane indipendente. Il Golden vuole stare con te. Sempre.</p>

<h2>Quanto costa</h2>
<p>Un cucciolo da allevamento serio: 1.200-2.500€. Diffida dai prezzi troppo bassi — spesso nascondono allevamenti intensivi senza controlli sanitari. In alternativa, esistono associazioni di rescue specifiche per Golden Retriever.</p>

<p>Cerchi un educatore cinofilo esperto di Golden nella tua zona? Su MifidoDiTe.eu li trovi a pochi km da te.</p>
    `,
  },
  {
    slug: "5-cibi-pericolosi-per-cani",
    titolo: "5 cibi che diamo ai cani pensando di fare bene (e che sono pericolosi)",
    categoria: "salute",
    estratto: "Uva, cioccolato, aglio: cibi comuni che possono essere tossici per il tuo cane. Ecco cosa evitare assolutamente.",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80",
    tempo_lettura: "5 min",
    data: "18 Mar 2026",
    tags: ["salute", "alimentazione", "cane", "pericoli"],
    contenuto: `
<p>Lo facciamo tutti: il cane ci guarda con quegli occhi imploranti e gli allunghiamo un pezzo di quello che stiamo mangiando. Ma alcuni cibi che per noi sono innocui possono essere <strong>tossici</strong> per i cani. Anche in piccole quantita.</p>

<h2>1. Uva e uvetta</h2>
<p>Sembra incredibile, ma uva e uvetta possono causare <strong>insufficienza renale acuta</strong> nel cane. E il bello e che non si sa ancora esattamente quale sostanza sia responsabile. Alcuni cani mangiano uva senza problemi, altri si intossicano con pochi acini.</p>
<p>Il consiglio: evita completamente. Non vale la pena rischiare.</p>

<h2>2. Cioccolato</h2>
<p>Questo lo sanno in molti, ma non tutti sanno <strong>perche</strong>. Il cioccolato contiene teobromina, una sostanza che il cane metabolizza molto lentamente. Il cioccolato fondente e il piu pericoloso — 50g possono essere letali per un cane di 5 kg.</p>
<p>Sintomi: vomito, diarrea, iperattivita, tremori, convulsioni. Se il tuo cane ha mangiato cioccolato, chiama subito il veterinario.</p>

<h2>3. Aglio e cipolla</h2>
<p>Attenzione: non solo crudi. Aglio e cipolla, in qualsiasi forma (cotti, in polvere, nel sugo), contengono composti che distruggono i globuli rossi del cane, causando anemia emolitica.</p>
<p>L'effetto e cumulativo — piccole dosi ripetute nel tempo fanno danni quanto una dose grande. Quindi no, il sugo della nonna non va bene per Fido.</p>

<h2>4. Xilitolo (dolcificante)</h2>
<p>Lo trovi nelle gomme da masticare, in alcuni dentifrici, nei prodotti "senza zucchero". Per il cane e estremamente pericoloso: causa un crollo della glicemia e puo danneggiare il fegato in modo irreversibile.</p>
<p>Tieni le gomme da masticare lontano dal cane. Sempre.</p>

<h2>5. Ossa cotte</h2>
<p>"Ma i cani hanno sempre mangiato ossa!" Vero, ma ossa <strong>crude</strong>. Le ossa cotte si frammentano in schegge affilate che possono perforare stomaco e intestino. Le ossa di pollo cotte sono le piu pericolose.</p>
<p>Se vuoi dare ossa al tuo cane, scegli ossa crude di grandi dimensioni (ginocchio di bovino, ad esempio) e sempre sotto supervisione.</p>

<h2>Cosa fare in caso di ingestione</h2>
<p>Non aspettare i sintomi. Se il tuo cane ha mangiato qualcosa di sospetto:</p>
<ul>
<li>Chiama il veterinario o il pronto soccorso veterinario</li>
<li>Non provocare il vomito se non te lo dice il veterinario</li>
<li>Porta con te la confezione del prodotto ingerito</li>
</ul>

<p>Su MifidoDiTe.eu trovi cliniche veterinarie H24 e pronto soccorso nella tua zona — salvale nei preferiti prima di averne bisogno.</p>
    `,
  },
  {
    slug: "gatti-e-scatole-perche-ci-entrano",
    titolo: "Perche i gatti entrano nelle scatole? La scienza dietro l'ossessione",
    categoria: "gatti",
    estratto: "Scatole di scarpe, buste, cassetti aperti: il tuo gatto ci entra sempre. Ecco la spiegazione scientifica.",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    tempo_lettura: "4 min",
    data: "15 Mar 2026",
    tags: ["gatti", "comportamento", "curiosita", "scienza"],
    contenuto: `
<p>Compri un tiragraffi da 80 euro. Il gatto ignora il tiragraffi e si infila nella scatola in cui era confezionato. Suona familiare?</p>

<h2>Non e un capriccio: e istinto</h2>
<p>Uno studio dell'Universita di Utrecht (Paesi Bassi) ha dimostrato che i gatti con accesso a una scatola mostrano livelli di stress significativamente piu bassi rispetto a quelli senza. La scatola non e un gioco — e un <strong>rifugio</strong>.</p>

<h2>Le 3 ragioni scientifiche</h2>

<h3>1. Sicurezza e controllo</h3>
<p>In natura, i felini sono sia predatori che prede. Uno spazio chiuso offre protezione su piu lati: il gatto puo osservare senza essere visto. E l'equivalente felino di un bunker — con vista.</p>

<h3>2. Termoregolazione</h3>
<p>La temperatura ideale per un gatto e tra 30 e 36 gradi — molto piu alta della nostra. Il cartone e un isolante termico eccellente. Dentro una scatola, il gatto crea una piccola bolla di calore perfetta per i suoi standard.</p>

<h3>3. Riduzione dello stress</h3>
<p>Nello studio di Utrecht, i gatti appena arrivati in un rifugio che avevano una scatola si adattavano all'ambiente in 3 giorni. Quelli senza scatola ci mettevano 14 giorni. La scatola e letteralmente un anti-stress naturale.</p>

<h2>Ma perche anche le scatole minuscole?</h2>
<p>Qui entra in gioco la propriocezione — la percezione del proprio corpo nello spazio. La pressione delle pareti della scatola sui fianchi del gatto ha un effetto calmante, simile a quello delle coperte pesate per gli umani. Piu la scatola e stretta, piu il gatto si sente "abbracciato".</p>

<h2>E le buste di plastica?</h2>
<p>Stesso principio, con un bonus: il rumore. Il fruscio della plastica ricorda i movimenti di piccole prede nell'erba. Per il gatto e una scatola che fa anche da gioco di caccia. Due piccioni con una fava (espressione che il gatto apprezzerebbe letteralmente).</p>

<h2>Cosa puoi fare tu</h2>
<p>Non buttare le scatole di Amazon. Seriamente. Lasciane una o due in giro per casa. Il tuo gatto te ne sara grato — a modo suo, cioe ignorandoti con leggermente meno disdegno del solito.</p>

<p>Cerchi un cat sitter che conosca davvero i gatti? Su MifidoDiTe.eu trovi professionisti felini nella tua zona.</p>
    `,
  },
];
