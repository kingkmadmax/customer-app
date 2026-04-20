"use client";

import { useCartStore, useCheckoutStore, useReviewStore } from "@/components/store/cat-store";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteStore } from "@/components/store/favorite-store";
import { useRouter, useParams } from "next/navigation";
import {
  Star,
  Truck,
  RotateCcw,
  Heart,
  Info,
  List,
  MessageSquare,
} from "lucide-react";

import { products } from "@/app/data/product";

// Types
export interface Product {
  id: number;
  status: string;
  image: string[];
  name: string;
  price: number;
  deposite: number;
  reviews: number;
  rating: number;
  category: string;
  conditon: string;
  details?: {
    description: string;
    features: string;
    package: string;
    warranty: string;
  };
  specifications?: Array<{ label: string; value: string }>;
}

type TabType = "detail" | "specifications" | "reviews";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useParams();
  
  // States
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<TabType>("detail");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  // Stores
  const { favorites, toggleFavorite } = useFavoriteStore();
  const setCheckoutProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();
  const { reviews, addReview } = useReviewStore();

  const product = products.find((p) => p.id === Number(id)) as Product | undefined;

  const averageRating = useMemo(() => {
    if (!product) return 0;
    if (reviews.length === 0) return product.rating;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews, product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/" className="text-blue-600 underline mt-4">Return Home</Link>
      </div>
    );
  }

  const handleRentNow = () => {
    setCheckoutProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      deposite: product.deposite,
      image: product.image[0],
    });
    router.push("/Checkout/checkout");
  };

  const handleAddToCart = () => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      increaseQuantity(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image[0],
        price: product.price,
        deposite: product.deposite,
        quantity: 1,
        status: "pending",
      });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || newReview.rating === 0 || !newReview.comment) return;

    addReview({
      author: newReview.author,
      rating: newReview.rating,
      comment: newReview.comment,
    });

    setNewReview({ author: "", rating: 0, comment: "" });
    setShowReviewForm(false);
  };

  return (
    <div className="mt-6 h-full w-full mb-10 bg-white">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 gap-12 mt-20">
        
        {/* Left: Image Gallery */}
        <div className="flex flex-1 gap-6">
          <div className="flex flex-col gap-4 h-[650px] overflow-y-auto no-scrollbar">
            {product.image.map((imgSrc, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative flex-shrink-0 w-24 h-24 bg-gray-50 rounded-md overflow-hidden border-2 transition-all ${
                  activeImage === index ? "border-blue-500" : "border-transparent"
                }`}
              >
                {imgSrc && typeof imgSrc === 'string' && imgSrc.trim() !== "" ? (
                  <Image src={imgSrc} alt={`Thumb ${index}`} fill className="object-contain p-2" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-[10px]">No Image</div>
                )}
              </button>
            ))}
          </div>

          <div className="relative flex-1 bg-gray-50 rounded-xl overflow-hidden h-[650px] border border-gray-100">
            {product.image?.[activeImage] && typeof product.image[activeImage] === 'string' && product.image[activeImage].trim() !== "" ? (
              <Image
                src={product.image[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-12"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
                No Preview Available
              </div>
            )}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
              <span className="text-green-600 text-sm font-semibold ml-2">Available Now</span>
            </div>
          </div>

          <div className="text-xl font-bold text-black pb-4 border-b border-gray-100">
            {product.price.toLocaleString()} ETB <span className="text-lg font-normal text-gray-500">/month</span>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.details?.description}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleRentNow}
              className="flex-1 bg-blue-600 hover:bg-blue-600 text-white font-bold py-4 rounded-3xl transition-transform active:scale-95 shadow-lg shadow-blue-100"
            >
              Rent Now
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Heart className={`w-6 h-6 ${favorites.some(f => f.id === product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
          </div>

          {/* Trust Features */}
          <div className="mt-4 border rounded-xl divide-y divide-gray-100 overflow-hidden bg-gray-50/50">
            <div className="flex items-center gap-4 p-4">
              <Truck className="w-6 h-6 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Rapid Delivery</span>
                <span className="text-xs text-gray-500">Express shipping available in Addis Ababa</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RotateCcw className="w-6 h-6 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">RentTrust Insurance</span>
                <span className="text-xs text-gray-500">Standard protection included with every rental</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mt-24 px-6">
        <div className="flex border-b border-gray-200 mb-8 gap-8">
          {[
            { id: "detail", name: "Details", icon: Info },
            { id: "specifications", name: "Specs", icon: List },
            { id: "reviews", name: "Reviews", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as TabType)}
              className={`pb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${
                selectedTab === tab.id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {selectedTab === "detail" && (
            <div className="grid md:grid-cols-2 gap-12 bg-gray-50 rounded-3xl p-10">
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold mb-2">Detailed Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.details?.description}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Key Features</h3>
                  <p className="text-gray-600">{product.details?.features}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold mb-2">Package Contents</h3>
                  <p className="text-gray-600">{product.details?.package}</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Warranty & Protection</h3>
                  <p className="text-gray-600">{product.details?.warranty}</p>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "specifications" && (
            <div className="bg-gray-50 rounded-3xl p-10">
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-6">
                {[
                  { label: "Condition", value: product.conditon },
                  { label: "Category", value: product.category },
                  { label: "Security Deposit", value: `${product.deposite.toLocaleString()} ETB` },
                  ...(product.specifications || [])
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-semibold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "reviews" && (
            <div className="space-y-12">
              {/* Rating Overview */}
              <div className="bg-gray-50 rounded-3xl p-10 flex flex-col md:flex-row gap-16">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-7xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                  <div className="flex my-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-gray-500">{reviews.length} total ratings</p>
                </div>
                
                <div className="flex-1 space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-4 text-sm font-medium">
                        <span className="w-10">{star} Stars</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col justify-center items-center md:items-start">
                  <h4 className="text-xl font-bold mb-4">Add your feedback</h4>
                  <button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    {showReviewForm ? "Cancel Review" : "Write a Review"}
                  </button>
                </div>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="bg-white border-2 border-blue-50 rounded-3xl p-8 space-y-6 shadow-xl shadow-blue-50/50">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold mb-2">Display Name</label>
                      <input
                        type="text"
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Robel A."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: num })}
                            onMouseEnter={() => setHoverRating(num)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            <Star className={`w-8 h-8 ${(hoverRating || newReview.rating) >= num ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Your Experience</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="What did you think of the equipment?"
                      required
                    />
                  </div>
                  <button type="submit" disabled={newReview.rating === 0} className="w-full md:w-auto bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold disabled:opacity-50">
                    Submit Review
                  </button>
                </form>
              )}

              {/* List */}
              <div className="space-y-8">
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div key={rev.id} className="p-8 border rounded-3xl hover:border-blue-100 transition-colors">
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="font-bold text-lg">{rev.author}</p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{rev.date}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed italic">"{rev.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-gray-400">Be the first to leave a review for this {product.category}.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}