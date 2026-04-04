import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { SOSBanner } from "@/components/landing/SOSBanner";
import { PetNews } from "@/components/landing/PetNews";
import { TrustSection } from "@/components/landing/TrustSection";
import { ProCTA } from "@/components/landing/ProCTA";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* 1. Hero — ricerca professionisti */}
        <Hero />

        {/* 2. Come funziona — 3 step */}
        <HowItWorks />

        {/* 3. Categorie — cosa cerchi */}
        <Categories />

        {/* 4. SOS Smarriti — banner urgente (differenziatore virale) */}
        <SOSBanner />

        {/* 5. Magazine — ultimi articoli (porta SEO) */}
        <PetNews />

        {/* 6. Trust — perche MifidoDiTe */}
        <TrustSection />

        {/* 7. CTA professionisti — registrati */}
        <ProCTA />

        {/* 8. Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
