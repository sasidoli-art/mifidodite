import { redirect, notFound } from "next/navigation";
import { getSpiaggiaBySlug, getSpiaggiaRegione } from "@/lib/spiagge-seed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spiaggia = getSpiaggiaBySlug(slug);
  if (!spiaggia) {
    return { title: "Spiaggia non trovata" };
  }
  return { title: spiaggia.nome };
}

export default async function SpiaggiaCatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const regione = getSpiaggiaRegione(slug);

  if (!regione) {
    notFound();
  }

  // Redirect to correct URL with regione
  redirect(`/spiagge/${regione}/${slug}`, "replace");
}
