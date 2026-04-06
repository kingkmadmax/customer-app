"use client";

import { useCartStore, useCheckoutStore } from "@/components/store/cat-store";
import { ShoppingCart, Star, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Product {
  id: number;
  status: string;
  image: string[];           // ← Supports multiple images
  name: string;
  price: number;
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

  // Toggle Favorite
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Open Quick View Modal
  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);        // Reset to first image
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  // Navigate images in modal
  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.image.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.image.length - 1 : prev - 1
      );
    }
  };

  // Rent Now
  const handleRentNow = (product: Product) => {
    setProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image[0],
    });
    router.push("/Checkout/checkout");
  };

  // Add to Cart
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
        quantity: 1,
        status: "pending",
      });
    }
  };

  const [visibleCount, setVisibleCount] = useState(9);
  const handleShowMore = () => setVisibleCount((prev) => prev + 9);

  const cardRefs = useRef<HTMLDivElement[]>([]);

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
  }, [visibleCount]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {card.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id}
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            className="bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group relative opacity-0 translate-y-8"
          >
            {/* Main Image */}
            <Link href={`/product/${product.id}`}>
              <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  width={220}
                  height={220}
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Eye + Heart Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <button
                onClick={() => openQuickView(product)}
                className="bg-white shadow-md hover:bg-blue-50 w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 transition-all active:scale-95"
                title="Quick View"
              >
                <Eye className="w-5 h-5 text-blue-600" />
              </button>

              <button
                onClick={() => toggleFavorite(product.id)}
                className="bg-white shadow-md hover:bg-red-50 w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 transition-all active:scale-95"
                title="Add to Favorites"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {product.category} • {product.conditon}
              </p>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-baseline font-bold text-lg mb-4">
                ${product.price.toFixed(2)}
                <span className="text-xs text-gray-500 font-normal ml-1">/week</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>

                <button
                  onClick={() => handleRentNow(product)}
                  className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm hover:bg-blue-700"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal - Supports Multiple Images */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <p className="font-medium text-lg pr-8">{selectedProduct.name}</p>
              <button 
                onClick={closeQuickView}
                className="text-3xl text-gray-400 hover:text-black"
              >
                ×
              </button>
            </div>

            {/* Image Carousel */}
            <div className="relative bg-gray-50 p-6 flex items-center justify-center min-h-[360px]">
              <Image
                src={selectedProduct.image[currentImageIndex]}
                alt={selectedProduct.name}
                width={420}
                height={420}
                className="object-contain max-h-[340px]"
              />

              {/* Navigation Arrows - Only show if more than 1 image */}
              {selectedProduct.image.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {selectedProduct.image.length}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-sm text-gray-500">
              Quick View • Swipe or use arrows
            </div>
          </div>
        </div>
      )}

      {/* Show More */}
      {visibleCount < card.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
          >
            Show More
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-show { 
          opacity: 1 !important; 
          transform: translateY(0) !important; 
        }
      `}</style>
    </>
  );
}