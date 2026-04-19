"use client";
import { Product } from "@/lib/type"; // Using Alias
import { ShoppingCart, Heart, Eye, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SingleCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
  onFavorite: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onRentNow: (p: Product) => void;
  isFavorite: boolean;
}

export default function Card({ product, onQuickView, onFavorite, onAddToCart, onRentNow, isFavorite }: SingleCardProps) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden group relative flex flex-col h-full shadow-sm">
      <div className="relative h-48 bg-gray-50">
        <Image src={product.image[0]} alt={product.name} fill className="object-contain p-4 transition-transform group-hover:scale-105" />
        <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform">
           <button onClick={() => onQuickView(product)} className="p-2 bg-white rounded-full shadow"><Eye size={16}/></button>
           <button onClick={() => onFavorite(product)} className="p-2 bg-white rounded-full shadow">
             <Heart size={16} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
           </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
        <div className="flex items-center text-gray-400 text-[10px] mt-1"><MapPin size={12}/> {product.location}</div>
        <div className="mt-auto pt-4">
          <div className="text-lg font-black">${product.price}<span className="text-xs font-normal">/mo</span></div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => onAddToCart(product)} className="flex-1 bg-black text-white text-[10px] py-2 rounded-lg">Add</button>
            <button onClick={() => onRentNow(product)} className="flex-1 bg-blue-600 text-white text-[10px] py-2 rounded-lg">Rent Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}