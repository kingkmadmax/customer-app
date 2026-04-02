"use client";

import { useState, useRef, useEffect } from "react";
import Cards from "./cards";

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

interface ContentProps {
  card: Product[];
}

export default function Content({ card = [] }: ContentProps) {
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

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-10 sm:pb-14">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold my-6">Featured Properties</h1>

      {/* MAIN LAYOUT: Column on mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row lg:gap-12">
        
        {/* CATEGORIES SECTION */}
        <div className="w-full lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
          {/* Mobile: Horizontal Scroll Row */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setVisibleCount(9);
                  }}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm border transition-all ${
                    filter === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Vertical Sidebar */}
          <nav className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setFilter(cat);
                      setVisibleCount(9);
                    }}
                    className={`w-full text-left text-sm py-3 px-4 border-l-4 transition-all ${
                      filter === cat
                        ? "font-bold border-l-black bg-gray-50 text-black"
                        : "text-gray-500 border-l-white hover:bg-gray-50 hover:border-l-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* PRODUCTS / CARDS AREA */}
        <div className="flex-1">
          <Cards card={filteredProducts.slice(0, visibleCount)} />
          
          {/* SHOW MORE BUTTON */}
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
      </div>
    </div>
  );
}