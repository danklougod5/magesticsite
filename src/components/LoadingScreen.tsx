import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import logo from "@/assets/majestic-logo.jpg";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2800);
    const t2 = setTimeout(() => setHidden(true), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary fill-primary/70"
            style={{
              left: `${(i * 53) % 100}%`,
              bottom: `-40px`,
              width: `${12 + (i % 5) * 6}px`,
              height: `${12 + (i % 5) * 6}px`,
              animation: `rise-fade ${4 + (i % 4)}s linear ${i * 0.25}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in">
        <div className="relative inline-block mb-8">
          <img
            src={logo}
            alt="Majestic Cinéma"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-red animate-heart-beat mx-auto"
          />
          <Heart className="absolute -top-2 -right-2 w-8 h-8 text-primary fill-primary animate-heart-beat" />
        </div>

        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Majestic Cinéma</p>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl leading-tight max-w-3xl mx-auto">
          <span className="shimmer-text">Vous souhaite</span>
          <br />
          <span className="text-foreground">une </span>
          <span className="text-gradient-red italic">Bonne Fête des Mères</span>
        </h1>

        <div className="mt-10 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <Heart
              key={i}
              className="w-4 h-4 text-primary fill-primary"
              style={{ animation: `heart-beat 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
