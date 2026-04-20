"use client";

import { useMemo } from "react";
import Cards from "@/components/homepage/cards";
import { Product } from "@/lib/type";
import { motion } from "framer-motion";

interface BestProps {
  card: Product[];
}

export default function Best({ card = [] }: BestProps) {
  const displayProducts = useMemo(() => {
    return [...card]
      .filter((product) => product.dateAdded)
      .sort((a, b) => new Date(b.dateAdded!).getTime() - new Date(a.dateAdded!).getTime())
      .slice(0, 4);
  }, [card]);

  if (displayProducts.length === 0) return null;

  return (
    /* Use the same max-width and centering as the Content component */
    <div className="max-w-[1100px] mx-auto w-full py-8 px-4 sm:px-6 lg:px-8 bg-white">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2">
            New Products
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Explore our latest arrivals. Fresh rentals added daily to meet your needs.
          </p>
        </div>
        <div className="h-[2px] flex-1 bg-gray-100 mb-2 hidden md:block mx-10"></div>
        {/* <button className="text-sm font-bold uppercase tracking-widest text-black hover:text-blue-600 transition-colors flex items-center gap-2">
          View All Arrivals <span className="text-lg">→</span>
        </button> */}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full mt-6"
      >
        <Cards card={displayProducts} gap="gap-3" />
      </motion.div>
    </div>
  );
}