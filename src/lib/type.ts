export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  deposite: number;
  conditon: string; 
  location: string;
  dateAdded: string;
  price: number;
  rating: number;
  reviews: number;
  status: string;
  image: string[];
  details: {
    description: string;
    features: string;
    package: string;
    warranty: string;
  };
  specifications: Specification[];
}

export interface CardsProps {
  card: Product[];
  layout?: "grid" | "flex";
}