import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/majestic-logo.jpg";

type FloatHeart = {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rot: number;
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hearts, setHearts] = useState<FloatHeart[]>([]);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const burstId = useRef(0);
  const mouse = useRef({ x: -999, y: -999 });

  // Initialize hearts on client only to avoid hydration mismatch
  useEffect(() => {
    setHearts(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 16 + Math.random() * 22,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.05 - Math.random() * 0.15,
        rot: Math.random() * 360,
      })),
    );
  }, []);

  // Animate hearts (drift + mouse repel)
  useEffect(() => {
    let raf: number;
    const tick = () => {
      setHearts((prev) =>
        prev.map((h) => {
          let { x, y, vx, vy, rot } = h;
          // gentle drift
          x += vx;
          y += vy;
          rot += 0.3;
          // mouse repel
          const rect = heroRef.current?.getBoundingClientRect();
          if (rect) {
            const px = (x / 100) * rect.width;
            const py = (y / 100) * rect.height;
            const dx = px - mouse.current.x;
            const dy = py - mouse.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              x += (dx / dist) * force * 1.2;
              y += (dy / dist) * force * 1.2;
            }
          }
          // wrap
          if (y < -5) y = 105;
          if (y > 110) y = -5;
          if (x < -5) x = 105;
          if (x > 110) x = -5;
          return { ...h, x, y, rot };
        }),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = ++burstId.current;
    setBursts((b) => [...b, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 900);
  };

  return (
    <header
      ref={heroRef}
      onMouseMove={handleMove}
      onClick={handleClick}
      className="relative bg-hero overflow-hidden grain min-h-screen"
    >
      {/* Top utility bar */}
      <div className="relative z-20 bg-header border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 text-foreground/70">
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            <Heart className="w-3 h-3 fill-primary" />
            Spécial Fête des Mères
          </div>
        </div>
      </div>

      {/* Main nav — logo centered, no menu */}
      <nav className="relative z-20 bg-header/95 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="Majestic Cinéma" className="w-11 h-11 sm:w-14 sm:h-14 rounded-md object-cover shadow-elegant" />
            <div className="leading-tight">
              <div className="font-display text-xl sm:text-2xl tracking-wide text-foreground">MAJESTIC</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Cinéma</div>
            </div>
          </a>

          <a href="#jouer">
            <Button size="sm" className="bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red">
              Jouer
            </Button>
          </a>
        </div>
      </nav>

      {/* Curtain accents */}
      <div className="pointer-events-none absolute top-[100px] left-0 w-24 md:w-40 h-full opacity-20" style={{ background: "var(--gradient-curtain)", maskImage: "linear-gradient(to right, black, transparent)" }} />
      <div className="pointer-events-none absolute top-[100px] right-0 w-24 md:w-40 h-full opacity-20" style={{ background: "var(--gradient-curtain)", maskImage: "linear-gradient(to left, black, transparent)" }} />

      {/* Interactive floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((h) => (
          <Heart
            key={h.id}
            className="absolute text-primary fill-primary/40 transition-transform"
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: h.size,
              height: h.size,
              transform: `rotate(${h.rot}deg)`,
              filter: "drop-shadow(0 4px 10px oklch(0.55 0.24 25 / 0.35))",
            }}
          />
        ))}
        {/* Click bursts */}
        {bursts.map((b) => (
          <div key={b.id} className="absolute" style={{ left: b.x, top: b.y }}>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <Heart
                  key={i}
                  className="absolute text-primary fill-primary"
                  style={{
                    width: 14,
                    height: 14,
                    left: -7,
                    top: -7,
                    animation: `burst-${i} 0.8s ease-out forwards`,
                    transform: `translate(${Math.cos(angle) * 60}px, ${Math.sin(angle) * 60}px) scale(0)`,
                    transition: "transform 0.8s cubic-bezier(.2,.8,.2,1), opacity 0.8s",
                    opacity: 0,
                  }}
                  ref={(el) => {
                    if (el) {
                      requestAnimationFrame(() => {
                        el.style.transform = `translate(${Math.cos(angle) * 80}px, ${Math.sin(angle) * 80}px) scale(1)`;
                        el.style.opacity = "1";
                        setTimeout(() => {
                          el.style.opacity = "0";
                          el.style.transform = `translate(${Math.cos(angle) * 110}px, ${Math.sin(angle) * 110}px) scale(0.4)`;
                        }, 250);
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center px-6 py-20 md:py-28">
        <div className="max-w-4xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-8 animate-fade-in">
            <Heart className="w-3 h-3 fill-primary text-primary" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Spécial Fête des Mères</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-6 animate-fade-in text-foreground">
            La Roue<br />de la <span className="text-gradient-red italic">Fortune</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Une expérience digitale exclusive Majestic Cinéma × boutiques partenaires.
            Scannez, jouez, gagnez des bons d'achat et des tickets de cinéma pour vous et votre maman.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <a href="#jouer">
              <Button size="lg" className="bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red px-10 py-6 text-base animate-pulse-glow">
                Tenter ma chance
              </Button>
            </a>
            <a href="#how">
              <Button size="lg" variant="outline" className="border-foreground/30 hover:border-primary hover:text-primary px-10 py-6 text-base">
                Comment jouer
              </Button>
            </a>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-3 max-w-xl mx-auto gap-4 sm:gap-8 text-center">
            <div>
              <div className="font-display text-2xl sm:text-3xl text-primary">5</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">Boutiques</div>
            </div>
            <div className="border-x border-border">
              <div className="font-display text-2xl sm:text-3xl text-primary">1</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">Tour unique</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl text-primary">∞</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">Émotions</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
