"use client";

import { useState, useEffect } from "react";
import Cards from "@/components/ui/cards";
import MoreSection from "@/components/homepage/MoreSection";
import { Product } from "@/lib/type";

export default function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state (now used directly in API request)
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

        // Include category filtering directly in the API request if it's not "All"
        const categoryParam =
          filter !== "All" ? `&category=${encodeURIComponent(filter)}` : "";

        const response = await fetch(
          `http://localhost:9090/api/products/all?page=${currentPage - 1}&size=${itemsPerPage}${categoryParam}`,
        );

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // Handle Spring's PagedModel structure or standard Page structure safely
        const content =
          data.content || (data._embedded ? data._embedded.rentalProducts : []);
        const totalPagesCount = data.page?.totalPages ?? data.totalPages ?? 1;

        if (!content) throw new Error("Unexpected API response structure");

        const formattedProducts: Product[] = content.map((item: any) => ({
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
          averageRating: Number(item.averageRating) || 0,
          rating: Number(item.averageRating) || 0,
          ownerId: item.ownerId,
          ownerName: item.ownerName,
        }));

        setProducts(formattedProducts);
        setTotalPages(totalPagesCount);
      } catch (err) {
        console.error(err);
        +setError("Failed to load products. Make sure backend is running.");
      } finally {
        setLoading(false);
      }
    } 

    fetchProducts();
  }, [currentPage, filter]);

  const categories = ["All", "Houses", "Vehicles", "Electronics", "Condition"];
  return (
    // w is the main content that store all the cards
    <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 mt-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-2">
            Featured Properties
          </h1>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
            Browse our curated selection of premium listings across all
            categories.
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
                  setCurrentPage(1); // Reset back to page 1 on filter change
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

      {/* PRODUCTS DISPLAY GRID */}
      {loading ? (
        <div className="text-center py-24 text-xl min-h-[400px]">
          Loading products...
        </div>
      ) : error ? (
        <div className="text-center py-24 text-red-500 min-h-[400px]">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 text-gray-400 min-h-[400px]">
          No products found in this category.
        </div>
      ) : (
        <div className="w-full transition-all duration-500 py-10">
          <Cards card={products} gap="gap-6" />
        </div>
      )}

      {/* PAGINATION (Now handles exact numbers cleanly) */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-12 pb-16">
          {/* Prev Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 disabled:hover:bg-white hover:bg-gray-50 transition-colors"
          >
            Prev
          </button>

          {/* Clean Numerical Page Pipeline */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                currentPage === page
                  ? "bg-black text-white border-black scale-105 font-semibold"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 disabled:hover:bg-white hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <MoreSection />
    </div>
  );
}
