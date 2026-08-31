import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Demande de devis — Création sur mesure DGStyle" },
      {
        name: "description",
        content:
          "Commande sur mesure : grand boubou, agbada, ensemble bazin. Demandez un devis gratuit à DGStyle Dakar.",
      },
      { property: "og:title", content: "Demande de devis — DGStyle sur mesure" },
      {
        property: "og:description",
        content: "Création sur mesure : boubous, agbadas, ensembles. Devis gratuit sous 24h.",
      },
    ],
  }),
  component: Devis,
});

const GARMENTS = [
  "Grand Boubou (3 pièces)",
  "Agbada Royal (3 pièces)",
  "Ensemble 2 pièces (tunique + pantalon)",
  "Tunique seule",
  "Pantalon seul",
  "Boubou simple",
  "Autre / Sur-mesure complet",
];

const FABRICS = [
  "Bazin riche",
  "Bazin brodé / jacquard",
  "Coton de soie",
  "Lin mélangé",
  "Wax / pagne",
  "Soie",
  "Je ne sais pas, me conseiller",
];

const COLORS = [
  "Blanc / Crème",
  "Beige / Taupe",
  "Bordeaux / Prune",
  "Marine / Bleu foncé",
  "Noir",
  "Vert olive",
  "Moutarde / Or",
  "Multicolore",
  "À définir",
];

const EMBROIDERIES = [
  "Motif géométrique",
  "Broderie tressée",
  "Motif éventail / soleil",
  "Motif entrelacs",
  "Galon coloré",
  "Broderie personnalisée (prénom, motif…)",
  "Minimaliste / Sans broderie",
];

const SIZES = ["S", "M", "L", "XL", "XXL", "Sur mesure (prendre mes mensurations)"];

