export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
  description: string;
  sizes: string[];
  badge?: string;
};

export const products: Product[] = [
  {
    id: "grand-boubou-marine",
    name: "Grand Boubou Marine",
    price: 125000,
    image: "/grand-boubou-marine.jpeg",
    tagline: "Bazin riche, applique géométrique",
    description:
      "Grand boubou en bazin riche marine, orné d'une applique géométrique contemporaine cousue main. Le tombé lourd assure une prestance immédiate.",
    sizes: ["M", "L", "XL", "XXL"],
    badge: "Signature",
  },
  {
    id: "ensemble-bordeaux",
    name: "Ensemble Bordeaux",
    price: 85000,
    image: "/ensemble-bordeaux.jpeg",
    tagline: "Deux pièces, broderie col tressé",
    description:
      "Ensemble deux pièces bordeaux à coupe droite, col officier rehaussé d'une broderie tressée blanche. Une pièce de ville élégante et sobre.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "agbada-royal-beige",
    name: "Agbada Royal Beige",
    price: 150000,
    image: "/agbada-royal-beige.jpeg",
    tagline: "Coton de soie, broderie éventail",
    description:
      "Pièce maîtresse travaillée dans un coton de soie premium avec broderies artisanales ton sur ton en éventail. Trois pièces : boubou, tunique et pantalon.",
    sizes: ["M", "L", "XL"],
    badge: "Nouveauté",
  },
  {
    id: "ensemble-taupe",
    name: "Grand Boubou Taupe",
    price: 135000,
    image: "/ensemble-taupe.jpeg",
    tagline: "Lin mélangé, plastron labyrinthe",
    description:
      "Grand boubou taupe en lin mélangé, plastron brodé de motifs labyrinthe ivoire. Confort et tenue pour les grandes cérémonies.",
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "boubou-blanc",
    name: "Boubou Blanc Cérémonie",
    price: 160000,
    image: "/boubou-blanc.jpeg",
    tagline: "Blanc pur, broderie entrelacs",
    description:
      "Boubou blanc de cérémonie aux finitions taupe et broderie entrelacs sur le plastron. La pièce des grands jours.",
    sizes: ["L", "XL", "XXL"],
  },
  {
    id: "tunique-marine",
    name: "Tunique Marine Bazin",
    price: 75000,
    image: "/tunique-marine.jpeg",
    tagline: "Bazin jacquard, galon coloré",
    description:
      "Tunique en bazin jacquard marine avec galon brodé multicolore sur la patte de boutonnage. Portée avec son pantalon assorti.",
    sizes: ["S", "M", "L", "XL"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  `${value.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ")} FCFA`;
