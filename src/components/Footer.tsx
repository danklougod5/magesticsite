import logo from "@/assets/majestic-logo.jpg";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Majestic Cinéma" className="w-10 h-10 rounded-md object-cover" />
          <div>
            <p className="font-display text-lg leading-none">Majestic Cinéma</p>
            <p className="text-xs text-muted-foreground mt-1">Opération Fête des Mères × partenaires</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Majestic Cinéma. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
