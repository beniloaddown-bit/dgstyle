import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ArrowRight, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

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
  const { detailed, subtotal, remove, count } = useCart();
  const total = subtotal + DELIVERY;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <Link
          to="/collection"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Continuer mes achats
        </Link>

        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-olive/5 px-3 py-1 ring-1 ring-olive/10">
              <ShoppingBag className="h-3.5 w-3.5 text-olive" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
                {count} article{count > 1 ? "s" : ""}
              </span>
            </div>
            <h1 className="font-display text-3xl font-medium text-balance sm:text-4xl">
              Votre panier
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {detailed.length === 0
                ? "Commencez par découvrir la collection."
                : "Validez vos articles et passez au paiement sécurisé."}
            </p>
          </div>
        </header>

        {detailed.length === 0 ? (
          <div className="grid gap-6 rounded-[min(3vw,24px)] border border-dashed border-border bg-card p-8 text-center sm:p-12 md:grid-cols-[1fr,auto] md:items-center md:text-left">
            <div>
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted md:mx-0">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mx-auto max-w-md text-base font-medium md:mx-0">
                Votre panier est vide pour le moment.
              </p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground md:mx-0">
                Ajoutez des pièces de la collection pour commencer votre commande.
              </p>
            </div>
            <Link
              to="/collection"
              className="group mx-auto inline-flex items-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md md:mx-0"
            >
              Découvrir la collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-5">
            {/* CART LINES */}
            <ul className="space-y-4 lg:col-span-3">
              {detailed.map(({ line, product }) => (
                <li
                  key={`${line.id}-${line.size}`}
                  className="flex gap-4 rounded-[min(3vw,20px)] bg-card p-3 ring-1 ring-black/5 sm:gap-5 sm:p-4"
                >
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5 sm:h-32 sm:w-28">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-medium leading-snug sm:text-base">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                          Taille <span className="font-semibold text-foreground">{line.size}</span>
                          {line.qty > 1 && (
                            <>
                              {" "}· Quantité{" "}
                              <span className="font-semibold text-foreground">{line.qty}</span>
                            </>
                          )}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-sm font-bold tracking-tight text-foreground sm:text-base">
                        {formatPrice(product.price * line.qty)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        Prix unitaire {formatPrice(product.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(line.id, line.size)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Retirer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* SUMMARY */}
            <aside className="h-fit lg:col-span-2">
              <div className="space-y-5 rounded-[min(3vw,24px)] bg-card p-5 ring-1 ring-black/5 sm:p-6 lg:sticky lg:top-24">
                <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="size-1 rounded-full bg-olive" /> Récapitulatif
                </h3>

                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Sous-total ({count} art.)</dt>
                    <dd className="font-medium">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Livraison Dakar</dt>
                    <dd className="font-medium">{formatPrice(DELIVERY)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-border pt-3">
                    <dt className="text-sm font-semibold uppercase tracking-wider">Total</dt>
                    <dd className="font-display text-2xl font-semibold tracking-tight text-olive sm:text-3xl">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>

                <Link
                  to="/paiement"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md shadow-olive/20 transition-transform active:scale-[0.98] hover:shadow-lg hover:shadow-olive/30"
                >
                  Passer au paiement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <p className="text-center text-[10px] text-muted-foreground">
                  Paiement sécurisé par Orange Money ou Wave.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
