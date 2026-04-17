"use client";

import { useCartStore, useCheckoutStore, useReviewStore } from "@/components/store/cat-store";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteStore } from "@/components/store/favorite-store";
import { useRouter, useParams } from "next/navigation";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Info,
  List,
  MessageSquare,
} from "lucide-react";

import { products, user as userData } from "@/app/data/product";

export interface User {
  id: number;
  name: string;
  email: string;
}

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
interface FavoriteStore {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
}

type TabType = "detail" | "specifications" | "reviews";

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<TabType>("detail");

   const { favorites, toggleFavorite } = useFavoriteStore();

  const router = useRouter();
  const { id } = useParams();

  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

    const handleFavoriteClick = (product: Product) => {
      toggleFavorite(product);
    };

  const setProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();
  const { reviews, addReview } = useReviewStore();

  const product = products.find((p) => p.id === Number(id));

  const averageRating = useMemo(() => {
    if (!product) return 0;
    if (reviews.length === 0) return product.rating;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews, product]);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold font-serif">Product not found</h1>
        <Link href="/" className="text-blue-600 underline mt-4">
          Return Home
        </Link>
      </div>
    );
  }

  const handleRentNow = () => {
    setProduct({
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
  {/* Left: Image Gallery Section */}
  <div className="flex flex-1 gap-10">
    {/* Thumbnails - Fixed height to show exactly 3 */}
    <div className="flex flex-col gap-4 h-[420px] overflow-y-auto no-scrollbar">
      {product.image.map((imgSrc: string, index: number) => (
        <button
          key={index}
          onClick={() => setActiveImage(index)}
          className={`relative flex-shrink-0 w-28 h-28 bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
            activeImage === index ? "border-blue-500" : "border-transparent"
          }`}
        >
          <Image
            src={imgSrc}
            alt={`Thumbnail ${index}`}
            fill
            className="object-contain p-2"
          />
        </button>
      ))}
    </div>

    {/* Main Large Image - Increased height to 650px */}
    <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden h-[650px]">
      <Image
        src={product.image[activeImage]}
        alt={product.name}
        fill
        className="object-contain p-12"
        priority
      />
    </div>
  </div>

  {/* Right: Product Details Section */}
  <div className="w-full lg:w-[450px] flex flex-col gap-4">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
      {product.name}
    </h1>

    {/* Ratings and Stock */}
    <div className="flex items-center gap-3">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(averageRating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
      <span className="text-gray-300">|</span>
      <span className="text-green-500 text-sm font-medium">In Stock</span>
    </div>

    {/* Price */}
    <div className="text-3xl font-bold text-gray-900 py-2 border-b border-gray-200">
      Birr {product.price.toLocaleString()}.00 /month
    </div>

    {/* Description */}
    <p className="text-md leading-relaxed text-gray-600 mt-2">
      {product.details?.description}
    </p>

    {/* Actions */}
    <div className="flex items-center gap-4 mt-8">
      <button
        onClick={handleRentNow}
        className="flex-1 bg-[#0084FF] hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-md transition-all active:scale-95"
      >
        Rent Now
      </button>

      
      <button
                       onClick={() => handleFavoriteClick(product)}
                       className="bg-white p-2 rounded-sm shadow-lg transition-colors"
                     >
                       {/* FIXED: Check if product exists in favorites array to toggle color */}
                       <Heart className={`w-7 h-7 ${favorites.some(f => f.id === product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                     </button>
    </div>

    {/* Trust / Service Box */}
    <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center gap-4 p-5 border-b border-gray-300">
        <Truck className="w-10 font-semibold h-10 text-black" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm">Delivery</span>
          <button className="text-[11px] underline text-gray-600 hover:text-black text-left">
            Enter your postal code for Delivery Availability
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 p-5">
        <RotateCcw className="w-10 font-semibold h-10 text-black" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm">Delivery insurance</span>
          <span className="text-[11px] text-gray-500">product insurance</span>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* TABS */}
  <div className="max-w-7xl mx-auto mt-20 px-6">
        <div className="flex border-b border-gray-300  mb-8 gap-10">
          {[
            { id: "detail", name: "Details", icon: Info },
            { id: "specifications", name: "Specifications", icon: List },
            { id: "reviews", name: "Reviews", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as TabType)}
              className={`pb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 border-black  ${
                selectedTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {/* Details Tab */}
          {selectedTab === "detail" && (
            <div className="space-y-10  bg-gray-50 rounded-2xl p-8">
              <div>
                <h3 className="text-sm font-bold ">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.details?.description || "No description available."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold ">Key Features</h3>
                <p className="text-gray-600 ">
                  {product.details?.features || "No features listed."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold ">What's Included</h3>
                <p className="text-gray-600 ">
                  {product.details?.package || "No package information."}
                </p>
              </div>

              <div  >
                <h3 className="text-sm font-bold ">Warranty & Insurance</h3>
                <p className="text-gray-600 ">
                  {product.details?.warranty || "No warranty information."}
                </p>
              </div>
            </div>
          )}

          {/* Specifications Tab */}
        
        {selectedTab === "specifications" && (
          <div className="space-y-6 bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12   gap-y-5">
              
              {/* Condition */}
              <div className="border-b border-gray-400  pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Condition</span>
                  <p className="font-medium  text-gray-500">{product.conditon}</p>
                </div>
              </div>

              {/* Category */}
              <div className="border-b border-gray-400  pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Category</span>
                  <p className="font-medium  text-gray-500">{product.category}</p>
                </div>
              </div>

              {/* Security Deposit */}
              <div className="border-b border-gray-400  pb-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Security Deposit</span>
                  <p className="font-medium text-gray-500">{product.deposite} ETB</p>
                </div>
              </div>

              {/* All Dynamic Specifications - same style */}
              {product.specifications?.map((spec, index) => (
                <div key={index} className="border-b border-gray-400 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm ">{spec.label}</span>
                    <p className="font-medium text-gray-500">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {(!product.specifications || product.specifications.length === 0) && (
              <p className="text-gray-400 italic">No additional specifications provided.</p>
            )}
          </div>
        )}

          {/* Reviews Tab */}
          {selectedTab === "reviews" && (
        <div className="space-y-8">
          {/* Rating Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl mb-6">Customer Ratings</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{averageRating.toFixed(1)}</span>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-6 ${
                            i < Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on {reviews.length} ratings
                    </p>
                  </div>
                </div>
                
                {/* Rating Distribution */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const percentage = (count / reviews.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm w-8">{star} ★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Rate This Product */}
              <div className="flex flex-col justify-center">
                <h4 className="text-lg mb-3">Rate This Product</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Share your rating to help other customers
                </p>
                <div className="flex gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setNewReview({ ...newReview, rating: i + 1 });
                        if (!showReviewForm) {
                          setShowReviewForm(true);
                        }
                      }}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`size-10 ${
                          i < (hoverRating || newReview.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {newReview.rating > 0 && (
                  <p className="text-sm text-gray-600">
                    You rated: {newReview.rating} star{newReview.rating > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Customer Reviews</h3>
           <button 
  className={`h-10 px-8 rounded-xl font-medium transition-all active:scale-95 ${
    showReviewForm 
      ?  "bg-black hover:bg-gray-900 text-white"     // Cancel mode
      :   "bg-blue-500 hover:bg-blue-600 text-white"       // Write Review mode
  }`}
  onClick={() => setShowReviewForm(!showReviewForm)}
>
  {showReviewForm ? "Cancel" : "Write a Review"}
</button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="bg-gray-50 rounded-lg p-6 space-y-4 mb-6"
              >
                <h3 className="text-xl">Write Your Review</h3>

                {/* Name Input */}
                <div>
                  <label htmlFor="author" className="block text-sm mb-2">
                    Your Name *
                  </label>
                  <input
                    id="author"
                    type="text"
                    value={newReview.author}
                    onChange={(e) =>
                      setNewReview({ ...newReview, author: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                {/* Rating Display in Form */}
                {newReview.rating > 0 && (
                  <div>
                    <label className="block text-sm mb-2">Your Rating</label>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-6 ${
                            i < newReview.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: 0 })}
                      className="text-sm text-white border rounded-sm w-30 h-8 bg-black e mt-3"
                    >
                      Change rating
                    </button>
                  </div>
                )}

                {/* Comment Input */}
                <div>
                  <label htmlFor="comment" className="block text-sm mb-2">
                    Your Review *
                  </label>
                  <textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Share your experience with this product..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button 
                  className="bg-blue-600 hover:bg-blue-300 text-white h-10 w-30 rounded-sm font-medium transition-all active:scale-95"
                  
                  type="submit" disabled={newReview.rating === 0}>
                    Submit Review
                  </button>
                  <button
                  className="bg-black hover:bg-gray-500 text-white h-10 w-15 rounded-sm font-medium transition-all active:scale-95"
                    type="button"
                    
                    onClick={() => {
                      setShowReviewForm(false);
                      setNewReview({ author: "", rating: 0, comment: "" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {newReview.rating === 0 && (
                  <p className="text-sm text-red-600">
                    Please select a rating above before submitting
                  </p>
                )}
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{review.author}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
        </div>
  </div>
</div>
  );
}