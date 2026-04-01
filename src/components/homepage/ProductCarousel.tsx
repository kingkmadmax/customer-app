"use client";

import { useCartStore } from "@/components/store/cat-store";
import { ShoppingCart, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cards from "./cards";
import { div } from "framer-motion/client";

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
     <div className="px-4 sm:px-6 md:px-8 pb-10 sm:pb-14">

    {/* HEADER */}
    <h1 className="text-lg sm:text-2xl font-bold mb-6">
      Featured Properties
    </h1>

    {/* MAIN HORIZONTAL LAYOUT */}
{/* MAIN CONTENT AREA */}
<div className="flex  lg:flex-row gap-10 lg:gap-12">

  {/* FILTER */}
  <div className="w-80 lg:w-80 flex-shrink-0">
    <div className="">
      <nav className="bg-white rounded-2xl shadow-sm p-6">
       

        <ul className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">
          Categories
        </h3>
          {categories.map((cat) => (
            <li key={cat}>
              <button
  onClick={() => {
    setFilter(cat);
    setVisibleCount(9);
  }}
className={`w-full text-left text-sm py-3 px-4 border-l-4 transition-all duration-100 ${
  filter === cat
    ? "font-bold border-l-black bg-gray-50 text-black"
    : "text-gray-500 border-l-whitec hover:bg-gray-50 hover:border-l-gray-300"
}`}
>
  {cat}
</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>

  {/* PRODUCTS / CARDS */}
  <div className="flex-1">
    <Cards card={filteredProducts.slice(0, visibleCount)} />
  </div>
</div>

    {/* SHOW MORE */}
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

  </div>
  );
}