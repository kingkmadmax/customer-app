"use client";



import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { MapPinIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import { ShoppingCart, Search, Menu, User, Package } from 'lucide-react';

import { usePathname } from "next/navigation";
import {useLocationStore} from "@/components/store/location-store"
import { useCartStore } from "@/components/store/cat-store"

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


export  function Header(){
  const pathname = usePathname();
 const isSearchPage = pathname.startsWith("/search");

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen,setMobileMenuOpen] =useState(false);
  const [inputValue, setInputValue] = useState("");
  const selectedLocation = useLocationStore(
  (state) => state.selectedLocation
);

const setSelectedLocation = useLocationStore(
  (state) => state.setSelectedLocation);
  const cartItemCount = useCartStore(
    (state) => state.cartItemCount
  );

   const currentLocation = locations.find((loc) => loc.value === selectedLocation) || locations[0];

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

  return(
    <header className='sticky top-0 z-50 w-full border-gray-500 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
     
     {isSearchPage ? (
        // 🔍 SEARCH HEADER
        <SearchHeader />
      ) : (
        // 🏠 NORMAL HEADER
             <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div  className="flex items-center gap-6">
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

              {/* Location + Search */}
              <div className="flex items-center ">

                {/* Location Dropdown */}
                <div className="relative location-dropdown xl:min-w-[150px]">
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
                      className="absolute right-4 top-1/2  -translate-y-1/2 text-gray-500"
                        >
                    <FaSearch />
                    </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-r-full border border-gray-300 bg-gray-100 focus:outline-none"
                  />

                  {inputValue === "" && (
                    <TypeAnimation  
                    className="lift-2"
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

              <nav className="hidden lg:flex gap-6">
                  
                  <Link className="text-sm hover:text-primary transition-colors"  href="/HeaderEliment/about">
                        About
                  </Link>
                  <Link  className="text-sm hover:text-primary transition-colors" href="/HeaderEliment/contact">
                        Conteact
                  </Link>
                  <Link className="text-sm hover:text-primary transition-colors" href="/HeaderEliment/Fax">
                        FAX
                  </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <button
                
                  className="p-2 hover:bg-muted rounded-lg transition-colors hidden md:block"
                  title="My Account"
                >
                <User className="h-6 w-6" />
                </button>
              </Link>
            

              <Link href="/cart">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            
            {/* CART ICON */}
                    <ShoppingCart className="w-6 h-6" />

            {/* BADGE */}
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItemCount}
                        </span>
                      )}
                  </button>
              </Link>
              
              
            </div>
          </div>
          {mobileMenuOpen&&(
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col gap-3">
              
                  <Link className="text-sm hover:text-primary transition-colors"   href="/HeaderEliment/about">
                        About
                  </Link>
                  <Link  className="text-sm hover:text-primary transition-colors" href="/HeaderEliment/contact">
                        Contact
                  </Link>
                  <Link className="text-sm hover:text-primary transition-colors" href="/HeaderEliment/Fax">
                        FAX
                  </Link>
              
            </nav>
            </div>
          )}

        </div>
      )}

     

    </header>
  )
}