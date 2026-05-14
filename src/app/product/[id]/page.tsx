"use client";

import { useCartStore, useCheckoutStore, useReviewStore } from "@/components/store/cat-store";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteStore } from "@/components/store/favorite-store";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/lib/type";
import {Star,Truck,RotateCcw,Heart,ChevronRight,} from "lucide-react";
import ProductTabs from "@/components/ui/ProductTabs";

type TabType = "detail" | "specifications" | "reviews";

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI States

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 0, comment: "" });


  // Store Hooks
  const { reviews, addReview } = useReviewStore();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const setCheckoutProduct = useCheckoutStore((state) => state.setProduct);
  const { cartItems, addToCart, increaseQuantity } = useCartStore();

  
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
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-6 gap-12 mt-20">
  
  {/* Left: Product Image */}
  <div className="bg-white rounded-3xl overflow-hidden h-[500px] lg:h-[650px] border border-gray-100 shadow-sm relative group">
    {product.imageUrl ? (
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain p-8 lg:p-12 transition-transform duration-500 group-hover:scale-105"
        priority
      />
    ) : (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
        No Image Available
      </div>
    )}
  </div>

  {/* Right: Info Section */}
  <div className="flex flex-col gap-6">
    
    <div className="space-y-2">

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>

        <button
          onClick={() => toggleFavorite(product)}
          className="p-2 rounded-2xl border border-gray-400  hover:bg-red-50 hover:border-red-200 transition-all shrink-0"
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              favorites.some(f => f.id === product.id)
                ? "fill-red-500 text-red-500 border-red-500"
                : "text-gray-400 hover:text-red-400"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center gap-2">       
            <Star className="w-4 h-4 fill-black text-black" />
        <span className="text-lg text-black font-medium">
          ({reviews.length }) Rating
        </span>
        <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold ml-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          {product.Situation}
        </span>
      </div>
    </div>
    <div className="pb-6 border-b border-gray-100">
      <div className="text-3xl font-semibold text-black">
        {product.price.toLocaleString()} ETB
        <span className="text-xl font-medium text-gray-700 ml-1">
          /Month
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-1 font-medium italic">
        + {product.deposit?.toLocaleString() || 0} ETB refundable deposit
      </p>
    </div>

    <p className="text-black  text-xl">
      {product.description }
       
    </p>

    <div className="flex flex-col gap-3 mt-4">
      <button
        onClick={handleRentNow}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-xl shadow-blue-100"
      >
        Rent Now
      </button>
      <button
        onClick={handleAddToCart}
        className="w-full py-3 text-gray-600 font-bold hover:text-blue-600 rounded-xl border border-gray-300 hover:bg-gray-300 hover:border-gray-400 transition-colors text-sm "
      >
        Add to cart
      </button>
    </div>
    {/* Trust Features */}
    <div className="mt-4 border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden bg-gray-50/30">
      <div className="flex items-center gap-4 p-4 hover:bg-white transition-colors">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Truck className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">Rapid Delivery</span>
          <span className="text-xs text-gray-500 font-medium">
            Standard shipping in 24-48 hours
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 hover:bg-white transition-colors">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <RotateCcw className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">RentTrust™ Insurance</span>
          <span className="text-xs text-gray-500 font-medium">
            Damage protection included
          </span>
        </div>
      </div>
    </div>

  </div>
</div>
     <ProductTabs product={product} />
    </div>
  );
}