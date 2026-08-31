import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-lime/30">
      <SiteNav />

      <section className="relative aspect-[3/4] w-full overflow-hidden md:aspect-[16/9]">
        <img
          src={hero.image}
          alt="Homme portant un grand boubou marine DGStyle"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-olive/70 to-transparent p-8">
          <h1 className="mb-2 font-display text-4xl leading-tight text-balance text-cream">
            L'élégance dépasse le temps
          </h1>
          <p className="max-w-[56ch] text-sm text-pretty text-cream/90">
            La nouvelle collection de boubous et ensembles pour l'homme moderne.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium">La Collection</h2>
          <Link to="/collection" className="text-xs font-medium uppercase text-muted-foreground">
            {products.length} articles
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {products.slice(0, 4).map((product) => (
            <Link key={product.id} to="/produit/$id" params={{ id: product.id }}>
              <div className="mb-4 aspect-[4/5] overflow-hidden rounded-[min(1vw,12px)]">
                <img src={product.image} alt={product.name} className="size-full object-cover" />
              </div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="mb-4 inline-block rounded-full bg-lime/20 px-3 py-1">
              <span className="text-[10px] font-semibold uppercase tracking-tighter text-olive">
                {featured.badge}
              </span>
            </div>
            <h2 className="mb-4 font-display text-3xl font-medium text-balance">{featured.name}</h2>
            <p className="mb-8 max-w-[56ch] text-base text-pretty text-muted-foreground">
              {featured.description}
            </p>

            <div className="space-y-6">
              <div>
                <span className="mb-3 block text-[10px] uppercase tracking-widest text-muted-foreground">
                  Taille
                </span>
                <div className="flex gap-2">
                  {featured.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={
                        s === size
                          ? "flex size-10 items-center justify-center rounded-full bg-olive text-sm font-medium text-cream"
                          : "flex size-10 items-center justify-center rounded-full text-sm font-medium ring-1 ring-border transition-transform hover:scale-95"
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => add(featured.id, size)}
                className="w-full bg-olive px-6 py-4 text-sm font-medium text-cream transition-transform active:scale-95"
              >
                Ajouter au panier — {formatPrice(featured.price)}
              </button>
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-[min(1vw,12px)]">
            <img
              src={featured.image}
              alt={featured.tagline}
              className="size-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex items-center gap-2">
          <div className="size-1 rounded-full bg-olive" />
          <h2 className="text-xs font-semibold uppercase tracking-widest">Paiement sécurisé</h2>
        </div>
        <div className="space-y-6 rounded-[min(1vw,20px)] bg-card p-6 ring-1 ring-black/5">
          <p className="text-sm text-muted-foreground text-pretty">
            Réglez vos commandes en toute simplicité avec Orange Money ou Wave, directement depuis
            votre téléphone.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center justify-center rounded-xl p-4 ring-1 ring-border">
              <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-orange-money text-[8px] font-bold uppercase text-cream">
                OM
              </div>
              <span className="text-[10px] font-semibold">Orange Money</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl p-4 ring-1 ring-border">
              <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-wave text-[8px] font-bold uppercase text-cream">
                Wave
              </div>
              <span className="text-[10px] font-semibold">Wave</span>
            </div>
          </div>
          <Link
            to="/panier"
            className="block w-full bg-olive px-6 py-4 text-center text-sm font-medium text-cream transition-transform active:scale-95"
          >
            Voir mon panier
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
