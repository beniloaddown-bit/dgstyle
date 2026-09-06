import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice, products } from "@/lib/products";
import { ArrowRight } from "lucide-react";

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
  const productSlides = Array.from({ length: Math.ceil(products.length / 4) }, (_, index) =>
    products.slice(index * 4, index * 4 + 4),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-olive/5 px-3 py-1 ring-1 ring-olive/10">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
                Collection
              </span>
            </div>
            <h1 className="font-display text-3xl font-medium text-balance sm:text-4xl md:text-5xl">
              Toute la collection
            </h1>
            <p className="mt-2 max-w-[56ch] text-sm text-pretty text-muted-foreground sm:text-base">
              {products.length} pièces signature confectionnées à la main dans notre atelier de
              Dakar. Livraison partout au Sénégal.
            </p>
          </div>
          <Link
            to="/devis"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-olive hover:text-cream hover:border-olive"
          >
            Pièce sur mesure
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </header>

        <Carousel
          opts={{
            loop: true,
            align: "start",
            slidesToScroll: 1,
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="relative select-none"
        >
          <CarouselContent className="-ml-2 cursor-grab touch-pan-y active:cursor-grabbing md:-ml-4">
            {productSlides.map((slideProducts, slideIndex) => (
              <CarouselItem key={slideIndex} className="basis-full pl-2 md:pl-4">
                <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-2">
                  {slideProducts.map((product) => (
                    <Link
                      key={product.id}
                      to="/produit/$id"
                      params={{ id: product.id }}
                      className="group block"
                    >
                      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-[min(2vw,18px)] ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        {product.badge && (
                          <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-olive shadow-sm backdrop-blur">
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-olive/90 via-olive/70 to-transparent px-4 py-4 text-xs font-medium text-cream transition-transform duration-300 group-hover:translate-y-0">
                          Voir la fiche produit
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h2 className="truncate text-sm font-medium leading-snug transition-colors group-hover:text-olive">
                            {product.name}
                          </h2>
                          <p className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                            {product.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1.5 flex items-baseline justify-between">
                        <p className="text-sm font-bold tracking-tight text-foreground">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Taille {product.sizes[0]} – {product.sizes[product.sizes.length - 1]}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex md:-left-4 md:top-1/2 md:-translate-y-1/2 md:bg-background/90 md:backdrop-blur-sm" />
          <CarouselNext className="hidden md:flex md:-right-4 md:top-1/2 md:-translate-y-1/2 md:bg-background/90 md:backdrop-blur-sm" />
        </Carousel>
      </section>

      <SiteFooter />
    </div>
  );
}
