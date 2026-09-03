import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ArrowRight, Check, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/produit/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Pièce"} — DGStyle Dakar` },
      { name: "description", content: loaderData?.description ?? "Pièce DGStyle" },
      { property: "og:title", content: `${loaderData?.name ?? "Pièce"} — DGStyle` },
      { property: "og:description", content: loaderData?.tagline ?? "DGStyle Dakar" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]!);
  const [added, setAdded] = useState(false);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 md:py-14">
        <Link
          to="/collection"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:mb-8"
        >
          <span aria-hidden>←</span> Retour à la collection
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* IMAGE */}
          <div className="order-1 aspect-[4/5] w-full overflow-hidden rounded-[min(3vw,24px)] ring-1 ring-black/5 shadow-sm md:aspect-[4/5] md:sticky md:top-24">
            <img
              src={product.image}
              alt={product.name}
              className="size-full object-cover"
            />
          </div>

          {/* INFO */}
          <div className="order-2 flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {product.badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-tighter text-olive">
                  {product.badge}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-tighter text-muted-foreground">
                {product.tagline}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-medium text-balance sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-xl font-bold tracking-tight text-olive sm:text-2xl">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 max-w-[56ch] text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              {product.description}
            </p>

            {/* Trust badges */}
            <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <li className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-[11px] font-medium text-foreground/80">
                <ShieldCheck className="h-4 w-4 shrink-0 text-olive" />
                Paiement sécurisé
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-[11px] font-medium text-foreground/80">
                <Truck className="h-4 w-4 shrink-0 text-olive" />
                Livraison Dakar 48h
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-[11px] font-medium text-foreground/80">
                <Check className="h-4 w-4 shrink-0 text-olive" />
                Cousu main à Dakar
              </li>
            </ul>

            {/* Size picker */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Taille
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  Sélectionnée : <span className="font-semibold text-foreground">{size}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={s === size}
                    className={
                      s === size
                        ? "inline-flex h-12 min-w-12 items-center justify-center rounded-xl bg-olive px-4 text-sm font-semibold text-cream shadow-md ring-2 ring-olive/30"
                        : "inline-flex h-12 min-w-12 items-center justify-center rounded-xl bg-background px-4 text-sm font-medium ring-1 ring-border transition-all hover:-translate-y-0.5 hover:ring-olive/50"
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  add(product.id, size);
                  setAdded(true);
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-lg shadow-olive/20 transition-all active:scale-[0.98] hover:shadow-xl hover:shadow-olive/30"
              >
                Ajouter au panier — {formatPrice(product.price)}
                <Check
                  className={`h-4 w-4 transition-opacity ${added ? "opacity-100" : "opacity-0"}`}
                />
              </button>

              {added && (
                <Link
                  to="/panier"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-olive/30 bg-white px-6 py-4 text-sm font-semibold text-olive transition-colors hover:bg-olive/5"
                >
                  Finaliser la commande
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}

              <Link
                to="/devis"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                Préférer une pièce sur mesure ?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-border/60 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-medium sm:text-3xl">
                Vous aimerez aussi
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Autres pièces de la collection.
              </p>
            </div>
            <Link
              to="/collection"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              Tout voir <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10">
            {related.map((p) => (
              <Link
                key={p.id}
                to="/produit/$id"
                params={{ id: p.id }}
                className="group block"
              >
                <div className="mb-3 aspect-[4/5] overflow-hidden rounded-[min(2vw,16px)] ring-1 ring-black/5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-xl">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium leading-snug group-hover:text-olive">
                  {p.name}
                </h3>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {p.tagline}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider">
                  {formatPrice(p.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
