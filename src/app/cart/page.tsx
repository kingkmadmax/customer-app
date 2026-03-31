"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/components/store/cat-store";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage() {
  const router = useRouter();

  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();

  const [isEditing, setIsEditing] = useState(false);

  // Status color function
  const getStatusStyle = (status: string = "accepted") => {
    const s = status.toLowerCase();
    if (s === "accepted") return "bg-green-100 text-green-700 px-4 py-1 rounded-2xl text-sm font-semibold";
    if (s === "pending")  return "bg-yellow-100 text-yellow-700 px-4 py-1 rounded-2xl text-sm font-semibold";
    if (s === "declined") return "bg-red-100 text-red-700 px-4 py-1 rounded-2xl text-sm font-semibold";
    return "bg-gray-100 text-gray-700 px-4 py-1 rounded-2xl text-sm font-semibold";
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.1;
  const finalTotal = subtotal + serviceFee;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      
      

      {/* Cart Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[750px] font-medium">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className=" py-5 px-10 w-130 text-left font-semibold text-sm text-gray-600 w-64">Product Name</th>
              <th className="py-5 px-6 text-center font-semibold text-gray-600 w-32">Quantity</th>
              <th className="py-5 px-6 text-right font-semibold text-gray-600">Price</th>
              <th className="py-5 px-6 text-center font-semibold text-gray-600 w-40">Status</th>
              {isEditing && (
                <th className="py-5 px-6 text-center font-semibold text-gray-600 w-20">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan={isEditing ? 5 : 4} className="py-20 pr-20 text-center text-gray-500 text-sm">
                  Your cart is empty
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                  
                  {/* 1. Image + Name (Aligned on same line) */}
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base leading-tight line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          ${item.price.toFixed(2)} / week
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 2. Quantity */}
                  <td className="py-6 px-6">
                    <div className="flex items-center justify-center gap-3">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 active:scale-95 transition"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <div className="font-semibold text-lg min-w-[32px] text-center">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 active:scale-95 transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <span className="font-semibold text-lg">{item.quantity}</span>
                      )}
                    </div>
                  </td>

                  {/* 3. Price */}
                  <td className="py-6 px-6 text-right font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>

                  {/* 4. Status */}
                  <td className="py-6 px-6 text-center">
                    <span className={getStatusStyle(item.status || "accepted")}>
                      {(item.status || "Accepted").toUpperCase()}
                    </span>
                  </td>

                  {/* 5. Delete Button */}
                  {isEditing && (
                    <td className="py-6 px-6 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 p-2 transition hover:scale-110"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-between sm:flex-row   mt-15">
        <button
          onClick={() => router.push("/checkout")}
          disabled={cartItems.length === 0}
          className="flex-1 sm:flex-none w-50 h-10 bg-black text-white rounded-xl font-bold text-sm hover:bg-white hover:border border-black hover:text-black transition disabled:bg-gray-400"
        >
          Go to Checkout
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex-1 sm:flex-none w-50 h-10 border-2 border-gray-300 rounded-3xl font-bold text-sm hover:bg-gray-50 transition"
        >
          {isEditing ? "Done Editing" : "Update Cart"}
        </button>
      </div>

      {/* Summary Box */}
      {cartItems.length > 0 && (
        <div className="mt-10 flex justify-center">
          <div className="bg-white border border-gray-500 rounded-xl p-8 w-[500px] shadow-md">
            <h3 className="text-2xl font-bold text-center mb-8">Order Summary</h3>
  

            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-900">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between   border-t border-gray-200 pt-4 mt-2">
                <span className="text-gray-900">Service Fee (10%)</span>
                <span className="font-semibold text-green-600">+${serviceFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-400"> </div>

            <p className="text-center text-sm text-gray-800 mt-8">
              payment well not be refundee after payment
            </p>
          </div>
        </div>
      )}
    </div>
  );
}