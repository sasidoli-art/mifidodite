-- Audit consolidamento magazine — redirect SQL (NON ESEGUITO)
-- Generato: 2026-04-21T19:57:39.606Z
-- Totale redirect: 29
-- Revisiona prima di lanciare con: psql $DATABASE_URL -f apply-redirects.sql

BEGIN;

-- Opzione A: mantieni riga DB ma marca come non-pubblicato (soft)
-- I redirect HTTP 301 vanno gestiti via next.config.ts redirects array
-- oppure via colonna redirect_to se la aggiungi al DB.

-- Proposta: aggiungi colonna redirect_to_slug per gestire i redirect a DB-level
-- ALTER TABLE articoli ADD COLUMN IF NOT EXISTS redirect_to_slug VARCHAR(300);

-- Cluster cl_005 — Microchip cane obbligatorio (legge, costi, sanzioni, anagrafe)
-- Master: microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina
-- [P3] Contenuto più scarno (778w). Slug più pulito ma master ha coda descrittiva più ricca per SEO long-tail.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina' WHERE slug = 'microchip-cane-obbligatorio-legge-281';
-- [P3] 689w, contenuto più superficiale, slug meno specifico (generico 'legge italiana').
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'microchip-cane-obbligatorio-legge-281-costi-sanzioni-anagrafe-canina' WHERE slug = 'microchip-cane-obbligatorio-legge-italiana';

-- Cluster cl_013 — Cani capiscono le emozioni umane (ricerca scientifica)
-- Master: cani-capiscono-emozioni-umane-ricerca
-- [P3] 955w, più recente ma più corto come content. Lo slug con 'perche' è buono per intent ma master copre stessa query.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'cani-capiscono-emozioni-umane-ricerca' WHERE slug = 'perche-cani-capiscono-emozioni-scienza-legame';
-- [P3] 877w, contenuto più breve, slug nudo senza angolo.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'cani-capiscono-emozioni-umane-ricerca' WHERE slug = 'cani-capiscono-emozioni-scienza';
-- [P3B] Fase 3-bis: framing 'capacità cognitive' è sub-topic ma copre stessa intent (cani che capiscono emozioni umane). 671w, content minore.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'cani-capiscono-emozioni-umane-ricerca' WHERE slug = 'capacita-cognitive-cani-emozioni-umane';

-- Cluster cl_018_merged — Razze di cani più longeve: studio UK Royal Veterinary College + dati ENCI
-- Master: razze-cani-longevi-studio-internazionale-italia-enci
-- [P3] 1035w, solo -2.3% word count del master ma slug inizia con 'longevita-cane' non con keyword principale. Data più recente.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'razze-cani-longevi-studio-internazionale-italia-enci' WHERE slug = 'longevita-cane-razze-piu-longeve-studio-uk-dati-enci-italia';
-- [P3] 855w, slug inizia con 'studio-uk' che è modifier non keyword principale.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'razze-cani-longevi-studio-internazionale-italia-enci' WHERE slug = 'studio-uk-razze-canine-longeve-dati-enci-italia';
-- [P3] 820w, word count più basso, slug simile al master ma con 'canine' vs 'cani'.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'razze-cani-longevi-studio-internazionale-italia-enci' WHERE slug = 'razze-canine-longeve-dati-enci-studio-internazionale';
-- [P3] 940w, variante con 'inglese' invece di 'UK'.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'razze-cani-longevi-studio-internazionale-italia-enci' WHERE slug = 'razze-cani-longevi-dati-enci-studio-inglese';
-- [P3B] Fase 3-bis: 840w, SLUG PIÙ PULITO del cluster ma word count inferiore al master 1059w. Considerare manual editing per usare questo come canonico con body del master.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'razze-cani-longevi-studio-internazionale-italia-enci' WHERE slug = 'razze-cani-piu-longeve-enci-ricerche';

-- Cluster cl_001 — Vaccinazioni cane: calendario completo
-- Master: vaccinazioni-cane-calendario-completo
-- [P3] 702w, slug con stopword 'del' e coda 'e-costi'.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'vaccinazioni-cane-calendario-completo' WHERE slug = 'vaccinazioni-del-cane-calendario-completo-e-costi';
-- [P3B] Fase 3-bis: slug non catturato dal Jaccard perché 'vaccini' vs 'vaccinazioni' differisce. Topic identico.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'vaccinazioni-cane-calendario-completo' WHERE slug = 'vaccini-cane-calendario-vaccinale-completo';
-- [P3B] Fase 3-bis: 801w sullo stesso topic calendario vaccinale. Slug pesante.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'vaccinazioni-cane-calendario-completo' WHERE slug = 'vaccini-cane-calendario-completo-obbligatori-richiami-costi';

-- Cluster cl_002 — Perché i gatti fanno le fusa: scoperte scientifiche
-- Master: perche-gatti-fanno-fusa-benefici-salute
-- [P3] 557w, slug con hash random mnnm3c0i = artefatto di generazione. MAI master per SEO.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'perche-gatti-fanno-fusa-benefici-salute' WHERE slug = 'perche-gatti-fanno-fusa-benefici-salute-mnnm3c0i';
-- [P3B] Fase 3-bis: framing leggermente diverso ('non è sempre per affetto') ma topic identico (perché fanno le fusa).
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'perche-gatti-fanno-fusa-benefici-salute' WHERE slug = 'perche-il-gatto-fa-le-fusa-non-e-sempre-per-affetto';

-- Cluster cl_003 — Microbioma del cane e alimentazione
-- Master: microbioma-cane-alimentazione-ricerche
-- [P3] 771w, slug con hash mnnmd44t. Override word count per regola hash-never-master.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'microbioma-cane-alimentazione-ricerche' WHERE slug = 'microbioma-cane-alimentazione-ricerche-mnnmd44t';

