"use client";

import { useEffect, useRef, useState } from "react";

export function BiometricKYCStep({
  onDataChange,
  isValid,
}: {
  onDataChange: (data: any) => void;
  isValid: (valid: boolean) => void;
}) {
  const [step, setStep] = useState<"face" | "id" | "done">("face");

  // ✅ STORED VARIABLES
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ================= CAMERA =================
  const startCamera = async (mode: "user" | "environment") => {
    try {
      stream?.getTracks().forEach((t) => t.stop());

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  };

  // ================= CAPTURE =================
  const capture = (
    setImage: (img: string) => void,
    nextStep?: () => void
  ) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/png");
    setImage(image);

    stopCamera();
    nextStep?.();
  };

  // ================= VALIDATION =================
  useEffect(() => {
    onDataChange({ faceImage, idImage });
    isValid(!!faceImage && !!idImage);
  }, [faceImage, idImage]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Identity Verification</h2>

      <canvas ref={canvasRef} className="hidden" />

      {/* ================= FACE ================= */}
      {step === "face" && (
        <div className="border p-6 rounded-lg space-y-4 text-center">

          {/* STATUS */}
          {idImage && (
            <p className="text-green-600 font-semibold">
              ✔ ID taken, now take Face
            </p>
          )}

          <p className="font-semibold">Step 1: Face Verification</p>

          <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startCamera("user")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Open Camera
            </button>

            <button
              onClick={() =>
                capture(setFaceImage, () => setStep("id"))
              }
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Capture Face
            </button>

            {/* RETAKE */}
            {faceImage && (
              <button
                onClick={() => {
                  setFaceImage(null);
                  startCamera("user");
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Retake
              </button>
            )}
          </div>

          {/* PREVIEW */}
          {faceImage && (
            <img
              src={faceImage}
              className="w-32 h-32 mx-auto object-cover rounded-lg border mt-3"
            />
          )}
        </div>
      )}

      {/* ================= ID ================= */}
      {step === "id" && (
        <div className="border p-6 rounded-lg space-y-4 text-center">

          {/* STATUS */}
          {faceImage && (
            <p className="text-green-600 font-semibold">
              ✔ Face taken, now take ID
            </p>
          )}

          <p className="font-semibold">Step 2: ID Verification</p>

          <div className="w-full h-64 bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startCamera("environment")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Open Camera
            </button>

            <button
              onClick={() =>
                capture(setIdImage, () => setStep("done"))
              }
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Capture ID
            </button>

            {/* RETAKE */}
            {idImage && (
              <button
                onClick={() => {
                  setIdImage(null);
                  startCamera("environment");
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Retake
              </button>
            )}
          </div>

          {/* PREVIEW */}
          {idImage && (
            <img
              src={idImage}
              className="w-40 h-28 mx-auto object-cover rounded-lg border mt-3"
            />
          )}
        </div>
      )}

      {/* ================= DONE ================= */}
      {step === "done" && (
        <div className="text-center p-6 border rounded-lg">
          <p className="text-green-600 font-bold text-lg">
            ✔ Verification Completed
          </p>
        </div>
      )}
    </div>
  );
}