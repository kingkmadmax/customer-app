export interface Specification {
  label: string;
  value: string;
}

export interface Product {
 id: number;
  name: string;
  price: number;
  category: string;
  condition: string;        // Note: "conditon" typo in your card
  location?: string;
  deposit?: number;
  description?: string;
  image: string[];          // Important: your card expects array
  rating?: number;
  reviews?: number;
  ownerId?: string;
}

export interface CardsProps {
  card: Product[];
  layout?: "grid" | "flex";
  gap?: string;
}