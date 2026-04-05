import { create } from "zustand";

/* =========================
   🛒 CART STORE
========================= */

export type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
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

  /* 🔥 ADD TO CART */
  addToCart: (item) => {
    const items = get().cartItems;

    const existing = items.find((i) => i.id === item.id);

    if (existing) {
      set({
        message: "Product already in cart",
        showMessage: true,
      });

      setTimeout(() => {
        set({ showMessage: false, message: null });
      }, 2000);

      return;
    }

    const updated = [...items, item];

    set({
      cartItems: updated,
      cartItemCount: updated.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  /* 🗑 REMOVE */
  removeFromCart: (id) => {
    const filtered = get().cartItems.filter((i) => i.id !== id);

    set({
      cartItems: filtered,
      cartItemCount: filtered.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  /* ➕ INCREASE */
  increaseQuantity: (id) => {
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        cartItems: updated,
        cartItemCount: updated.reduce((s, i) => s + i.quantity, 0),
      };
    });
  },

  /* ➖ DECREASE */
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

  /* 🧹 CLEAR CART */
  clearCart: () =>
    set({
      cartItems: [],
      cartItemCount: 0,
    }),

  hideMessage: () =>
    set({
      showMessage: false,
      message: null,
    }),
}));

/* =========================
   💳 CHECKOUT STORE
========================= */

type CheckoutState = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  } | null;

  personal: {
    name: string;
    email: string;
    phone: string;
    fid: string;
  };

  rental: {
    location: string;
    receiveDate: string;
    returnDate: string;
  };

  setProduct: (product: CheckoutState["product"]) => void;
  setPersonal: (data: CheckoutState["personal"]) => void;
  setRental: (data: CheckoutState["rental"]) => void;

  /* 🔥 ADD THIS (VERY IMPORTANT) */
  clearCheckout: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  product: null,

  personal: {
    name: "",
    email: "",
    phone: "",
    fid: "",
  },

  rental: {
    location: "",
    receiveDate: "",
    returnDate: "",
  },

  setProduct: (product) => set({ product }),

  setPersonal: (data) => set({ personal: data }),
  setRental: (data) => set({ rental: data }),

  /* 🧹 RESET EVERYTHING AFTER PAYMENT */
  clearCheckout: () =>
    set({
      product: null,
      personal: {
        name: "",
        email: "",
        phone: "",
        fid: "",
      },
      rental: {
        location: "",
        receiveDate: "",
        returnDate: "",
      },
    }),
}));