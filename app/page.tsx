import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import MouseMoveEffect from "@/components/MouseMoveEffect";
import { Player } from "@/components/Player";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900">
      <MouseMoveEffect />
      <Hero />
      <Player />
      <Features />
      <Footer />
    </main>
  );
}
