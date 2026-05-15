import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { recordSpin, checkExisting } from "@/lib/spins.functions";
import logo from "@/assets/majestic-logo.jpg";

const PRIZES = [
  { label: "BRAVO !", win: true, color: "var(--primary)" },
  { label: "OUPS...", win: false, color: "#111" },
  { label: "GAGNÉ !", win: true, color: "var(--primary)" },
  { label: "DOMMAGE", win: false, color: "#1a1a1a" },
  { label: "MAGNIFIQUE", win: true, color: "var(--primary)" },
  { label: "PERDU", win: false, color: "#111" },
  { label: "FÉLICITATIONS", win: true, color: "var(--primary)" },
  { label: "MINCE !", win: false, color: "#1a1a1a" },
];

const PARTNERS = ["Peryssac", "Kiabi", "Gémo", "KIKO", "Le West"];

export default function FortuneGame() {
  const [step, setStep] = useState<"form" | "wheel" | "result">("form");
  const [form, setForm] = useState({ nom: "", prenom: "", tel: "", email: "" });
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ win: boolean; label: string; boutique?: string } | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const saveSpin = useServerFn(recordSpin);
  const validateExisting = useServerFn(checkExisting);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.prenom || !form.tel || !form.email) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    const check = await validateExisting({ data: { email: form.email, tel: form.tel } });
    if (!check.ok) {
      toast.error(check.error);
      return;
    }

    setStep("wheel");
  };

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);

    try {
      // 1. Get the result from the server before spinning
      const res = await saveSpin({ data: form });
      
      if (!res.ok) {
        toast.error(res.error || "Une erreur est survenue");
        setSpinning(false);
        return;
      }

      // 2. Find a segment that matches the server's win status
      const possibleSegments = PRIZES.map((p, i) => ({ ...p, index: i })).filter(p => p.win === res.win);
      const chosen = possibleSegments[Math.floor(Math.random() * possibleSegments.length)];
      const segment = chosen.index;

      // 3. Animate the wheel
      const segAngle = 360 / PRIZES.length;
      const target = 360 * 6 + (360 - segment * segAngle - segAngle / 2);
      const total = rotation + target;
      setRotation(total);

      setTimeout(() => {
        setResult({ win: res.win!, label: res.prize!, boutique: res.boutique });
        setSpinning(false);
        setStep("result");
      }, 5200);
    } catch (err) {
      console.error("Failed to record spin:", err);
      toast.error("Erreur de connexion au serveur");
      setSpinning(false);
    }
  };

  const segAngle = 360 / PRIZES.length;

  return (
    <section id="jouer" className="relative py-24 px-4 bg-hero">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Tentez votre chance</span>
          <h2 className="font-display text-5xl md:text-6xl mt-3">La Roue de la <span className="text-gradient-red">Fortune</span></h2>
          <p className="text-muted-foreground mt-4">Un seul tour. Une chance unique de gagner.</p>
        </div>

        {step === "form" && (
          <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-elegant space-y-5">
            <h3 className="font-display text-2xl mb-2">Avant de jouer</h3>
            <p className="text-sm text-muted-foreground mb-6">Remplissez ce formulaire pour accéder à la roue.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} className="mt-2 bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="mt-2 bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="tel">Numéro de téléphone</Label>
                <Input id="tel" type="tel" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} className="mt-2 bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="email">Adresse mail</Label>
                <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-2 bg-input border-border" />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full mt-4 bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red">
              Accéder à la roue
            </Button>
            <p className="text-xs text-muted-foreground text-center">Une seule participation par utilisateur.</p>
          </form>
        )}

        {step === "wheel" && (
          <div className="flex flex-col items-center">
            <div className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px]">
              {/* Pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[28px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_4px_12px_rgba(220,38,38,0.6)]" />
              </div>
              {/* Wheel */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full border-4 border-primary shadow-red transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: spinning ? "5s" : "0s",
                  background: `conic-gradient(${PRIZES.map((p, i) =>
                    `${p.color} ${i * segAngle}deg ${(i + 1) * segAngle}deg`
                  ).join(",")})`,
                }}
              >
                {PRIZES.map((p, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 origin-left text-xs md:text-base font-bold text-white uppercase tracking-wider drop-shadow-md"
                    style={{
                      transform: `rotate(${i * segAngle + segAngle / 2}deg) translateX(55px)`,
                      width: "140px",
                      textAlign: "left",
                      paddingLeft: "10px"
                    }}
                  >
                    {p.label}
                  </div>
                ))}
              </div>
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 shadow-red overflow-hidden">
                <img src={logo} alt="Majestic" className="w-full h-full object-cover" />
              </div>
            </div>
            <Button
              onClick={spin}
              disabled={spinning}
              size="lg"
              className="mt-12 bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red px-12 py-6 text-lg animate-pulse-glow"
            >
              {spinning ? "La roue tourne..." : "Lancer la roue"}
            </Button>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest">Un seul tour autorisé</p>
          </div>
        )}

        {step === "result" && result && (
          <div className="bg-card border border-border rounded-2xl p-10 md:p-14 text-center shadow-elegant">
            {result.win ? (
              <>
                <div className="text-7xl mb-4">🎉</div>
                <h3 className="font-display text-5xl text-gradient-red mb-4">Gagné !</h3>
                <p className="text-lg text-foreground mb-6">Félicitations {form.prenom} !</p>
                
                {result.boutique && (
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-elegant border border-border">
                      <img 
                        src={`/logos/${result.boutique.toLowerCase().replace("gémo", "gemo").replace("le west", "lewest")}.${result.boutique === 'Le West' ? 'jpg' : 'png'}`} 
                        alt={result.boutique} 
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                <p className="text-muted-foreground mb-8">
                  Vous remportez un <strong className="text-foreground">bon d'achat {result.boutique}</strong> ainsi que <strong className="text-foreground">2 tickets de cinéma Majestic</strong> (pour vous et votre maman).
                </p>
                <div className="bg-secondary border border-border rounded-xl p-6 text-left">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">Retrait des lots</p>
                  <p className="text-sm text-muted-foreground">Les bons cadeaux seront récupérés directement en salle de cinéma Majestic. Vous recevrez un email de confirmation à <strong className="text-foreground">{form.email}</strong>.</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-7xl mb-4">🎬</div>
                <h3 className="font-display text-5xl mb-4">Dommage...</h3>
                <p className="text-muted-foreground mb-8">Pas de gain cette fois-ci, mais merci d'avoir participé. Rendez-vous au Majestic Cinéma pour continuer la fête !</p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
