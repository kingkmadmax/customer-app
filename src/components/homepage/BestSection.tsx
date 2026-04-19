"use client";

import { useMemo } from "react";
import Cards from "@/components/homepage/Cards"; // Ensure this points to your Cards container
import { Product } from "@/lib/type"; // Import from your central types file

interface BestProps {
  card: Product[];
}

export default function Best({ card = [] }: BestProps) {
  // Logic: Sort by date newest first -> Take top 4 (or 8)
  const displayProducts = useMemo(() => {
    return [...card]
      .filter((product) => product.dateAdded)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 4); // Change to 8 if you want two rows
  }, [card]);

  return (
    <div className="mt-10 px-4">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6">New Products</h1>

      <div className="flex flex-col">
        {/* PRODUCTS AREA */}
        <div className="w-full transition-all duration-500">
          <div className="opacity-100">
            {/* FIXED: changed Card={...} to card={...} to match your component props */}
            <Cards card={displayProducts} layout="grid" />
          </div>
        </div>
      </div>
    </div>
  );
}