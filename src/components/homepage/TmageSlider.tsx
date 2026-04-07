"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string[];
  deposite: number;
  price: number;
  conditon: string;
}

interface ImageSliderProps {
  products: Product[];
  autoPlay?: boolean;
  interval?: number;
}

export default function ImageSlider({
  products,
  autoPlay = true,
  interval = 4000,
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
    <div className="relative w-full overflow-hidden bg-white">
      <div className="relative">
        
        {/* Buttons */}
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/80 text-white rounded-full p-3 transition-all disabled:opacity-0"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* --- CONTAINER --- */}
        {/* Added -mx-2 here to counteract the padding on the items so the edges align with the container */}
        <div className="overflow-hidden mx-2"> 
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                // 🔥 Added px-2 here to create the "gap" between images
                className="flex-shrink-0 w-full px-2" 
                style={{
                  width: `${100 / itemsPerView}%`,
                }}
              >
                {/* --- IMAGE CARD --- */}
                <div className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] w-full overflow-hidden rounded-xl"> {/* Added rounded-xl for cleaner look */}
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority
                    />
                  </Link>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-white text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-200 text-xs line-clamp-1 opacity-80">{product.description}</p>
                    <p className="text-green-400 text-lg font-black mt-1">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/80 text-white rounded-full p-3 transition-all disabled:opacity-0"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}