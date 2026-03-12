import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { ArchiveBoxIcon, BellIcon, HeartIcon } from "@heroicons/react/24/outline";

export function Header() {
  return (
    <header className="bg-black text-white p-2 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">

      {/* Logo */}
      <div className="text-lg sm:text-xl font-bold">
        <Link href="/">ETHIOPIAN RENT</Link>
      </div>

   
      <nav className="w-full flex  flex-col sm:flex-row sm:w-auto gap-65 sm:gap-6">
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs sm:text-sm">
          <li><Link href="/home">Home</Link></li>
          <li><Link href="/Notification">Contact</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>

     
      <div className="flex items-center w-full sm:w-64 md:w-80 bg-white rounded border border-white px-2 h-9 sm:h-10">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent text-black placeholder-gray-400 text-xs sm:text-sm md:text-base focus:outline-none"
        />
        <FaSearch className="text-gray-500 text-sm sm:text-base ml-2" />
      </div>

      
      <div className="flex gap-7">
        <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        <ArchiveBoxIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="h-9 w-16 bg-white border border-white rounded-2xl flex items-center justify-center"
      ><text className="text-sm  text-black sm:text-base cursor-pointer">Login</text>
        
      </div>

    </header>
  );
}