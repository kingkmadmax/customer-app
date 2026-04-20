"use client";

import { ShoppingCart, Star, Plus, X, Heart, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/type";

interface SingleCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRentNow: (product: Product) => void;
  isFavorite: boolean;
}

export default function Card({ 
  product, 
  onQuickView, 
  onFavorite, 
  onAddToCart, 
  onRentNow, 
  isFavorite 
}: SingleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[250px] h-[350px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative flex flex-col mx-auto">
      
      {/* IMAGE SECTION */}
      <div className="relative h-44 w-full bg-gray-50 overflow-hidden">
        <Link href={`/product/${product.id}`} className="w-full h-full block">
          {product.image?.[0] ? (
            <Image
              src={product.image[0]}
              alt={product.name}
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </Link>
        
        {/* HOVER ACTIONS */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button onClick={() => onQuickView(product)} className="bg-white p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => onFavorite(product)} className="bg-white p-2 rounded-full shadow-lg transition-colors">
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 h-10 leading-tight">
            {product.name}
          </h3>
          
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {product.category} • {product.conditon}
          </p>

          {/* RATINGS */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
              />
            ))}
            <span className="text-[10px] text-gray-400">({product.reviews})</span>
          </div>
        </div>

        {/* BOTTOM SECTION: PRICE & SLIDING BUTTONS */}
        <div className="pt-2">
          {/* PRICE - Moved slightly up and made more prominent */}
          <div className="flex items-baseline mb-3">
            <span className="text-lg font-bold text-black tracking-tighter">
              ${product.price.toFixed(0)}
            </span>
            <span className="text-[10px] text-gray-500 font-medium ml-1 uppercase">/ Month</span>
          </div>

          {/* ACTIONS: Toggle on the LEFT */}
          <div className="relative flex items-center justify-start w-full h-10 overflow-hidden">
            {/* The Toggle (Plus) Button - NOW ON THE LEFT */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`mr-2 z-20 flex items-center justify-center w-9 h-9 rounded-full shadow-sm transition-all duration-300 ${
                isOpen ? "bg-gray-100 text-black" : "bg-black text-white"
              }`}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            {/* Container for the sliding buttons - Now slides from the LEFT side */}
            <div
              className={`flex gap-1.5 transition-all duration-500 ease-out transform ${
                isOpen 
                  ? "translate-x-0 opacity-100" 
                  : "-translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => onAddToCart(product)}
                className="whitespace-nowrap px-3 h-8 bg-black text-white rounded-lg text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart className="w-3 h-3" /> Add
              </button>

              <button
                onClick={() => onRentNow(product)}
                className="whitespace-nowrap px-3 h-8 bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase hover:bg-blue-700 transition-colors"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}