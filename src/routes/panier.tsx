import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Votre panier — DGStyle" },
      {
        name: "description",
        content:
          "Récapitulatif de votre commande DGStyle avant paiement par Orange Money ou Wave.",
      },
      { property: "og:title", content: "Votre panier — DGStyle" },
      { property: "og:description", content: "Récapitulatif de votre commande DGStyle." },
    ],
  }),
  component: Panier,
});

const DELIVERY = 2500;

function Panier() {
  const { detailed, subtotal, remove } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 font-display text-3xl font-medium">Votre panier</h1>

        {detailed.length === 0 ? (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">Votre panier est vide pour le moment.</p>
            <Link
              to="/collection"
              className="inline-block bg-olive px-6 py-4 text-sm font-medium text-cream"
            >
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="mb-10 space-y-6">
              {detailed.map(({ line, product }) => (
                <li key={`${line.id}-${line.size}`} className="flex gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md">
                    <img src={product.image} alt={product.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-sm font-medium">{product.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      Taille {line.size} · Quantité {line.qty}
                    </p>
                    <p className="mt-1 text-sm">{formatPrice(product.price * line.qty)}</p>
                    <button
                      onClick={() => remove(line.id, line.size)}
                      className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground underline"
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison Dakar</span>
                <span>{formatPrice(DELIVERY)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-medium">
                <span>Total</span>
                <span>{formatPrice(subtotal + DELIVERY)}</span>
              </div>
            </div>

            <Link
              to="/paiement"
              className="mt-8 block w-full bg-olive px-6 py-4 text-center text-sm font-medium text-cream transition-transform active:scale-95"
            >
              Passer au paiement
            </Link>
          </>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
