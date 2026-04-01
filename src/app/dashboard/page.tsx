import { Header } from "@/components/landing/Header";
import { DashboardContent } from "./DashboardContent";

export const metadata = {
  title: "Dashboard — MifidoDiTe.it",
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-muted/30">
        <DashboardContent />
      </main>
    </>
  );
}
