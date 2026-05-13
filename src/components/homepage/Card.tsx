"use client";

import { ShoppingCart, Star, X, Plus, Heart, Eye, Loader2, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/type";
import { useCartStore, CartItem, useCheckoutStore } from "@/components/store/cat-store"; 
import { useRouter } from "next/navigation";

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

  // Get the addToCart action from your Zustand store
  const addToCart = useCartStore((state) => state.addToCart);
  const setProduct =useCheckoutStore((state) => state.setProduct);

  const router = useRouter();
  const handleAddToCart = () => {
    setStatus("loading");

    // Construct the item based on your CartItem type in cat-store
    const itemToStore: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      // Matching your store's spelling "deposite"
      deposite: product.deposit || 0, 
      image: Array.isArray(product.image) ? product.image[0] : (product.image || ""),
      quantity: 1,
      status: "pending",
    };

    // This updates state AND localStorage automatically via Zustand Persist
    addToCart(itemToStore);

    // Provide instant UI feedback
    setStatus("success");
    
    setTimeout(() => {
      setStatus("idle");
    }, 1500);
  };
 const handleAddToChackout = () => {
  setStatus("loading");

  // 1. Prepare the data object
  const itemToCheckout = {
    id: product.id,
    name: product.name,
    price: product.price,
    deposite: product.deposit || 0, // Spelling matches your store
    image: Array.isArray(product.image) ? product.image[0] : (product.image || ""),
  };

  // 2. CALL the store function (this was the missing part!)
  // We use the 'setProduct' function we got from useCheckoutStore at the top
  setProduct(itemToCheckout);

  // 3. Provide UI feedback and Navigate
  setStatus("success");
  
  // Move to checkout page
  router.push("/Checkout/checkout");

  setTimeout(() => {
    setStatus("idle");
  }, 1500);
};
  return (
    <div className="w-full max-w-[250px] h-[350px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative flex flex-col mx-auto">
      
      {/* IMAGE SECTION */}
      <div className="relative h-44 w-full bg-gray-50 overflow-hidden">
        <Link href={`/product/${product.id}`} className="w-full h-full block">
          {product.image ? (
            <Image
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </Link>

        {/* HOVER ACTIONS */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
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

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 h-10 leading-tight">
            {product.name}
          </h3>

          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {product.category} • {product.condition || "Professional"}
          </p>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
              />
            ))}
            <span className="text-[10px] text-gray-400">({product.reviews || 0})</span>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-2">
          <div className="flex items-baseline mb-3">
            <span className="text-lg font-bold text-black tracking-tighter">
              {product.price?.toLocaleString() || "0"}
            </span>
            <span className="text-[10px] text-gray-500 font-medium ml-1 uppercase">ETB / Day</span>
          </div>

          <div className="relative flex items-center justify-start w-full h-10 overflow-hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`mr-2 z-20 flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full shadow-sm transition-all duration-300 ${
                isOpen ? "bg-gray-200 text-black" : "bg-blue-600 text-white"
              }`}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <div
              className={`flex gap-1.5 transition-all duration-500 ease-out transform ${
                isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={handleAddToCart}
                disabled={status !== "idle"}
                className={`whitespace-nowrap px-3 h-8 rounded-lg text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 transition-all ${
                    status === "success" ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {status === "loading" ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : status === "success" ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <ShoppingCart className="w-3 h-3" />
                )}
                {status === "loading" ? "Adding" : status === "success" ? "Added" : "Add"}
              </button>

              <button
                 onClick={handleAddToChackout}

                className="whitespace-nowrap px-3 h-8 bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase hover:bg-blue-700 transition-colors"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}