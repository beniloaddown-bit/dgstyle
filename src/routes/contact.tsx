import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DGStyle Dakar" },
      {
        name: "description",
        content:
          "Contactez DGStyle pour toute question sur nos créations. Téléphone, WhatsApp et atelier à Dakar, Sénégal.",
      },
      { property: "og:title", content: "Contact — DGStyle Dakar" },
      {
        property: "og:description",
        content: "Contactez DGStyle à Dakar. Tél. 77 499 17 79.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });
  const [done, setDone] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteNav />
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="mb-4 font-display text-3xl font-medium">Message envoyé</h1>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Merci {form.prenom || ""} ! Notre équipe vous répondra sous 24h sur le numéro {form.telephone || "indiqué"} ou par email.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/collection"
              className="inline-block bg-olive px-6 py-4 text-sm font-medium text-cream"
            >
              Découvrir la collection
            </Link>
            <Link
              to="/devis"
              className="inline-block ring-1 ring-border px-6 py-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              Demander un devis
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
          <h1 className="text-xs font-semibold uppercase tracking-widest">Nous contacter</h1>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-8 md:col-span-2">
            <h2 className="font-display text-3xl font-medium text-balance">
              Parlons de votre projet
            </h2>
            <p className="text-sm text-muted-foreground text-pretty">
              Notre équipe est à votre écoute pour toute question sur nos créations,
              les tailles, les délais de confection ou une demande spécifique.
            </p>

            <div className="space-y-6">
              <div className="rounded-[min(1vw,16px)] bg-card p-5 ring-1 ring-black/5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Téléphone & WhatsApp
                </div>
                <a
                  href="tel:+221774991779"
                  className="font-display text-xl font-medium transition-colors hover:text-olive"
                >
                  +221 77 499 17 79
                </a>
              </div>

              <div className="rounded-[min(1vw,16px)] bg-card p-5 ring-1 ring-black/5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Adresse
                </div>
                <p className="text-sm font-medium">Dakar, Sénégal</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Atelier & showroom sur rendez-vous
                </p>
              </div>

              <div className="rounded-[min(1vw,16px)] bg-card p-5 ring-1 ring-black/5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Horaires
                </div>
                <p className="text-sm font-medium">Lundi – Samedi</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  9h – 19h (Fermé le dimanche)
                </p>
              </div>
            </div>

            <Link
              to="/devis"
              className="flex items-center justify-between rounded-[min(1vw,16px)] bg-olive p-5 text-cream transition-transform active:scale-[0.98]"
            >
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-cream/70">
                  Commande sur mesure
                </div>
                <div className="font-display text-lg font-medium">Demander un devis</div>
              </div>
              <span aria-hidden>→</span>
            </Link>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.nom.trim() || !form.telephone.trim() || !form.message.trim()) return;
              setDone(true);
            }}
            className="space-y-6 rounded-[min(1vw,20px)] bg-card p-6 ring-1 ring-black/5 md:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="nom"
                  className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Nom *
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  value={form.nom}
                  onChange={update("nom")}
                  placeholder="Diallo"
                  className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="prenom"
                  className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  value={form.prenom}
                  onChange={update("prenom")}
                  placeholder="Mamadou"
                  className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="telephone"
                  className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Téléphone *
                </label>
                <input
                  id="telephone"
                  type="tel"
                  required
                  value={form.telephone}
                  onChange={update("telephone")}
                  placeholder="77 000 00 00"
                  className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium tracking-wider outline-none ring-1 ring-border focus:ring-olive"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="vous@email.com"
                  className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sujet"
                className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                Sujet
              </label>
              <select
                id="sujet"
                value={form.sujet}
                onChange={update("sujet")}
                className="w-full rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
              >
                <option value="">Choisir un sujet</option>
                <option value="information">Informations produit</option>
                <option value="taille">Questions sur les tailles</option>
                <option value="livraison">Livraison</option>
                <option value="commande">Suivi de commande</option>
                <option value="retour">Retour & échange</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                Votre message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="Décrivez votre demande, nous revenons vers vous rapidement…"
                className="w-full resize-none rounded-lg bg-muted px-4 py-3 text-sm font-medium outline-none ring-1 ring-border focus:ring-olive"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-olive px-6 py-4 text-sm font-medium text-cream transition-transform active:scale-[0.98]"
            >
              Envoyer le message
            </button>

            <p className="text-center text-[10px] text-muted-foreground">
              Champs marqués d'un (*) obligatoires. Vos données restent confidentielles.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
