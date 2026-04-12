import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { Strumenti } from "@/components/landing/Strumenti";
import { SpiaggeHero } from "@/components/landing/SpiaggeHero";
import { SOSBanner } from "@/components/landing/SOSBanner";
import { FeaturedPros } from "@/components/landing/FeaturedPros";
import { PetNews } from "@/components/landing/PetNews";
import { TrustSection } from "@/components/landing/TrustSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { ProCTA } from "@/components/landing/ProCTA";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";
import { SectionDivider } from "@/components/shared/SectionDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* CHIARO — Hero */}
        <Hero />

        {/* Transizione chiaro → scuro (wave) */}
        <SectionDivider from="#FBF8F4" to="#3D2B1F" variant="wave" />

        {/* SCURO — Come funziona */}
        <HowItWorks />

        {/* Transizione scuro → chiaro (curve) */}
        <SectionDivider from="#3D2B1F" to="#F5EDE3" variant="curve" />

        {/* CHIARO — Servizi */}
        <Categories />

        {/* CHIARO — Strumenti utili (quiz + calcolatore) */}
        <Strumenti />

        {/* SCURO — Hero spiagge dog-friendly (feature stagionale) */}
        <SpiaggeHero />

        {/* ACCENTO — SOS */}
        <SOSBanner />

        {/* Transizione chiaro → scuro (fade) */}
        <SectionDivider from="#FBF8F4" to="#3D2B1F" variant="fade" />

        {/* SCURO — Recensioni */}
        <Testimonials />

        {/* Transizione scuro → chiaro (wave flip) */}
        <SectionDivider from="#3D2B1F" to="#FBF8F4" variant="wave" />

        {/* CHIARO — Magazine */}
        <PetNews />

        {/* CHIARO — Servizi featured */}
        <FeaturedPros />

        {/* CHIARO — Perche fidarsi */}
        <TrustSection />

        {/* Transizione chiaro → scuro (angle) */}
        <SectionDivider from="#FBF8F4" to="#3D2B1F" variant="angle" />

        {/* SCURO — CTA Professionisti */}
        <ProCTA />

        {/* SCURO → SCURO (nessun divider, stesso colore) */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
