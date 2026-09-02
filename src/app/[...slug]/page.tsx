import type { Metadata } from "next";
import Pausa from "../pausa";

// Catch-all: ogni vecchio URL (link da Google, social, newsletter) mostra
// la pagina di pausa invece di un 404. Escluso dall'indicizzazione perche
// il contenuto originale di quelle pagine non esiste piu.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export const dynamic = "force-static";

export default function CatchAll() {
  return <Pausa />;
}
