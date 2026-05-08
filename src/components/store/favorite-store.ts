import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from "@/app/data/product"

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
  image?: string[];
  deposite?: number;
  reviews?: number;
  rating?: number;
}


interface FavoriteStore {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      // Adds if missing, removes if already there
      toggleFavorite: (product) => {
        const currentFavorites = get().favorites;
        const exists = currentFavorites.some((item) => item.id === product.id);

        if (exists) {
          set({ favorites: currentFavorites.filter((item) => item.id !== product.id) });
        } else {
          set({ favorites: [...currentFavorites, product] });
        }
      },

      // Helper to check if a specific ID is liked
      isFavorite: (id) => get().favorites.some((item) => item.id === id),
    }),
    {
      name: 'user-favorites', // Saves to localStorage automatically
    }
  )
);