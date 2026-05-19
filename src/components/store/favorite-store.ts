import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/type';

// If you want a narrower favorite item signature in the future,
// create a separate FavoriteProduct type here and import only the fields you need.


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