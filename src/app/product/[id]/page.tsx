"use client";

import { useCartStore, useCheckoutStore, useReviewStore } from "@/components/store/cat-store";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteStore } from "@/components/store/favorite-store";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/lib/type";
import {
  Star,
  Truck,
  RotateCcw,
  Heart,
  Info,
  List,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

type TabType = "detail" | "specifications" | "reviews";

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI States
  const [selectedTab, setSelectedTab] = useState<TabType>("detail");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);

  // Store Hooks
  const { reviews, addReview } = useReviewStore();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const setCheckoutProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();

  // Fetch product from Backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:9090/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const averageRating = useMemo(() => {
    if (!product) return 0;
    if (reviews.length === 0) return 4.5;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews, product]);

  const handleRentNow = () => {
    if (!product) return;
    setCheckoutProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      deposite: product.deposit || 0,
      image: product.imageUrl || "",
    });
    router.push("/Checkout/checkout");
  };

  const handleAddToCart = () => {
    if (!product) return;
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      increaseQuantity(product.id);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.imageUrl || "",
        price: product.price,
        deposite: product.deposit || 0,
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

  if (loading) return <div className="flex items-center justify-center min-h-screen text-xl animate-pulse">Loading product...</div>;
  if (error || !product) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      <Link href="/" className="text-blue-600 underline mt-4 flex items-center gap-2">
        <ChevronRight className="rotate-180 w-4 h-4" /> Return Home
      </Link>
    </div>
  );

  return (
    <div className="mt-6 h-full w-full mb-10 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 gap-12 mt-20">
        
        {/* Left: Product Image */}
        <div className="flex-1 bg-white rounded-3xl overflow-hidden h-[500px] lg:h-[650px] border border-gray-100 shadow-sm relative group">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-8 lg:p-12 transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">No Image Available</div>
          )}
        </div>

        {/* Right: Info Section */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
              {product.category || "General"}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">({reviews.length || 12} Reviews)</span>
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold ml-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{product.Situation}
              </span>
            </div>
          </div>

          <div className="pb-6 border-b border-gray-100">
            <div className="text-3xl font-black text-black">
              {product.price.toLocaleString()} ETB 
              <span className="text-lg font-medium text-gray-500 ml-1">/month</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 font-medium italic">
              + {product.deposit?.toLocaleString() || 0} ETB refundable deposit
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description || "Premium rental equipment maintained to the highest standards. Perfect for professional and personal use."}
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleRentNow}
                className="flex-[3] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-100"
              >
                Rent Now
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className="flex-1 p-4 rounded-2xl border border-gray-200 hover:bg-red-50 hover:border-red-100 transition-all group flex justify-center"
              >
                <Heart className={`w-6 h-6 transition-colors ${favorites.some(f => f.id === product.id) ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-400"}`} />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-full py-3 text-gray-600 font-bold hover:text-blue-600 transition-colors text-sm uppercase tracking-widest"
            >
              Add to cart
            </button>
          </div>

          {/* Trust Features */}
          <div className="mt-4 border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden bg-gray-50/30">
            <div className="flex items-center gap-4 p-4 hover:bg-white transition-colors">
              <div className="p-2 bg-white rounded-lg shadow-sm"><Truck className="w-5 h-5 text-blue-600" /></div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Rapid Delivery</span>
                <span className="text-xs text-gray-500 font-medium">Standard shipping in 24-48 hours</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 hover:bg-white transition-colors">
              <div className="p-2 bg-white rounded-lg shadow-sm"><RotateCcw className="w-5 h-5 text-blue-600" /></div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">RentTrust™ Insurance</span>
                <span className="text-xs text-gray-500 font-medium">Damage protection included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mt-24 px-6">
        <div className="flex border-b border-gray-200 mb-8 gap-8 overflow-x-auto no-scrollbar">
          {[
            { id: "detail", name: "Product Details", icon: Info },
            { id: "specifications", name: "Technical Specs", icon: List },
            { id: "reviews", name: `Reviews (${reviews.length})`, icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as TabType)}
              className={`pb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedTab === tab.id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[300px] bg-white rounded-3xl p-8 border border-gray-50 shadow-sm">
          {selectedTab === "detail" && (
            <div className="max-w-3xl space-y-4 animate-in slide-in-from-bottom-2">
              <h3 className="text-xl font-bold text-gray-900">About this product</h3>
              <p className="text-gray-600 leading-relaxed">{product.description || "No detailed description provided."}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                 <div className="p-4 bg-gray-50 rounded-xl">
                   <p className="text-xs text-gray-400 font-bold uppercase">Condition</p>
                   <p className="font-bold text-gray-800">{product.condition || "Mint Condition"}</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl">
                   <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                   <p className="font-bold text-gray-800">{product.location || "Addis Ababa"}</p>
                 </div>
              </div>
            </div>
          )}

          {selectedTab === "specifications" && (
            <div className="animate-in slide-in-from-bottom-2">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-500 w-1/3">Model</td><td className="py-4 text-gray-800">{product.name}</td></tr>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-500">Category</td><td className="py-4 text-gray-800">{product.category}</td></tr>
                  <tr className="border-b border-gray-50"><td className="py-4 font-bold text-gray-500">Availability</td><td className="py-4 text-green-600 font-bold">In Stock</td></tr>
                  <tr><td className="py-4 font-bold text-gray-500">Min Rental Period</td><td className="py-4 text-gray-800">1 Month</td></tr>
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
                  className="px-6 py-2 bg-black text-white rounded-xl text-sm font-bold"
                >
                  {showReviewForm ? "Cancel" : "Write Review"}
                </button>
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="p-3 rounded-xl border-none ring-1 ring-gray-200"
                      value={newReview.author}
                      onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                    />
                    <div className="flex items-center gap-2 px-3">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-5 h-5 cursor-pointer ${(hoverRating || newReview.rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setNewReview({...newReview, rating: star})}
                        />
                      ))}
                    </div>
                  </div>
                  <textarea 
                    placeholder="Tell others about your rental experience..."
                    className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 min-h-[100px]"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  />
                  <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100">Submit Feedback</button>
                </form>
              )}

              <div className="space-y-6">
                {reviews.length > 0 ? reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-50 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="font-bold text-sm">{review.author}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                )) : (
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
    </div>
  );
}