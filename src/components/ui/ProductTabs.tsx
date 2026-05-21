"use client";

import { useState, useEffect } from "react";
import { Star, Info, List, MessageSquare } from "lucide-react";
import { Product } from "@/lib/type";

type TabType = "detail" | "specifications" | "reviews";

interface ReviewFromBackend {
  id: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>("detail");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  
  // Real database state instead of Zustand
  const [dbReviews, setDbReviews] = useState<ReviewFromBackend[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Load review data from the product or fetch it from the backend if not embedded
  useEffect(() => {
    const loadReviews = async () => {
      if (!product?.id) return;

      if (product.reviews && product.reviews.length > 0) {
        setDbReviews(product.reviews);
        return;
      }

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:9090/api";
        const response = await fetch(`${apiBaseUrl}/products/${product.id}/reviews`, {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.warn(
            `Unable to load product reviews (${response.status} ${response.statusText}) for product ${product.id}:`,
            errorBody || "No response body"
          );
          return;
        }

        const fetchedReviews: ReviewFromBackend[] = await response.json();
        if (Array.isArray(fetchedReviews)) {
          setDbReviews(fetchedReviews);
        }
      } catch (error) {
        console.error("Failed to load reviews for product:", error);
      }
    };

    loadReviews();
  }, [product]);

  // 2. Submit the comment to your Spring Boot API
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || newReview.rating === 0 || !newReview.comment) return;

    setIsSubmitting(true);

    try {
      // Points exactly to your @PostMapping("/{productId}/reviews") Spring controller endpoint
      const response = await fetch(`http://localhost:9090/api/products/${product.id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: newReview.author,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save review to the database");
      }

      const savedReviewFromServer: ReviewFromBackend = await response.json();

      // Update the UI immediately with the newly returned database item
      setDbReviews((prev) => [savedReviewFromServer, ...prev]);

      // Reset form fields
      setNewReview({ author: "", rating: 0, comment: "" });
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error connecting to backend server:", error);
      alert("Could not save your comment right now. Is the Spring Boot server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 px-6">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-8 gap-8 overflow-x-auto no-scrollbar">
        {[
          { id: "detail", name: "Product Details", icon: Info },
          { id: "specifications", name: "Technical Specs", icon: List },
          { id: "reviews", name: `Reviews (${dbReviews.length})`, icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as TabType)}
            className={`pb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px] bg-white rounded-3xl p-8 border border-gray-50 shadow-sm">
        {selectedTab === "detail" && (
          <div className="max-w-3xl space-y-4 animate-in slide-in-from-bottom-2">
            <h3 className="text-xl font-bold text-gray-900">About this product</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No detailed description provided."}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xl text-black font-bold ">Condition</p>
                <p className="font-bold text-gray-600">{product.condition || "Mint Condition"}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xl text-black font-bold ">Location</p>
                <p className="font-bold text-gray-600">{product.location || "Addis Ababa"}</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "specifications" && (
          <div className="animate-in slide-in-from-bottom-2">
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-4 font-bold text-black w-1/3">Model</td>
                  <td className="py-4 text-gray-800">{product.name}</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-4 font-bold text-black">Category</td>
                  <td className="py-4 text-gray-800">{product.category}</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-4 font-bold text-black">Availability</td>
                  <td className="py-4 text-green-600 font-bold">In Stock</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-black">Min Rental Period</td>
                  <td className="py-4 text-gray-800">1 Month</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div className="animate-in slide-in-from-bottom-2 flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">User Experience</h3>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold"
              >
                {showReviewForm ? "Cancel" : "Write Review"}
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="p-3 rounded-xl border border-gray-300 focus:border-gray-600 focus:outline-none"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  />
                  <div className="flex items-center gap-2 px-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-7 h-7 cursor-pointer transition-colors ${(hoverRating || newReview.rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  placeholder="Tell others about your rental experience..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-gray-600 focus:outline-none min-h-[100px]"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
                <button 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 disabled:bg-blue-400"
                >
                  {isSubmitting ? "Saving to Server..." : "Submit Feedback"}
                </button>
              </form>
            )}

            <div className="space-y-6">
              {dbReviews.length > 0 ? (
                dbReviews.map((review) => (
                  <div key={review.id || review.createdAt} className="border-b border-gray-50 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-sm">{review.author}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}