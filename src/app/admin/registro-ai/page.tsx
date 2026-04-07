export const metadata = {
  title: "Registro AI — Admin MifidoDiTe",
};

export default function RegistroAIPage() {
  return (
    <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Registro Sistemi di Intelligenza Artificiale</h1>
          <p className="text-muted-foreground mb-2">Ai sensi del Regolamento UE 2024/1689 (AI Act)</p>
          <p className="text-sm text-muted-foreground mb-10">Ultimo aggiornamento: 5 aprile 2026</p>

          <div className="prose prose-sm max-w-none text-foreground/80">

            <h2>Classificazione del rischio</h2>
            <p>Tutti i sistemi AI utilizzati da MifidoDiTe.eu rientrano nella categoria di <strong>rischio limitato</strong> (Art. 50 AI Act) in quanto:</p>
            <ul>
              <li>Non prendono decisioni automatizzate con effetti giuridici sugli utenti</li>
              <li>Non trattano dati biometrici o sensibili</li>
              <li>Non operano in ambiti ad alto rischio (salute, giustizia, istruzione)</li>
              <li>Generano contenuti testuali chiaramente identificati come AI-generated</li>
            </ul>
            <p>L&apos;obbligo principale e la <strong>trasparenza</strong> (Art. 50.1): informare gli utenti che interagiscono con contenuti generati da AI.</p>

            <hr />

            <h2>Sistema AI 1: Generatore di contenuti editoriali</h2>
            <table>
              <tbody>
                <tr><td><strong>Modelli utilizzati</strong></td><td>Claude Haiku (Anthropic) — primario; DeepSeek Chat — secondario</td></tr>
                <tr><td><strong>Scopo</strong></td><td>Generazione di articoli per il magazine pet (guide, curiosita, razze, salute, comportamento, aneddoti)</td></tr>
                <tr><td><strong>Input</strong></td><td>Prompt tematico con regole editoriali. Nessun dato personale degli utenti</td></tr>
                <tr><td><strong>Output</strong></td><td>Articoli HTML completi (800-1400 parole)</td></tr>
                <tr><td><strong>Frequenza</strong></td><td>2 articoli/settimana (automatico via cron)</td></tr>
                <tr><td><strong>Supervisione umana</strong></td><td>Articoli salvati come bozze, pubblicati dopo revisione dall&apos;admin</td></tr>
                <tr><td><strong>Trasparenza</strong></td><td>Badge visibile su ogni articolo: &quot;Scritto con l&apos;assistenza dell&apos;intelligenza artificiale e revisionato dalla redazione&quot;</td></tr>
                <tr><td><strong>Rischio</strong></td><td>Limitato — contenuti informativi, non decisori</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Sistema AI 2: Generatore di descrizioni strutture</h2>
            <table>
              <tbody>
                <tr><td><strong>Modelli utilizzati</strong></td><td>Claude Haiku, DeepSeek Chat</td></tr>
                <tr><td><strong>Scopo</strong></td><td>Creazione di descrizioni emozionali (storytelling) per profili di strutture pet a partire da dati fattuali</td></tr>
                <tr><td><strong>Input</strong></td><td>Nome, citta, categoria, descrizione fattuale della struttura</td></tr>
                <tr><td><strong>Output</strong></td><td>Descrizione emozionale (2-3 frasi)</td></tr>
                <tr><td><strong>Supervisione umana</strong></td><td>Revisione batch dall&apos;admin</td></tr>
                <tr><td><strong>Trasparenza</strong></td><td>Nota sotto la descrizione: &quot;Descrizione rielaborata con l&apos;assistenza dell&apos;AI a partire da informazioni pubbliche&quot;</td></tr>
                <tr><td><strong>Rischio</strong></td><td>Limitato — nessun impatto su diritti degli interessati</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Sistema AI 3: Analizzatore di dati scraping</h2>
            <table>
              <tbody>
                <tr><td><strong>Modelli utilizzati</strong></td><td>Claude Haiku</td></tr>
                <tr><td><strong>Scopo</strong></td><td>Estrazione di informazioni strutturate (nome, indirizzo, telefono, servizi) da testi web non strutturati</td></tr>
                <tr><td><strong>Input</strong></td><td>Testo HTML da pagine web pubbliche (Google, PagineGialle)</td></tr>
                <tr><td><strong>Output</strong></td><td>Dati strutturati in formato JSON</td></tr>
                <tr><td><strong>Frequenza</strong></td><td>1 citta/giorno (automatico via cron)</td></tr>
                <tr><td><strong>Supervisione umana</strong></td><td>Strutture salvate come non attive, attivate dopo verifica admin</td></tr>
                <tr><td><strong>Trasparenza</strong></td><td>Profili contrassegnati come &quot;Profilo importato automaticamente&quot;</td></tr>
                <tr><td><strong>Rischio</strong></td><td>Limitato — solo dati gia pubblici, diritto di opposizione garantito</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Sistema AI 4: Generatore email outreach</h2>
            <table>
              <tbody>
                <tr><td><strong>Modelli utilizzati</strong></td><td>Claude Haiku</td></tr>
                <tr><td><strong>Scopo</strong></td><td>Generazione di email personalizzate per invitare professionisti a registrarsi</td></tr>
                <tr><td><strong>Input</strong></td><td>Nome attivita, citta, categoria del professionista</td></tr>
                <tr><td><strong>Output</strong></td><td>Email HTML personalizzata (oggetto + corpo)</td></tr>
                <tr><td><strong>Frequenza</strong></td><td>Max 10 email/giorno con warm-up graduale</td></tr>
                <tr><td><strong>Supervisione umana</strong></td><td>Monitoraggio tramite dashboard admin agenti</td></tr>
                <tr><td><strong>Trasparenza</strong></td><td>Ogni email contiene: &quot;Questa email e stata generata automaticamente da MifidoDiTe.eu&quot;</td></tr>
                <tr><td><strong>Rischio</strong></td><td>Limitato — interazione con umani dichiarata (Art. 50.1 AI Act)</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Sistema AI 5: Generatore post social</h2>
            <table>
              <tbody>
                <tr><td><strong>Modelli utilizzati</strong></td><td>Claude Haiku</td></tr>
                <tr><td><strong>Scopo</strong></td><td>Generazione di bozze per post Facebook, Instagram e TikTok a partire da articoli del magazine</td></tr>
                <tr><td><strong>Input</strong></td><td>Titolo e estratto degli articoli</td></tr>
                <tr><td><strong>Output</strong></td><td>Testi per post social (caption, hashtag, concept video)</td></tr>
                <tr><td><strong>Supervisione umana</strong></td><td>Post salvati nel DB come bozze, pubblicazione manuale</td></tr>
                <tr><td><strong>Trasparenza</strong></td><td>Se pubblicati, identificati come contenuti assistiti da AI</td></tr>
                <tr><td><strong>Rischio</strong></td><td>Minimo — bozze non pubblicate automaticamente</td></tr>
              </tbody>
            </table>

            <hr />

            <h2>Misure di conformita AI Act</h2>
            <ul>
              <li><strong>Art. 50.1 — Trasparenza:</strong> tutti i contenuti AI sono identificati con badge, note o disclosure</li>
              <li><strong>Art. 50.2 — Interazione con umani:</strong> le email outreach dichiarano di essere generate automaticamente</li>
              <li><strong>Art. 52 — No decisioni automatizzate:</strong> nessun sistema AI prende decisioni con effetti giuridici</li>
              <li><strong>Supervisione umana:</strong> tutti gli output AI passano per revisione/approvazione admin prima della pubblicazione</li>
              <li><strong>Nessun dato personale per training:</strong> i modelli AI non vengono addestrati con dati degli utenti di MifidoDiTe.eu</li>
            </ul>

            <h2>Contatti</h2>
            <p>Per domande sull&apos;utilizzo dell&apos;AI nel Portale: <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a></p>
      </div>
    </div>
  );
}
