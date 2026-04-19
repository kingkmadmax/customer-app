"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, CardsProps } from "@/lib/type"; // Using Alias
import Card from "@/components/homepage/card"; // Relative import is fine for files in the same folder
import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { useFavoriteStore } from "@/components/store/favorite-store";

export default function Cards({ card = [], layout = "grid" }: CardsProps) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const { addToCart } = useCartStore();
  const setCheckoutProduct = useCheckoutStore((state) => state.setProduct);

  const containerClasses = layout === "grid" 
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
    : "flex flex-col gap-4";

  return (
    <div className={containerClasses}>
      {card.map((item) => (
        <Card 
          key={item.id}
          product={item}
          isFavorite={favorites.some(f => f.id === item.id)}
          onQuickView={(p) => console.log("Quick view for", p.name)}
          onFavorite={(p) => toggleFavorite(p)}
          onAddToCart={(p) => addToCart({...p, quantity: 1} as any)}
          onRentNow={(p) => {
            setCheckoutProduct(p as any);
            router.push("/Checkout/checkout");
          }}
        />
      ))}
    </div>
  );
}