"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[300px] overflow-hidden flex items-center justify-center text-white">

      {/* Parallax Image */}
      <div
        style={{ transform: `translateY(${offset * 0.4}px)` }}
        className="absolute inset-0"
      >
        <Image
          src="/hero.png"
          alt="Hero"
          fill
          className="object-cover scale-110"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Your Product Renting Platform
        </h1>
        <p className="max-w-2xl">
          Seamless rental experience for modern users
        </p>
      </div>

    </div>
  );
}