-- Cluster cl_004 — Come scegliere il primo cucciolo / cane per principianti
-- Master: scegliere-primo-cucciolo-guida-cane-principianti
-- [P3] 858w, slug con 'guida-completa' che è coda ridondante (tutti gli articoli sono 'completi').
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'scegliere-primo-cucciolo-guida-cane-principianti' WHERE slug = 'come-scegliere-primo-cucciolo-guida-completa';

-- Cluster cl_006 — Razze di gatti italiane (Siamese Italiano, Gatto delle Foreste, Sokoke)
-- Master: razze-gatti-italiane-siamese-foreste-sokoke
-- [P3] 801w, grammatica 'italiani' non concorda con 'razze' (femminile).
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'razze-gatti-italiane-siamese-foreste-sokoke' WHERE slug = 'razze-gatti-italiani-siamese-foreste-sokoke';

-- Cluster cl_007 — Educazione del cucciolo nei primi 6 mesi
-- Master: educazione-cucciolo-primi-6-mesi-socializzazione-comandi
-- [P3] 782w, slug con 'base' ridondante.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'educazione-cucciolo-primi-6-mesi-socializzazione-comandi' WHERE slug = 'educazione-cucciolo-primi-6-mesi-socializzazione-comandi-base';

-- Cluster cl_008 — Trasporto cani in auto: Art. 169 Codice della Strada
-- Master: trasporto-cani-auto-art-169-codice-strada
-- [P3] 747w, variante 'articolo' invece di 'art' (master ha forma più canonica).
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'trasporto-cani-auto-art-169-codice-strada' WHERE slug = 'trasporto-cani-auto-articolo-169-codice-strada';
-- [P3B] Fase 3-bis: la 3a variante che Antonio aveva segnalato. Stesso topic Art. 169.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'trasporto-cani-auto-art-169-codice-strada' WHERE slug = 'trasporto-cani-auto-regole-sanzioni-sistemi-sicurezza';

-- Cluster cl_009 — Trasporto gatti in auto: sicurezza e Codice della Strada
-- Master: trasporto-gatti-auto-sicurezza-codice-strada-consigli
-- [P3] 602w, contenuto molto più scarno (-33%). Slug più pulito ma content insufficiente.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'trasporto-gatti-auto-sicurezza-codice-strada-consigli' WHERE slug = 'trasporto-gatti-auto-sicurezza-codice-strada';

-- Cluster cl_010 — Cani in autostrada e vacanza: regole Codice della Strada
-- Master: cani-autostrada-vacanza-regole-codice-strada
-- [P3] 758w, slug ha '-traghetti' come coda (topic ancillare coperto nel master).
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'cani-autostrada-vacanza-regole-codice-strada' WHERE slug = 'cani-autostrada-vacanza-regole-codice-strada-traghetti';

-- Cluster cl_011 — Vendere o regalare un cane: obblighi di legge
-- Master: vendere-regalare-cane-legge-italia-obblighi
-- [P3] 876w, slug con 'legge-legale' ridondante.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'vendere-regalare-cane-legge-italia-obblighi' WHERE slug = 'vendere-regalare-cane-obblighi-legge-legale';

-- Cluster cl_012 — Passaggio di proprietà del cane: procedura italiana
-- Master: passaggio-proprieta-cane-guida-procedura-italiana
-- [P3] 985w, il master ha quasi il doppio del contenuto.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'passaggio-proprieta-cane-guida-procedura-italiana' WHERE slug = 'passaggio-proprieta-cane-guida-italiana';

-- Cluster cl_015 — Pastore del Caucaso: il cane da guerra dell'esercito russo
-- Master: pastore-caucaso-cane-guerra-russo
-- [P3] 1169w, slug con hash mnrj073p = artefatto di generazione.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'pastore-caucaso-cane-guerra-russo' WHERE slug = 'pastore-caucaso-cane-guerra-russo-mnrj073p';

-- Cluster cl_016 — Pastore Tedesco nelle forze armate / polizia (storia militare)
-- Master: pastore-tedesco-esercito-polizia-addestramento
-- [P3] 1343w (+13%), slug con hash mnrj0th3 = artefatto. Override word count per regola hash.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'pastore-tedesco-esercito-polizia-addestramento' WHERE slug = 'pastore-tedesco-esercito-polizia-addestramento-mnrj0th3';

-- Cluster cl_017 — Malinois Belga: cane eroe del raid a Bin Laden (Navy SEAL)
-- Master: malinois-belga-navy-seal-cani
-- [P3] 1314w, slug con coda 'operazioni-speciali' ridondante.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'malinois-belga-navy-seal-cani' WHERE slug = 'malinois-belga-navy-seal-cani-operazioni-speciali';

-- Cluster cl_019 — Perché i cani inclinano la testa (studio scienza)
-- Master: perche-cani-inclinano-testa-studio
-- [P3B] Fase 3-bis: slug 11 token con stopwords multiple (i, la, quando, quel). Stesso topic, 684w. Master 722w ha slug pulito + più content.
UPDATE articoli SET pubblicato = FALSE, redirect_to_slug = 'perche-cani-inclinano-testa-studio' WHERE slug = 'perche-i-cani-inclinano-la-testa-quando-parliamo-la-scienza-dietro-quel-gesto-irresistibile';

-- Delete 410 (test articolo)
UPDATE articoli SET pubblicato = FALSE WHERE slug = 'test-articolo'; -- poi route dedicata che ritorna 410

-- Categoria orfana (fuori scope audit, includo per comodità)
-- UPDATE articoli SET categoria = 'salute' WHERE categoria = 'salute animale';

COMMIT;
