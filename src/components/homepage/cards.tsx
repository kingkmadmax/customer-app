"use client";

import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { ShoppingCart, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Product {
  id: number;
  status: string;
  image: string[];
  name: string;
  price: number;
  reviews: number;
  rating: number;
  category: string;
  conditon: string;
}

interface CardsProps {
  card: Product[];
}

export default function Cards({ card = [] }: CardsProps) {
  const router = useRouter();

  const setProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();

  /* =========================
     🚀 RENT NOW
     - Save product to checkout state
     - Do not add to cart
  ========================= */
  const handleRentNow = (product: Product) => {
    setProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image[0],
    });

    router.push("/Checkout/checkout");
  };

  /* =========================
     🛒 ADD TO CART (FIXED)
     - if exists → increase qty
     - else → add new
  ========================= */
  const handleAddToCart = (product: Product) => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      increaseQuantity(product.id);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image[0],
      price: product.price,
      quantity: 1,
      status: "pending",
    });
  };

  const [visibleCount, setVisibleCount] = useState<number>(9);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-show");
          observer.unobserve(entry.target);
        }
      });
    });

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [card, visibleCount]);

  return (
    <div>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {card.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="bg-white w-full border border-gray-300 max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group opacity-0 translate-y-10"
          >
            {/* IMAGE */}
            <Link href={`/product/${product.id}`}>
              <div className="relative w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* CONTENT */}
            <div className="p-3 flex flex-col gap-2">
              <h3 className="text-xs font-semibold line-clamp-1">
                {product.name}
              </h3>

              <p className="text-[10px] text-gray-500">
                {product.category} • {product.conditon}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-gray-500">
                  ({product.reviews})
                </span>
              </div>

              {/* PRICE */}
              <div className="flex text-xs font-bold items-baseline">
                <span>$</span>
                {product.price.toFixed(2)}
                <span className="text-[10px] text-gray-500 ml-1">
                  /week
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-1">

                {/* ADD TO CART (FIXED LOGIC) */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-black text-white py-1 rounded-lg text-[11px] flex items-center justify-center gap-1 hover:bg-gray-800 transition"
                >
                  <ShoppingCart className="h-3 w-3" />
                  Add
                </button>

                {/* RENT NOW */}
                <button
                  onClick={() => handleRentNow(product)}
                  className="flex-1 bg-green-600 text-white py-1 rounded-lg text-[11px] hover:bg-green-700 transition"
                >
                  Rent
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE */}
      {visibleCount < card.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
          >
            Show More
          </button>
        </div>
      )}

      {/* ANIMATION */}
      <style jsx>{`
        .animate-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}