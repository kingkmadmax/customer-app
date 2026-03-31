"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/app/data/product";
import  Image from "next/image"

export default function SearchPage() {
  const params = useSearchParams();

  const query = params.get("query") || "";
  const location = params.get("location");

  // 🔍 FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) &&
    product.location === location
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Search Results
      </h1>

      <p>Query: {query}</p>
      <p>Location: {location}</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg"
            >
              <Image
                src={product.image[0]}
                alt="hay"
                className="h-32 w-full object-cover"
              />
              <h2 className="font-bold mt-2">
                {product.name}
              </h2>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}