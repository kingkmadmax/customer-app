"use client";

import { useCartStore } from "@/components/store/cat-store";
import { Star, ShieldCheck, Calendar, Info, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { products } from "@/app/data/product"; // Ensure this path is correct
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  // FIX 1: Find the specific product based on the URL ID
  const product = products.find((p) => p.id === Number(id));

  // FIX 2: Handle the case where the product doesn't exist
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/" className="text-blue-600 underline mt-4">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back Button */}
      <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition">
        <ChevronLeft size={20} />
        <span className="font-medium">Back to listings</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 1. Large Product Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
          <Image
            src={product.image[0]}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* 2. Product Info */}
        <div className="flex flex-col space-y-6">
          <div>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-gray-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                <span className="font-bold text-lg">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-medium">{product.reviews} Verified Reviews</span>
            </div>
          </div>

          <div className="border-y border-gray-100 py-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-black">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 font-semibold">/ per week</span>
            </div>
            <p className="text-sm text-green-600 font-bold mt-2 flex items-center gap-1">
              <ShieldCheck size={16} /> Currently {product.status}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">About this {product.category.toLowerCase()}</h3>
            <p className="text-gray-600 leading-relaxed">
              {/* Note: Ensure your data has a 'description' field */}
              {product.description || "No description available for this item."}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <Calendar className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Condition</p>
                {/* FIX 3: Check spelling (conditon vs condition) in your data */}
                <p className="text-sm font-semibold">{(product as any).conditon || "Standard"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <Info className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Insurance</p>
                <p className="text-sm font-semibold">Fully Covered</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button 
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                image: product.image[0],
                deposite: product.deposite,
                price: product.price,
                quantity: 1,
                status: "pending", 
              })}
              className="flex-[2] bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition shadow-xl active:scale-95"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-white border-2 border-black text-black py-4 rounded-2xl font-bold hover:bg-gray-50 transition active:scale-95">
              Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}