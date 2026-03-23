// components/Adds.tsx
import React from "react";

export interface Add {
  link: string;
  name: string;
  description: string;
}

interface AddsProps {
  adds: Add[];
}

export default function Adds({ adds }: AddsProps) {
  return (
    <div className="flex gap-4 flex-wrap justify-center mb-6">
      {adds.map((add, i) => (
        <div
          key={i}
          className="relative w-[1390px]  h-[150px] aspect-video  overflow-hidden shadow-lg bg-gray-900"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={add.link} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}