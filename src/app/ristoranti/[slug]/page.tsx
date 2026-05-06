import { redirect, notFound } from "next/navigation";
import { getRistoranteBySlug, getRistoranteRegione } from "@/lib/ristoranti-seed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ristorante = getRistoranteBySlug(slug);
  if (!ristorante) {
    return { title: "Ristorante non trovato" };
  }
  return { title: ristorante.nome };
}

export default async function RistoranteCatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const regione = getRistoranteRegione(slug);

  if (!regione) {
    notFound();
  }

  redirect(`/ristoranti/${regione}/${slug}`, "replace");
}
