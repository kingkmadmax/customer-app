"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/download 1.jpg",
  "/download 2.jpg", 
  "/download 3.jpg",
  "/download 4.jpg",
  "/download.jpg"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 3000);
  return () => clearInterval(interval);
}, [currentIndex]);
  return (
 <div>

  <div className="flex justify-center items-start gap-15 mb-10 mt-10">
 {/* list */}
  <div className="border-r-2 border-gray-500 pb-5 pr-35">
    <ul className="space-y-6 text-left">
      <li>Vehicles</li>
      <li>House</li>
      <li>Electronics</li>
      <li>Home Appliance</li>
      <li>Fashion & Accessories</li>
      <li>Office Equipment</li>
    </ul>
  </div>

  {/* Image Slider */}
  <div className="relative w-full max-w-4xl">
    {/* Image */}
    <div className="overflow-hidden rounded-lg">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-64 object-cover transition-all duration-500"
      />
    </div>

    {/* Left Arrow */}
    <button
      onClick={prevSlide}
      className="absolute w-7 h-7  flex items-center justify-center top-1/2 -left-10 -translate-y-1/2 bg-black text-white p-2 rounded-full"
    >
      &#10094;
    </button>

    {/* Right Arrow */}
    <button
      onClick={nextSlide}
      className="absolute w-7 h-7  flex items-center justify-center top-1/2 -right-10 -translate-y-1/2 bg-black text-white p-2 rounded-full"
    >
      &#10095;
    </button>

    {/* Dots */}
   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              idx === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
  </div>
</div>




 </div>
  );
}
