"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CartSummary from "@/components/checkout/CartSummary";
import { useCartStore, useCheckoutStore,useAuthStore } from "@/components/store/cat-store";
import { 
  CheckCircle2, 
  User, 
  Calendar, 
  MapPin, 
  Loader2, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck,
  Scan,
  Camera
} from "lucide-react";

export default function CheckoutStep5() {

  

  const { clearCart } = useCartStore();
  
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { personal, rental, biometric, product, rentalDays } = useCheckoutStore();
  const uploadToCloudinary = async (base64Image: string | null) => {
    if (!base64Image) return null;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
   
  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append("upload_preset", uploadPreset!); // ! tells TS it's not null
    const res = await fetch("https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload", { // 👈 Replace with your Cloud name
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };

const handleFinish = async () => {
  if (!product) {
    alert("Please complete all required fields");
    return;
  }

  setLoading(true);

  try {
    // 1. Upload images to Cloudinary
    const faceUrl = await uploadToCloudinary(biometric?.faceImage);
    const idUrl = await uploadToCloudinary(biometric?.idImage);
    const formatToDateTime = (dateStr: string): string => {
      if (!dateStr) return "";
      // If date doesn't have time, add default time (e.g., 10:00:00)
      if (dateStr.length === 10) { // "2026-05-21"
        return `${dateStr}T10:00:00`;
      }
      return dateStr; // already has time
    };

    // 2. Get real userId from auth store
    const { userId: authUserId, token } = useAuthStore.getState();

    if (!authUserId || !token) {
      alert("Please login again");
      router.push("/login");
      return;
    }

    // 3. Prepare payload exactly as your backend expects
    const bookingData = {
      product: { id: product.id },
      userId: authUserId.toString(),
      customerName: personal.name,
      email: personal.email,
      phone: personal.phone,
      fidaId: personal.fid,
      pickupLocation: rental.location,
      receiveDate: formatToDateTime(rental.receiveDate),
      returnDate: formatToDateTime(rental.returnDate),
      rentalDays: rentalDays,
      faceImageUrl: faceUrl,
      idImageUrl: idUrl,
      status: "PENDING",
    };

    // 4. Send to backend
    const response = await fetch("http://localhost:9090/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,   // ← Good practice
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setIsSuccess(true);
      clearCart();
      
      // Optional: clear checkout store too
      useCheckoutStore.getState().clearCheckout();

      setTimeout(() => {
        router.push("/");
      }, 2800);
    } else {
      const errorMsg = await response.text();
      console.error("Booking failed:", errorMsg);
      alert(`Booking failed: ${errorMsg || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-black italic tracking-tight">ORDER PLACED!</h1>
        <p className="text-gray-500 mt-2 font-medium">Verification complete and order secured.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-900">
      <CheckoutStepper step={6} />

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 mt-6 items-stretch">
        
       
        <div className="space-y-4 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-[1.5rem] shadow-md p-6 flex-1 flex flex-col">
            
            <div className="mb-8 flex items-center gap-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight italic uppercase">Final Verification</h2>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Review images and data</p>
              </div>
            </div>

            <div className="space-y-8 flex-1">
              
              {/* 1. PERSONAL DETAILS */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Renter Info</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase">Name</p>
                    <p className="text-xs font-bold">{personal?.name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase">Email</p>
                    <p className="text-xs font-bold truncate">{personal?.email || "—"}</p>
                  </div>
                </div>
              </section>


              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Scan className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[11px]">Identity Verification Photos</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* FACE IMAGE */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-gray-400 ml-1">Face Scan</p>
                    <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-white shadow-sm overflow-hidden relative group">
                      {biometric?.faceImage ? (
                        <img src={biometric.faceImage} alt="Face" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300">
                          <Camera className="w-6 h-6 mb-1" />
                          <span className="text-[8px] font-bold">MISSING</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-gray-400 uppercase ml-1">ID Document</p>
                    <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-white shadow-sm overflow-hidden relative group">
                      {biometric?.idImage ? (
                        <img src={biometric.idImage} alt="ID Card" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-300">
                          <Scan className="w-6 h-6 mb-1" />
                          <span className="text-[8px] font-bold">MISSING</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. RENTAL LOGISTICS */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">Schedule</h3>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                   <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                      <p className="text-xs font-bold text-gray-700">{rental?.location || "Not selected"}</p>
                   </div>
                   <div className="flex justify-between mt-3 pt-3 border-t border-blue-100">
                      <p className="text-[10px] font-medium text-gray-500 uppercase">{rental?.receiveDate}</p>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <p className="text-[10px] font-medium text-gray-500 uppercase">{rental?.returnDate}</p>
                   </div>
                </div>
              </section>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={handleFinish}
              disabled={loading}
              className={`mt-10 w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all shadow-xl ${
                loading ? "bg-gray-100 text-gray-900 cursor-not-allowed shadow-none" : "bg-gray-900 text-white hover:bg-gray-900"
              }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin text-gray-900" /> : "FINISH ORDER & PAY"}
            </button>
          </div>

          <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 group transition-all">
            <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1" /> Edit Terms
          </button>
        </div>

        {/* ================= RIGHT: FINAL CART ================= */}
        <div className="flex flex-col">
          <div className="sticky top-6">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}