"use client";

import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { useFavoriteStore } from "@/components/store/favorite-store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/homepage/Card"; // Import the single card
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/types"; 

// ... (Interface ContentProps)

export default function Cards({ card = [], layout = "grid" }: CardsProps) {
  const router = useRouter();
  const { cartItems, addToCart, increaseQuantity } = useCartStore();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const setProduct = useCheckoutStore((state) => state.setProduct);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const containerClasses = layout === "grid" 
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7" 
    : "flex flex-col gap-4";

  return (
    <div className="w-full">
      <div className={containerClasses}>
        {card.map((product) => (
          <Card 
            key={product.id}
            product={product}
            isFavorite={favorites.some(f => f.id === product.id)}
            onQuickView={(p) => { setSelectedProduct(p); setCurrentImageIndex(0); }}
            onFavorite={(p) => toggleFavorite(p)}
            onAddToCart={(p) => {
                const exists = cartItems.find((item) => item.id === p.id);
                exists ? increaseQuantity(p.id) : addToCart({...p, image: p.image[0], quantity: 1, status: "pending"});
            }}
            onRentNow={(p) => {
                setProduct({...p, image: p.image[0]});
                router.push("/Checkout/checkout");
            }}
          />
        ))}
      </div>

      {/* QUICK VIEW MODAL CODE STAYS HERE... */}
    </div>
  );
}