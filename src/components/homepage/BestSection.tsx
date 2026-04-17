"use client";

import { useMemo } from "react";
import Cards from "./cards";

export interface Product {
  id: number;
  status: string;
  image: string[];
  name: string;
  price: number;
  reviews: number;
  deposite: number;
  rating: number;
  dateAdded: string;
  category: string;
  conditon: string;
}

interface ContentProps {
  card: Product[];
}

export default function Best({ card = [] }: ContentProps) {
  // logic: Only products with dates -> Sort Newest -> Take exactly 8
  const displayProducts = useMemo(() => {
    return [...card]
      .filter((product) => product.dateAdded !== undefined && product.dateAdded !== null)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 4);
  }, [card]);

  return (
       <div className="mt-10">
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl font-bold ">New Prodict</h1>

      <div className="flex flex-col lg:flex-row lg:gap-12">
        
        {/* CATEGORIES SECTION */}
  

        {/* PRODUCTS / CARDS AREA */}
        <div className="flex-1 ml-5 pb-40 pl-55 transition-all item-center duration-500">
  <div className="transition-all duration-500 ease-in-out opacity-100">
    <div className="sm:pl-1">
      <Cards card={displayProducts} />
    </div>
  </div>
</div>
      </div>
    </div>
  );
}