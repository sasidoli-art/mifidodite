import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Privacy Policy — MifidoDiTe.eu",
  description: "Informativa sulla privacy e sul trattamento dei dati personali di MifidoDiTe.eu ai sensi del GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-2">Ultimo aggiornamento: 22 giugno 2026</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10 text-sm text-amber-900">
            <strong>Modalita pausa attiva.</strong> MifidoDiTe.eu opera attualmente come archivio di consultazione in sola lettura.
            Le iscrizioni alla newsletter, il chatbot AI, l&apos;analytics Google e la registrazione di nuovi utenti sono temporaneamente sospesi.
            I trattamenti descritti restano operativi solo per gli iscritti esistenti e per la gestione del sito.
          </div>

          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali e MifidoDiTe.eu (di seguito "il Titolare"), contattabile all'indirizzo email: <a href="mailto:info@mifidodite.eu">info@mifidodite.eu</a>.
            </p>

            <h2>2. Dati raccolti</h2>
            <p>In modalita pausa il portale raccoglie un numero molto limitato di dati personali:</p>
            <ul>
              <li><strong>Dati di navigazione:</strong> indirizzo IP e log tecnici di accesso del nostro hosting (Vercel) e del database (Neon), trattenuti per finalita di sicurezza e diagnostica.</li>
              <li><strong>Iscritti esistenti alla newsletter</strong> (raccolti prima del 22 giugno 2026): email, eventuale nome e CAP. Nessuna nuova iscrizione viene accettata durante la pausa.</li>
              <li><strong>Comunicazioni dirette via email</strong> inviate spontaneamente dagli utenti a info@mifidodite.eu.</li>
            </ul>
            <p>Durante la pausa non sono attivi: chatbot AI, form di lead/contatto, registrazione professionisti, Google Analytics, popup di iscrizione.</p>

            <h2>3. Finalita del trattamento</h2>
            <ul>
              <li><strong>Erogazione del servizio in sola lettura:</strong> consentire la consultazione di guide, mappe, calcolatori e magazine.</li>
              <li><strong>Gestione iscritti newsletter esistenti:</strong> conservazione della lista e gestione delle richieste di disiscrizione.</li>
              <li><strong>Sicurezza:</strong> protezione del sito e prevenzione abusi tramite log di sistema.</li>
            </ul>

            <h2>4. Base giuridica</h2>
            <ul>
              <li><strong>Consenso</strong> (art. 6.1.a GDPR): per gli iscritti newsletter esistenti, revocabile in qualsiasi momento.</li>
              <li><strong>Legittimo interesse</strong> (art. 6.1.f GDPR): per la sicurezza del portale e i log tecnici.</li>
            </ul>

            <h2>5. Destinatari dei dati</h2>
            <p>I dati personali possono essere trattati dai seguenti responsabili del trattamento:</p>
            <ul>
              <li><strong>Vercel Inc.</strong> (hosting, sede USA — trasferimento basato su DPF EU-USA + Clausole Contrattuali Standard).</li>
              <li><strong>Neon Inc.</strong> (database PostgreSQL su data center Frankfurt, EU — sede societaria USA, SCC applicabili).</li>
              <li><strong>Aruba S.p.A.</strong> (SMTP transazionale, server in Italia).</li>
              <li><strong>Sendinblue / Brevo SAS</strong> (gestione invii newsletter, sede in Francia — EU).</li>
            </ul>
            <p>I dati non vengono ceduti a terzi ne utilizzati per finalita di profilazione commerciale.</p>
            <p>
              <strong>Servizi temporaneamente disattivati</strong> (i cui dati storici sono stati cancellati o pseudonimizzati):
              Google Analytics 4, Anthropic (Claude — USA), DeepSeek (Cina), OpenRouter (USA). Eventuali dati residui presenti nel database
              relativi a precedenti utilizzi di questi servizi sono soggetti alle politiche di retention indicate al paragrafo 6.
            </p>

            <h2>6. Conservazione dei dati</h2>
            <ul>
              <li>Iscritti newsletter: fino alla disiscrizione (link presente in ogni email).</li>
              <li>Log di sistema e sicurezza: massimo 12 mesi.</li>
              <li>Email ricevute a info@mifidodite.eu: conservate per il tempo necessario a gestire la richiesta, di norma non oltre 24 mesi.</li>
              <li>Dati storici di lead / chatbot / professionisti raccolti prima della pausa: in corso di anonimizzazione o cancellazione progressiva.</li>
            </ul>

            <h2>7. Diritti dell'interessato</h2>
            <p>Ai sensi degli articoli 15-22 del GDPR, hai diritto di:</p>
            <ul>
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare dati inesatti</li>
              <li>Cancellare i tuoi dati ("diritto all'oblio")</li>
              <li>Limitare il trattamento</li>
              <li>Portabilita dei dati</li>
              <li>Opporti al trattamento</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p>Per esercitare questi diritti, scrivi a: <a href="mailto:info@mifidodite.eu">info@mifidodite.eu</a>.</p>

            <h2>8. Cookie</h2>
            <p>In modalita pausa il sito utilizza esclusivamente cookie tecnici necessari al funzionamento (sessione, gestione consenso cookie, preferenze). Non richiedono consenso ai sensi dell&apos;art. 122 Codice Privacy.</p>
            <p>Google Analytics 4 e gli altri strumenti di misurazione sono <strong>temporaneamente disattivati</strong>. Non vengono inviati a Google ne ad altre piattaforme dati di navigazione degli utenti durante la pausa.</p>
            <p>Puoi gestire le tue preferenze in qualsiasi momento dal link <strong>&ldquo;Gestisci cookie&rdquo;</strong> nel footer.</p>

            <h2>9. Sicurezza</h2>
            <p>Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali: crittografia in transito (HTTPS/TLS), password hashate con bcrypt per gli account esistenti, accesso ai dati limitato al personale autorizzato.</p>

            <h2>10. Utilizzo dell&apos;Intelligenza Artificiale</h2>
            <p><strong>Tutti i sistemi di intelligenza artificiale del sito sono temporaneamente disattivati</strong> durante la pausa, in coerenza con il Regolamento UE 2024/1689 (AI Act). In particolare sono disattivati:</p>
            <ul>
              <li>il chatbot conversazionale &ldquo;Zampa&rdquo;;</li>
              <li>la generazione automatica di nuovi contenuti editoriali;</li>
              <li>la generazione di post per i social network;</li>
              <li>i flussi di analisi e classificazione automatica.</li>
            </ul>
            <p>Nessun dato personale degli utenti viene attualmente inviato a fornitori di intelligenza artificiale (Anthropic, DeepSeek, OpenRouter o altri).</p>
            <p><strong>Articoli pubblicati in passato con assistenza AI:</strong> alcuni articoli del magazine sono stati prodotti con l&apos;assistenza di modelli linguistici (in particolare Claude di Anthropic, USA) e successivamente revisionati. Tali articoli sono identificabili dalla nota di trasparenza in calce e dal metadato strutturato presente nella pagina, in conformita all&apos;art. 50 AI Act.</p>
            <p>Non sono mai state prese decisioni automatizzate produttive di effetti giuridici sugli utenti ai sensi dell&apos;art. 22 GDPR.</p>

            <h2>11. Modifiche alla policy</h2>
            <p>Questa privacy policy puo essere aggiornata. La data dell&apos;ultimo aggiornamento e indicata in cima alla pagina. In caso di modifiche sostanziali, ne daremo comunicazione via email agli utenti registrati.</p>

            <h2>12. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa alla privacy:<br />
              Email: <a href="mailto:info@mifidodite.eu">info@mifidodite.eu</a><br />
              Autorita di controllo: Garante per la protezione dei dati personali — <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
