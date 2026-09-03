import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { products, formatPrice } from "@/lib/products";
import { ArrowLeft, Check, Clock, FileText, Gauge, Palette, Ruler, Scissors, Truck } from "lucide-react";

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

const SIZES = ["S", "M", "L", "XL", "XXL", "Sur mesure (mensurations)"];

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
        <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="rounded-[min(3vw,24px)] bg-card p-6 text-center ring-1 ring-black/5 sm:p-10">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-lime/20">
              <Check className="h-8 w-8 text-olive" />
            </div>
            <h1 className="mb-3 font-display text-3xl font-medium text-balance sm:text-4xl">
              Devis enregistré
            </h1>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              Merci {form.prenom ? `${form.prenom} ` : ""}! Notre équipe vous contacte sous
              24h sur le{" "}
              <span className="font-semibold text-foreground">{form.telephone || "numéro indiqué"}</span>{" "}
              pour affiner votre projet.
            </p>

            <div className="mx-auto mb-8 max-w-md rounded-[min(2vw,18px)] bg-muted/50 p-5 text-left ring-1 ring-black/5">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <FileText className="h-3.5 w-3.5" /> Récapitulatif
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Pièce</dt>
                  <dd className="text-right font-medium leading-snug">
                    {form.type_vetement || "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Tissu</dt>
                  <dd className="text-right font-medium leading-snug">
                    {form.tissu || "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Couleur</dt>
                  <dd className="text-right font-medium leading-snug">
                    {form.couleur || "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Taille · Qté</dt>
                  <dd className="text-right font-medium leading-snug">
                    {form.taille || "—"} · × {form.quantite}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">Livraison</dt>
                  <dd className="text-right font-medium capitalize leading-snug">
                    {form.livraison}
                  </dd>
                </div>
                {form.delai && (
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-muted-foreground">Délai</dt>
                    <dd className="text-right font-medium leading-snug">{form.delai}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/collection"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md sm:w-auto"
              >
                Voir la collection
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
              >
                Nous contacter
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

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:mb-10"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à l'accueil
        </Link>

        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-olive/5 px-3 py-1 ring-1 ring-olive/10">
          <FileText className="h-3.5 w-3.5 text-olive" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
            Devis gratuit
          </span>
        </div>
        <h1 className="mb-2 font-display text-3xl font-medium text-balance sm:text-4xl md:text-5xl">
          Pièce sur mesure
        </h1>
        <p className="mb-10 max-w-[56ch] text-sm text-pretty text-muted-foreground sm:text-base md:mb-14">
          Décrivez-nous la pièce de vos rêves : choix du tissu, broderies, coupe,
          mensurations. Notre atelier vous envoie un devis précis sous 24h.
        </p>

        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          {/* SIDEBAR — moves to top on mobile, 2-col to the left on desktop */}
          <aside className="space-y-5 md:col-span-5 md:col-start-1 md:sticky md:top-24 md:h-fit lg:col-span-4">
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              <div className="rounded-[min(3vw,18px)] bg-olive/5 p-5 ring-1 ring-olive/20">
                <Clock className="mb-2 h-5 w-5 text-olive" />
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
                  Devis & réponse
                </div>
                <p className="text-sm font-medium">Sous 24h ouvrées</p>
              </div>
              <div className="rounded-[min(3vw,18px)] bg-card p-5 ring-1 ring-black/5">
                <Scissors className="mb-2 h-5 w-5 text-olive" />
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Délai de confection
                </div>
                <p className="text-sm font-medium">3 à 10 jours</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Selon modèle</p>
              </div>
              <div className="rounded-[min(3vw,18px)] bg-card p-5 ring-1 ring-black/5">
                <Gauge className="mb-2 h-5 w-5 text-olive" />
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Fourchette de prix
                </div>
                <p className="text-sm font-medium">
                  {formatPrice(75000)} – {formatPrice(200000)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Selon tissu et complexité
                </p>
              </div>
            </div>

            <div className="rounded-[min(3vw,18px)] border border-dashed border-border bg-muted/30 p-5">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Besoin d'aide avant ?
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                Notre équipe vous guide pour le choix du modèle, du tissu, des tailles.
              </p>
              <a
                href="tel:+221774991779"
                className="inline-flex items-center gap-2 font-display text-lg font-medium text-olive transition-colors hover:underline"
              >
                → +221 77 499 17 79
              </a>
            </div>
          </aside>

          {/* FORM — on mobile: full width; on desktop: right side */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.nom.trim() || !form.telephone.trim() || !form.type_vetement) return;
              setDone(true);
            }}
            className="space-y-7 rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 sm:space-y-8 sm:p-6 md:col-span-7 md:col-start-6 md:p-8 lg:col-span-8"
          >
            {/* 1 · COORDONNÉES */}
            <section>
              <div className="mb-5 flex items-center gap-3 border-b border-border pb-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive/15 text-xs font-bold text-olive">
                  1
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                  Vos coordonnées
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Nom <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nom}
                    onChange={update("nom")}
                    placeholder="Diallo"
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={form.prenom}
                    onChange={update("prenom")}
                    placeholder="Mamadou"
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Téléphone <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    required
                    value={form.telephone}
                    onChange={update("telephone")}
                    placeholder="77 000 00 00"
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium tracking-wider outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="vous@email.com"
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Ville / Pays
                  </label>
                  <input
                    type="text"
                    value={form.ville}
                    onChange={update("ville")}
                    placeholder="Dakar, Sénégal"
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  />
                </div>
              </div>
            </section>

            {/* 2 · PIÈCE */}
            <section>
              <div className="mb-5 flex items-center gap-3 border-b border-border pb-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive/15 text-xs font-bold text-olive">
                  2
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                  La pièce souhaitée
                </h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <Scissors className="h-3.5 w-3.5" /> Type de vêtement{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {GARMENTS.map((g) => (
                      <label
                        key={g}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl px-4 py-3 text-sm ring-1 transition-all ${
                          form.type_vetement === g
                            ? "bg-olive/5 ring-2 ring-olive shadow-sm"
                            : "ring-border hover:bg-muted/60"
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
                        <span className="leading-snug">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Inspiré d'un modèle de la collection ?
                  </label>
                  <select
                    value={form.reference_produit}
                    onChange={update("reference_produit")}
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  >
                    <option value="">Aucun — création originale</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {formatPrice(p.price)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      <Palette className="h-3.5 w-3.5" /> Tissu
                    </label>
                    <select
                      value={form.tissu}
                      onChange={update("tissu")}
                      className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                    >
                      <option value="">Choisir</option>
                      {FABRICS.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Couleur
                    </label>
                    <select
                      value={form.couleur}
                      onChange={update("couleur")}
                      className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                    >
                      <option value="">Choisir</option>
                      {COLORS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Style de broderie
                    </label>
                    <select
                      value={form.broderie}
                      onChange={update("broderie")}
                      className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                    >
                      <option value="">Choisir</option>
                      {EMBROIDERIES.map((e) => (
                        <option key={e}>{e}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      <Ruler className="h-3.5 w-3.5" /> Taille
                    </label>
                    <select
                      value={form.taille}
                      onChange={update("taille")}
                      className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                    >
                      <option value="">Choisir</option>
                      {SIZES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Quantité
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.quantite}
                      onChange={update("quantite")}
                      className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3 · DÉTAILS */}
            <section>
              <div className="mb-5 flex items-center gap-3 border-b border-border pb-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive/15 text-xs font-bold text-olive">
                  3
                </span>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                  Détails & livraison
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Budget approximatif
                  </label>
                  <select
                    value={form.budget}
                    onChange={update("budget")}
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  >
                    <option value="">Non défini</option>
                    <option>
                      {formatPrice(50000)} – {formatPrice(100000)}
                    </option>
                    <option>
                      {formatPrice(100000)} – {formatPrice(150000)}
                    </option>
                    <option>
                      {formatPrice(150000)} – {formatPrice(200000)}
                    </option>
                    <option>{formatPrice(200000)} et plus</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Délai souhaité
                  </label>
                  <select
                    value={form.delai}
                    onChange={update("delai")}
                    className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  >
                    <option value="">Non urgent</option>
                    <option>Sous 3 jours (urgent)</option>
                    <option>Sous 1 semaine</option>
                    <option>Sous 2 semaines</option>
                    <option>Pour une date précise</option>
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <Truck className="h-3.5 w-3.5" /> Mode de livraison
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["sur place", "livraison Dakar", "expédition"].map((l) => (
                      <label
                        key={l}
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-medium capitalize ring-1 transition-all min-w-[120px] ${
                          form.livraison === l
                            ? "bg-olive/5 ring-2 ring-olive shadow-sm"
                            : "ring-border hover:bg-muted/60"
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
                  <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Précisions & description
                  </label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={update("description")}
                    placeholder="Mensurations (tour de poitrine, taille, hanches, longueur), photos de référence, détails sur la coupe, événement, etc."
                    className="w-full resize-none rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium leading-relaxed outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md shadow-olive/20 transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-olive/30"
            >
              Envoyer la demande de devis
              <Check className="h-4 w-4 opacity-90" />
            </button>

            <p className="text-center text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
              Ce devis est{" "}
              <span className="font-medium text-foreground">gratuit et sans engagement</span>.
              Vous recevez une réponse personnalisée sous 24h ouvrées.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
