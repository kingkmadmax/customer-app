"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import { ShoppingCart, Menu, User } from 'lucide-react';

import { usePathname } from "next/navigation";
import { useLocationStore } from "@/components/store/location-store";
import { useCartStore } from "@/components/store/cat-store";

import SearchHeader from "@/app/search/SearchHeader";

type Location = {
  value: string;
  label: string;
};

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
  const isSearchPage = pathname.startsWith("/search");

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);           // Location dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Account dropdown

  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSelectedLocation = useLocationStore((state) => state.setSelectedLocation);
  const cartItemCount = useCartStore((state) => state.cartItemCount);

  const currentLocation = locations.find((loc) => loc.value === selectedLocation) || locations[0];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems = [
    { label: 'Profile', action: () => alert('Go to Profile') },
    { label: 'Settings', action: () => alert('Go to Settings') },
    { label: 'Logout', action: () => alert('Logged out') },
  ];

  const handleSelect = (value: string) => {
    setSelectedLocation(value);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    router.push(
      `/search?query=${encodeURIComponent(inputValue)}&location=${selectedLocation}`
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {isSearchPage ? (
        <SearchHeader />
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Left Side: Logo + Location + Search */}
            <div className="flex items-center gap-6">
              <button
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-4xl font-extrabold text-blue-600">Et</span>
                  <span className="text-4xl font-extrabold text-black">Rent</span>
                </Link>

                {/* Location + Search Bar */}
                <div className="flex items-center">
                  {/* Location Dropdown */}
                  <div className="relative xl:min-w-[150px]">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full h-10 border border-gray-300 rounded-l-full flex items-center px-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <div className="text-left">
                          <p className="text-xs text-gray-400">Location</p>
                          <p className="text-[13px] font-medium text-black truncate">
                            {currentLocation.label}
                          </p>
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 max-h-60 overflow-auto">
                        {locations.map((location) => (
                          <button
                            key={location.value}
                            onClick={() => handleSelect(location.value)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 flex items-center gap-2 ${
                              selectedLocation === location.value ? "bg-gray-100 font-medium" : ""
                            }`}
                          >
                            {location.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="relative flex-1 min-w-[180px] md:min-w-[300px]">
                    <button
                      onClick={handleSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <FaSearch />
                    </button>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full h-10 pl-10 pr-4 rounded-r-full border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      
                    />

                    {inputValue === "" && (
                      <TypeAnimation
                        sequence={[
                          "Search for Electronics...", 2000,
                          "Search for Vehicles...", 2000,
                          "Search for Clothing...", 2000,
                        ]}
                        wrapper="span"
                        cursor
                        repeat={Infinity}
                        style={{
                          position: "absolute",
                          left: "2.5rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "gray",
                          pointerEvents: "none",
                          fontSize: "0.875rem",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Navigation + Account + Cart */}
            <div className="flex items-center gap-6">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex gap-6">
                <Link href="/HeaderEliment/about" className="text-sm hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/HeaderEliment/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link href="/HeaderEliment/Fax" className="text-sm hover:text-primary transition-colors">
                  FAX
                </Link>
              </nav>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block"
                  title="My Account"
                >
                  <User className="h-6 w-6" />
                </button>

                {/* Account Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[60]">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-3 hover:bg-gray-100 text-gray-700 hover:text-blue-600 transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4">
              <nav className="flex flex-col gap-3 px-4">
                <Link href="/HeaderEliment/about" className="text-sm hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/HeaderEliment/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link href="/HeaderEliment/Fax" className="text-sm hover:text-primary transition-colors">
                  FAX
                </Link>
              </nav>
            </div>
          )}
        </div>
      )}
    </header>
  );
}