"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, User, CreditCard, RotateCcw, Scan, Zap } from "lucide-react";

export function BiometricKYCStep({
  onDataChange,
  isValid,
}: {
  onDataChange: (data: any) => void;
  isValid: (valid: boolean) => void;
}) {
  const [step, setStep] = useState<"face" | "id" | "done">("face");
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- CAMERA CONTROL ---
  const startCamera = async (mode: "user" | "environment") => {
    try {
      // Stop any existing stream before starting a new one
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch((err) => console.error("Video play error:", err));
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Please allow camera access to continue verification.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // --- CAPTURE LOGIC ---
const handleCapture = (setImage: (img: string) => void, nextStepTrigger: () => void) => {
  const video = videoRef.current;
  const canvas = canvasRef.current;
  if (!video || !canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx?.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/png");
  setImage(imageData); // Sets local state
  
  // ✅ This triggers onDataChange in Step2Page, which then calls setBiometric
  // Make sure your useEffect in this component calls onDataChange!
};

// Add/Update this useEffect inside BiometricKYCStep.tsx:
useEffect(() => {
  // Every time a photo is taken, we push the latest images to the parent
  onDataChange({ faceImage, idImage });
  isValid(!!faceImage && !!idImage);
}, [faceImage, idImage]);

  // Clean up camera on component unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  useEffect(() => {
    onDataChange({ faceImage, idImage });
    isValid(!!faceImage && !!idImage);
  }, [faceImage, idImage]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-blue-600" />
          <h2 className="">Identity Verification</h2>
        </div>
        <div className="px-3 py-1 bg-gray-100 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest">
          {step === "face" ? "Step 1/2" : step === "id" ? "Step 2/2" : "Complete"}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {step !== "done" ? (
        <div className="animate-in fade-in duration-500 space-y-6">
          {/* Scanning Viewport */}
          <div className="relative">
            <div className="w-full h-64 bg-gray-950 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative">
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-500 ${stream ? "opacity-100" : "opacity-10"}`}
                autoPlay
                playsInline
                muted
              />
              
              {/* Overlay Visuals */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-44 h-44 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center transition-all ${stream ? "scale-100 opacity-40" : "scale-90 opacity-0"}`}>
                   <div className="w-1 h-full bg-blue-500/20 absolute animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center">
              {!stream ? (
                <button
                  onClick={() => startCamera(step === "face" ? "user" : "environment")}
                  className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 hover:bg-blue-50"
                >
                  <Camera className="w-4 h-4" /> ACTIVATE CAMERA
                </button>
              ) : (
                <button
                  onClick={() => handleCapture(
                    step === "face" ? setFaceImage : setIdImage, 
                    () => setStep(step === "face" ? "id" : "done")
                  )}
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold text-xs shadow-2xl animate-pulse"
                >
                  CAPTURE {step === "face" ? "FACE" : "DOCUMENT"}
                </button>
              )}
            </div>
          </div>

          {/* Guide Card */}
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-3">
             <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                {step === "face" ? <User className="text-blue-500 w-5 h-5" /> : <CreditCard className="text-blue-500 w-5 h-5" />}
             </div>
             <div>
                <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">
                  {step === "face" ? "Center your Face" : "Scan ID Document"}
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  Camera will turn off automatically after successful capture.
                </p>
             </div>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
             <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-black italic">Scan Complete</h3>
          <p className="text-[11px] text-gray-400 mt-1 uppercase">Hardware released. Images saved.</p>
          
          <button 
            onClick={() => { setStep("face"); setFaceImage(null); setIdImage(null); }}
            className="mt-6 flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase tracking-widest"
          >
            <RotateCcw className="w-3 h-3" /> Reset & Retake
          </button>
        </div>
      )}
    </div>
  );
}



