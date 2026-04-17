"use client";
import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { ShoppingCart, Star, Heart, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFavoriteStore } from "@/components/store/favorite-store";

export interface Product {
  id: number;
  status: string;
  image: string[];
  name: string;
  price: number;
  deposite: number;
  
  reviews: number;
  rating: number;
  category: string;
  conditon: string; // Keeping your spelling to match your data
}

interface CardsProps {
  card: Product[];
}

export default function Cards({ card = [] }: CardsProps) {
  const router = useRouter();
  const setProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();
  
  // Zustand Global Store for Favorites
  const { favorites, toggleFavorite } = useFavoriteStore();

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

  // FIXED: Corrected syntax by adding the missing closing brace
  const handleFavoriteClick = (product: Product) => {
    toggleFavorite(product);
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

  const handleRentNow = (product: Product) => {
    setProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      deposite: product.deposite,
      image: product.image[0],
    });
    router.push("/Checkout/checkout");
  };

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
    <div className="w-full  px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
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
                  onClick={() => handleFavoriteClick(product)}
                  className="bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  {/* FIXED: Check if product exists in favorites array to toggle color */}
                  <Heart className={`w-4 h-4 ${favorites.some(f => f.id === product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </button>
              </div>
            </div>

            <div className="p-4">
  <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-900">
    {product.name}
  </h3>
  
  <p className="text-xs text-gray-500 mb-2">
    {product.category} • {product.conditon}
  </p>

  <div className="flex items-center gap-1 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))}
    <span className="text-xs text-gray-500">({product.reviews})</span>
  </div>

  {/* ONLY THE PRICE IS BLACK - Bigger and clearer */}
  <div className="flex items-baseline font-bold text-2xl mb-4">
    <span className=" text-lg">
      ${product.price.toFixed(1)}
    </span>
    <span className="text-base text-gray-600 font-normal ml-1">/month</span>
  </div>

  <div className="flex gap-2">
    <button
      onClick={() => handleAddToCart(product)}
      className="flex-1  h-7 bg-black text-white rounded-sm text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
    >
      <ShoppingCart className="w-3.5 h-3.5" /> Add
    </button>

    <button
      onClick={() => handleRentNow(product)}
      className="flex-1 h-7 bg-blue-900 text-white rounded-sm text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
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
  <div
    onClick={closeQuickView}
    className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
  >
    {/* Locked Modal Container */}
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full md:w-[78%] max-w-6xl h-[88vh] bg-gray-50 rounded-2xl shadow-2xl p-5 flex flex-col overflow-hidden"
    >
      {/* Close Button */}
      <button
        onClick={closeQuickView}
        className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-md hover:scale-105 transition"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Image */}
      <div className="relative w-full flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
        <Image
          src={selectedProduct.image[currentImageIndex]}
          alt="preview"
          fill
          priority
          className="object-contain p-4"
        />

        {selectedProduct.image.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 hover:scale-105 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 hover:scale-105 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Row */}
      <div className="flex justify-center gap-3 mt-4 overflow-x-auto py-1">
        {selectedProduct.image.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
              currentImageIndex === i
                ? "border-blue-600 scale-105 shadow-md"
                : "border-gray-200 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              className="object-cover"
            />
          </button>
        ))}
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