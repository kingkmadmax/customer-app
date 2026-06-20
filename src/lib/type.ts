export interface Specification {
  label: string;
  value: string;
}
interface ReviewFromBackend {
  id: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export interface Product {
  id: number;
  ownerId?: string;
  name: string;
  price: number;
  category?: string;
  location?: string;
  condition: string;
  deposit: number;
  description?: string;
  imageUrl?: string;
  Situation:string;
  status?: string;
  image: string[];
  deposite?: number;
  reviews?: ReviewFromBackend[];
  averageRating?: number;   
  rating?: number;
  ownerName: string;
  
}
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string[];     
 deposit: number;   
  category: string;  
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
  image: string; 
  
  productId: number;
  productName: string;
  quantity: number;
  price: number;
 deposite: number;
  totalPrice: number;
  
  location: string;
  rentalStartDate: string;
  receiveDate: string; 
  returnDate: string;
  bookingDate: string; 
  
  status: string;
}
