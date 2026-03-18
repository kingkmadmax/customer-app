"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCArd";
import { Product } from "@/components/Product";

type Props = {
  products: Product[];
};

export default function ProductCarousel({ products }: Props) {
  const [index, setIndex] = useState(0);
  const itemsToShow = 4;

  const next = () =>
    setIndex((prev) =>
      prev >= products.length - itemsToShow ? 0 : prev + 1
    );

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? products.length - itemsToShow : prev - 1
    );

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / itemsToShow)}%)`,
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white w-8 h-8 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white w-8 h-8 rounded-full"
      >
        ❯
      </button>
    </div>
  );
}