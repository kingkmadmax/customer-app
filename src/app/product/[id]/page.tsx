"use client";

import { useCartStore, useCheckoutStore, useReviewStore } from "@/components/store/cat-store";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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

import { products ,user} from "@/app/data/product";

export interface user{
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

type TabType = "detail" | "specifications" | "reviews";

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState<TabType>("detail");
  const [favorites, setFavorites] = useState<number[]>([]);

  const router = useRouter();
  const { id } = useParams();

  
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const setProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();
  const { reviews, addReview } = useReviewStore();

  const product = products.find((p) => p.id === Number(id));

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

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return product.rating;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews, product.rating]);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

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
    <div className="mt-6 h-full w-full  mb-10 bg-gray-100">
      {/* Main Product Section - unchanged */}
      <div className="flex gap-12 justify-center mt-20">
        {/* Image Section */}
        <div className="flex h-full w-[550px] gap-4 flex-col">
          <div className="relative aspect-square w-[500px] border rounded-xl overflow-hidden border-gray-100 bg-gray-50 shadow-sm">
            <Image
              src={product.image[activeImage]}
              alt={product.name}
              fill
              priority
              quality={95}
              sizes="500px"
              className="object-cover transition-all duration-500"
            />
          </div>

          <div className="flex gap-4 pl-2 h-30 w-[500px] items-center border border-gray-100 overflow-x-auto no-scrollbar">
            {product.image.map((imgSrc: string, index: number) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === index
                    ? "border-black scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={imgSrc} alt={`Thumbnail ${index}`} fill quality={90} sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-5 max-w-md">
          <div className="flex space-x-10">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <button onClick={() => alert("Added to favorites!")}>
              <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>

          <p className="text-3xl font-semibold text-gray-900">${product.price} ETB/month</p>

          <div>
            <p className="text-gray-600">{product.details?.description}</p>
          </div>

          <div className="flex-col space-y-4">
            <button
              onClick={handleAddToCart}
              className="h-10 w-full bg-black text-white rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
            </button>
            <button
              onClick={handleRentNow}
              className="h-10 w-full bg-blue-600 text-white rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              Rent Now
            </button>
          </div>

          {/* Trust Features */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="size-5 mt-0.5 text-gray-600" />
              <div>
                <p className="text-sm">Shipping</p>
                <p className="text-xs text-gray-500">Provides shipping and delivery of the product to the customer.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="size-5 mt-0.5 text-gray-600" />
              <div>
                <p className="text-sm">Insurance</p>
                <p className="text-xs text-gray-500">The customer has all the information about the product and its condition before renting.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="size-5 mt-0.5 text-gray-600" />
              <div>
                <p className="text-sm">Money-Back Guarantee</p>
                <p className="text-xs text-gray-500">If the product doesn't work or is not in the expected condition, we will refund the customer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== TABS ====================== */}
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
                      className="text-sm text-blue-600 hover:underline mt-1"
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Share your experience with this product..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button 
                  className="bg-blue-600 hover:bg-blue-300 text-white h-10 w-30 rounded-xl font-medium transition-all active:scale-95"
                  
                  type="submit" disabled={newReview.rating === 0}>
                    Submit Review
                  </button>
                  <button
                  className="bg-black hover:bg-gray-500 text-white h-10 w-15 rounded-xl font-medium transition-all active:scale-95"
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