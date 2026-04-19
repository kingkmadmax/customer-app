"use client";

import { useState, useRef, useEffect } from "react";
import Cards from "@/components/homepage/Cards";
import Best from "./BestSection";
import { Product } from "@/lib/type"; 

interface ContentProps {
  card: Product[];
}

export default function Content({ card = [] }: ContentProps) {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;
  const [visibleCount, setVisibleCount] = useState<number>(9);


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

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold my-">Featured Properties</h1>

      {/* MAIN LAYOUT: Column on mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row lg:gap-5">
        
        {/* CATEGORIES SECTION */}
        <div className="w-full lg:w-50 pb-40   flex-shrink-0 mb-8 lg:mb-0">
          {/* Mobile: Horizontal Scroll Row */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto  no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setVisibleCount(9);
                  }}
                  className={`whitespace-nowrap  rounded-sm text-sm border transition-all ${
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
        <div className="flex-1  transition-all duration-500 ease-in-out">
           <div className="transition-all duration-500 ease-in-out opacity-100">
              <Cards card={paginatedProducts} />
           </div>
          
          {/* SHOW MORE BUTTON */}
              {visibleCount < filteredProducts.length && (
      <div className="flex justify-center items-center gap-3 pt-10">
  {/* Previous */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="px-4 py-2 border border-gray-500 rounded-lg disabled:opacity-50"
  >
    Prev
  </button>

  {/* Page Numbers (max 3 visible) */}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(
      Math.max(0, currentPage - 2),
      Math.max(3, currentPage + 1)
    )
    .map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-4 py-2 rounded-lg border border-gray-500   transition-all duration-300 ${
          currentPage === page
            ? "bg-black text-white scale-110 shadow-md"
            : "bg-white text-black hover:scale-105"
        }`}
      >
        {page}
      </button>
    ))}

  {/* Next */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="px-4 py-2 border border-gray-500  rounded-lg disabled:opacity-50"
  >
    Next
  </button>
</div>
    )}
        </div>
      </div>
      <Best card={paginatedProducts}/>
    </div>
  );
}