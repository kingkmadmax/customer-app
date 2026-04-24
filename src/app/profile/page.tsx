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
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen pb-20 text-black">
      {/* HEADER SECTION - Clean & Flat */}
      <div className="border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50">
                <Image 
                  src="/about.jpg" 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-black p-2 rounded-full text-white shadow-md hover:bg-gray-800 transition-colors border-2 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold tracking-tight">Robelm Mammuset Abebe</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500 text-sm">
                <span className="flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4" /> Addis Ababa, ET</span>
                <span className="flex items-center gap-1.5 font-medium"><Calendar className="w-4 h-4" /> Member since 2025</span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-white border border-gray-300 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                <Settings className="w-4 h-4" /> Edit Profile
              </button>
              <button className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors shadow-sm">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
          
          {/* SIDEBAR - Matches Simple Tab Design */}
          <aside className="space-y-3">
            {[
              { id: "profile", label: "Profile Info", icon: User },
              { id: "rentals", label: "My Rentals", icon: Package },
              { id: "favorites", label: "Favorites", icon: Heart },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  activeTab === tab.id 
                    ? "border-black bg-black text-white shadow-lg" 
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id && tab.id === 'favorites' ? 'fill-white' : ''}`} />
                  <span className="font-bold text-sm">{tab.label}</span>
                </div>
                {tab.id === "favorites" ? (
                   <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${activeTab === tab.id ? "bg-white text-black" : "bg-gray-100"}`}>
                    {favorites.length}
                   </span>
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-50" />
                )}
              </button>
            ))}
          </aside>

          {/* MAIN CONTENT - Simple Card Style */}
          <main>
            {activeTab === "profile" && (
              <div className="bg-white p-8 border border-gray-300 rounded-xl shadow-xl space-y-8">
                <div>
                  <h2 className="text-xl font-bold">Account Details</h2>
                  <p className="text-gray-500 text-sm">Review your personal information</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">First name</p>
                    <p className="font-bold border-b border-gray-100 pb-2">Robelm </p>
                  </div>
                    <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">last name</p>
                    <p className="font-bold border-b border-gray-100 pb-2">mamsuhet</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="font-bold border-b border-gray-100 pb-2">robelm@example.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                    <p className="font-bold border-b border-gray-100 pb-2">+251 900 000 000</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="font-bold border-b border-gray-100 pb-2">Addis Ababa, Ethiopia</p>
                      <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">passwerd</p>
                    <p className="font-bold border-b border-gray-100 pb-2">Robelm </p>
                  </div>
                  </div>
                </div>
              </div>
            )}

            {/* RENTALS TAB */}
            {activeTab === "rentals" && (
              <div className="bg-white p-12 border border-gray-300 rounded-xl shadow-xl text-center space-y-4">
                 <Package className="w-12 h-12 text-gray-200 mx-auto" />
                 <div>
                    <h3 className="font-bold text-lg">No Rentals Yet</h3>
                    <p className="text-gray-500 text-sm">When you rent equipment, it will appear here.</p>
                 </div>
                 <Link href="/shop" className="inline-block px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Gear
                 </Link>
              </div>
            )}
            
            {/* FAVORITES TAB */}
            {activeTab === "favorites" && (
              <div className="space-y-6">
                <div className="flex items-end justify-between px-2">
                  <h2 className="text-xl font-bold">Saved Items</h2>
                  <span className="text-sm text-gray-400 font-medium">{favorites.length} items</span>
                </div>

                {favorites.length === 0 ? (
                  <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-16 text-center">
                    <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">Your favorites list is empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map((product) => (
                      <div key={product.id} className="bg-white p-4 border border-gray-300 rounded-xl shadow-md flex gap-4 hover:border-black transition-all group">
                        <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                          <Image 
                            src={product.image?.[0] || "/placeholder.png"} 
                            alt={product.name} 
                            fill 
                            className="object-contain p-2" 
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">{product.category}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-black text-blue-600">${product.price}/mo</span>
                            <Link href={`/product/${product.id}`} className="text-[10px] font-black uppercase text-gray-400 group-hover:text-black border-b border-transparent group-hover:border-black transition-all">
                              View Gear
                            </Link>
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