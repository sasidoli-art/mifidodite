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
          <p className="text-muted-foreground mb-10">Ultimo aggiornamento: Aprile 2026</p>

          <div className="prose prose-lg max-w-none text-foreground/80">
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali e MifidoDiTe.eu (di seguito "il Titolare"), contattabile all'indirizzo email: <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a>.
            </p>

            <h2>2. Dati raccolti</h2>
            <p>Il portale raccoglie i seguenti dati personali:</p>
            <ul>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, data e ora di accesso. Raccolti automaticamente dai sistemi informatici.</li>
              <li><strong>Dati forniti volontariamente:</strong>
                <ul>
                  <li>Iscrizione newsletter: email, nome (opzionale), CAP (opzionale)</li>
                  <li>Richiesta disponibilita (lead): nome, email, telefono (opzionale), date, tipo animale, note</li>
                  <li>Registrazione professionista: nome attivita, referente, email, telefono, indirizzo, descrizione, link social</li>
                  <li>Registrazione account: nome, email, password (criptata)</li>
                </ul>
              </li>
            </ul>

            <h2>3. Finalita del trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalita:</p>
            <ul>
              <li><strong>Erogazione del servizio:</strong> consentire la ricerca di strutture e professionisti, l'invio di richieste di disponibilita, la gestione dell'account.</li>
              <li><strong>Newsletter:</strong> invio settimanale di segnalazioni personalizzate per zona (previo consenso esplicito).</li>
              <li><strong>Comunicazioni di servizio:</strong> notifiche relative a lead ricevuti, inviti di affiliazione, aggiornamenti dell'account.</li>
              <li><strong>Miglioramento del servizio:</strong> analisi aggregate e anonime sull'utilizzo del portale.</li>
            </ul>

            <h2>4. Base giuridica</h2>
            <ul>
              <li><strong>Consenso</strong> (art. 6.1.a GDPR): per l'iscrizione alla newsletter.</li>
              <li><strong>Esecuzione contrattuale</strong> (art. 6.1.b GDPR): per l'erogazione del servizio richiesto (lead, registrazione).</li>
              <li><strong>Legittimo interesse</strong> (art. 6.1.f GDPR): per la sicurezza del portale e analisi aggregate.</li>
            </ul>

            <h2>5. Destinatari dei dati</h2>
            <p>I dati personali possono essere condivisi con:</p>
            <ul>
              <li><strong>Strutture e professionisti:</strong> i dati inseriti nel form "Chiedi disponibilita" vengono trasmessi alla struttura selezionata per consentire il contatto.</li>
              <li><strong>Fornitori di servizi:</strong> Vercel (hosting), Supabase/Neon (database), Brevo (email). Tutti conformi al GDPR con DPA sottoscritto.</li>
            </ul>
            <p>I dati non vengono venduti a terzi ne utilizzati per finalita di profilazione commerciale non dichiarate.</p>

            <h2>6. Conservazione dei dati</h2>
            <ul>
              <li>Dati account e profilo: per tutta la durata dell'account, cancellati entro 30 giorni dalla richiesta di cancellazione.</li>
              <li>Dati newsletter: fino alla disiscrizione.</li>
              <li>Dati lead: 12 mesi dalla richiesta, poi anonimizzati.</li>
              <li>Dati di navigazione: 26 mesi.</li>
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
            <p>Per esercitare questi diritti, scrivi a: <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a>.</p>

            <h2>8. Cookie</h2>
            <p>Il portale utilizza esclusivamente cookie tecnici necessari al funzionamento del servizio (autenticazione, preferenze). Non utilizziamo cookie di profilazione o di terze parti per finalita pubblicitarie.</p>

            <h2>9. Sicurezza</h2>
            <p>Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali: crittografia in transito (HTTPS/TLS), password hashate con bcrypt, accesso ai dati limitato al personale autorizzato, backup cifrati.</p>

            <h2>10. Utilizzo dell&apos;Intelligenza Artificiale</h2>
            <p>MifidoDiTe.eu utilizza sistemi di intelligenza artificiale (AI) per le seguenti finalita:</p>
            <ul>
              <li><strong>Generazione di contenuti editoriali:</strong> gli articoli del magazine possono essere scritti con l&apos;assistenza dell&apos;AI e successivamente revisionati dalla redazione. Ogni articolo riporta una nota di trasparenza.</li>
              <li><strong>Descrizioni delle strutture:</strong> le descrizioni emozionali (storytelling) delle strutture pet possono essere generate o rielaborate dall&apos;AI a partire da informazioni pubblicamente disponibili.</li>
              <li><strong>Comunicazioni automatiche:</strong> alcune email di invito ai professionisti sono generate automaticamente dall&apos;AI. Ogni email contiene una nota di trasparenza.</li>
              <li><strong>Analisi dati:</strong> l&apos;AI viene utilizzata per analizzare e strutturare informazioni raccolte da fonti pubbliche (siti web, directory, social media).</li>
            </ul>
            <p>I modelli AI utilizzati sono Claude (Anthropic, dati in EU) e DeepSeek. Nessun dato personale degli utenti viene utilizzato per addestrare modelli AI. L&apos;AI non prende decisioni automatizzate che producono effetti giuridici sugli utenti.</p>
            <p>Ai sensi del Regolamento UE sull&apos;Intelligenza Artificiale (AI Act, Reg. 2024/1689), ci impegniamo alla massima trasparenza sull&apos;utilizzo di sistemi AI nel portale.</p>

            <h2>11. Modifiche alla policy</h2>
            <p>Questa privacy policy puo essere aggiornata. La data dell'ultimo aggiornamento e indicata in cima alla pagina. In caso di modifiche sostanziali, ne daremo comunicazione via email agli utenti registrati.</p>

            <h2>11. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa alla privacy:<br />
              Email: <a href="mailto:bau@mifidodite.eu">bau@mifidodite.eu</a><br />
              Autorita di controllo: Garante per la protezione dei dati personali — <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
