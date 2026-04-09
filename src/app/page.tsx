import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { SOSBanner } from "@/components/landing/SOSBanner";
import { FeaturedPros } from "@/components/landing/FeaturedPros";
import { PetNews } from "@/components/landing/PetNews";
import { TrustSection } from "@/components/landing/TrustSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { ProCTA } from "@/components/landing/ProCTA";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* CHIARO — Hero con ricerca */}
        <Hero />
        {/* SCURO — Come funziona (3 step) */}
        <HowItWorks />
        {/* CHIARO — Servizi pet con immagini */}
        <Categories />
        {/* ACCENTO — SOS Smarriti (rosso) */}
        <SOSBanner />
        {/* SCURO — Recensioni */}
        <Testimonials />
        {/* CHIARO — Magazine (articoli) */}
        <PetNews />
        {/* CHIARO — Servizi featured (3 card grandi) */}
        <FeaturedPros />
        {/* CHIARO — Perche fidarsi */}
        <TrustSection />
        {/* SCURO — CTA Professionisti */}
        <ProCTA />
        {/* SCURO — Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
