import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ADOZIONI_SEED, formatEta } from "@/lib/adozioni-seed";
import { AnnuncioDetail } from "./AnnuncioDetail";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const annuncio = ADOZIONI_SEED.find((a) => a.slug === slug);
  return {
    title: annuncio ? `${annuncio.titolo} — MifidoDiTe.eu` : "Annuncio — MifidoDiTe.eu",
    description: annuncio?.descrizione.slice(0, 160) || "",
  };
}

export default async function AnnuncioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const annuncio = ADOZIONI_SEED.find((a) => a.slug === slug);

  if (!annuncio) {
    return (
      <>
        <Header />
        <main className="flex-1 py-20 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-2xl font-bold">Annuncio non trovato</h1>
          <Link href="/adozioni" className="text-primary mt-4 inline-block hover:underline">Torna alle adozioni</Link>
        </main>
        <Footer />
      </>
    );
  }

  // Annunci simili
  const simili = ADOZIONI_SEED.filter(
    (a) => a.tipo === annuncio.tipo && a.specie === annuncio.specie && a.slug !== slug
  ).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <AnnuncioDetail annuncio={annuncio} simili={simili} />
      </main>
      <Footer />
    </>
  );
}
