"use client";

import { useCartStore } from "@/components/store/cat-store";
import { ShoppingCart, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  status: string;
  image: string;
  name: string;
  price: number;
  reviews: number;
  rating: number;
  category: string;
  conditon: string;
}

interface Cards {
  card: Product[];
}

export default function Cards({ card = [] }: Cards) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [filter, setFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const filteredProducts =
    filter === "All"
      ? card
      : card.filter((product) => product.category === filter);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredProducts, visibleCount]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {filteredProducts.slice(0, visibleCount).map((product, index) => (
        <div
          key={product.id}
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
          }}
          className="bg-white w-full border border-gray-400 max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group opacity-0 translate-y-10"
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          {/* Image Wrapper */}
          <Link href={`/product/${product.id}`}>
            <div className="relative w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image[0]}
                alt={product.name}
                width={200}
                height={200}
                sizes="240px"
                quality={75}
                className="object-contain sm:p-2 lg:p-3 xl-4 p-6 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </Link>

          {/* Content */}
          <div className="p-3 flex flex-col gap-2">
            <h3 className="text-xs font-semibold line-clamp-1">
              {product.name}
            </h3>

            <p className="text-[10px] text-gray-500">
              {product.category} • {product.conditon}
            </p>

            {/* Rating */}
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
              <span className="text-[11px] text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex text-xs font-bold items-baseline">
              <span>$</span>
              {product.price.toFixed(2)}
              <span className="text-[10px] text-gray-500 ml-1">/wk</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-1">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                    status: "pending",
                  })
                }
                className="flex-1 bg-black text-white py-1 rounded-lg text-[11px] flex items-center justify-center gap-1 hover:bg-gray-800 transition"
              >
                <ShoppingCart className="h-3 w-3" />
                Add
              </button>
              <button className="flex-1 bg-green-600 text-white py-1 rounded-lg text-[11px] hover:bg-green-700 transition">
                Rent
              </button>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .animate-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}