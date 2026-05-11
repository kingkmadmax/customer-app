"use client";

import React, { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCartStore } from "@/components/store/cat-store";

interface CartButtonProps {
  productId: number;
  productName: string;
  price: number;
  image: string;
  deposite?: number;
}

export default function CartButton({ productId, productName, price, image, deposite = 0 }: CartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { addToCart, message, showMessage } = useCartStore();

  // Listen to message changes to update button status
  React.useEffect(() => {
    if (showMessage && message) {
      if (message === "Added to cart") {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2000);
      }
    }
  }, [showMessage, message]);

  const handleAddToCart = () => {
    setStatus("loading");
    
    const cartItem = {
      id: productId,
      name: productName,
      price: price,
      deposite: deposite,
      image: image,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={status === "loading" || status === "success"}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-300 ${
        status === "success" 
          ? "bg-green-500 text-white" 
          : status === "error" 
          ? "bg-red-500 text-white" 
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
      {status === "success" && <Check className="w-4 h-4" />}
      {status === "idle" && <ShoppingCart className="w-4 h-4" />}
      
      {status === "loading" ? "Adding..." : status === "success" ? "Added!" : status === "error" ? "Failed" : "Add to Cart"}
    </button>
  );
}