export default function HowItWorks() {
  const steps = [
    { n: "01", t: "Scannez le QR Code", d: "Disponible chez nos boutiques partenaires Peryssac, Kiabi, Gémo, KIKO et Le West." },
    { n: "02", t: "Remplissez le formulaire", d: "Nom, prénom, numéro de téléphone et adresse mail — obligatoire avant de jouer." },
    { n: "03", t: "Lancez la roue", d: "Un seul tour unique. Découvrez instantanément si vous avez gagné." },
    { n: "04", t: "Récupérez vos lots", d: "Bon d'achat boutique + 2 tickets cinéma à retirer en salle au Majestic." },
  ];
  return (
    <section className="py-24 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Mode d'emploi</span>
          <h2 className="font-display text-5xl mt-3">Comment ça marche</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary transition-colors">
              <div className="font-display text-6xl text-primary/30 group-hover:text-primary transition-colors mb-4">{s.n}</div>
              <h3 className="font-display text-xl mb-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
