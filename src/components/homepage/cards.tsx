"use client";

import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { ShoppingCart, Star, Heart, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ Updated Interface to include 'deposite'
export interface Product {
  id: number;
  status: string;
  image: string[];
  name: string;
  price: number;
  deposite: number; // 🔥 Added this
  reviews: number;
  rating: number;
  category: string;
  conditon: string;
}

interface CardsProps {
  card: Product[];
}

export default function Cards({ card = [] }: CardsProps) {
  const router = useRouter();
  const setProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);

  const modalRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeQuickView();
      }
    };
    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedProduct]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-show");
          observer.unobserve(entry.target);
        }
      });
    });

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [visibleCount, card]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev === selectedProduct.image.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProduct.image.length - 1 : prev - 1));
    }
  };

  // ✅ Fixed: Now passing deposite to Checkout Store
  const handleRentNow = (product: Product) => {
    setProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      deposite: product.deposite, // 🔥 Critical fix
      image: product.image[0],
    });
    router.push("/Checkout/checkout");
  };

  // ✅ Fixed: Now passing deposite to Cart Store
  const handleAddToCart = (product: Product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      increaseQuantity(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image[0],
        price: product.price,
        deposite: product.deposite, 
        quantity: 1,
        status: "pending",
      });
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {card.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id}
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative opacity-0 translate-y-8"
          >
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
              
              <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                <button
                  onClick={() => openQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.category} • {product.conditon}</p>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-baseline font-bold text-lg mb-4">
                ${product.price.toFixed(2)}
                <span className="text-xs text-gray-500 font-normal ml-1">/month</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 h-9 bg-black text-white rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>

                <button
                  onClick={() => handleRentNow(product)}
                  className="flex-1 h-9 bg-blue-600 text-white rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div ref={modalRef} className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden">
              <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col items-center justify-center relative">
                <div className="relative aspect-square w-full max-w-[300px] flex items-center justify-center bg-white rounded-2xl shadow-inner border border-gray-100 overflow-hidden">
                  <Image src={selectedProduct.image[currentImageIndex]} alt="preview" fill className="object-contain p-4" />
                  {selectedProduct.image.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-2 bg-white/80 p-1.5 rounded-full shadow"><ChevronLeft className="w-5 h-5" /></button>
                      <button onClick={nextImage} className="absolute right-2 bg-white/80 p-1.5 rounded-full shadow"><ChevronRight className="w-5 h-5" /></button>
                    </>
                  )}
                </div>
                <div className="flex gap-2 mt-6 overflow-x-auto w-full justify-center px-2">
                  {selectedProduct.image.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)} className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === i ? "border-blue-600 scale-105" : "border-transparent opacity-50"}`}>
                      <Image src={img} alt="thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between relative">
                <button onClick={closeQuickView} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X className="w-8 h-8" /></button>
                <div>
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">{selectedProduct.category}</span>
                  <h2 className="text-3xl font-black text-gray-900 mt-2 mb-4 leading-tight">{selectedProduct.name}</h2>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
                    <p className="text-blue-600 text-sm font-bold">Rental Price</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-gray-900">${selectedProduct.price}</span>
                      <span className="text-gray-500 font-medium">/per Month</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button onClick={() => { handleAddToCart(selectedProduct); closeQuickView(); }} className="w-full bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition transform active:scale-95">
                    <ShoppingCart className="w-5 h-5" /> Add to Shopping Cart
                  </button>
                  <button onClick={() => { handleRentNow(selectedProduct); closeQuickView(); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition transform active:scale-95 shadow-lg shadow-blue-200">
                    Reserve Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .animate-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}