"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { Menu, ShoppingCart, User, ChevronDown, LayoutGrid, Laptop, Car, Home, Shirt, Star } from 'lucide-react';
import { TypeAnimation } from "react-type-animation";

import { useCartStore } from "@/components/store/cat-store";

export default function SearchHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  // Filter states synced with URL
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Categories");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "Select Location");
  const [selectedRating, setSelectedRating] = useState<number | null>(
    searchParams.get("rating") ? parseInt(searchParams.get("rating")!) : null
  );

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const cartItemCount = useCartStore((state) => state.cartItemCount);

  const categories = [
    { name: "All Categories", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Electronics", icon: <Laptop className="w-4 h-4" /> },
    { name: "Vehicles", icon: <Car className="w-4 h-4" /> },
    { name: "Real Estate", icon: <Home className="w-4 h-4" /> },
    { name: "Clothing", icon: <Shirt className="w-4 h-4" /> },
  ];

  const locations = ["Addis Ababa", "Bahir Dar", "Dire Dawa", "Mekelle", "Gondar", "Hawassa", "New York"];

  // Update URL with all filters
  const updateFilters = (newQuery?: string, newCategory?: string, newLocation?: string, newRating?: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newQuery !== undefined) {
      if (newQuery.trim()) params.set("query", newQuery);
      else params.delete("query");
    }
    if (newCategory !== undefined) {
      if (newCategory !== "All Categories") params.set("category", newCategory);
      else params.delete("category");
    }
    if (newLocation !== undefined) {
      if (newLocation !== "Select Location") params.set("location", newLocation);
      else params.delete("location");
    }
    if (newRating !== undefined) {
      if (newRating) params.set("rating", newRating.toString());
      else params.delete("rating");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    updateFilters(inputValue);
  };

  // Sync states when URL changes (back/forward navigation)
  useEffect(() => {
    setInputValue(searchParams.get("query") || "");
    setSelectedCategory(searchParams.get("category") || "All Categories");
    setSelectedLocation(searchParams.get("location") || "Select Location");
    setSelectedRating(searchParams.get("rating") ? parseInt(searchParams.get("rating")!) : null);
  }, [searchParams]);

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Logo + Nav + Icons */}
        <div className="flex items-center justify-between h-16">
          {/* ... your existing logo + mobile menu + nav + icons ... */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-1">
              <span className="text-3xl font-extrabold text-blue-600">Et</span>
              <span className="text-3xl font-extrabold text-black">Rent</span>
            </Link>
          </div>

          <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/fax" className="hover:text-blue-600">FAX</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search + Filters Row */}
        <div className="pb-6 pt-4 flex flex-col lg:flex-row gap-4 items-end">
          {/* Search Input */}
          <div className="relative flex-1 max-w-2xl w-full group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-12 pl-12 pr-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder=""
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            
            {inputValue === "" && (
              <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none">
                <TypeAnimation sequence={["Search for Electronics...", 2000, "Search for Vehicles...", 2000]} wrapper="span" className="text-gray-400 text-sm" repeat={Infinity} />
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="h-12 px-8 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-medium whitespace-nowrap"
          >
            Search
          </button>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {/* Category */}
            <div className="relative w-full sm:w-60">
              <button
                onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsLocationOpen(false); setIsRatingOpen(false); }}
                className="flex items-center justify-between w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-500"
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-blue-600" />
                  <span>{selectedCategory}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {isCategoryOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-2xl shadow-xl z-50 py-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsCategoryOpen(false);
                        updateFilters(undefined, cat.name);
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex gap-3"
                    >
                      {cat.icon} <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="relative w-full sm:w-52">
              <button
                onClick={() => { setIsLocationOpen(!isLocationOpen); setIsCategoryOpen(false); setIsRatingOpen(false); }}
                className="flex items-center justify-between w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-500"
              >
                <span>{selectedLocation}</span>
                <ChevronDown className={`w-4 h-4 transition ${isLocationOpen ? "rotate-180" : ""}`} />
              </button>
              {isLocationOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-2xl shadow-xl z-50 py-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                        updateFilters(undefined, undefined, loc);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="relative w-full sm:w-48">
              <button
                onClick={() => { setIsRatingOpen(!isRatingOpen); setIsCategoryOpen(false); setIsLocationOpen(false); }}
                className="flex items-center justify-between w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-500"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{selectedRating ? `${selectedRating} Stars & Up` : "Any Rating"}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition ${isRatingOpen ? "rotate-180" : ""}`} />
              </button>
              {isRatingOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-2xl shadow-xl z-50 py-2">
                  {[5,4,3,2,1].map((num) => (
                    <div
                      key={num}
                      onClick={() => {
                        setSelectedRating(num);
                        setIsRatingOpen(false);
                        updateFilters(undefined, undefined, undefined, num);
                      }}
                      className="px-4 py-3 hover:bg-yellow-50 cursor-pointer flex items-center gap-3"
                    >
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < num ? "text-yellow-500 fill-yellow-500" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span>{num}.0 & Up</span>
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setSelectedRating(null);
                      setIsRatingOpen(false);
                      updateFilters(undefined, undefined, undefined, null);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  >
                    Any Rating
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {/* your mobile links */}
          </div>
        )}
      </div>
    </header>
  );
}