export type TagliaCosto = "piccola" | "media" | "grande" | "gigante";
export type TipoCibo = "economico" | "standard" | "premium";
export type PeloCosto = "corto" | "medio" | "lungo";
export type Citta =
  | "milano" | "roma" | "torino" | "firenze" | "bologna"
  | "napoli" | "palermo" | "bari" | "genova" | "altre";

export interface ParametriCosto {
  taglia: TagliaCosto;
  tipoCibo: TipoCibo;
  pelo: PeloCosto;
  citta: Citta;
  assicurazione: boolean;
  tolettaturaProfessionale: boolean;
}

export interface VoceBreakdown {
  voce: string;
  annuale: number;
  descrizione: string;
}

export interface RisultatoCosto {
  annuale: number;
  mensile: number;
  primoAnno: number;
  breakdown: VoceBreakdown[];
}

const KG_CIBO_GIORNO: Record<TagliaCosto, number> = {
  piccola: 0.15,
  media: 0.3,
  grande: 0.55,
  gigante: 0.85,
};

const PREZZO_CIBO_KG: Record<TipoCibo, number> = {
  economico: 3.5,
  standard: 7,
  premium: 13,
};

const VET_ANNUALE: Record<TagliaCosto, number> = {
  piccola: 220,
  media: 290,
  grande: 380,
  gigante: 480,
};

const ANTIPARASSITARI_ANNUALE: Record<TagliaCosto, number> = {
  piccola: 120,
  media: 150,
  grande: 180,
  gigante: 220,
};

const TOLETTATURA_ANNUALE: Record<PeloCosto, number> = {
  corto: 0,
  medio: 240,
  lungo: 480,
};

const ACCESSORI_ANNUALE: Record<TagliaCosto, number> = {
  piccola: 120,
  media: 160,
  grande: 200,
  gigante: 240,
};

const ASSICURAZIONE_ANNUALE = 220;

const SETUP_INIZIALE: Record<TagliaCosto, number> = {
  piccola: 350,
  media: 450,
  grande: 600,
  gigante: 750,
};

const MOLTIPLICATORE_CITTA: Record<Citta, number> = {
  milano: 1.18,
  roma: 1.14,
  torino: 1.09,
  firenze: 1.11,
  bologna: 1.09,
  napoli: 0.92,
  palermo: 0.88,
  bari: 0.90,
  genova: 1.04,
  altre: 1.0,
};

export const CITTA_LABELS: Record<Citta, string> = {
  milano: "Milano",
  roma: "Roma",
  torino: "Torino",
  firenze: "Firenze",
  bologna: "Bologna",
  napoli: "Napoli",
  palermo: "Palermo",
  bari: "Bari",
  genova: "Genova",
  altre: "Altra citta",
};

export const TAGLIE_LABELS: Record<TagliaCosto, string> = {
  piccola: "Piccola (fino a 10kg)",
  media: "Media (10-25kg)",
  grande: "Grande (25-45kg)",
  gigante: "Gigante (oltre 45kg)",
};

export const TIPO_CIBO_LABELS: Record<TipoCibo, string> = {
  economico: "Economico",
  standard: "Standard",
  premium: "Premium",
};

export const PELO_LABELS: Record<PeloCosto, string> = {
  corto: "Pelo corto",
  medio: "Pelo medio",
  lungo: "Pelo lungo",
};

export function calcolaCosto(p: ParametriCosto): RisultatoCosto {
  const mult = MOLTIPLICATORE_CITTA[p.citta];

  const kgAnno = KG_CIBO_GIORNO[p.taglia] * 365;
  const ciboAnno = Math.round(kgAnno * PREZZO_CIBO_KG[p.tipoCibo] * mult);

  const vetAnno = Math.round(VET_ANNUALE[p.taglia] * mult);
  const antipAnno = Math.round(ANTIPARASSITARI_ANNUALE[p.taglia] * mult);

  const tolettaturaAnno = p.tolettaturaProfessionale
    ? Math.round(TOLETTATURA_ANNUALE[p.pelo] * mult)
    : 0;

  const accessoriAnno = Math.round(ACCESSORI_ANNUALE[p.taglia] * mult);
  const assicurazioneAnno = p.assicurazione ? ASSICURAZIONE_ANNUALE : 0;

  const breakdown: VoceBreakdown[] = [
    { voce: "Cibo", annuale: ciboAnno, descrizione: `${Math.round(kgAnno)}kg/anno di cibo ${p.tipoCibo}` },
    { voce: "Veterinario", annuale: vetAnno, descrizione: "Visite annuali, vaccini, richiami" },
    { voce: "Antiparassitari", annuale: antipAnno, descrizione: "Pulci, zecche, filaria, vermi" },
    { voce: "Accessori e igiene", annuale: accessoriAnno, descrizione: "Guinzaglio, ciotole, giochi, shampoo" },
  ];

  if (tolettaturaAnno > 0) {
    breakdown.push({ voce: "Toelettatura", annuale: tolettaturaAnno, descrizione: `Sedute periodiche per ${p.pelo}` });
  }

  if (assicurazioneAnno > 0) {
    breakdown.push({ voce: "Assicurazione", annuale: assicurazioneAnno, descrizione: "Copertura spese veterinarie" });
  }

  const annuale = breakdown.reduce((sum, b) => sum + b.annuale, 0);
  const mensile = Math.round(annuale / 12);

  const setupIniziale = Math.round(SETUP_INIZIALE[p.taglia] * mult);
  const primoAnno = annuale + setupIniziale;

  return { annuale, mensile, primoAnno, breakdown };
}
