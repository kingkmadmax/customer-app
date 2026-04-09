"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import { ShoppingCart, Menu, User } from "lucide-react";

import { useLocationStore } from "@/components/store/location-store";
import { useCartStore } from "@/components/store/cat-store";
import SearchHeader from "@/app/search/SearchHeader";

type Location = { value: string; label: string; };

const locations: Location[] = [
  { value: "Addis Ababa", label: "Addis Ababa" },
  { value: "Bahir Dar", label: "Bahir Dar" },
  { value: "Dire Dawa", label: "Dire Dawa" },
  { value: "Mekelle", label: "Mekelle" },
  { value: "Gondar", label: "Gondar" },
  { value: "Hawassa", label: "Hawassa" },
];

export function Header() {
  const pathname = usePathname();
  const hideHeaderRoutes = [
    "/Pages/auth/SignUp", 
  "/Pages/auth/LogIn", 
  "/Pages/auth/PaswordRest"];
  if (hideHeaderRoutes.includes(pathname)) {
    return null;
  }
  const isSearchPage = pathname.startsWith("/search");
  const router = useRouter();

  // 1. Create unique refs for each dropdown/menu
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // New ref for mobile nav

  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSelectedLocation = useLocationStore((state) => state.setSelectedLocation);
  const cartItemCount = useCartStore((state) => state.cartItemCount);

  
  // 2. Updated click-outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close User Dropdown
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
      // Close Location Dropdown
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
      // Close Mobile Menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLocation = locations.find((loc) => loc.value === selectedLocation) || locations[0];

  const menuItems = [
    { label: "Profile", action: () => router.push("/profile") },
    { label: "Settings", action: () => router.push("/settings") },
    { label: "Logout", action: () => router.push("/Pages/auth/LogIn") },
  ];

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    router.push(`/search?query=${encodeURIComponent(inputValue)}&location=${selectedLocation}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur">
      {isSearchPage ? (
        <SearchHeader />
      ) : (
        <div className="w-full px-2 sm:px-4">
          <div className="flex items-center justify-between gap-2 py-2 max-w-[1400px] mx-auto">
            
            {/* LEFT: Menu + Logo */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Attach ref to mobile button container if you want clicking the button to behave correctly */}
              <div ref={mobileMenuRef} className="lg:hidden">
                <button className="p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              <Link href="/" className="flex items-center gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">Et</span>
                <span className=" xs:block text-2xl sm:text-3xl font-extrabold text-black">Rent</span>
              </Link>
            </div>

            {/* CENTER: SEARCH + LOCATION */}
            <div className="flex flex-1 items-center min-w-0 max-w-2xl mx-1 sm:mx-4">
              <div ref={locationDropdownRef} className="relative shrink-0 hidden sm:block">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="h-9 border border-gray-300 rounded-l-full flex items-center px-3 bg-white hover:bg-gray-50 border-r-0 w-[100px] md:w-[130px]"
                >
                  <MapPinIcon className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
                  <span className="text-xs truncate">{currentLocation.label}</span>
                </button>
                {isOpen && (
                  <div className="absolute top-full left-0 w-40 bg-white border rounded-xl shadow-lg mt-1 z-50">
                    {locations.map((loc) => (
                      <button
                        key={loc.value}
                        onClick={() => { setSelectedLocation(loc.value); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xs"
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full h-9 pl-9 pr-9 border border-gray-300 rounded-full sm:rounded-l-none sm:rounded-r-full bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                />
                <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaSearch className="w-3.5 h-3.5" />
                </button>
                {inputValue === "" && (
                  <div className="absolute inset-0 flex items-center pointer-events-none pl-9 pr-9 overflow-hidden">
                    <TypeAnimation
                      sequence={["Search Electronics...", 2000, "Search Vehicles...", 2000]}
                      wrapper="span"
                      repeat={Infinity}
                      className="text-gray-400 text-xs sm:text-sm whitespace-nowrap"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Nav + Account + Cart */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                  <div className="flex items-center gap-1 sm:gap-3 shrink-0">
  {/* Added items-center to the nav to keep the button and text on one line */}
                    <nav className="hidden xl:flex items-center gap-6 mr-2">
                      <Link href="/about" className="text-xs font-medium hover:text-blue-600">
                        About
                      </Link>
                      <Link href="/HeaderEliment/Fax" className="text-xs font-medium hover:text-blue-600">
                        FAQs
                      </Link>
                      <Link href="/HeaderEliment/contact" className="text-xs font-medium hover:text-blue-600">
                        Contact
                      </Link>
                      
                      {/* The Button */}
                      <div className=" px-4 py-1 rounded-full flex hover:bg-gray-200 items-center justify-center ml-2">
                        <Link 
                          href="/HeaderEliment/renter" 
                          className="text-sm font-semibold   transition-colors whitespace-nowrap"
                        >
                          How to be a Renter
                        </Link>
                      </div>
                    </nav>
                  </div>

              <div ref={userDropdownRef} className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border py-2 z-50">
                    {menuItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { item.action(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xs text-gray-700"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/cart">
                <div className="relative p-1.5 hover:bg-gray-100 rounded-full">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-2 bg-white">
              {/* Note: I removed the extra refs from here and moved mobileMenuRef to the button wrapper above */}
              <nav className="flex flex-col px-4 text-sm">
                <Link href="/about" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/HeaderEliment/renter" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Merchant</Link>
                <Link href="/HeaderEliment/Fax" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
                <Link href="/HeaderEliment/contact" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              </nav>
            </div>
          )}
        </div>
      )}
    </header>
  );
}