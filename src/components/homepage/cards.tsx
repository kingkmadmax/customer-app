"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, CardsProps } from "@/lib/type"; // Using Alias
import Card from "@/components/homepage/Card"; // Relative import is fine for files in the same folder
import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { useFavoriteStore } from "@/components/store/favorite-store";

export default function Cards({ card = [], layout = "grid", gap = "gap-6" }: CardsProps) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const { addToCart } = useCartStore();
  const setCheckoutProduct = useCheckoutStore((state) => state.setProduct);

  const containerClasses = layout === "grid" 
    ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${gap}` 
    : `flex flex-col ${gap}`;

  return (
    <div className={containerClasses}>
      {card.map((item) => (
        <Card 
          key={item.id}
          product={item}
          isFavorite={favorites.some(f => f.id === item.id)}
          onQuickView={(p) => console.log("Quick view for", p.name)}
          onFavorite={(p) => toggleFavorite(p)}
          onAddToCart={(p) => addToCart({ ...p, image: p.image[0], quantity: 1 } as any)}
          onRentNow={(p) => {
            setCheckoutProduct({ ...p, image: p.image[0] } as any);
            router.push("/Checkout/checkout");
          }}
        />
      ))}
    </div>
  );
}
