"use client";

import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useAuthStore } from "@/components/store/cat-store"; // Only for the token

interface CartButtonProps {
  productId: number;
  productName: string;
  price: number;
  image: string;
}

export default function CartButton({ productId, productName, price, image }: CartButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const token = useAuthStore((state) => state.token);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("http://localhost:9090/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          name: productName,
          price: price,
          image: image,
          quantity: 1,
        }),
      });

      if (response.ok) {
        setStatus("success");
        // Reset button after 2 seconds
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
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