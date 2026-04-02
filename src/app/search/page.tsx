"use client";
import Cards from "@/components/homepage/cards";
import { products } from "@/app/data/product";
import { useSearchParams } from "next/navigation";
export default function SearchPage() {
  const params = useSearchParams();

  const query = params.get("query") || "";
  const location = params.get("location");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) &&
      (!location || product.location === location)
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      <p>Query: {query}</p>
      <p>Location: {location}</p>

   
      {filteredProducts.length > 0 ? (
        <Cards card={filteredProducts} />
      ) : (
        <p className="mt-6 text-gray-500">No products found.</p>
      )}
    </div>
  );
}