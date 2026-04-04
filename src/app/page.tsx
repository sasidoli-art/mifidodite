import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { TrustSection } from "@/components/landing/TrustSection";
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
        <TrustSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
