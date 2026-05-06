import { redirect, notFound } from "next/navigation";
import { getVacanzaBySlug, getVacanzaRegione } from "@/lib/vacanze-seed";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugStr = slug[0];
  const vacanza = getVacanzaBySlug(slugStr);
  if (!vacanza) {
    return { title: "Struttura non trovata" };
  }
  return { title: vacanza.nome };
}

export default async function VacanzaCatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugStr = slug[0];
  const regione = getVacanzaRegione(slugStr);

  if (!regione) {
    notFound();
  }

  redirect(`/vacanze/${regione}/${slugStr}`, "replace");
}
