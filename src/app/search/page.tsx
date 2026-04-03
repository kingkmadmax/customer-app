"use client";
import Cards from "@/components/homepage/cards";
import { products } from "@/app/data/product";   // make sure path is correct
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();

  const query = params.get("query")?.toLowerCase() || "";
  const category = params.get("category") || "All Categories";
  const location = params.get("location");
  const minRating = params.get("rating") ? parseInt(params.get("rating")!) : null;

  const filteredProducts = products.filter((product) => {
    const matchesQuery = !query || product.name.toLowerCase().includes(query);
    const matchesCategory = category === "All Categories" || product.category === category;
    const matchesLocation = !location || product.location?.toLowerCase() === location.toLowerCase();
    const matchesRating = !minRating || product.rating >= minRating;

    return matchesQuery && matchesCategory && matchesLocation && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">
        {query ? `Search Results for "${query}"` : "All Products"}
      </h1>
      
      <p className="text-gray-600 mb-8">
        {filteredProducts.length} results found
        {category !== "All Categories" && ` • ${category}`}
        {location && ` • ${location}`}
        {minRating && ` • ${minRating}+ Stars`}
      </p>

      {filteredProducts.length > 0 ? (
        <Cards card={filteredProducts} />
      ) : (
        <p className="text-center text-gray-500 py-20 text-lg">
          No products match your filters.
        </p>
      )}
    </div>
  );
}