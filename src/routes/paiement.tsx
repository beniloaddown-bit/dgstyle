import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ArrowLeft, Check, ShieldCheck, CreditCard, Phone } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const total = detailed.length > 0 ? subtotal + DELIVERY : 0;

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rounded-[min(3vw,24px)] bg-card p-6 text-center ring-1 ring-black/5 sm:p-10">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-lime/20">
              <Check className="h-8 w-8 text-olive" />
            </div>
            <h1 className="mb-3 font-display text-3xl font-medium text-balance sm:text-4xl">
              Demande de paiement envoyée
            </h1>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              Validez la transaction{" "}
              <span className="font-semibold text-foreground">
                {method === "orange" ? "Orange Money" : "Wave"}
              </span>{" "}
              sur le numéro{" "}
              <span className="font-semibold text-foreground">{phone || "indiqué"}</span>.
              Notre équipe vous contacte ensuite pour la livraison à Dakar sous 48h.
            </p>
            <div className="mx-auto flex max-w-sm flex-col gap-3">
              <Link
                to="/collection"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md"
              >
                Retour à la collection
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Phone className="h-4 w-4" /> Une question ?
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <Link
          to="/panier"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour au panier
        </Link>

        <div className="mb-8 flex items-center gap-2 sm:mb-12">
          <div className="size-1.5 rounded-full bg-olive" />
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-3xl font-medium text-balance sm:text-4xl">
              Paiement sécurisé
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-olive">
              <ShieldCheck className="h-3 w-3" /> Sécurisé
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Summary */}
          <aside className="order-2 h-fit lg:col-span-2 lg:order-1">
            <div className="space-y-4 rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 sm:p-6">
              <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5" /> Votre commande
              </h3>

              <ul className="space-y-3 text-sm">
                {detailed.length === 0 && (
                  <li className="text-xs text-muted-foreground">
                    Votre panier est vide.
                  </li>
                )}
                {detailed.map(({ line, product }) => (
                  <li
                    key={`${line.id}-${line.size}`}
                    className="flex items-start gap-3"
                  >
                    <div className="h-14 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5">
                      <img
                        src={product.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium leading-snug">
                        {product.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {line.size} · × {line.qty}
                      </p>
                    </div>
                    <p className="shrink-0 text-right text-[13px] font-semibold">
                      {formatPrice(product.price * line.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-2.5 border-t border-border pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Sous-total</dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Livraison Dakar</dt>
                  <dd className="font-medium">
                    {formatPrice(detailed.length ? DELIVERY : 0)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-border pt-3">
                  <dt className="text-sm font-semibold uppercase tracking-wider">
                    Total
                  </dt>
                  <dd className="font-display text-2xl font-semibold tracking-tight text-olive sm:text-3xl">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* Form */}
          <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                if (detailed.length === 0 || phone.trim().length < 9) return;
                setLoading(true);
                try {
                  const res = await fetch("/api/pay", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                      "x-internal-key": (import.meta as any).env.VITE_INTERNAL_API_KEY || "",
                    },
                    body: JSON.stringify({
                      method,
                      phone,
                      amount: total,
                      items: detailed.map(({ line, product }) => ({ line, product })),
                    }),
                  });

                  const payload = await res.json().catch(() => ({}));

                  if (!res.ok) {
                    setError(payload?.error || "Erreur lors de la demande de paiement");
                    setLoading(false);
                    return;
                  }

                  if (payload?.redirectUrl) {
                    window.location.href = payload.redirectUrl;
                    return;
                  }

                  clear();
                  setDone(true);
                } catch (err) {
                  console.error(err);
                  setError("Impossible de contacter le serveur");
                } finally {
                  setLoading(false);
                }
              }}
            className="order-1 space-y-6 lg:col-span-3 lg:order-2"
          >
            <div className="space-y-4 rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 sm:p-6">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  1 — Choisir votre méthode
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("orange")}
                    aria-pressed={method === "orange"}
                    className={`flex flex-col items-center justify-center gap-3 rounded-2xl p-4 transition-all sm:p-6 ${
                      method === "orange"
                        ? "bg-white ring-2 ring-olive shadow-md"
                        : "bg-background ring-1 ring-border hover:ring-olive/30"
                    }`}
                  >
                    <img
                      src="/t_l_chargement_1__original.png"
                      alt="Logo Orange Money"
                      className="h-8 w-auto object-contain sm:h-12"
                    />
                    <span className="text-xs font-semibold text-foreground/75 sm:text-sm">
                      Orange Money
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("wave")}
                    aria-pressed={method === "wave"}
                    className={`flex flex-col items-center justify-center gap-3 rounded-2xl p-4 transition-all sm:p-6 ${
                      method === "wave"
                        ? "bg-[#00C2FF] ring-2 ring-olive shadow-md"
                        : "bg-[#00C2FF]/90 ring-1 ring-[#00C2FF]/30 hover:ring-olive/30"
                    }`}
                  >
                    <img
                      src="/wave_sngal_logo.jpeg"
                      alt="Logo Wave Sénégal"
                      className="h-10 w-auto rounded-lg object-contain sm:h-14"
                    />
                    <span className="text-xs font-semibold text-white sm:text-sm">
                      Wave Sénégal
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  2 — Numéro{" "}
                  {method === "orange" ? "Orange Money" : "Wave"} · obligatoire
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="77 000 00 00"
                  className="w-full rounded-xl bg-muted/70 px-4 py-3.5 text-sm font-medium tracking-wider outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-base"
                />
                <p className="text-[11px] text-muted-foreground">
                  Un SMS de confirmation vous sera envoyé par{" "}
                  {method === "orange" ? "Orange Money" : "Wave"} sur ce numéro.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={detailed.length === 0 || loading}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md shadow-olive/20 transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-olive/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Envoi..." : `Confirmer le paiement — ${formatPrice(total)}`}
              <Check className="h-4 w-4 opacity-80" />
            </button>

            {error && (
              <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-center text-sm text-red-700">
                {error}
              </div>
            )}

            {detailed.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-center text-xs text-muted-foreground sm:text-sm">
                Votre panier est vide —{" "}
                <Link
                  to="/collection"
                  className="font-semibold text-olive underline-offset-4 hover:underline"
                >
                  voir la collection
                </Link>
              </div>
            )}

            <p className="text-center text-[10px] text-muted-foreground sm:text-xs">
              <ShieldCheck className="mx-auto mb-1 inline h-3 w-3 align-middle" />
              &nbsp;Paiement sécurisé par {method === "orange" ? "Orange Money" : "Wave"} · Pas de stockage de données bancaires.
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
