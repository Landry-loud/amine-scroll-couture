import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";
import c5 from "@/assets/c5.jpg";
import c6 from "@/assets/c6.jpg";
import c7 from "@/assets/c7.jpg";
import c8 from "@/assets/c8.jpg";
import c9 from "@/assets/c9.jpg";
import c10 from "@/assets/c10.jpg";
import c11 from "@/assets/c11.jpg";
import c12 from "@/assets/c12.jpg";

export type Category = "Manteaux" | "Hauts" | "Pantalons" | "Maille" | "Accessoires" | "Chaussures";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // DA
  image: string;
  material: string;
  isNew?: boolean;
}

export const categories: Category[] = [
  "Manteaux",
  "Hauts",
  "Pantalons",
  "Maille",
  "Accessoires",
  "Chaussures",
];

export const catalogue: Product[] = [
  { id: "01", name: "Trench Classique", category: "Manteaux", price: 48000, image: c1, material: "Coton gabardine", isNew: true },
  { id: "02", name: "Blazer Noir Tailoring", category: "Manteaux", price: 39500, image: c2, material: "Laine vierge" },
  { id: "03", name: "Pull Cachemire Crème", category: "Maille", price: 32000, image: c3, material: "100% cachemire" },
  { id: "04", name: "Pantalon Plissé Camel", category: "Pantalons", price: 19800, image: c4, material: "Laine froide" },
  { id: "05", name: "Chemise Soie Ivoire", category: "Hauts", price: 22500, image: c5, material: "Soie lavée", isNew: true },
  { id: "06", name: "Mocassins Bordeaux", category: "Chaussures", price: 36000, image: c6, material: "Cuir pleine fleur" },
  { id: "07", name: "Robe Pull Marine", category: "Maille", price: 28500, image: c7, material: "Mérinos extra-fin" },
  { id: "08", name: "Jean Brut Selvedge", category: "Pantalons", price: 21000, image: c8, material: "Denim japonais 14oz" },
  { id: "09", name: "Sac Cuir Cognac", category: "Accessoires", price: 34500, image: c9, material: "Cuir végétal", isNew: true },
  { id: "10", name: "Marinière Heritage", category: "Hauts", price: 11900, image: c10, material: "Coton biologique" },
  { id: "11", name: "Manteau Oversize Camel", category: "Manteaux", price: 56000, image: c11, material: "Laine alpaga" },
  { id: "12", name: "Foulard Soie Sable", category: "Accessoires", price: 9800, image: c12, material: "Twill de soie" },
];

export const formatPrice = (price: number) =>
  `${price.toLocaleString("fr-FR").replace(/,/g, " ")} DA`;
