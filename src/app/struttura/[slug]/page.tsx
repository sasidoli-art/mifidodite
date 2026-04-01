import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { StrutturaDetail } from "./StrutturaDetail";

// TODO: generare metadata dinamiche da Supabase
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ")} — MifidoDiTe.it`,
  };
}

export default async function StrutturaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <StrutturaDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
