import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/json-ld";

export const metadata = {
  title: "Domande frequenti su viaggio e vita con il cane in Italia | MifidoDiTe.eu",
  description: "Risposte concrete alle 20 domande piu' frequenti su viaggio, spiagge, hotel, ordinanze, documenti, salute. Verificate dal team MifidoDiTe.",
  keywords: ["faq cane italia", "domande cani viaggio", "ordinanze comunali cani", "documenti cane"],
  alternates: { canonical: "https://www.mifidodite.eu/faq" },
  openGraph: {
    type: "website",
    title: "Domande frequenti — MifidoDiTe.eu",
    url: "https://www.mifidodite.eu/faq",
    siteName: "MifidoDiTe.eu",
    locale: "it_IT",
  },
};

const FAQS = [
  {
    question: "I cani sono ammessi sulle spiagge libere italiane?",
    answer: "Non esiste una legge nazionale: ogni Comune emana la propria ordinanza balneare (valida da maggio a settembre). In generale i cani sono ammessi al guinzaglio (max 1,5m) con sacchetti per la pulizia. In alta stagione molti Comuni limitano l'accesso tra le 9 e le 19. Verifica sempre l'ordinanza specifica del Comune prima di partire.",
  },
  {
    question: "Quali documenti servono per portare il cane in treno?",
    answer: "Microchip e libretto sanitario aggiornato. Cani fino a 10 kg in trasportino viaggiano gratis su Trenitalia. Sopra i 10 kg serve biglietto al 50% della tariffa intera, museruola obbligatoria e guinzaglio. Italo e Frecciarossa hanno regole specifiche per cani grandi (solo alcune classi).",
  },
  {
    question: "Posso lasciare il cane in auto al sole anche pochi minuti?",
    answer: "Assolutamente no. La temperatura interna di un'auto sale di 10 gradi in 10 minuti. A 22°C esterni l'abitacolo raggiunge 47°C in mezz'ora. L'articolo 727 del Codice Penale punisce la 'detenzione in condizioni incompatibili' con arresto fino a 1 anno e multa fino a 10.000 euro. Anche con finestrino abbassato e' reato.",
  },
  {
    question: "Quali vaccini sono obbligatori per il cane in Italia?",
    answer: "Nessun vaccino e' obbligatorio per legge in Italia per cani residenti, eccetto l'antirabbica per cani che viaggiano all'estero o partecipano a esposizioni. Le linee guida WSAVA raccomandano: vaccino CORE (cimurro, parvovirosi, adenovirus, leptospira) per tutti, con richiamo ogni 3 anni per CORE e annuale per leptospira.",
  },
  {
    question: "Quanto costa una visita veterinaria di base in Italia?",
    answer: "Visita generale: 40-80 euro. Vaccinazione + visita: 50-90 euro. Visita d'urgenza fuori orario: 80-150 euro. Ecografia: 60-120 euro. Radiografia: 50-100 euro. I prezzi variano molto tra cliniche e zone d'Italia. Le cliniche universitarie spesso offrono tariffe ridotte.",
  },
  {
    question: "Il cane puo' entrare nei ristoranti italiani?",
    answer: "Non c'e' divieto nazionale. Il Regolamento CE 852/2004 richiede solo che gli alimenti siano protetti. I cani sono ammessi nei dehors quasi ovunque al guinzaglio. Nelle sale interne dipende dal titolare: sempre piu' ristoranti accolgono cani, ma chiedi prima. Il cane deve stare sotto il tavolo, calmo, mai sui tavoli o sedie.",
  },
  {
    question: "Cosa fare se trovo un cane chiuso in auto al sole?",
    answer: "Identifica il proprietario (chiedi nei negozi vicini, annuncio al megafono nei parcheggi supermercato). Se non lo trovi in 60 secondi: chiama il 112. Documenta con video (ora, posizione, stato del cane). Non rompere il vetro tu: e' tecnicamente danneggiamento, lo stato di necessita' si applica solo se il cane e' in pericolo immediato (gengive viola, perdita di coscienza).",
  },
  {
    question: "Quante volte all'anno bisogna sverminare il cane?",
    answer: "Linee guida ESCCAP 2024: cuccioli ogni mese fino a 6 mesi. Cane adulto basso rischio (casa, niente parchi affollati): 2-4 volte l'anno. Cane adulto rischio standard (parchi, contatti altri cani): ogni 3 mesi. Cane alto rischio (caccia, dieta cruda, bambini in casa): ogni 1-2 mesi. Esame coprologico annuale per monitoraggio.",
  },
  {
    question: "Quali sono i cibi piu' pericolosi per il cane?",
    answer: "Cioccolato (la teobromina e' tossica, mortale il fondente), uva e uvetta (insufficienza renale acuta), aglio e cipolla (anche cotti, distruggono i globuli rossi), xilitolo (dolcificante senza zucchero, ipoglicemia), ossa cotte (si frammentano in schegge), avocado, alcol, caffeina. In caso di ingestione chiama subito il veterinario, non provocare vomito senza indicazione.",
  },
  {
    question: "Come scegliere un hotel pet-friendly affidabile?",
    answer: "Il termine 'pet-friendly' non e' uno standard legale. Chiedi prima di prenotare: supplemento esatto, se puoi lasciare il cane in camera da solo, accesso al ristorante interno o solo dehors, presenza di area verde dedicata, vicinanza al veterinario, taglie ammesse. Su MifidoDiTe.eu trovi 89 strutture verificate manualmente con queste informazioni chiare.",
  },
  {
    question: "Come si attraversano i parchi nazionali con il cane?",
    answer: "Cani al guinzaglio obbligatorio in tutti i parchi nazionali italiani (Gran Sasso, Sila, Pollino, Stelvio, Aspromonte, ecc.). Alcune zone (riserve integrali, oasi WWF, aree faunistiche speciali) vietano del tutto i cani. Verifica sempre sul sito dell'ente parco. Sentieri CAI in genere ammettono cani al guinzaglio.",
  },
  {
    question: "Cosa fare se il cane scappa o si perde?",
    answer: "Microchip aggiornato e' essenziale per il recupero. Chiama subito ASL veterinaria della zona e Carabinieri. Pubblica annuncio su MifidoDiTe.eu sezione SOS Smarriti (la nostra mappa nazionale dei cani persi). Pubblica sui gruppi Facebook locali. Lascia indumenti tuoi nei luoghi dove e' scomparso. Non rincorrerlo: spaventato fugge piu' lontano.",
  },
  {
    question: "Quante calorie al giorno serve a un cane?",
    answer: "Dipende da peso, eta', attivita'. Formula base RER (Resting Energy Requirement) = peso(kg) elevato a 0.75 × 70. Esempio: cane 20kg = 9.4^0.75 × 70 = ~660 kcal. Moltiplicare per: 1.6 (cane sterilizzato), 2.0 (cane attivo), 1.0 (cane in dimagrimento). Il calcolatore dedicato e' su /razioni-cane.",
  },
  {
    question: "Quanto deve fare attivita' fisica un cane al giorno?",
    answer: "Dipende molto dalla razza. Razze sportive (Border Collie, Husky, Labrador, Pastore Tedesco): 2-4 ore. Razze medie (Beagle, Cocker, Bulldog Inglese moderato): 1-1,5 ore. Razze brachicefale (Bulldog Francese, Carlino): 30-45 minuti, mai sotto 25°C. Cuccioli sotto 6 mesi: brevi sessioni, no esercizio intenso (articolazioni in crescita).",
  },
  {
    question: "Quali sono i sintomi del colpo di calore nel cane?",
    answer: "Ansimazione esagerata, salivazione abbondante, gengive scure (da rosso intenso a violacee), debolezza muscolare, vomito o diarrea, confusione, convulsioni. Temperatura corporea sopra 40°C e' emergenza. Cosa fare: ombra subito, acqua fresca (non gelata) su pancia/zampe/inguine, ventilatore, asciugamani bagnati. Veterinario in pronto soccorso anche se sembra riprendersi.",
  },
  {
    question: "Cosa fare se il cane ringhia ai bambini?",
    answer: "Il ringhio e' comunicazione, non aggressione: il cane dice 'sono a disagio, fermati'. Mai punire il ringhio (insegni a non avvisare e morde direttamente). Separa il bambino subito. Identifica il pattern (cosa stava facendo il bambino?). Mai lasciare bambini e cane soli. Consulta un educatore cinofilo comportamentale: e' una situazione da gestire con un professionista.",
  },
  {
    question: "Cane in spiaggia: sabbia rovente come la riconosco?",
    answer: "Test della mano: appoggia il dorso della mano sulla sabbia per 5 secondi. Se non riesci a tenerlo, il cane non puo' camminarci. Polpastrelli del cane bruciano sopra i 50°C (raggiunti gia' a 25-28°C esterni). Sicurezza: prima delle 9 e dopo le 19 in estate. Porta il cane in spiaggia sull'asciugamano fino al bagnasciuga.",
  },
  {
    question: "I cani guida per non vedenti devono pagare nei mezzi pubblici?",
    answer: "No, mai. La Legge 37/74 garantisce ai cani guida per non vedenti l'accesso gratuito a tutti i mezzi pubblici (treni, autobus, aerei, traghetti) senza museruola obbligatoria. Inoltre devono essere ammessi in tutti gli esercizi commerciali e luoghi pubblici. Eventuali divieti sono illegali.",
  },
  {
    question: "Posso portare il cane in chiesa o nei musei?",
    answer: "Chiese: ammessi al guinzaglio nella maggior parte delle parrocchie italiane (cattolica, valdese, ortodossa). Musei: la maggior parte vieta i cani per protezione delle opere. Eccezioni: alcuni musei moderni hanno politica 'pet-friendly' (verificare). I cani guida per non vedenti hanno accesso garantito ovunque per legge.",
  },
  {
    question: "Come scegliere una pensione per cani affidabile?",
    answer: "Le 7 domande da fare: posso visitare prima? quanti cani contemporaneamente? come gestite i pasti e diete speciali? c'e' un veterinario convenzionato? come sono organizzati gli spazi (box singoli/condivisi, accesso giardino)? posso ricevere aggiornamenti? qual e' la politica di cancellazione? Visita sempre la struttura prima e fai un soggiorno di prova di una notte.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="bg-gradient-to-b from-primary/10 to-transparent border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={[{ name: "FAQ", url: "/faq" }]} />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-6">Domande frequenti su viaggio e vita con il cane in Italia</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl">{FAQS.length} risposte concrete a quello che la maggior parte dei proprietari ci chiede. Tutte verificate dal team MifidoDiTe.</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-border overflow-hidden">
                <summary className="cursor-pointer p-6 flex items-start justify-between gap-4 list-none hover:bg-muted/30 transition-colors">
                  <h2 className="text-lg font-bold text-foreground flex-1 pr-4">{faq.question}</h2>
                  <span className="text-primary text-2xl font-bold flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-foreground/85 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>

          <section className="mt-16 bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Non trovi la risposta che cerchi?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Scrivici a <strong>info@mifidodite.eu</strong>: rispondiamo davvero. Le domande piu' frequenti finiscono qui sopra.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors">Torna alla home →</Link>
          </section>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }]))} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(FAQS))} />
      </main>
      <Footer />
    </>
  );
}
