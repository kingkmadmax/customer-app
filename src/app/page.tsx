"use client";
import Image from "next/image";
import { FaCar, FaHome, FaScrewdriver, FaTv, FaTshirt, FaLaptop } from "react-icons/fa";
import { FaEye, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

import ImageSlider from "@/components/TmageSlider";
import Adds from "@/components/Adds";

import { describe } from "node:test";
import { image } from "framer-motion/m";
import { link } from "fs";


const  Add = [
  {link: "/New-folder/(2).mp4", name: "Houses", description: "Comfortable athletic shoes" },
]
const products = [
  { id: 1, name: "Vehicles ", description: "This is a high-performance laptop", image: "/download 1.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 2, name: "Vehicles ", description: "Latest smartphone with advanced features", image: "/download 2.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 3, name: "Vehicles ", description: "Wireless noise-canceling headphones", image: "/download 3.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 4, name: "Vehicles ", description: "Smartwatch with fitness tracking", image: "/download 4.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 5, name: "Vehicles ", description: "Digital camera with high-resolution sensor", image: "/download.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 6, name: "Vehicles", description: "Comfortable athletic shoes", image: "/download 1.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 7, name: "Vehicles",description: "Comfortable athletic shoes"  , image: "/download 2.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 8, name: "Vehicles",description: "Comfortable athletic shoes", image: "/download 3.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 9, name: "Houses",description: "Comfortable athletic shoes", image: "/download 4.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 10, name: "Vehicles",description: "Comfortable athletic shoes", image: "/images (3).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 11, name: "Houses",description: "Comfortable athletic shoes", image: "/images (2).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 12, name: "House",description: "Comfortable athletic shoes", image: "/images (1).jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 13, name: "Vehicles", description: "Comfortable athletic shoes",image: "/images.jpg", price: 999.99, rating: 4, total: "(34)" },

];

export default function Home() {
  // Main image slider

 

  return (
    <main className="p-6  ">
      <h1 className="text-2xl font-bold mb-4">Featured Properties</h1>
      
      <div className="flex flex-col gap-10">
        <ImageSlider products={products} />
      <Adds adds={Add} />
      </div>
      
    </main>
  );
}