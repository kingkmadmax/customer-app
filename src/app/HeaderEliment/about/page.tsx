"use client";

import { ArrowLeft, Heart, Shield, Truck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";






export default function AboutPage() {
  
  return (
    <div>
     <div>
      <Image
        src={"/BigImage.png"}
        alt={""}
        width={200}
        height={200}
        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
      </div>
    </div>
   
  );
}