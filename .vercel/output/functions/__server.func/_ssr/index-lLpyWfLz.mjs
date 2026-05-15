import { L as jsxRuntimeExports, V as reactExports } from "./server-CzXKlo6r.mjs";
import { T as Toaster2, B as Button, L as Label, I as Input, t as toast } from "./sonner-fsS-u0Fd.mjs";
import { u as useServerFn, r as recordSpin, c as checkExisting, a as createLucideIcon } from "./createLucideIcon-CJw64Xub.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-8RO4xBwZ.mjs";
import "./router-CEII4GLB.mjs";
import "./auth-middleware-2Bf0Gn5a.mjs";
import "./index-B6C1Fcum.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
const __iconNode$3 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
const logo = "/assets/majestic-logo-BiSzU-Td.jpg";
function Hero() {
  const heroRef = reactExports.useRef(null);
  const [hearts, setHearts] = reactExports.useState([]);
  const [bursts, setBursts] = reactExports.useState([]);
  const burstId = reactExports.useRef(0);
  const mouse = reactExports.useRef({ x: -999, y: -999 });
  reactExports.useEffect(() => {
    setHearts(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 16 + Math.random() * 22,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.05 - Math.random() * 0.15,
        rot: Math.random() * 360
      }))
    );
  }, []);
  reactExports.useEffect(() => {
    let raf;
    const tick = () => {
      setHearts(
        (prev) => prev.map((h) => {
          let { x, y, vx, vy, rot } = h;
          x += vx;
          y += vy;
          rot += 0.3;
          const rect = heroRef.current?.getBoundingClientRect();
          if (rect) {
            const px = x / 100 * rect.width;
            const py = y / 100 * rect.height;
            const dx = px - mouse.current.x;
            const dy = py - mouse.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              x += dx / dist * force * 1.2;
              y += dy / dist * force * 1.2;
            }
          }
          if (y < -5) y = 105;
          if (y > 110) y = -5;
          if (x < -5) x = 105;
          if (x > 110) x = -5;
          return { ...h, x, y, rot };
        })
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const handleMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const handleClick = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = ++burstId.current;
    setBursts((b) => [...b, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 900);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      ref: heroRef,
      onMouseMove: handleMove,
      onClick: handleClick,
      className: "relative bg-hero overflow-hidden grain min-h-screen",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 bg-header border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 text-foreground/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Facebook", className: "hover:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "Instagram", className: "hover:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", "aria-label": "YouTube", className: "hover:text-primary transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 fill-primary" }),
            "Spécial Fête des Mères"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "relative z-20 bg-header/95 backdrop-blur-md border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Majestic Cinéma", className: "w-11 h-11 sm:w-14 sm:h-14 rounded-md object-cover shadow-elegant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl sm:text-2xl tracking-wide text-foreground", children: "MAJESTIC" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "Cinéma" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#jouer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red", children: "Jouer" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-[100px] left-0 w-24 md:w-40 h-full opacity-20", style: { background: "var(--gradient-curtain)", maskImage: "linear-gradient(to right, black, transparent)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-[100px] right-0 w-24 md:w-40 h-full opacity-20", style: { background: "var(--gradient-curtain)", maskImage: "linear-gradient(to left, black, transparent)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
          hearts.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              className: "absolute text-primary fill-primary/40 transition-transform",
              style: {
                left: `${h.x}%`,
                top: `${h.y}%`,
                width: h.size,
                height: h.size,
                transform: `rotate(${h.rot}deg)`,
                filter: "drop-shadow(0 4px 10px oklch(0.55 0.24 25 / 0.35))"
              }
            },
            h.id
          )),
          bursts.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute", style: { left: b.x, top: b.y }, children: [...Array(8)].map((_, i) => {
            const angle = i / 8 * Math.PI * 2;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heart,
              {
                className: "absolute text-primary fill-primary",
                style: {
                  width: 14,
                  height: 14,
                  left: -7,
                  top: -7,
                  animation: `burst-${i} 0.8s ease-out forwards`,
                  transform: `translate(${Math.cos(angle) * 60}px, ${Math.sin(angle) * 60}px) scale(0)`,
                  transition: "transform 0.8s cubic-bezier(.2,.8,.2,1), opacity 0.8s",
                  opacity: 0
                },
                ref: (el) => {
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
                }
              },
              i
            );
          }) }, b.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-center px-6 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl text-center mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 mb-8 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 fill-primary text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.25em] text-primary", children: "Spécial Fête des Mères" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95] mb-6 animate-fade-in text-foreground", children: [
            "La Roue",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "de la ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-red italic", children: "Fortune" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in", children: "Une expérience digitale exclusive Majestic Cinéma × boutiques partenaires. Scannez, jouez, gagnez des bons d'achat et des tickets de cinéma pour vous et votre maman." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#jouer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red px-10 py-6 text-base animate-pulse-glow", children: "Tenter ma chance" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "border-foreground/30 hover:border-primary hover:text-primary px-10 py-6 text-base", children: "Comment jouer" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 sm:mt-20 grid grid-cols-3 max-w-xl mx-auto gap-4 sm:gap-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl sm:text-3xl text-primary", children: "5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Boutiques" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-x border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl sm:text-3xl text-primary", children: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Tour unique" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl sm:text-3xl text-primary", children: "∞" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Émotions" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
function HowItWorks() {
  const steps = [
    { n: "01", t: "Scannez le QR Code", d: "Disponible chez nos boutiques partenaires Peryssac, Kiabi, Gémo, KIKO et Le West." },
    { n: "02", t: "Remplissez le formulaire", d: "Nom, prénom, numéro de téléphone et adresse mail — obligatoire avant de jouer." },
    { n: "03", t: "Lancez la roue", d: "Un seul tour unique. Découvrez instantanément si vous avez gagné." },
    { n: "04", t: "Récupérez vos lots", d: "Bon d'achat boutique + 2 tickets cinéma à retirer en salle au Majestic." }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Mode d'emploi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl mt-3", children: "Comment ça marche" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative bg-card border border-border rounded-2xl p-8 hover:border-primary transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-6xl text-primary/30 group-hover:text-primary transition-colors mb-4", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mb-3", children: s.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s.d })
    ] }, s.n)) })
  ] }) });
}
const PRIZES = [
  { label: "BRAVO !", win: true, color: "var(--primary)" },
  { label: "OUPS...", win: false, color: "#111" },
  { label: "GAGNÉ !", win: true, color: "var(--primary)" },
  { label: "DOMMAGE", win: false, color: "#1a1a1a" },
  { label: "MAGNIFIQUE", win: true, color: "var(--primary)" },
  { label: "PERDU", win: false, color: "#111" },
  { label: "FÉLICITATIONS", win: true, color: "var(--primary)" },
  { label: "MINCE !", win: false, color: "#1a1a1a" }
];
function FortuneGame() {
  const [step, setStep] = reactExports.useState("form");
  const [form, setForm] = reactExports.useState({ nom: "", prenom: "", tel: "", email: "" });
  const [spinning, setSpinning] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [rotation, setRotation] = reactExports.useState(0);
  const wheelRef = reactExports.useRef(null);
  const saveSpin = useServerFn(recordSpin);
  const validateExisting = useServerFn(checkExisting);
  const onSubmit = async (e) => {
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
      const res = await saveSpin({ data: form });
      if (!res.ok) {
        toast.error(res.error || "Une erreur est survenue");
        setSpinning(false);
        return;
      }
      const possibleSegments = PRIZES.map((p, i) => ({ ...p, index: i })).filter((p) => p.win === res.win);
      const chosen = possibleSegments[Math.floor(Math.random() * possibleSegments.length)];
      const segment = chosen.index;
      const segAngle2 = 360 / PRIZES.length;
      const target = 360 * 6 + (360 - segment * segAngle2 - segAngle2 / 2);
      const total = rotation + target;
      setRotation(total);
      setTimeout(() => {
        setResult({ win: res.win, label: res.prize, boutique: res.boutique });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "jouer", className: "relative py-24 px-4 bg-hero", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Tentez votre chance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-6xl mt-3", children: [
        "La Roue de la ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-red", children: "Fortune" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4", children: "Un seul tour. Une chance unique de gagner." })
    ] }),
    step === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "bg-card border border-border rounded-2xl p-8 md:p-10 shadow-elegant space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-2", children: "Avant de jouer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Remplissez ce formulaire pour accéder à la roue." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prenom", children: "Prénom" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prenom", value: form.prenom, onChange: (e) => setForm({ ...form, prenom: e.target.value }), className: "mt-2 bg-input border-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nom", children: "Nom" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nom", value: form.nom, onChange: (e) => setForm({ ...form, nom: e.target.value }), className: "mt-2 bg-input border-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tel", children: "Numéro de téléphone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tel", type: "tel", value: form.tel, onChange: (e) => setForm({ ...form, tel: e.target.value }), className: "mt-2 bg-input border-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Adresse mail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), className: "mt-2 bg-input border-border" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full mt-4 bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red", children: "Accéder à la roue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Une seule participation par utilisateur." })
    ] }),
    step === "wheel" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[340px] h-[340px] md:w-[460px] md:h-[460px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-l-[18px] border-r-[18px] border-t-[28px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_4px_12px_rgba(220,38,38,0.6)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: wheelRef,
            className: "absolute inset-0 rounded-full border-4 border-primary shadow-red transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]",
            style: {
              transform: `rotate(${rotation}deg)`,
              transitionDuration: spinning ? "5s" : "0s",
              background: `conic-gradient(${PRIZES.map(
                (p, i) => `${p.color} ${i * segAngle}deg ${(i + 1) * segAngle}deg`
              ).join(",")})`
            },
            children: PRIZES.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-1/2 left-1/2 origin-left text-xs md:text-base font-bold text-white uppercase tracking-wider drop-shadow-md",
                style: {
                  transform: `rotate(${i * segAngle + segAngle / 2}deg) translateX(55px)`,
                  width: "140px",
                  textAlign: "left",
                  paddingLeft: "10px"
                },
                children: p.label
              },
              i
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 shadow-red overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Majestic", className: "w-full h-full object-cover" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: spin,
          disabled: spinning,
          size: "lg",
          className: "mt-12 bg-gradient-red text-primary-foreground hover:opacity-90 shadow-red px-12 py-6 text-lg animate-pulse-glow",
          children: spinning ? "La roue tourne..." : "Lancer la roue"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4 uppercase tracking-widest", children: "Un seul tour autorisé" })
    ] }),
    step === "result" && result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-10 md:p-14 text-center shadow-elegant", children: result.win ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl mb-4", children: "🎉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-5xl text-gradient-red mb-4", children: "Gagné !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-foreground mb-6", children: [
        "Félicitations ",
        form.prenom,
        " !"
      ] }),
      result.boutique && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-4 rounded-xl shadow-elegant border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: `/logos/${result.boutique.toLowerCase().replace("gémo", "gemo").replace("le west", "lewest")}.${result.boutique === "Le West" ? "jpg" : "png"}`,
          alt: result.boutique,
          className: "h-16 w-auto object-contain"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-8", children: [
        "Vous remportez un ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
          "bon d'achat ",
          result.boutique
        ] }),
        " ainsi que ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "2 tickets de cinéma Majestic" }),
        " (pour vous et votre maman)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary border border-border rounded-xl p-6 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-primary mb-2", children: "Retrait des lots" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Les bons cadeaux seront récupérés directement en salle de cinéma Majestic. Vous recevrez un email de confirmation à ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: form.email }),
          "."
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl mb-4", children: "🎬" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-5xl mb-4", children: "Dommage..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Pas de gain cette fois-ci, mais merci d'avoir participé. Rendez-vous au Majestic Cinéma pour continuer la fête !" })
    ] }) })
  ] }) });
}
const PARTNERS = ["Peryssac", "Kiabi", "Gémo", "KIKO", "Le West"];
function Partners() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 border-t border-border bg-card/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Boutiques participantes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl mt-3 mb-4", children: "Nos partenaires" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto mb-14", children: "Cinq enseignes s'associent au Majestic Cinéma pour célébrer la Fête des Mères." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: PARTNERS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "aspect-[3/2] flex items-center justify-center bg-white border border-border rounded-2xl hover:border-primary hover:shadow-elegant transition-all p-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: `/logos/${p.toLowerCase().replace("gémo", "gemo").replace("le west", "lewest")}.${p === "Le West" ? "jpg" : "png"}`,
            alt: p,
            className: "max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
          }
        )
      },
      p
    )) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border py-10 px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Majestic Cinéma", className: "w-10 h-10 rounded-md object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg leading-none", children: "Majestic Cinéma" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Opération Fête des Mères × partenaires" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Majestic Cinéma. Tous droits réservés."
    ] })
  ] }) });
}
function LoadingScreen() {
  const [hidden, setHidden] = reactExports.useState(false);
  const [fading, setFading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2800);
    const t2 = setTimeout(() => setHidden(true), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (hidden) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden", children: [...Array(18)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heart,
          {
            className: "absolute text-primary fill-primary/70",
            style: {
              left: `${i * 53 % 100}%`,
              bottom: `-40px`,
              width: `${12 + i % 5 * 6}px`,
              height: `${12 + i % 5 * 6}px`,
              animation: `rise-fade ${4 + i % 4}s linear ${i * 0.25}s infinite`
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-6 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: logo,
                alt: "Majestic Cinéma",
                className: "w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-red animate-heart-beat mx-auto"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "absolute -top-2 -right-2 w-8 h-8 text-primary fill-primary animate-heart-beat" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-4", children: "Majestic Cinéma" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-5xl md:text-6xl leading-tight max-w-3xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shimmer-text", children: "Vous souhaite" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "une " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-red italic", children: "Bonne Fête des Mères" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex items-center justify-center gap-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              className: "w-4 h-4 text-primary fill-primary",
              style: { animation: `heart-beat 1.2s ease-in-out ${i * 0.2}s infinite` }
            },
            i
          )) })
        ] })
      ]
    }
  );
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "how", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FortuneGame, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Partners, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster2, { theme: "light" })
  ] });
}
export {
  Index as component
};
