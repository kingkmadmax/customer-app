"use client";

import { useMemo } from "react";
import Cards from "@/components/homepage/cards";
import { Product } from "@/lib/type";

interface BestProps {
  card: Product[];
}

export default function Best({ card = [] }: BestProps) {
  const displayProducts = useMemo(() => {
    return [...card]
      .filter((product) => product.dateAdded)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 4);
  }, [card]);

  return (
    /* Use the same max-width and centering as the Content component */
    <div className="max-w-[1440px] mx-auto w-full">
      
      {/* Matches the 'Featured Properties' header style exactly */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center lg:text-left">
          New Products
        </h1>
      </div>

      <div className="w-full">
        {/* Matches the flex-center behavior from your Content component */}
        <div className="flex justify-center w-full">
          <Cards card={displayProducts} />
        </div>
      </div>
    </div>
  );
}