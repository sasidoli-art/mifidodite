import { redirect, notFound } from "next/navigation";
import { getSentieroBySlug, getSentieroRegione } from "@/lib/sentieri-seed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sentiero = getSentieroBySlug(slug);
  if (!sentiero) {
    return { title: "Sentiero non trovato" };
  }
  return { title: sentiero.nome };
}

export default async function SentieroCatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const regione = getSentieroRegione(slug);

  if (!regione) {
    notFound();
  }

  redirect(`/sentieri/${regione}/${slug}`, "replace");
}
