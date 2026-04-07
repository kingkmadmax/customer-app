"use client";
import Image from "next/image";
import { FaCar, FaHome, FaScrewdriver, FaTv, FaTshirt, FaLaptop } from "react-icons/fa";
import { FaEye, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

import ScrollReveal from "@/components/homepage/scrool";
import ImageSlider from "@/components/homepage/TmageSlider";
import Adds from "@/components/homepage/Adds";
import Contente from "@/components/homepage/ProductCarousel";
import Hero from "@/components/homepage/HeroSection";
import { products,Add } from "@/app/data/product";

import { describe } from "node:test";
import { image } from "framer-motion/m";
import { link } from "fs";




export default function Home() {
  // Main image slider

 

  return (<div 
  className="px-4  bg-gray-100 sm:px-8 lg:px-5 pb-16">
     <ScrollReveal className="pt-1">
       <Hero/>
    </ScrollReveal>
     <main
  className="p-6  flex flex-col"

>
  
 
  <div className="flex flex-col gap-40">
    
   
    {/* Image Slider reveals on scroll */}
    <ScrollReveal>
      <ImageSlider products={products} />
    </ScrollReveal>

    {/* Adds reveals on scroll */}
    <ScrollReveal>
      <Adds adds={Add} />
    </ScrollReveal>

    {/* Contente reveals on scroll */}
    <ScrollReveal>
      <Contente card={products} />
    </ScrollReveal>
  </div>
</main>
  </div>

  );
}