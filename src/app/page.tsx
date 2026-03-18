"use client";
import Image from "next/image";
import { FaCar, FaHome, FaScrewdriver, FaTv, FaTshirt, FaLaptop } from "react-icons/fa";
import { FaEye, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

// Slider images
const images = [
  "/download 1.jpg",
  "/download 2.jpg",
  "/download 3.jpg",
  "/download 4.jpg",
  "/download.jpg",
];

const products = [
  { id: 1, name: "Laptop", image: "/download 1.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 2, name: "Phone", image: "/download 2.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 3, name: "Headphones", image: "/download 3.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 4, name: "Watch", image: "/download 4.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 5, name: "Camera", image: "/download.jpg", price: 999.99, rating: 4, total: "(34)" },
  { id: 6, name: "Shoes", image: "/download 1.jpg", price: 999.99, rating: 4, total: "(34)" },
];

export default function Home() {
  // Main image slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  // Product carousel
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [gridView, setGridView] = useState(false);
  const itemsToShow = 4;

  const nextSlide1 = () =>
    setCurrentIndex1((prev) => (prev >= products.length - itemsToShow ? 0 : prev + 1));
  const prevSlide1 = () =>
    setCurrentIndex1((prev) => (prev === 0 ? products.length - itemsToShow : prev - 1));

  return (
    <div className="p-8 bg-zinc-50 min-h-screen ">
      {/* Main slider */}
      <div className="flex justify-center mt-5 items-start gap-20 mb-10">
        {/* Category list */}
        <div className=" border-gray-400 border-r pr-35 pb-5">
          <ul className="space-y-6 text-left">
            <li>Vehicles</li>
            <li>House</li>
            <li>Electronics</li>
            <li>Home Appliance</li>
            <li>Fashion & Accessories</li>
            <li>Office Equipment</li>
          </ul>
        </div>

        {/* Slider */}
        <div className="relative w-full max-w-4xl">
          <div className="overflow-hidden rounded-lg h-64">
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="w-full h-full object-cover transition-opacity duration-500"
              width={800}
              height={400}
            />
          </div>

          {/* Left arrow */}
          <button
            onClick={prevSlide}
            className="absolute w-8 h-8 flex items-center justify-center top-1/2 -left-10 -translate-y-1/2 bg-black text-white rounded-full"
          >
            &#10094;
          </button>

          {/* Right arrow */}
          <button
            onClick={nextSlide}
            className="absolute w-8 h-8 flex items-center justify-center top-1/2 -right-10 -translate-y-1/2 bg-black text-white rounded-full"
          >
            &#10095;
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  idx === currentIndex ? "bg-red-500 border-2 border-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section title */}
      <div className=" justify-center mt-5 items-start gap-20 mb-10">
        <div className="flex items-center gap-3 pl-2 mb-4">
          <div className="h-12 w-7 bg-blue-500 rounded-md"></div>
          <span className="text-blue-600 font-semibold">Todays</span>
        </div>

        <div className="flex w-full mt-10">
          <h1 className="text-2xl font-bold pl-2 mb-6">New items</h1>
          <div className=" absolute right-3 ml-3 flex space-x-2 z-10">
            <button
              onClick={prevSlide1}
              className="bg-black h-6 w-6 text-white rounded-full hover:bg-gray-800"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide1}
              className="bg-black h-6 w-6 text-white rounded-full hover:bg-gray-800"
            >
              &#10095;
            </button>
          </div>
        </div>

        {/* Product carousel */}
        <div className="w-full mx-auto">
          <div className="">
            {/* Carousel row */}
            {!gridView && (
              <div className="flex overflow-hidden mt-8">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentIndex1 * (100 / itemsToShow)}%)`,
                  }}
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex-none w-1/${itemsToShow} p-4`}
                    >
                      <div className=" relative border rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={160}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          {/* Eye Button */}
                          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                            <FaHeart className="text-black" />
                          </button>

                          {/* Heart Button */}
                          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                            <FaEye className="text-black" />
                          </button>
                        </div>

                        <div className="pt-2 borde space-y-1">
                          {/* Product Name */}
                          <h2 className="text-sm font-semibold">{product.name}</h2>

                          {/* Price */}
                          <p className="text-blue-600 font-bold">${product.price}</p>

                          {/* Rating */}
                          <div className="flex text-yellow-400  ">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>
                                {i < product.rating ? "★" : "☆"}
                              </span>
                            ))}
                            <p className=" ml-2 text-sm text-gray-400">{product.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid view */}
            {gridView && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-center">{product.name}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Toggle button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setGridView(!gridView)}
                className="bg-blue-600 h-12 w-45 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {gridView ? "Show Carousel" : "Show Grid"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" justify-center mt-5 items-start gap-20 mb-10">
        <div className="flex items-center gap-3 pl-2 mb-4">
          <div className="h-12 w-7 bg-blue-500 rounded-md"></div>
          <span className="text-blue-600 font-semibold">Category</span>
        </div>

        <div className="flex w-full mt-10">
          <h1 className="text-2xl font-bold pl-2 mb-6">Browse By Category</h1>
        </div>

        <div className="flex justify-center gap-5 mt-10">
          {/* Item 1 */}
          <div className="flex flex-col w-50 h-60 border items-center gap-2">
            <FaCar className="text-3xl mt-20 text-blue-500" />
            <span>Vehicles</span>
          </div>
          {/* Item 2 */}
          <div className="flex flex-col w-50 h-60 border items-center gap-2">
            <FaHome className="text-3xl mt-20 text-green-500" />
            <span>House</span>
          </div>
          {/* Item 3 */}
          <div className="flex flex-col w-50 h-60 border items-center gap-2">
            <FaTv className="text-3xl mt-20 text-yellow-500" />
            <span>Electronics</span>
          </div>
          {/* Item 4 */}
          <div className="flex flex-col w-50 h-60 border items-center gap-2">
            <FaTshirt className="text-3xl mt-20 text-red-500" />
            <span>Fashion</span>
          </div>
          {/* Item 5 */}
          <div className="flex flex-col w-50 h-60 border items-center gap-2">
            <FaLaptop className="text-3xl mt-20 text-purple-500" />
            <span>Office</span>
          </div>
          {/* Item 6 */}
          <div className="flex flex-col w-50 h-60 border items-center gap-2">
            <FaScrewdriver className="text-3xl mt-20 text-purple-500" />
            <span>Office</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 pl-2 mb-4">
          <div className="h-12 w-7 bg-blue-500 rounded-md"></div>
          <span className="text-blue-600 font-semibold">This Month</span>
        </div>

        <div className="flex w-full mt-10">
          <h1 className="text-2xl font-bold pl-2 mb-6">Best Selling Products</h1>
          <div className=" absolute right-3 ml-3 flex space-x-2 z-10"></div>
        </div>

        {/* Product carousel */}
        <div className="w-full mx-auto">
          <div className="">
            {/* Carousel row */}
            {!gridView && (
              <div className="flex overflow-hidden mt-8">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentIndex1 * (100 / itemsToShow)}%)`,
                  }}
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex-none w-1/${itemsToShow} p-4`}
                    >
                      <div className=" relative border rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={160}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                            <FaHeart className="text-black" />
                          </button>
                          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                            <FaEye className="text-black" />
                          </button>
                        </div>

                        <div className="pt-2 borde space-y-1">
                          <h2 className="text-sm font-semibold">{product.name}</h2>
                          <p className="text-blue-600 font-bold">${product.price}</p>
                          <div className="flex text-yellow-400 ">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>
                                {i < product.rating ? "★" : "☆"}
                              </span>
                            ))}
                            <p className=" ml-2 text-sm text-gray-400">{product.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid view */}
            {gridView && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-center">{product.name}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Toggle button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setGridView(!gridView)}
                className="bg-blue-600 h-12 w-45 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {gridView ? "Show Carousel" : "Show Grid"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 pl-2 mb-4">
          <div className="h-12 w-7 bg-blue-500 rounded-md"></div>
          <span className="text-blue-600 font-semibold">Our Products</span>
        </div>

        <div className="flex w-full mt-10">
          <h1 className="text-2xl font-bold pl-2 mb-6">Explore Our Products</h1>
          <div className=" absolute right-3 ml-3 flex space-x-2 z-10"></div>
        </div>

        {/* Product carousel */}
        <div className="w-full mx-auto">
          <div className="">
            {/* Carousel row */}
            {!gridView && (
              <div className="flex overflow-hidden mt-8">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentIndex1 * (100 / itemsToShow)}%)`,
                  }}
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex-none w-1/${itemsToShow} p-4`}
                    >
                      <div className=" relative border rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={160}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                            <FaHeart className="text-black" />
                          </button>
                          <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                            <FaEye className="text-black" />
                          </button>
                        </div>

                        <div className="pt-2 borde space-y-1">
                          <h2 className="text-sm font-semibold">{product.name}</h2>
                          <p className="text-blue-600 font-bold">${product.price}</p>
                          <div className="flex text-yellow-400 ">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>
                                {i < product.rating ? "★" : "☆"}
                              </span>
                            ))}
                            <p className=" ml-2 text-sm text-gray-400">{product.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid view */}
            {gridView && (
              <div className="grid grid-cols-3 gap-4 mt-8">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-center">{product.name}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Toggle button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => setGridView(!gridView)}
                className="bg-blue-600 h-12 w-45 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {gridView ? "Show Carousel" : "Show Grid"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}