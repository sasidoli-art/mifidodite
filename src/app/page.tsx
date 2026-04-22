import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { Strumenti } from "@/components/landing/Strumenti";
import { SpiaggeHero } from "@/components/landing/SpiaggeHero";
import { VacanzeHero } from "@/components/landing/VacanzeHero";
import { ScopriDiPiu } from "@/components/landing/ScopriDiPiu";
import { SOSBanner } from "@/components/landing/SOSBanner";
import { FeaturedPros } from "@/components/landing/FeaturedPros";
import { PetNews } from "@/components/landing/PetNews";
import { TrustSection } from "@/components/landing/TrustSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { ProCTA } from "@/components/landing/ProCTA";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";
import { SectionDivider } from "@/components/shared/SectionDivider";

export const revalidate = 3600; // ISR 1h: contatore articoli rigenerato ogni ora

export default async function Home() {
  // Contatore articoli pubblicati redirect-safe per Hero
  let articleCount = 155;
  if (process.env.DATABASE_URL) {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT COUNT(*)::int AS n FROM articoli
        WHERE pubblicato = true AND redirect_to_slug IS NULL`;
      articleCount = (rows[0]?.n as number) ?? 155;
    } catch { /* fallback hardcoded */ }
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* 1. CHIARO — Hero */}
        <Hero articleCount={articleCount} />

        {/* 2. CHIARO — Magazine (promosso sezione #2) */}
        <PetNews />

        {/* 3. CHIARO — Tool gratuiti (promosso sezione #3) */}
        <Strumenti />

        {/* Transizione chiaro → scuro (wave) */}
        <SectionDivider from="#FBF8F4" to="#3D2B1F" variant="wave" />

        {/* 4a. SCURO — Spiagge dog-friendly */}
        <SpiaggeHero />

        {/* Transizione scuro → chiaro (curve) */}
        <SectionDivider from="#3D2B1F" to="#F5EDE3" variant="curve" />

        {/* 4b. CHIARO — Vacanze pet-friendly (subito dopo spiagge) */}
        <VacanzeHero />

        {/* 5. CHIARO — Ristoranti + Sentieri */}
        <ScopriDiPiu />

        {/* 6. CHIARO — Servizi pet (6 card) */}
        <Categories />

        {/* 7. ACCENTO — SOS Smarriti */}
        <SOSBanner />

        {/* Transizione chiaro → scuro (fade) */}
        <SectionDivider from="#FBF8F4" to="#3D2B1F" variant="fade" />

        {/* 8a. SCURO — Come lavoriamo (pilastri editoriali) */}
        <Testimonials />

        {/* Transizione scuro → chiaro (wave) */}
        <SectionDivider from="#3D2B1F" to="#FBF8F4" variant="wave" />

        {/* 8b. CHIARO — Fonti verificate */}
        <TrustSection />

        {/* 9. CHIARO — Servizi featured */}
        <FeaturedPros />

        {/* Transizione chiaro → scuro (angle) */}
        <SectionDivider from="#FBF8F4" to="#3D2B1F" variant="angle" />

        {/* 10. SCURO — CTA Professionisti */}
        <ProCTA />

        {/* 11. SCURO → SCURO (nessun divider, stesso colore) */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
