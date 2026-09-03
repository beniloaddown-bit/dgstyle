import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DGStyle — L'élégance dépasse le temps | Boubous & ensembles Dakar" },
      {
        name: "description",
        content:
          "Boutique DGStyle à Dakar : grands boubous, agbadas et ensembles en bazin riche. Paiement Orange Money et Wave.",
      },
      { property: "og:title", content: "DGStyle — L'élégance dépasse le temps" },
      {
        property: "og:description",
        content:
          "Grands boubous, agbadas et ensembles cousus main à Dakar. Paiement Orange Money et Wave.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const hero = products[0]!;
  const featured = products[2]!;
  const { add } = useCart();
  const [size, setSize] = useState(featured.sizes[1]!);
  const [added, setAdded] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-lime/30">
      <SiteNav />

      {/* HERO */}
      <section className="relative w-full">
        <div className="relative mx-auto max-w-6xl">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[16/9]">
            <img
              src={hero.image}
              alt="Homme portant un grand boubou marine DGStyle"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive/80 via-olive/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 sm:pb-12 md:pb-16">
              <div className="mx-auto max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-3 py-1 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 text-lime" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-cream">
                    Nouvelle collection
                  </span>
                </div>
                <h1 className="mb-3 font-display text-4xl leading-tight text-balance text-cream sm:text-5xl md:text-6xl">
                  L'élégance dépasse le temps
                </h1>
                <p className="mb-6 max-w-[56ch] text-sm text-pretty text-cream/90 sm:text-base">
                  La nouvelle collection de boubous, agbadas et ensembles pour l'homme moderne.
                  Confectionnés main à Dakar.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/collection"
                    className="group inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-olive shadow-lg transition-transform active:scale-[0.98] sm:px-6 sm:py-3.5"
                  >
                    Découvrir la collection
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/devis"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-transparent px-5 py-3 text-sm font-medium text-cream backdrop-blur-sm transition-colors hover:bg-cream/10 sm:px-6 sm:py-3.5"
                  >
                    Devis sur mesure
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION PREVIEW */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              La Collection
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pièces signature, cousues à la main.
            </p>
          </div>
          <Link
            to="/collection"
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            {products.length} articles
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 lg:gap-x-6">
          {products.slice(0, 6).map((product) => (
            <Link
              key={product.id}
              to="/produit/$id"
              params={{ id: product.id }}
              className="group block"
            >
              <div className="mb-3 aspect-[4/5] overflow-hidden rounded-[min(2vw,16px)] ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium leading-snug group-hover:text-olive">
                    {product.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {product.tagline}
                  </p>
                </div>
                {product.badge && (
                  <span className="shrink-0 rounded-full bg-lime/20 px-2 py-0.5 text-[9px] font-semibold uppercase text-olive">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PIECE — 2-col on desktop */}
      <section className="border-y border-border/60 bg-muted/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-12 md:py-20">
          <div className="order-2 md:order-1 md:flex md:flex-col md:justify-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-lime/20 px-3 py-1">
              <span className="text-[10px] font-semibold uppercase tracking-tighter text-olive">
                {featured.badge}
              </span>
            </div>
            <h2 className="mb-4 font-display text-3xl font-medium text-balance sm:text-4xl">
              {featured.name}
            </h2>
            <p className="mb-2 text-lg font-semibold tracking-tight text-olive sm:text-xl">
              {formatPrice(featured.price)}
            </p>
            <p className="mb-8 max-w-[56ch] text-sm text-pretty text-muted-foreground sm:text-base">
              {featured.description}
            </p>

            <div className="space-y-6">
              <div>
                <span className="mb-3 block text-[10px] uppercase tracking-widest text-muted-foreground">
                  Taille
                </span>
                <div className="flex flex-wrap gap-2">
                  {featured.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={
                        s === size
                          ? "flex h-11 w-11 items-center justify-center rounded-full bg-olive text-sm font-medium text-cream shadow-md"
                          : "flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium ring-1 ring-border transition-transform hover:scale-95 hover:ring-olive"
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    add(featured.id, size);
                    setAdded(true);
                  }}
                  className="w-full rounded-full bg-olive px-6 py-4 text-sm font-medium text-cream shadow-md transition-transform active:scale-[0.98]"
                >
                  Ajouter au panier — {formatPrice(featured.price)}
                </button>
                {added && (
                  <Link
                    to="/panier"
                    className="w-full rounded-full border border-olive/30 bg-white px-6 py-4 text-center text-sm font-medium text-olive transition-colors hover:bg-olive/5"
                  >
                    Voir le panier
                  </Link>
                )}
                <Link
                  to="/devis"
                  className="w-full rounded-full border border-border bg-background px-6 py-4 text-center text-sm font-medium transition-colors hover:bg-muted"
                >
                  Demander un sur-mesure similaire
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 aspect-[4/5] w-full overflow-hidden rounded-[min(2vw,20px)] ring-1 ring-black/5 shadow-sm md:order-2 md:aspect-[4/5]">
            <img
              src={featured.image}
              alt={featured.tagline}
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* PAIEMENT */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-8 flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-olive" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em]">
            Paiement sécurisé
          </h2>
        </div>
        <div className="space-y-6 rounded-[min(2vw,24px)] bg-card p-5 ring-1 ring-black/5 sm:p-8">
          <p className="max-w-2xl text-sm text-pretty text-muted-foreground sm:text-base">
            Réglez vos commandes en toute simplicité avec Orange Money ou Wave,
            directement depuis votre téléphone. Livraison à Dakar sous 48h.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-4 ring-1 ring-border sm:p-6">
              <img
                src="/images/orange-money.png"
                alt="Logo Orange Money"
                className="h-8 w-auto object-contain sm:h-12"
                loading="lazy"
              />
              <span className="text-[11px] font-medium text-muted-foreground sm:text-xs">Paiement mobile</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#00C2FF] p-4 ring-1 ring-[#00C2FF]/20 sm:p-6">
              <img
                src="/images/wave-senegal.jpeg"
                alt="Logo Wave Sénégal"
                className="h-10 w-auto rounded-lg object-contain sm:h-14"
                loading="lazy"
              />
              <span className="text-[11px] font-medium text-white/95 sm:text-xs">Argent mobile</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/panier"
              className="flex-1 rounded-full bg-olive px-6 py-4 text-center text-sm font-medium text-cream shadow-md transition-transform active:scale-[0.98]"
            >
              Voir mon panier
            </Link>
            <Link
              to="/contact"
              className="flex-1 rounded-full border border-border bg-background px-6 py-4 text-center text-sm font-medium transition-colors hover:bg-muted"
            >
              Une question ? Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
