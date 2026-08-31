import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const { count } = useCart();
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/collection"
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Collection
        </Link>
        <Link to="/" className="font-display text-xl font-medium tracking-tight">
          DGStyle
        </Link>
        <div className="flex items-center gap-5">
          <Link
            to="/devis"
            className="hidden text-xs font-medium uppercase text-muted-foreground sm:block"
          >
            Devis
          </Link>
          <Link
            to="/contact"
            className="hidden text-xs font-medium uppercase text-muted-foreground sm:block"
          >
            Contact
          </Link>
          <Link to="/panier" className="relative text-xs font-medium uppercase">
            Panier
            {count > 0 && (
              <span className="absolute -top-2 -right-3 flex size-4 items-center justify-center rounded-full bg-olive text-[9px] font-bold text-cream">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-olive px-6 py-12 pb-24 text-cream/70">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 font-display text-2xl italic text-lime">DGStyle</div>
        <p className="mb-8 max-w-[48ch] text-xs leading-relaxed text-pretty">
          Confection de luxe à Dakar. L'héritage du boubou réinventé pour l'homme d'aujourd'hui.
          Tél. 77 499 17 79 · Dakar, Sénégal.
        </p>
        <div className="flex flex-col gap-4 text-[10px] font-medium uppercase tracking-widest">
          <Link to="/collection" className="transition-colors hover:text-lime">
            Collections
          </Link>
          <Link to="/devis" className="transition-colors hover:text-lime">
            Demande de devis
          </Link>
          <Link to="/contact" className="transition-colors hover:text-lime">
            Contact
          </Link>
          <Link to="/panier" className="transition-colors hover:text-lime">
            Panier
          </Link>
          <Link to="/paiement" className="transition-colors hover:text-lime">
            Paiement
          </Link>
        </div>
        <div className="mt-12 border-t border-cream/10 pt-8 text-[9px] text-cream/40">
          © 2026 DGSTYLE. L'ÉLÉGANCE DÉPASSE LE TEMPS.
        </div>
      </div>
    </footer>
  );
}
