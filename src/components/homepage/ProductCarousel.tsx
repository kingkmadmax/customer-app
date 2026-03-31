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

export default function Content({ card = [] }: Cards) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [filter, setFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const filteredProducts =
    filter === "All"
      ? card
      : card.filter((product) => product.category === filter);

  const categories = ["All", "Condition", "Houses", "Vehicles", "Electronics"];

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
    <div className="flex flex-col space-y-10 px-4 sm:px-6 md:px-8 pb-10 sm:pb-14">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg sm:text-2xl font-bold">Featured Properties</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 sm:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`hover:underline ${
                filter === cat ? "font-bold text-black" : ""
              }`}
              onClick={() => {
                setFilter(cat);
                setVisibleCount(9);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {filteredProducts.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            /* CHANGED: Adjusted max-width to 240px and kept mx-auto for centering */
            className="bg-white w-full border border-gray-200 max-w-[240px] mx-auto rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group opacity-0 translate-y-10"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {/* Image Wrapper */}
            <Link href={`/product/${product.id}`}>
              {/* CHANGED: Reduced height to h-40 and added padding/bg to make it look "centered" */}
              <div className="relative w-60 h-50 bg-gray-50 flex ml-2 items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  height={"400"}
                  width={"400"}
                  /* CHANGED: sizes set to 240px since that's our max card width now */
                  sizes="340px"
                  quality={95}
                  /* CHANGED: Using object-contain ensures the whole image is visible and centered if it's small */
                  className="object-contain p-2 group-hover:scale-180 transition-transform duration-500"
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
                <span>$</span>{product.price.toFixed(2)}
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
          status: "pending",        // Explicitly set as pending
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
      </div>

      {/* Show More */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center pt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition"
          >
            Show More
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}