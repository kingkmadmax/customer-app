import Image from "next/image";
import Link from "next/link";
import { notifications } from "@/app/Pages/Navigations/Notification/Notification"; // Adjust import path as needed

export default function NotificationPage() {
  return (
    // MAIN CONTAINER: White background, 100vh height
    <div className="min-h-screen text-gray-900 flex flex-col items-center">
      
      {/* 1. BREADCRUMB SECTION (Top Left) */}
      <section className="w-full max-w-7xl mx-auto px-6 py-6 border-b border-gray-100">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link href="/" className="text-gray-400 hover:text-blue-600 transition">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium">Notification</span>
        </nav>
      </section>

      {/* 2. NOTIFICATIONS LIST CONTAINER */}
      <main className="w-full max-w-5xl mx-auto px-6 pt-12 pb-24 flex-grow">
        <div className="flex flex-col gap-6">
          {notifications.map((notif) => (
            
            // INDIVIDUAL NOTIFICATION ITEM (Row)
            <div 
              key={notif.id} 
              className="flex justify-between gap-6 hover:bg-gray-50 p-2 rounded-xl transition group"
            >
              {/* LEFT GROUP: Image + Content */}
              <div className="flex gap-4 items-start">
                
                {/* IMAGE CONTAINER with Badge */}
                <div className="relative flex-shrink-0 w-12 h-12">
                  <Image
                    src={notif.image}
                    alt={notif.type}
                    fill
                    className="object-cover rounded-full border border-gray-100 shadow-inner"
                  />
                  {/* Optional Orange Badge */}
                  {notif.badgeCount && (
                    <div className="absolute -top-1 -right-1 bg-[#F19F4B] text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                      {notif.badgeCount}
                    </div>
                  )}
                </div>

                {/* CONTENT AREA: Title + Description */}
                <div className="flex flex-col gap-1 max-w-xl">
                  <h3 className="font-bold text-base text-gray-950 uppercase tracking-wide group-hover:text-blue-900 transition-colors">
                    {notif.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {notif.description}
                  </p>
                </div>
              </div>

              {/* RIGHT GROUP: Time Ago */}
              <div className="flex-shrink-0 pt-1 text-right">
                <p className="text-xs text-gray-300 group-hover:text-gray-500 transition-colors">
                  {notif.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. FOOTER BUTTON (Centered) */}
      <footer className="w-full max-w-7xl mx-auto pb-16 flex justify-center mt-auto">
        <Link 
          href="/"
          className="bg-[#0084FF] text-white px-10 py-4 rounded-xl font-medium text-base hover:bg-blue-700 transition transform active:scale-95 shadow-md shadow-blue-100"
        >
          Back to home page
        </Link>
      </footer>
    </div>
  );
}