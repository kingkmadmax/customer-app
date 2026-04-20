"use client";

import { useState, useEffect } from "react";
import Cards from "@/components/homepage/cards";
import Best from "./BestSection";
import { Product } from "@/lib/type"; 
import MoreSection from "@/components/homepage/MareSection"

interface ContentProps {
  card: Product[];
}

export default function Content({ card = [] }: ContentProps) {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo({ top: 1500, behavior: "smooth" });
  }, [currentPage]);

  const filteredProducts =
    filter === "All"
      ? card
      : card.filter((product) => product.category === filter);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const categories = ["All", "Condition", "Houses", "Vehicles", "Electronics"];

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
      {/* HEADER SECTION - Matching BestSection Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 mt-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2">
            Featured Properties
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Browse our curated selection of premium listings across all categories. Perfect for any occasion.
          </p>
        </div>
        <div className="h-[2px] flex-1 bg-gray-100 mb-2 hidden md:block mx-10"></div>
        
      </div>

      {/* CATEGORIES SECTION */}
      <nav className="w-full mb-10 flex justify-start">
        <ul className="flex flex-wrap justify-start gap-3">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  setFilter(cat);
                  setCurrentPage(1);
                }}
                className={`py-2 px-6 rounded-full text-sm font-medium transition-all border ${
                  filter === cat
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* PRODUCTS AREA - Centered Content */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full transition-all duration-500 py-10">
          {/* Ensure the Cards component internal grid is centered if it has a max-width */}
          <Cards card={paginatedProducts} gap="gap-3" />
        </div>
        
        {/* PAGINATION - Centered */}
        {filteredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-3 pt-12 pb-16">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.max(3, currentPage + 1))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    currentPage === page
                      ? "bg-black text-white border-black scale-105 shadow-md"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Best Section - Usually contains its own centering logic, but wrapped just in case */}
      <div className="w-full flex flex-col items-center">
        <Best card={filteredProducts}/>
        <MoreSection />
      </div>
    </div>
  );
}