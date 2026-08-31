import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice, products } from "@/lib/products";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collection DGStyle — Boubous, agbadas et ensembles" },
      {
        name: "description",
        content:
          "Découvrez toute la collection DGStyle : grands boubous en bazin riche, agbadas brodés et ensembles deux pièces, cousus main à Dakar.",
      },
      { property: "og:title", content: "Collection DGStyle" },
      {
        property: "og:description",
        content: "Grands boubous, agbadas et ensembles cousus main à Dakar.",
      },
    ],
  }),
  component: Collection,
});

function Collection() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 font-display text-3xl font-medium">La Collection</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} to="/produit/$id" params={{ id: product.id }}>
              <div className="mb-4 aspect-[4/5] overflow-hidden rounded-[min(1vw,12px)]">
                <img src={product.image} alt={product.name} className="size-full object-cover" />
              </div>
              <h2 className="text-sm font-medium">{product.name}</h2>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
