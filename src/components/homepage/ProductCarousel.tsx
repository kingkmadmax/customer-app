"use client";

import { useState, useEffect } from "react";
import Cards from "@/components/ui/cards";
import MoreSection from "@/components/homepage/MoreSection";
import { Product } from "@/lib/type";

export default function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>("All");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 8;

  // ==================== FETCH DATA ====================
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:9090/api/products/all?page=${currentPage - 1}&size=${itemsPerPage}`
        );

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        const formattedProducts: Product[] = data.content.map((item: any) => ({
          id: Number(item.id),
          name: item.name,
          price: Number(item.price) || 0,
          category: item.category || "Other",
          condition: item.condition,
          location: item.location,
         deposite: item.deposit,
          Situation: item.Situation,
          description: item.description,
          image: item.imageUrl ? [item.imageUrl] : [],
          rating: 4.5,
          reviews: 12,
          ownerId: item.ownerId,
        }));

        setProducts(formattedProducts);
        setTotalPages(data.totalPages); // 👈 IMPORTANT
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Make sure backend is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage]);

  // ==================== FILTER (frontend only) ====================
  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  const categories = ["All", "Houses", "Vehicles", "Electronics", "Condition"];

  // ==================== LOADING / ERROR ====================
  if (loading)
    return (
      <div className="text-center py-24 text-xl">Loading products...</div>
    );

  if (error)
    return (
      <div className="text-center py-24 text-red-500">{error}</div>
    );

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 mt-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2">
            Featured Properties
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Browse our curated selection of premium listings across all categories.
          </p>
        </div>
        <div className="h-[2px] flex-1 bg-gray-100 mb-2 hidden md:block mx-10"></div>
      </div>

      {/* CATEGORIES */}
      <nav className="w-full mb-10 flex justify-start">
        <ul className="flex flex-wrap justify-start gap-3">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  setFilter(cat);
                  setCurrentPage(1); // reset page
                }}
                className={`py-2 px-6 rounded-full text-sm font-medium transition-all border ${
                  filter === cat
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* PRODUCTS GRID */}
      <div className="w-full transition-all duration-500 py-10">
        <Cards card={filteredProducts} gap="gap-6" />
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-12 pb-16">
          
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50"
          >
            Prev
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.max(3, currentPage + 1)
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  currentPage === page
                    ? "bg-black text-white border-black scale-105"
                    : "bg-white text-black border-gray-300 hover:border-black"
                }`}
              >
                {page}
              </button>
            ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      <MoreSection />
    </div>
  );
}