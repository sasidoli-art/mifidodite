import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SOSContent } from "./SOSContent";

export const metadata = {
  title: "SOS Smarriti — Ho perso / Ho trovato un animale — MifidoDiTe.eu",
  description: "Hai perso il tuo cane o gatto? Hai trovato un animale? Pubblica un annuncio e aiutaci a riunire gli amici a 4 zampe con le loro famiglie.",
};

export default function SOSPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <SOSContent />
      </main>
      <Footer />
    </>
  );
}
