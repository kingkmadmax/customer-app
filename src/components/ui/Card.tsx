"use client";

import { ShoppingCart, Star, X, Plus, Heart, Eye, Loader2, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/type";
import { useCartStore, CartItem, useCheckoutStore } from "@/components/store/cat-store"; 
import { useRouter } from "next/navigation";
import getStatusColor from "@/components/ui/getStatusColor";

interface SingleCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onFavorite: (product: Product) => void;
  onRentNow: (product: Product) => void;
  isFavorite: boolean;
}

export default function Card({
  product,
  onQuickView,
  onFavorite,
  onRentNow,
  isFavorite,
}: SingleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const addToCart = useCartStore((state) => state.addToCart);
  const setProduct = useCheckoutStore((state) => state.setProduct);
  const router = useRouter();

  // Safely fallback to handle single-string images or array types securely
  const displayImage = product.imageUrl || (Array.isArray(product.image) ? product.image[0] : product.image) || "";


  const handleAddToCart = () => {
    setStatus("loading");

    const itemToStore: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      deposite: product.deposit, 
      image: Array.isArray(product.image) ? product.image[0] : displayImage,
      quantity: 1,
      status: "pending",
    };

    // Assuming store accepts matching attributes or wrapper maps
    addToCart(itemToStore as any);
    setStatus("success");
    
    setTimeout(() => {
      setStatus("idle");
    }, 1500);
  };

  const handleAddToChackout = () => {
    setStatus("loading");

    const itemToCheckout = {
      id: product.id,
      name: product.name,
      price: product.price,
      deposite: product.deposit,
      image: displayImage,
    };

    setProduct(itemToCheckout);
    setStatus("success");
    onRentNow(product);
    
    router.push("/Checkout/checkout");

    setTimeout(() => {
      setStatus("idle");
    }, 1500);
  };

  return (
    <div className="w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative flex flex-col">
      
      {/* IMAGE SECTION */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-gray-50 overflow-hidden">
        <Link href={`/product/${product.id}`} className="w-full h-full block">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </Link>

        {/* Status Badge */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-white rounded-full px-2 py-0.5 shadow-sm">
          <span className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(product.Situation || "Available")}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
            {product.Situation || "Available"}
          </span>
        </div>

        {/* Rating Overlay */}
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-md rounded-lg px-2.5 py-1 text-white shadow">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">
            {product.averageRating ? product.averageRating.toFixed(1) : "0.0"}
          </span>
        </div>

        {/* Hover Actions */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onFavorite(product)}
            className="bg-white p-2 rounded-full shadow-lg transition-colors"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-base text-black line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
        </div>

        {/* Price & Rent Button Area */}
        <div className="mt-3">
          <div className="flex items-baseline mb-3">
            <span className="text-2xl font-bold text-black">
              {product.price?.toLocaleString() || "0"}
            </span>
            <span className="text-xs text-gray-500 ml-1">ETB / Day</span>
          </div>

          <div className="flex gap-2">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={status === "loading"}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-medium transition-all"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === "success" ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              <span>Cart</span>
            </button>

            {/* Rent Now Button - Main Renting Action */}
            <button
              onClick={handleAddToChackout}
              disabled={status === "loading"}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-all"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}