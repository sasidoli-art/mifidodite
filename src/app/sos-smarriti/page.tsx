import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { SOSContent } from "./SOSContent";

export const metadata = {
  title: "SOS Smarriti — Hai smarrito il tuo amico a 4 zampe? — MifidoDiTe.eu",
  description: "Hai smarrito il tuo amico a 4 zampe? Ogni minuto conta. Pubblica una segnalazione gratuita e la tua zona viene allertata. Insieme lo ritroviamo.",
};

export default function SOSPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <SOSContent />
      </main>
      <Footer />
    </>
  );
}
