"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

export default function Slider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-64 overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt="slide"
          fill
          className="object-cover"
        />
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-10 -translate-y-1/2 bg-black text-white w-8 h-8 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-10 -translate-y-1/2 bg-black text-white w-8 h-8 rounded-full"
      >
        ❯
      </button>
    </div>
  );
}