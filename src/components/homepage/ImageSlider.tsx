"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  name: string;
  category: string;
  deposite: number;
  conditon: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  status: string;
  image: string[];
  details: {
    description: string;
    features: string;
    package: string;
    warranty: string;
  };
  specifications: { label: string; value: string }[];
}

interface ImageSliderProps {
  products: Product[];
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageSlider({
  products,
  autoPlay = true,
  interval = 5000,
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) setItemsPerView(7);     // 2xl+: 7 items
      else if (window.innerWidth >= 1280) setItemsPerView(6); // xl: 6 items
      else if (window.innerWidth >= 1024) setItemsPerView(5); // lg: 5 items
      else if (window.innerWidth >= 768) setItemsPerView(3);  // md: 3 items
      else setItemsPerView(2);                                // sm: 2 items
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canGoPrev = index > 0;
  const canGoNext = index < products.length - itemsPerView;

  const prevSlide = useCallback(() => {
    if (canGoPrev) setIndex((prev) => prev - 1);
  }, [canGoPrev]);

  const nextSlide = useCallback(() => {
    if (canGoNext) setIndex((prev) => prev + 1);
  }, [canGoNext]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      if (direction === "forward") {
        if (canGoNext) setIndex((prev) => prev + 1);
        else setDirection("backward");
      } else {
        if (canGoPrev) setIndex((prev) => prev - 1);
        else setDirection("forward");
      }
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, direction, canGoNext, canGoPrev]);

  return (
    <div className="group relative w-full py-8 bg-gray-50">
      <div className="relative max-w-[1600px] mx-auto px-4"> {/* Wider container */}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-40 
                     bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl 
                     hover:bg-white text-gray-800 rounded-full p-3 transition-all 
                     disabled:opacity-0 group-hover:translate-x-1"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${index * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-1.5 transition-all duration-500" // tighter spacing
                style={{ width: `${100 / itemsPerView}%` }}
              >
                {/* Smaller & Shorter Card */}
                <div className="group/card relative aspect-[4/6] overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white"> {/* Changed to 4/6 */}
                  
                  <Link href={`/product/${product.id}`} className="block h-full w-full">
                    {product.image?.[0] && typeof product.image[0] === "string" && product.image[0].trim() !== "" ? (
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                        sizes="(max-width: 768px) 100vw, 15vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}

                    {/* Floating Badge - Smaller */}
                    <div className="absolute top-2 left-2 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-gray-900 rounded-full shadow-sm">
                        {product.conditon}
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-75 group-hover/card:opacity-95 transition-opacity" />

                    {/* Content - More compact */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                      <p className="text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                        New Arrival
                      </p>
                      <h2 className="text-white text-base font-semibold leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h2>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white text-xl font-light">
                            <span className="text-sm mr-1">$</span>
                            {product.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="bg-blue-600 p-1.5 rounded-lg text-white opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                          <ChevronRightIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-40 
                     bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl 
                     hover:bg-white text-gray-800 rounded-full p-3 transition-all 
                     disabled:opacity-0 group-hover:-translate-x-1"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-1 mt-8">
        {Array.from({ length: Math.max(1, products.length - itemsPerView + 1) }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 transition-all duration-300 rounded-full ${
              index === i ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}