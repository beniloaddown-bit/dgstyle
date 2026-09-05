import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, Phone, FileText, Home, Grid3x3 } from "lucide-react";
import { useCart } from "@/lib/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/collection", label: "Collection", icon: Grid3x3 },
  { to: "/devis", label: "Demande de devis", icon: FileText },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function SiteNav() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 ring-1 ring-transparent hover:bg-muted hover:text-foreground focus:outline-none focus:ring-olive"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[82%] sm:max-w-sm">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle className="font-display text-2xl text-olive">
                  DGStyle
                </SheetTitle>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  L'élégance dépasse le temps
                </p>
              </SheetHeader>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                  <SheetClose asChild key={to}>
                    <Link
                      to={to}
                      className="group inline-flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-olive/10 hover:text-olive"
                    >
                      <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/panier"
                    className="mt-2 inline-flex items-center justify-between rounded-lg bg-olive px-4 py-3 text-sm font-medium text-cream transition-colors hover:bg-olive/90"
                  >
                    <span className="inline-flex items-center gap-3">
                      <ShoppingBag className="h-4 w-4" />
                      Panier
                    </span>
                    {count > 0 && (
                      <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-cream px-2 text-[11px] font-bold text-olive">
                        {count}
                      </span>
                    )}
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-10 rounded-xl border border-border/70 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Besoin d'aide ?
                </p>
                <a
                  href="tel:+221774991779"
                  className="mt-1 block font-display text-lg text-olive hover:underline"
                >
                  +221 77 499 17 79
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  Lun – Sam · 9h – 19h
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          to="/collection"
          className="hidden text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground sm:block"
        >
          Collection
        </Link>

        <Link
          to="/"
          className="font-display text-lg font-medium tracking-tight sm:text-xl"
        >
          DGStyle
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/devis"
            className="hidden text-xs font-medium uppercase text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            Devis
          </Link>
          <Link
            to="/contact"
            className="hidden text-xs font-medium uppercase text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            Contact
          </Link>
          <Link
            to="/panier"
            className="relative inline-flex items-center gap-1.5 text-xs font-medium uppercase"
            aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}
          >
            <ShoppingBag className="h-4 w-4 sm:h-[14px] sm:w-[14px]" aria-hidden />
            <span className="hidden sm:inline">Panier</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-olive px-1 text-[9px] font-bold text-cream">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-olive text-cream/80">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-3 font-display text-2xl italic text-lime md:text-3xl">
              DGStyle
            </div>
            <p className="mb-5 max-w-[46ch] text-xs leading-relaxed text-pretty text-cream/70 sm:text-sm">
              Confection de luxe à Dakar. L'héritage du boubou réinventé pour
              l'homme d'aujourd'hui. Pièces cousues main dans notre atelier.
            </p>
            <ul className="space-y-2 text-sm text-cream/90">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-lime" aria-hidden />
                <a
                  href="tel:+221774991779"
                  className="font-medium transition-colors hover:text-lime"
                >
                  +221 77 499 17 79
                </a>
                <span className="text-[10px] uppercase tracking-widest text-cream/50">
                  (WhatsApp)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
                <span>Dakar, Sénégal · Atelier sur rendez-vous</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
                <span>Lun – Sam · 9h – 19h (fermé le dimanche)</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium uppercase tracking-wider sm:text-[11px]">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-lime"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="transition-colors hover:text-lime"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/devis"
                  className="transition-colors hover:text-lime"
                >
                  Demande de devis
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-lime"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/panier"
                  className="transition-colors hover:text-lime"
                >
                  Panier
                </Link>
              </li>
              <li>
                <Link
                  to="/paiement"
                  className="transition-colors hover:text-lime"
                >
                  Paiement
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
              Paiement
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              <div className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-white/10">
                <img
                  src="/images/orange-money.png"
                  alt="Logo Orange Money"
                  className="h-8 shrink-0 w-auto object-contain"
                  loading="lazy"
                />
                <span className="text-foreground/85">Paiement mobile</span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-xl bg-[#00C2FF] px-4 py-3 ring-1 ring-cream/10">
                <img
                  src="/images/wave-senegal.jpeg"
                  alt="Logo Wave Sénégal"
                  className="h-10 shrink-0 w-auto rounded-lg object-contain"
                  loading="lazy"
                />
                <span className="font-medium text-white/95">Argent mobile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[10px] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 DGSTYLE. L'ÉLÉGANCE DÉPASSE LE TEMPS.</p>
          <p>Fait avec soin à Dakar · Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
