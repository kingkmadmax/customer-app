"use client";

import Cards from "@/components/homepage/cards";
import { Product } from "@/lib/type";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  
  // 1. State Management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch Data from Spring Boot on Mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Note: Make sure this URL matches your actual backend endpoint
        const res = await fetch("http://localhost:9090/api/products/all");

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // 3. Format data to match your Frontend 'Product' Type
        const formatted: Product[] = data.map((item: any) => ({
          ...item,
          // Ensure image is always an array if your Card expects an array
          // or just use item.imageUrl if you updated Card to use a string
          image: item.imageUrl ? [item.imageUrl] : [], 
          rating: item.rating || 0,
          reviews: item.reviews || 0
        }));

        setProducts(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once when page loads

  // 4. Client-Side Filtering Logic
  const query = params.get("query")?.toLowerCase() || "";
  const category = params.get("category") || "All Categories";
  const location = params.get("location");
  const minRating = params.get("rating") ? parseInt(params.get("rating")!) : null;

  const filteredProducts = products.filter((product) => {
    const matchesQuery = !query || product.name.toLowerCase().includes(query);
    const matchesCategory = category === "All Categories" || product.category === category;
    const matchesLocation = !location || product.location?.toLowerCase() === location.toLowerCase();
    const matchesRating = !minRating || (product.rating || 0) >= minRating;

    return matchesQuery && matchesCategory && matchesLocation && matchesRating;
  });

  // 5. Conditional Rendering
  if (loading) return <div className="text-center py-20">Loading amazing products...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

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
        <div className="flex flex-col justify-center items-center text-center gap-3 py-10">
          <h1 className="text-5xl font-bold text-black">404 Not Found</h1>
          <h3 className="text-base text-gray-500">No products match your filters.</h3>
          <button 
            onClick={() => router.push("/")}
            className="mt-3 px-5 py-2 text-white rounded-md bg-gray-900 hover:bg-gray-800 transition"
          >
            Back to home page
          </button>
        </div>
      )}
    </div>
  );
}