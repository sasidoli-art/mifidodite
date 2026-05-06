import { redirect, notFound } from "next/navigation";
import { getRistoranteBySlug, getRistoranteRegione } from "@/lib/ristoranti-seed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugStr = slug[0];
  const ristorante = getRistoranteBySlug(slugStr);
  if (!ristorante) {
    return { title: "Ristorante non trovato" };
  }
  return { title: ristorante.nome };
}

export default async function RistoranteCatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugStr = slug[0];
  const regione = getRistoranteRegione(slugStr);

  if (!regione) {
    notFound();
  }

  redirect(`/ristoranti/${regione}/${slugStr}`, "replace");
}
