import { PawPrint } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <PawPrint size={40} className="text-primary animate-pulse mb-4" strokeWidth={2} />
      <p className="text-sm text-muted-foreground">Caricamento...</p>
    </div>
  );
}
