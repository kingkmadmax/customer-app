"use client";

import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types"; // Import your interface



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
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
      <div className="relative h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <Image
            src={product.image[0]}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        
        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button onClick={() => onQuickView(product)} className="bg-white p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => onFavorite(product)} className="bg-white p-2 rounded-full shadow-lg transition-colors">
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.category} • {product.conditon}</p>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-baseline font-bold text-xl mb-4 text-black">
          ${product.price.toFixed(1)}
          <span className="text-sm text-gray-500 font-normal ml-1">/month</span>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onAddToCart(product)} className="flex-1 h-8 bg-black text-white rounded-md text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            <ShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
          <button onClick={() => onRentNow(product)} className="flex-1 h-8 bg-blue-900 text-white rounded-md text-xs flex items-center justify-center hover:bg-blue-800 transition-colors">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}