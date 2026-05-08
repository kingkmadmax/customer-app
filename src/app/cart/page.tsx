"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/components/store/cat-store"; 
import { Plus, Minus, Trash2, ShoppingCart, Loader2, Edit3, Check } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/lib/type";

export default function CartPage() {
  const { token, userId } = useAuthStore(); // Get Auth details

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE = "http://localhost:9090/api/cart";

  // 1. Fetch Cart directly from DB
  const fetchCart = async () => {
    if (!token || !userId) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}?userId=${userId}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      const data = await res.json();
      setCartItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token, userId]);

  // 2. Handle Quantity Changes
  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await fetch(`${API_BASE}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      });
      fetchCart(); // Re-sync with Database
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Handle Removal
  const removeItem = async (id: number) => {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Re-sync with Database
    } catch (err) {
      console.error(err);
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.1;
  const finalTotal = subtotal + serviceFee;

  if (loading) return <div className="py-40 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="text-blue-600" /> Your Rental Cart
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isEditing ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {isEditing ? <><Check size={16}/> Done</> : <><Edit3 size={16}/> Edit Cart</>}
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-3xl bg-gray-50">
          <ShoppingCart className="mx-auto mb-4 text-gray-300" size={60} />
          <p className="text-gray-500 text-lg mb-6">Your cart is currently empty</p>
          <Link href="/" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Start Renting
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* TABLE SECTION */}
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="py-4 px-6 text-left text-xs font-semibold uppercase text-gray-500">Product</th>
                  <th className="py-4 px-6 text-center text-xs font-semibold uppercase text-gray-500">Quantity</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold uppercase text-gray-500">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden border bg-gray-100">
                          <Image
                            src={Array.isArray(item.image) ? item.image[0] : item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.price.toLocaleString()} ETB / day</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex justify-center items-center gap-4">
                        {isEditing ? (
                          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg border">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Minus size={14}/></button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white rounded shadow-sm transition"><Plus size={14}/></button>
                          </div>
                        ) : (
                          <span className="font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6 text-right relative">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} ETB</span>
                        {isEditing && (
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1 text-xs"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SUMMARY SECTION */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Rental Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{subtotal.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (10%)</span>
                  <span className="font-semibold">{serviceFee.toLocaleString()} ETB</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-black text-gray-900">
                  <span>Total</span>
                  <span>{finalTotal.toLocaleString()} ETB</span>
                </div>
              </div>

              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition transform active:scale-95 shadow-lg shadow-blue-100">
                Proceed to Checkout
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 italic">
                * Taxes and specific rental deposits calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}