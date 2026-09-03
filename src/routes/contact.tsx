import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { ArrowLeft, Clock, Check, MapPin, MessageCircle, Phone, FileText } from "lucide-react";

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
              Message envoyé
            </h1>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
              Merci {form.prenom ? `${form.prenom} ` : ""}! Notre équipe vous répondra sous 24h
              sur le numéro{" "}
              <span className="font-semibold text-foreground">
                {form.telephone || "indiqué"}
              </span>{" "}
              ou par email.
            </p>
            <div className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/collection"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md sm:w-auto"
              >
                Découvrir la collection
              </Link>
              <Link
                to="/devis"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-4 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
              >
                <FileText className="h-4 w-4" /> Demander un devis
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
          <MessageCircle className="h-3.5 w-3.5 text-olive" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
            Nous contacter
          </span>
        </div>
        <h1 className="mb-2 font-display text-3xl font-medium text-balance sm:text-4xl md:text-5xl">
          Parlons de votre projet
        </h1>
        <p className="mb-10 max-w-[56ch] text-sm text-pretty text-muted-foreground sm:text-base md:mb-14">
          Notre équipe est à votre écoute pour toute question sur nos créations,
          les tailles, les délais de confection ou une demande spécifique.
        </p>

        <div className="grid gap-8 md:grid-cols-5 md:gap-10">
          {/* CONTACT INFO */}
          <div className="space-y-5 md:col-span-2 md:space-y-6">
            <a
              href="tel:+221774991779"
              className="group block rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-olive/10 text-olive transition-colors group-hover:bg-olive group-hover:text-cream">
                <Phone className="h-5 w-5" />
              </div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Téléphone & WhatsApp
              </div>
              <div className="font-display text-xl font-medium transition-colors group-hover:text-olive sm:text-2xl">
                +221 77 499 17 79
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Réponse rapide sous 1h (jour ouvrés)
              </p>
            </a>

            <div className="rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 sm:p-6">
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-lime/20 text-olive">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Adresse
              </div>
              <p className="text-sm font-semibold sm:text-base">Dakar, Sénégal</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-[13px]">
                Atelier & showroom · Sur rendez-vous uniquement
              </p>
            </div>

            <div className="rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 sm:p-6">
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-muted text-olive">
                <Clock className="h-5 w-5" />
              </div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Horaires
              </div>
              <div className="grid grid-cols-[auto,1fr] items-baseline gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold">Lun – Sam</span>
                <span className="text-muted-foreground">9h – 19h</span>
                <span className="font-semibold">Dimanche</span>
                <span className="text-muted-foreground">Fermé</span>
              </div>
            </div>

            <Link
              to="/devis"
              className="group flex items-center justify-between rounded-[min(3vw,20px)] bg-olive p-5 text-cream shadow-md transition-all active:scale-[0.99] hover:shadow-lg sm:p-6"
            >
              <div>
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/70">
                  Commande sur mesure
                </div>
                <div className="font-display text-lg font-medium sm:text-xl">
                  Demander un devis gratuit
                </div>
                <p className="mt-1 text-xs text-cream/70 sm:text-[13px]">
                  Réponse sous 24h ouvrées
                </p>
              </div>
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-full bg-cream/15 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.nom.trim() || !form.telephone.trim() || !form.message.trim()) return;
              setDone(true);
            }}
            className="space-y-5 rounded-[min(3vw,20px)] bg-card p-5 ring-1 ring-black/5 sm:space-y-6 sm:p-6 md:col-span-3 md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="nom"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Nom <span className="text-destructive">*</span>
                </label>
                <input
                  id="nom"
                  type="text"
                  required
                  value={form.nom}
                  onChange={update("nom")}
                  placeholder="Diallo"
                  className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="prenom"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  value={form.prenom}
                  onChange={update("prenom")}
                  placeholder="Mamadou"
                  className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="telephone"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Téléphone <span className="text-destructive">*</span>
                </label>
                <input
                  id="telephone"
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
                <label
                  htmlFor="email"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="vous@email.com"
                  className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sujet"
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Sujet
              </label>
              <select
                id="sujet"
                value={form.sujet}
                onChange={update("sujet")}
                className="w-full rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
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
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                Votre message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={update("message")}
                placeholder="Décrivez votre demande, nous revenons vers vous rapidement…"
                className="w-full resize-none rounded-xl bg-muted/60 px-4 py-3 text-sm font-medium leading-relaxed outline-none ring-1 ring-border transition-colors focus:bg-background focus:ring-2 focus:ring-olive sm:text-[15px]"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-4 text-sm font-semibold text-cream shadow-md shadow-olive/20 transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-olive/30"
            >
              Envoyer le message
              <Check className="h-4 w-4 opacity-90" />
            </button>

            <p className="text-center text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
              Champs marqués d'un (*) obligatoires. Vos données restent
              confidentielles et ne sont jamais partagées.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