function Devis() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    ville: "Dakar",
    type_vetement: "",
    reference_produit: "",
    tissu: "",
    couleur: "",
    broderie: "",
    taille: "",
    quantite: "1",
    budget: "",
    delai: "",
    livraison: "sur place",
    description: "",
  });
  const [done, setDone] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-lime/20">
            <span className="font-display text-2xl text-olive">✓</span>
          </div>
          <h1 className="mb-4 font-display text-3xl font-medium">Devis enregistré</h1>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Merci {form.prenom || ""} ! Notre équipe vous contacte sous 24h sur le{" "}
            <span className="font-medium text-foreground">{form.telephone}</span> pour
            affiner votre projet et vous transmettre un devis précis.
          </p>
          <div className="mx-auto mb-8 max-w-md rounded-[min(1vw,16px)] bg-card p-5 text-left ring-1 ring-black/5">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Récapitulatif
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Pièce</dt>
                <dd className="font-medium">{form.type_vetement || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tissu</dt>
                <dd className="font-medium">{form.tissu || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Couleur</dt>
                <dd className="font-medium">{form.couleur || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Quantité</dt>
                <dd className="font-medium">{form.quantite}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Livraison</dt>
                <dd className="font-medium capitalize">{form.livraison}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/collection"
              className="inline-block bg-olive px-6 py-4 text-sm font-medium text-cream"
            >
              Voir la collection
            </Link>
            <Link
              to="/contact"
              className="inline-block ring-1 ring-border px-6 py-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              Nous contacter
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center gap-2">
          <div className="size-1 rounded-full bg-olive" />
          <h1 className="text-xs font-semibold uppercase tracking-widest">Demande de devis</h1>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <aside className="space-y-8 md:col-span-2">
            <div>
              <h2 className="font-display text-3xl font-medium text-balance">
                Création sur mesure
              </h2>
              <p className="mt-4 text-sm text-muted-foreground text-pretty">
                Décrivez-nous la pièce de vos rêves. Nous confectionnons sur mesure :
                choix du tissu, des broderies, de la coupe. Devis gratuit sous 24h.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[min(1vw,16px)] bg-olive/5 p-5 ring-1 ring-olive/20">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-olive">
                  Devis & réponse
                </div>
                <p className="text-sm font-medium">Sous 24h ouvrées</p>
              </div>
              <div className="rounded-[min(1vw,16px)] bg-card p-5 ring-1 ring-black/5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Délai de confection
                </div>
                <p className="text-sm font-medium">3 à 10 jours selon modèle</p>
              </div>
              <div className="rounded-[min(1vw,16px)] bg-card p-5 ring-1 ring-black/5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Fourchette de prix
                </div>
                <p className="text-sm font-medium">{formatPrice(75000)} – {formatPrice(200000)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Selon tissu et complexité</p>
              </div>
            </div>

            <div className="rounded-[min(1vw,16px)] border border-dashed border-border p-5">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Besoin d'aide ?
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                Notre équipe vous guide pour votre choix.
              </p>
              <a
                href="tel:+221774991779"
                className="font-display text-lg font-medium text-olive transition-colors hover:underline"
              >
                +221 77 499 17 79
              </a>
            </div>
          </aside>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.nom.trim() || !form.telephone.trim() || !form.type_vetement) return;
              setDone(true);
            }}
            className="space-y-8 rounded-[min(1vw,20px)] bg-card p-6 ring-1 ring-black/5 md:col-span-3"
          >
            <div>
              <h3 className="mb-4 border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                1 · Vos coordonnées
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nom}
                    onChange={update("nom")}
                    placeholder="Diallo"
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={form.prenom}
                    onChange={update("prenom")}
                    placeholder="Mamadou"
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.telephone}
                    onChange={update("telephone")}
                    placeholder="77 000 00 00"
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium tracking-wider outline-none ring-1 ring-border focus:ring-olive"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="vous@email.com"
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Ville / Pays
                  </label>
                  <input
                    type="text"
                    value={form.ville}
                    onChange={update("ville")}
                    placeholder="Dakar, Sénégal"
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                2 · La pièce souhaitée
              </h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Type de vêtement *
                  </label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {GARMENTS.map((g) => (
                      <label
                        key={g}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg px-4 py-3 text-sm ring-1 transition-colors ${
                          form.type_vetement === g
                            ? "bg-olive/5 ring-2 ring-olive"
                            : "ring-border hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="type_vetement"
                          value={g}
                          checked={form.type_vetement === g}
                          onChange={update("type_vetement")}
                          className="mt-1 accent-olive"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Inspiré d'un modèle de la collection ?
                  </label>
                  <select
                    value={form.reference_produit}
                    onChange={update("reference_produit")}
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  >
                    <option value="">Aucun — création originale</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {formatPrice(p.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Tissu
                    </label>
                    <select
                      value={form.tissu}
                      onChange={update("tissu")}
                      className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                    >
                      <option value="">Choisir</option>
                      {FABRICS.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Couleur
                    </label>
                    <select
                      value={form.couleur}
                      onChange={update("couleur")}
                      className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                    >
                      <option value="">Choisir</option>
                      {COLORS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Style de broderie
                    </label>
                    <select
                      value={form.broderie}
                      onChange={update("broderie")}
                      className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                    >
                      <option value="">Choisir</option>
                      {EMBROIDERIES.map((e) => (
                        <option key={e}>{e}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Taille
                    </label>
                    <select
                      value={form.taille}
                      onChange={update("taille")}
                      className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                    >
                      <option value="">Choisir</option>
                      {SIZES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      Quantité
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.quantite}
                      onChange={update("quantite")}
                      className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                3 · Détails & livraison
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Budget approximatif
                  </label>
                  <select
                    value={form.budget}
                    onChange={update("budget")}
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  >
                    <option value="">Non défini</option>
                    <option>{formatPrice(50000)} – {formatPrice(100000)}</option>
                    <option>{formatPrice(100000)} – {formatPrice(150000)}</option>
                    <option>{formatPrice(150000)} – {formatPrice(200000)}</option>
                    <option>{formatPrice(200000)} et plus</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Délai souhaité
                  </label>
                  <select
                    value={form.delai}
                    onChange={update("delai")}
                    className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  >
                    <option value="">Non urgent</option>
                    <option>Sous 3 jours (urgent)</option>
                    <option>Sous 1 semaine</option>
                    <option>Sous 2 semaines</option>
                    <option>Pour une date précise</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Mode de livraison
                  </label>
                  <div className="flex gap-2">
                    {["sur place", "livraison Dakar", "expédition"].map((l) => (
                      <label
                        key={l}
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-3 text-xs font-medium capitalize ring-1 transition-colors ${
                          form.livraison === l
                            ? "bg-olive/5 ring-2 ring-olive"
                            : "ring-border hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="livraison"
                          value={l}
                          checked={form.livraison === l}
                          onChange={update("livraison")}
                          className="accent-olive"
                        />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Précisions & description
                  </label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={update("description")}
                    placeholder="Mensurations (tour de poitrine, taille, hanches, longueur), photos de référence, détails sur la coupe, événement, etc."
                    className="w-full resize-none rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-olive px-6 py-4 text-sm font-medium text-cream transition-transform active:scale-[0.98]"
            >
              Envoyer la demande de devis
            </button>

            <p className="text-center text-[10px] text-muted-foreground">
              Ce devis est <span className="font-medium text-foreground">gratuit et sans engagement</span>.
              Vous recevez une réponse personnalisée sous 24h.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
