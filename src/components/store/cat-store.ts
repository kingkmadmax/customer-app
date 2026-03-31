import { create } from "zustand";



export type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  status?: "accepted" | "pending" | "declined";   // ← Add this line
};

type CartStore = {
  cartItems: CartItem[];
  cartItemCount: number;

  message: string | null;
  showMessage: boolean;

  increaseQuantity: (id: number) => void;   // ← add
  decreaseQuantity: (id: number) => void;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  hideMessage: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  cartItemCount: 0,

  message: null,
  showMessage: false,

  addToCart: (item) => {
    const items = get().cartItems;

    const existing = items.find((i) => i.id === item.id);

    if (existing) {
      set({
        message: "Product already added to cart",
        showMessage: true,
      });

      setTimeout(() => {
        set({ showMessage: false, message: null });
      }, 2000);

      return;
    }

    const updatedItems = [...items, item];

    set({
      cartItems: updatedItems,
      cartItemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  removeFromCart: (id) => {
    const filtered = get().cartItems.filter((i) => i.id !== id);

    set({
      cartItems: filtered,
      cartItemCount: filtered.reduce((sum, i) => sum + i.quantity, 0),
    });
  },
  increaseQuantity: (id: number) => {
  set((state) => {
    const updatedItems = state.cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    return {
      cartItems: updatedItems,
      cartItemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
    };
  });
},

decreaseQuantity: (id: number) => {
  set((state) => {
    const updatedItems = state.cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // optional: remove if quantity reaches 0

    return {
      cartItems: updatedItems,
      cartItemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
    };
  });
},

  clearCart: () => set({ cartItems: [], cartItemCount: 0 }),

  hideMessage: () => set({ showMessage: false, message: null }),
}));