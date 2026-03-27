"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaSearch } from "react-icons/fa";
import { ArchiveBoxIcon, BellIcon, HeartIcon } from "@heroicons/react/24/outline";

export function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white w-full flex justify-between items-center px-6 py-3">

      {/* LEFT (Logo) */}
      <div className="text-lg">
        <Link href="/">ETHIOPIAN RENT</Link>
      </div>

      {/* RIGHT (Everything together) */}
      <div className="flex items-center gap-6">

        {/* NAV */}
        <nav>
          <div className="flex gap-5 text-sm items-start relative">

            {/* Categories with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center "
              >
                Categories
                <ChevronDownIcon
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="absolute top-full left-0 mt-1 bg-black text-white rounded shadow w-48 z-50">
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] transition-all duration-200">
                    Electronics
                  </div>
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)]  hover:bg-white/10 transition-all duration-200">
                    Vehicles
                  </div>
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] hover:bg-white/10 transition-all duration-200">
                    Clothing
                  </div>
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] hover:bg-white/10 transition-all duration-200">
                    Office Equipment
                  </div>
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] hover:bg-white/10 transition-all duration-200">
                    Tools
                  </div>
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] hover:bg-white/10 transition-all duration-200">
                    House
                  </div>
                  <div className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:bg-[linear-gradient(to_left,#005cff,#007afc,#008be5,#0096c7,#369dac,#2b9aaa,#1c96a8,#0093a6,#0083bf,#006fda,#0052e7,#040dd5)] hover:bg-white/10 transition-all duration-200">
                    Event Supplies
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            <div>
              <Link href="/notification" className="">
                Contact
              </Link>
            </div>

            <div>
              <Link href="/about" className="">
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* SEARCH */}
        <div className="flex rounded-3xl items-center bg-transparent px-3 h-10 w-[400px] gap-2 border focus-within:bg-white focus-within:ring-2 focus-within:ring-black">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-black placeholder-gray-400 focus:outline-none text-sm"
          />
          <Link href="/search">
            <FaSearch className="text-gray-500 text-sm" />
          </Link>
        </div>

        {/* ICONS */}
        <div className="flex gap-4">
          <HeartIcon className="w-5 h-5" />
          <ArchiveBoxIcon className="w-5 h-5" />
          <BellIcon className="w-5 h-5" />
        </div>

        {/* LOGIN */}
        <button className="bg-white text-black w-20 h-10 rounded-3xl text-sm flex items-center justify-center border-2 hover:bg-gray-200 transition">
          Login
        </button>

      </div>
    </header>
  );
}