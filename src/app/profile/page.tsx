"use client";
import React, { useState } from "react";
import { 
  User, 
  Settings, 
  Heart, 
  Package, 
  LogOut, 
  Camera, 
  MapPin, 
  Calendar,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useFavoriteStore } from "@/components/store/favorite-store";
import Link from "next/link";

export default function ProfilePage() {
  const { favorites } = useFavoriteStore();
  // Changed default to "profile" to match the first button
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 relative bg-gray-100">
                <Image 
                  src="/about.jpg" 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full text-white shadow-lg hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Robelm Mammuset Abebe</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Addis Ababa, ET</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Member since 2025</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                <Settings className="w-4 h-4" /> Edit Profile
              </button>
              <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 space-y-2">
             <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === "profile" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span className="font-bold">Profile Info</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button 
              onClick={() => setActiveTab("rentals")}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === "rentals" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                <span className="font-bold">My Rentals</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button 
              onClick={() => setActiveTab("favorites")}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === "favorites" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-5 h-5 ${activeTab === "favorites" ? "fill-white" : ""}`} />
                <span className="font-bold">Favorites</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === "favorites" ? "bg-blue-400" : "bg-gray-100"}`}>
                {favorites.length}
              </span>
            </button>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            {/* PROFILE INFO TAB */}
            {activeTab === "profile" && (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-xl font-black text-gray-900">Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
                    <p className="font-semibold text-gray-900">Robelm Mammuset Abebe</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold text-gray-900">robelm@example.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="font-semibold text-gray-900">Addis Ababa, ET</p>
                  </div>
                </div>
              </div>
            )}

            {/* RENTALS TAB */}
            {activeTab === "rentals" && (
              <div className="space-y-6">
                <h2 className="text-xl font-black text-gray-900">Current Subscriptions</h2>
                <div className="bg-white border border-gray-200 p-12 rounded-3xl text-center">
                   <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                   <p className="text-gray-500 font-medium">No active rentals found.</p>
                </div>
              </div>
            )}
            
            {/* FAVORITES TAB */}
            {activeTab === "favorites" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-gray-900">Saved Gear</h2>
                  <p className="text-sm text-gray-500">Items you're watching</p>
                </div>

                {favorites.length === 0 ? (
                  <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Your favorites list is empty.</p>
                    <Link href="/shop" className="text-blue-600 font-bold mt-2 inline-block hover:underline">Start Exploring</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map((product) => (
                      <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 group hover:border-blue-200 transition-all">
                        <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={product.image[0]} alt={product.name} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700 font-black">${product.price}/mo</span>
                            <Link href={`/product/${product.id}`} className="text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">View Details</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}