import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/* =========================
    🔐 AUTH STORE
   ========================= */
interface AuthState {
  userId: number | null;
  token: string | null;
  cartCount: number; // Add this
  setCartCount: (count: number) => void;
  setSession: (id: number, token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      cartCount: 0,
      setCartCount: (count) => set({ cartCount: count }),
      setSession: (id, token) => set({ userId: id, token: token }),
      clearSession: () => {
        set({ userId: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // saves to localStorage
    }
  )
);

/* =========================
    🛒 CART STORE
   ========================= */
export type CartItem = {
  id: number;
  image: string | string[];
  name: string;
  price: number;
  deposite: number;
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
  loadCart: () => Promise<void>;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartItemCount: 0,
      message: null,
      showMessage: false,

addToCart: (item: CartItem) => {
  const items = get().cartItems;
  const existing = items.find((i) => i.id === item.id);

  if (existing) {
    set({ 
      message: "Product already in cart", 
      showMessage: true 
    });
  } else {
    const updated = [...items, item];
    set({
      cartItems: updated,
      cartItemCount: updated.reduce((sum, i) => sum + i.quantity, 0),
      message: "Added to cart",
      showMessage: true,
    });
  }

  // Auto-hide the message after 2 seconds
  setTimeout(() => set({ showMessage: false, message: null }), 2000);
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

      loadCart: async () => {
        const token = useAuthStore.getState().token;
        const userId = useAuthStore.getState().userId;

        if (!token || !userId) return;

        try {
          const res = await fetch(`http://localhost:9090/api/cart?userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("Failed to load cart");

          const data = await res.json();
          const backendItems: any[] = Array.isArray(data) ? data : [];

          // Transform backend items to store format
          const storeItems: CartItem[] = backendItems.map(item => ({
            id: item.productId, // Use productId as id for store
            image: item.image, // Backend has string
            name: item.name,
            price: item.price,
            deposite: 0, // Backend might not have this, set default
            quantity: item.quantity,
          }));

          set({
            cartItems: storeItems,
            cartItemCount: storeItems.reduce((sum, i) => sum + i.quantity, 0),
          });
        } catch (err) {
          console.error("Failed to load cart", err);
        }
      },
    }),
    { name: 'cart-storage' }
  )
);

/* =========================
    💳 CHECKOUT STORE
   ========================= */
type RentalDates = {
  location: string;
  receiveDate: string;
  returnDate: string;
};

type BiometricData = {
  faceImage: string | null;
  idImage: string | null;
};

type CheckoutState = {
  product: {
    id: number;
    name: string;
    price: number;
    deposite: number;
    image: string | string[];
  } | null;
  personal: { name: string; email: string; phone: string; fid: string };
  rental: RentalDates;
  biometric: BiometricData;
  rentalDays: number;
  setProduct: (product: CheckoutState["product"]) => void;
  setPersonal: (data: CheckoutState["personal"]) => void;
  setRental: (data: RentalDates) => void;
  setBiometric: (data: BiometricData) => void;
  clearCheckout: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      product: null,
      personal: { name: "", email: "", phone: "", fid: "" },
      rental: { location: "", receiveDate: "", returnDate: "" },
      biometric: { faceImage: null, idImage: null },
      rentalDays: 1,

      setProduct: (product) => set({ product }),
      setPersonal: (data) => set({ personal: data }),
      setBiometric: (data) => set({ biometric: data }),

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

      clearCheckout: () => set({
        product: null,
        personal: { name: "", email: "", phone: "", fid: "" },
        rental: { location: "", receiveDate: "", returnDate: "" },
        biometric: { faceImage: null, idImage: null },
        rentalDays: 1,
      }),
    }),
    { name: 'checkout-storage' }
  )
);

/* =========================
    ⭐ REVIEW STORE
   ========================= */
export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

type ReviewStore = {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  resetReviews: () => void;
};

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],

  addReview: (newReviewData) =>
    set((state) => {
      const review: Review = {
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        ...newReviewData,
      };

      return {
        reviews: [review, ...state.reviews],
      };
    }),

  resetReviews: () => set({ reviews: [] }),
}));