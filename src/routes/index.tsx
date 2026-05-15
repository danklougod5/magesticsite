import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FortuneGame from "@/components/FortuneGame";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Roue de la Fortune – Majestic Cinéma × Partenaires" },
      { name: "description", content: "Scannez, jouez et gagnez des bons d'achat et tickets de cinéma. Opération spéciale Fête des Mères avec Peryssac, Kiabi, Gémo, KIKO et Le West." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <Hero />
      <div id="how"><HowItWorks /></div>
      <FortuneGame />
      <Partners />
      <Footer />
      <Toaster theme="light" />
    </main>
  );
}
