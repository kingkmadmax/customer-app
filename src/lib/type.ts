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
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string[];      // Based on our previous fix, this is now a string
  quantity: number;
  deposit?: number;   // Add this line (the '?' means it's optional)
  category?: string;  // Optional: add other fields you might need
}
  


export interface CardsProps {
  card: Product[];
  layout?: "grid" | "flex";
  gap?: string;
}
 export interface Booking {
  id: number;
  userId: string;
  email: string;
  name: string;
  phone: string;
  fid: string;
  
  faceImage: string;
  idImage: string;
  image: string; // Product image
  
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  deposit: number;
  totalPrice: number;
  
  location: string;
  rentalStartDate: string;
  receiveDate: string; // Will come as YYYY-MM-DD
  returnDate: string;
  bookingDate: string; // Will come as ISO Timestamp
  
  status: string;
}