import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <div className="mx-auto max-w-5xl">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img src={product.image} alt={product.name} className="size-full object-cover" />
        </div>

        <section className="px-6 py-10">
          {product.badge && (
            <div className="mb-4 inline-block rounded-full bg-lime/20 px-3 py-1">
              <span className="text-[10px] font-semibold uppercase tracking-tighter text-olive">
                {product.badge}
              </span>
            </div>
          )}
          <h1 className="mb-2 font-display text-3xl font-medium text-balance">{product.name}</h1>
          <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="mb-8 max-w-[56ch] text-base text-pretty text-muted-foreground">
            {product.description}
          </p>

          <span className="mb-3 block text-[10px] uppercase tracking-widest text-muted-foreground">
            Taille
          </span>
          <div className="mb-8 flex gap-2">
            {product.sizes.map((s) => (
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

          <button
            onClick={() => {
              add(product.id, size);
              setAdded(true);
            }}
            className="w-full bg-olive px-6 py-4 text-sm font-medium text-cream transition-transform active:scale-95"
          >
            Ajouter au panier — {formatPrice(product.price)}
          </button>

          {added && (
            <Link
              to="/panier"
              className="mt-3 block w-full px-6 py-4 text-center text-sm font-medium ring-1 ring-olive"
            >
              Voir le panier
            </Link>
          )}
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
