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
  conditon: string; // Note: You have a typo here ("conditon"), check your data!
  location: string;
  price: number;
  rating: number;
  reviews: number;
  status: string;
  image: string[];
  // Move description into a nested object
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
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
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
    <div className="group relative w-full px-4 py-8 bg-gray-50">
      <div className="relative max-w-7xl mx-auto">
        
        {/* Navigation Buttons - More modern glass effect */}
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-40 
                     bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl 
                     hover:bg-white text-gray-800 rounded-full p-3 transition-all 
                     disabled:opacity-0 group-hover:translate-x-2 lg:group-hover:translate-x-0"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
              transform: `translateX(-${index * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-3 transition-all duration-500"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                {/* --- IMAGE CARD --- */}
                <div className="group/card relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 bg-white">
                  
                  <Link href={`/product/${product.id}`} className="block h-full w-full">
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900 shadow-sm">
                        {product.conditon}
                      </span>
                    </div>

                    {/* Sophisticated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                      <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                        New Arrival
                      </p>
                      <h2 className="text-white text-xl font-semibold leading-tight mb-2">
                        {product.name}
                      </h2>
                      
                      <div className="flex items-end justify-between">
                        <div>
                           <p className="text-gray-300 text-xs line-clamp-1 mb-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                            {product.details.description}
                          </p>
                          <p className="text-white text-2xl font-light">
                            <span className="text-sm mr-1">$</span>
                            {product.price.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="bg-blue-600 p-2 rounded-lg text-white opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform translate-x-4 group-hover/card:translate-x-0">
                           <ChevronRightIcon className="w-5 h-5" />
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
          className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-40 
                     bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl 
                     hover:bg-white text-gray-800 rounded-full p-3 transition-all 
                     disabled:opacity-0 group-hover:-translate-x-2 lg:group-hover:translate-x-0"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-1.5 mt-8">
        {Array.from({ length: products.length - itemsPerView + 1 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === i ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}