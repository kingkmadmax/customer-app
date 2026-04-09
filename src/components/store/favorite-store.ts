import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from "@/app/data/product"

export interface Product {
  id: number;
  status: string;
  image: string[];
  name: string;
  price: number;
  deposite: number;
  reviews: number;
  rating: number;
  category: string;
  conditon: string;
  details?: {
    description: string;
    features: string;
    package: string;
    warranty: string;
  };
  specifications?: Array<{ label: string; value: string }>;
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