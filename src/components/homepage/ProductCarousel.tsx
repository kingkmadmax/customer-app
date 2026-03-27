"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  conditon: string;
}

interface Cards {
  card: Product[];
}

export default function Content({ card = [] }: Cards) {
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

  // Hook to animate each card
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

    cardRefs.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProducts, visibleCount]);

  return (
    <div className="flex flex-col space-y-10">
      {/* Header & Filter */}
      <div className="flex justify-between items-center">
        <h1 className="text-sm sm:text-2xl text-black font-bold mb-4">Featured Properties</h1>
        <div className="flex gap-5 text-sm text-gray-600 items-start relative">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`hover:underline ${filter === cat ? "font-bold text-black" : ""}`}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {filteredProducts.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="relative w-full bg-white rounded-3xl overflow-hidden shadow-lg opacity-0 translate-y-10 transition-all duration-700"
            style={{ transitionDelay: `${index * 100}ms` }}
          ><Link href={`/product//${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover w-full h-48 transition-transform duration-700 hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={75}
            />
            </Link>
            <div className="flex items-center justify-between p-3 text-sm">
              <p className="font-bold text-base">{product.name}</p>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < product.rating ? "★" : "☆"}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center pt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-[#B30D0D] text-white font-bold rounded-xl hover:bg-red-700 transition"
          >
            Show More
          </button>
        </div>
      )}

      {/* Tailwind Animation */}
      <style jsx>{`
        .animate-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}