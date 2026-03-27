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

import { describe } from "node:test";
import { image } from "framer-motion/m";
import { link } from "fs";


const  Add = [
  {link: "/New-folder/(2).mp4", name: "Houses", description: "Comfortable athletic shoes" },
]
const products = [
  { id: 1,  name: "Vehicles ", conditon:"new" , category: "Vehicles", description: "This is a high-performance laptop",          image: "/download1.jpg",  price: 999.99, rating: 3, total: "(34)" },
  { id: 2,  name: "Vehicles ",conditon:"new" , category: "Houses", description: "Latest smartphone with advanced features",   image: "/download2.jpg", price: 999.99, rating: 5, total: "(34)" },
  { id: 3,  name: "Vehicles ",conditon:"new" , category: "Vehicles", description: "Wireless noise-canceling headphones",        image: "/download3.jpg", price: 999.99, rating: 2, total: "(34)" },
  { id: 4,  name: "Vehicles ",conditon:"new" , category: "Vehicles", description: "Smartwatch with fitness tracking",           image: "/download4.jpg", price: 999.99, rating: 1, total: "(34)" },
  { id: 5,  name: "Vehicles ",conditon:"used" , category: "Electronics", description: "Digital camera with high-resolution sensor", image: "/download.jpg",   price: 999.99, rating: 4, total: "(34)" },
  { id: 6,  name: "Vehicles", conditon:"used" , category: "Vehicles", description: "Comfortable athletic shoes",                 image: "/download (1).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 7,  name: "Vehicles", conditon:"used" , category: "Electronics", description: "Comfortable athletic shoes",                 image: "/download (2).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 8,  name: "Vehicles", conditon:"new" , category: "Electronics", description: "Comfortable athletic shoes",                 image: "/download (3).jpg", price: 999.99, rating: 3, total: "(34)" },
  { id: 14,  name: "Houses",   conditon:"new" , category: "Houses", description: "Comfortable athletic shoes",                 image: "/download (4).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 9,  name: "Houses",   conditon:"new" , category: "Houses", description: "Comfortable athletic shoes",                 image: "/download (5).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 15,  name: "Houses",   conditon:"new" , category: "Houses", description: "Comfortable athletic shoes",                 image: "/download (6).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 10, name: "Vehicles", conditon:"old" , category: "Vehicles", description: "Comfortable athletic shoes",                 image: "/images (3).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 11, name: "Houses",   conditon:"old" , category: "Vehicles", description: "Comfortable athletic shoes",                 image: "/images (2).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 12, name: "House",    conditon:"old" , category: "Vehicles", description: "Comfortable athletic shoes",                 image: "/images (1).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 13, name: "Vehicles", conditon:"new" , category: "Vehicles", description: "Comfortable athletic shoes",                 image: "/images.jpg",     price: 999.99, rating: 4, total: "(34)" },

];

export default function Home() {
  // Main image slider

 

  return (<div>
     <ScrollReveal className="pt-1">
       <Hero/>
    </ScrollReveal>
     <main
  className="p-6 flex flex-col"
  style={{
    backgroundImage:
      " radial-gradient(circle, #7f8793, #9397a1, #a7a8af, #bababd, #cccccc)",
  }}
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