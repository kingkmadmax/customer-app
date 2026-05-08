export interface Specification {
  label: string;
  value: string;
}

export interface Product {

  id: number;
  ownerId?: string;
  name: string;
  price: number;
  category?: string;
  location?: string;
  condition?: string;
  deposit?: number;
  description?: string;
  imageUrl?: string;
  
  // Keep these for compatibility with your stores and old code
  status?: string;
  image: string[];
  deposite?: number;
  reviews?: number;
  rating?: number;
}
  
export interface CartItem {
  id: number;        // This is the 'cartItemId' from your Controller
  productId: number; // The actual product ID
  userId: string;
  name: string;
  price: number;
  image: string;     // Your controller uses 'image' (singular string)
  quantity: number;
}

export interface CardsProps {
  card: Product[];
  layout?: "grid" | "flex";
  gap?: string;
}