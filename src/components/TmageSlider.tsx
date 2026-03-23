// components/ImageSlider.tsx
"use client";

import { useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";


interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}
interface ImageSliderProps {
  products: Product[];
}

export default function ImageSlider({ products }: ImageSliderProps) {
  const [index, setIndex] = useState(0);

  const canGoPrev = index > 0;
  const canGoNext = index < products.length - 3;

  const prevSlide = useCallback(() => {
    if (canGoPrev) setIndex((prev) => prev - 1);
  }, [canGoPrev]);

  const nextSlide = useCallback(() => {
    if (canGoNext) setIndex((prev) => prev + 1);
  }, [canGoNext]);

  return (
    <div className="relative flex items-center w-full group">
      {/* Previous button */}
    <button
        onClick={prevSlide}
        disabled={!canGoPrev}
        className="bg-black text-white rounded px-2 py-2 
                   hover:bg-gray-700 hover:scale-x-150 origin-left
                   transition duration-300 ease-in-out"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>


      {/* Slider container */}
      <div className="overflow-hidden w-full px-4">
        <div
          className={`
            flex w-full gap-6 
            transition-transform duration-500 ease-out
          `}
          style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`
                flex-shrink-0 w-1/3  min-w-1
                rounded-3xl 
                transition-all duration-500 bg-blue-950 ease-out
                ${i >= index && i < index + 3 
                  ? "opacity-100 scale-100" 
                  : "opacity-40 scale-95 blur-[1px]"}
              `}
            >
                <div className="relative aspect-[22/12] bg-gray-90  overflow-hidden border-l-gray-400 shadow-md">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="
                      object-cover 
                      w-40
                      h-67
                      
                      transform rotate-[20deg] hover:rotate-0 
                      mx-77
                      transition-all duration-500 ease-out
                  
                    "
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={i < 6}
                    quality={75}
                  />

  {/* Text overlay */}
  <div className="absolute bottom-1  top-4 left-5 right-0  h-70 w-60 bg-blue-950 flex flex-col gap-10 ">
    <h2 className="text-white text-2xl bottom-10  font-bold">{product.name}</h2>
    <div  className="flex flex-col gap-2"> <p className="text-gray-200 text-sm">{product.description}</p>
    <p className="text-blue-400 ">${product.price}</p>
    <p className="text-yellow-400 ">Rating: {product.rating}/5</p>
    </div>
   
  </div>
</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next button */}
     <button
        onClick={nextSlide}
        disabled={!canGoNext}
        className="bg-black text-white rounded px-2 py-2 
                   hover:bg-gray-700 hover:scale-x-150 origin-right
                   transition duration-300 ease-in-out"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button> 
    </div>
  );
}