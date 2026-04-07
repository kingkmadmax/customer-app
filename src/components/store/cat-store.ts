import { create } from "zustand";

/* =========================
    🛒 CART STORE (UPDATED)
========================= */

export type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  deposite: number; // 🔥 Added this
  quantity: number;
  status?: "accepted" | "pending" | "declined";
};

type CartStore = {
  cartItems: CartItem[];
  cartItemCount: number;
  message: string | null;
  showMessage: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
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
      set({ message: "Product already in cart", showMessage: true });
      setTimeout(() => set({ showMessage: false, message: null }), 2000);
      return;
    }

    const updated = [...items, item];
    set({
      cartItems: updated,
      cartItemCount: updated.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  removeFromCart: (id) => {
    const filtered = get().cartItems.filter((i) => i.id !== id);
    set({
      cartItems: filtered,
      cartItemCount: filtered.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  increaseQuantity: (id) => {
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        cartItems: updated,
        cartItemCount: updated.reduce((s, i) => s + i.quantity, 0),
      };
    });
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const updated = state.cartItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return {
        cartItems: updated,
        cartItemCount: updated.reduce((s, i) => s + i.quantity, 0),
      };
    });
  },

  clearCart: () => set({ cartItems: [], cartItemCount: 0 }),
  hideMessage: () => set({ showMessage: false, message: null }),
}));

/* =========================
    💳 CHECKOUT STORE (UPDATED)
========================= */

type RentalDates = {
  location: string;
  receiveDate: string;
  returnDate: string;
};

type CheckoutState = {
  product: {
    id: number;
    name: string;
    price: number;
    deposite: number; // 🔥 Added this
    image: string;
  } | null;
  personal: { name: string; email: string; phone: string; fid: string };
  rental: RentalDates;
  rentalDays: number;
  setProduct: (product: CheckoutState["product"]) => void;
  setPersonal: (data: CheckoutState["personal"]) => void;
  setRental: (data: RentalDates) => void;
  calculateRentalDays: () => number;
  clearCheckout: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  product: null,
  personal: { name: "", email: "", phone: "", fid: "" },
  rental: { location: "", receiveDate: "", returnDate: "" },
  rentalDays: 1,

  setProduct: (product) => set({ product }),
  setPersonal: (data) => set({ personal: data }),

  setRental: (data) => {
    const start = new Date(data.receiveDate);
    const end = new Date(data.returnDate);
    let days = 1;

    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diff = end.getTime() - start.getTime();
      days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (days <= 0) days = 1;
    }

    set({ rental: data, rentalDays: days });
  },

  calculateRentalDays: () => {
    const { receiveDate, returnDate } = get().rental;
    const start = new Date(receiveDate);
    const end = new Date(returnDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  },

  clearCheckout: () => set({
    product: null,
    personal: { name: "", email: "", phone: "", fid: "" },
    rental: { location: "", receiveDate: "", returnDate: "" },
    rentalDays: 1,
  }),
}));