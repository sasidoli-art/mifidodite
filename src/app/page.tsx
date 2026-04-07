import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { SOSBanner } from "@/components/landing/SOSBanner";
import { FeaturedPros } from "@/components/landing/FeaturedPros";
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
        <Hero />
        <HowItWorks />
        <Categories />
        <FeaturedPros />
        <SOSBanner />
        <PetNews />
        <TrustSection />
        <ProCTA />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
