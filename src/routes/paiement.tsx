import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/paiement")({
  head: () => ({
    meta: [
      { title: "Paiement Orange Money & Wave — DGStyle" },
      {
        name: "description",
        content:
          "Réglez votre commande DGStyle en toute sécurité par Orange Money ou Wave depuis votre téléphone.",
      },
      { property: "og:title", content: "Paiement Orange Money & Wave — DGStyle" },
      {
        property: "og:description",
        content: "Réglez votre commande DGStyle par Orange Money ou Wave.",
      },
    ],
  }),
  component: Paiement,
});

const DELIVERY = 2500;

function Paiement() {
  const { detailed, subtotal, clear } = useCart();
  const [method, setMethod] = useState<"orange" | "wave">("orange");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const total = detailed.length > 0 ? subtotal + DELIVERY : 0;

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="mb-4 font-display text-3xl font-medium">Demande de paiement envoyée</h1>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Validez la transaction {method === "orange" ? "Orange Money" : "Wave"} sur le numéro{" "}
            {phone}. Notre équipe vous contacte ensuite pour la livraison.
          </p>
          <Link to="/collection" className="inline-block bg-olive px-6 py-4 text-sm font-medium text-cream">
            Retour à la collection
          </Link>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-8 flex items-center gap-2">
          <div className="size-1 rounded-full bg-olive" />
          <h1 className="text-xs font-semibold uppercase tracking-widest">Paiement sécurisé</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (detailed.length === 0 || phone.trim().length < 9) return;
            clear();
            setDone(true);
          }}
          className="space-y-8 rounded-[min(1vw,20px)] bg-card p-6 ring-1 ring-black/5"
        >
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Livraison Dakar</span>
              <span className="font-medium">{formatPrice(detailed.length ? DELIVERY : 0)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Choisir votre méthode
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod("orange")}
                className={`flex flex-col items-center justify-center rounded-xl p-4 transition-transform active:scale-95 ${
                  method === "orange" ? "bg-olive/5 ring-2 ring-olive" : "ring-1 ring-border"
                }`}
              >
                <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-orange-money text-[8px] font-bold uppercase text-cream">
                  OM
                </div>
                <span className="text-[10px] font-semibold">Orange Money</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod("wave")}
                className={`flex flex-col items-center justify-center rounded-xl p-4 transition-transform active:scale-95 ${
                  method === "wave" ? "bg-olive/5 ring-2 ring-olive" : "ring-1 ring-border"
                }`}
              >
                <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-wave text-[8px] font-bold uppercase text-cream">
                  Wave
                </div>
                <span className="text-[10px] font-semibold">Wave</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
            >
              Numéro de téléphone
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="77 000 00 00"
              className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium tracking-wider outline-none ring-1 ring-border focus:ring-olive"
            />
          </div>

          <button
            type="submit"
            disabled={detailed.length === 0}
            className="w-full bg-olive px-6 py-4 text-sm font-medium text-cream transition-transform active:scale-95 disabled:opacity-40"
          >
            Confirmer le paiement
          </button>

          {detailed.length === 0 && (
            <p className="text-center text-xs text-muted-foreground">
              Votre panier est vide —{" "}
              <Link to="/collection" className="underline">
                voir la collection
              </Link>
            </p>
          )}
        </form>
      </section>
      <SiteFooter />
    </div>
  );
}
