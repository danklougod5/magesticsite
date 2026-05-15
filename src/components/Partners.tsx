const PARTNERS = ["Peryssac", "Kiabi", "Gémo", "KIKO", "Le West"];

export default function Partners() {
  return (
    <section className="py-24 px-4 border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">Boutiques participantes</span>
        <h2 className="font-display text-5xl mt-3 mb-4">Nos partenaires</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-14">
          Cinq enseignes s'associent au Majestic Cinéma pour célébrer la Fête des Mères.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {PARTNERS.map((p) => (
            <div
              key={p}
              className="aspect-[3/2] flex items-center justify-center bg-white border border-border rounded-2xl hover:border-primary hover:shadow-elegant transition-all p-6"
            >
              <img 
                src={`/logos/${p.toLowerCase().replace("gémo", "gemo").replace("le west", "lewest")}.${p === 'Le West' ? 'jpg' : 'png'}`} 
                alt={p} 
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
