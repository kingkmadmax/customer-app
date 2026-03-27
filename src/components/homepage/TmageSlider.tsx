// components/ImageSlider.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  conditon:string
}

interface ImageSliderProps {
  products: Product[];
  autoPlay?: boolean;
  interval?: number;        // time between slides (ms)
}

export default function ImageSlider({
  products,
  autoPlay = true,
  interval = 4000,
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward"); // ← New state

  const itemsPerView = 4;
  const gap = 32;

  const canGoPrev = index > 0;
  const canGoNext = index < products.length - itemsPerView;

  const prevSlide = useCallback(() => {
    if (canGoPrev) setIndex((prev) => prev - 1);
  }, [canGoPrev]);

  const nextSlide = useCallback(() => {
    if (canGoNext) {
      setIndex((prev) => prev + 1);
    }
  }, [canGoNext]);

  // Auto-play with reverse direction logic
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      if (direction === "forward") {
        if (canGoNext) {
          setIndex((prev) => prev + 1);
        } else {
          // Reached the end → reverse direction
          setDirection("backward");
        }
      } else {
        // backward
        if (canGoPrev) {
          setIndex((prev) => prev - 1);
        } else {
          // Reached the start → reverse direction again
          setDirection("forward");
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, direction, canGoNext, canGoPrev]);

  // Pause on hover
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

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
  }, [autoPlay, interval, direction, canGoNext, canGoPrev, isPaused]);

  return (
    <div 
      className="relative w-full group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden gap-5 px-6">

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                     bg-black/80 hover:bg-black text-white rounded-full p-4
                     transition-all duration-300 hover:scale-110 disabled:opacity-40"
        >
          <ChevronLeftIcon className="w-7 h-7" />
        </button>

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              gap: `${gap}px`,
              transform: `translateX(-${index * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map((product, i) => {
              const isVisible = i >= index && i < index + itemsPerView;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 transition-all duration-700 ease-out"
                  style={{
                    width: `calc(25% - ${(gap * 3) / 4}px)`,
                    opacity: isVisible ? 1 : 4,
                    transform: isVisible ? "scale(1)" : "scale(0.92)",
                  }}
                >
                  <div className="relative w-80 h-100 rounded-2xl  overflow-hidden shadow-xl">
                    <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={375}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority={i < 8}
                    /></Link>

                    <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5">
                      <h2 className="text-white text-xl font-bold tracking-tight">{product.name}</h2>
                      <p className="text-gray-200 text-sm mt-1 line-clamp-2">{product.description}</p>
                      <p className="text-green-400 text-lg font-semibold mt-2">${product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                     bg-black/80 hover:bg-black text-white rounded-full p-4
                     transition-all duration-300 hover:scale-110 disabled:opacity-40"
        >
          <ChevronRightIcon className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}