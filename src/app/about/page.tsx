"use client";

import { ArrowLeft, Heart, Shield, Truck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import ScrollReveal from "@/components/homepage/scrool";

export default function AboutPage() {
  return (
    <main className="w-full">
      <div className="relative w-full h-[710px] bg-black">
        <Image
          src="/BigImage.png"
          alt="Hero background"
          fill
          className="object-cover brightness-50"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-[100px] font-bold leading-tight tracking-tighter">
            About Us
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg md:text-2xl opacity-90">
            From preschool to pre-tertiary, our students enjoy fun, interactive and 
            relevant lessons and are empowered to think beyond the confines of the classroom.
          </p>

          <button className="mt-8 rounded-[10px] bg-blue-500 w-[150px] h-12 text-white font-semibold hover:bg-blue-600 transition shadow-lg">
            See more
          </button>
        </div>
      </div>

      <div className="mt-20 px-4 mb-20">
        <div className="flex flex-col gap-8 items-center justify-center max-w-7xl mx-auto text-center">
          <h2 className="text-black text-3xl md:text-5xl font-semibold leading-snug">
            Preparing to offer a product that will be a quality status
          </h2>
          
          <div className="relative">
             <Image
              src="/Group.png"
              alt="Quality Group Icon"
              height={80}
              width={400}
              className="object-contain"
            />
          </div>
        </div>
       

      </div>
      {/* "the main contener" */}
      
       <div className="flex flex-col gap-20 justify-center w-full px-6 md:px-10 max-w-[1250px] mx-auto mt-10">
         <ScrollReveal>
          <div className="flex items-center justify-center  w-full max-w-[1250px] min-h-[350px] p-8 md:p-12">
            
            {/* Added w-full and gap so justify-between actually works */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-10">
              
              {/* Column 1 */}
              <div className="w-full md:w-[500px]">
               <div className="flex flex-col gap-3 pb-6 mb-6 relative">
                  <h3 className="text-black text-2xl md:text-4xl font-semibold leading-tight">
                    Passionate renters That provide good product
                  </h3>

                  {/* Half-width blue underline */}
                  <div 
                    className="absolute bottom-0 left-0 w-1/2 h-[3px] bg-blue-600 rounded"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Renting offers a flexible alternative, allowing you to enjoy the benefits ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. By choosing to rent rather than commit long-term, you can avoid unnecessary burdens while still experiencing the same level of satisfaction and convenience that comes with temporary access, whenever the need arises, without carrying the full weight of permanent ownership.
                </p>
                  <button className="mt-3 relative z-10 rounded-[10px] bg-blue-500 w-[242px] h-[53px] text-black font-semibold hover:bg-blue-600 transition shadow-lg">
                    View More
                    <div className="absolute top-1/4 -right-5 w-20 h-20 bg-white rounded-full z-0 pointer-events-none transition-transform group-hover:scale-110"></div>
                  </button>
                
              </div>

              {/* Column 2 */}
              <div className="w-full md:w-[400px] h-[300px] relative">
          {/* Background Vector */}
            <Image
              src="/abute/Vector.png"
              alt="Background"
              height={500}
              width={453.71}// Using fill is better for relative parents
              className="object-cover "
            />

            {/* Content Overlay - Aligned Left */}

              <Image
                src="/abute/Polygon 24.png"
                alt="Polygon"
                height={560}
                width={500}
                className="absolute  flex flex-col ml-10 -top-4 -left-8  p-6" // Keeps the shape perfectly intact
              />

                <Image
            src="/abute/Start.png"
            alt="Vector"
            height={70}
            width={60}
            className="absolute top-3 left-10 object-contain"
          />

          {/* 4. Frame (1) - Pushed OUT to the bottom-right */}
          <Image
            src="/abute/frame (1).png"
            alt="Frame"
            height={67}
            width={180}
            className="absolute -bottom-20 -right-10 object-contain"
          />

          {/* 5. Frame - Pushed OUT to the top-right */}
          <Image
            src="/abute/frame.png"
            alt="Frame Small"
            height={20}
            width={30}
            className="absolute top-5 right-20 object-contain"
          />


        </div>

            </div>
          </div>
         </ScrollReveal>
           <ScrollReveal>
            <div className="flex items-center justify-center  w-full max-w-[1250px] min-h-[350px] p-8 md:p-12">
            
            {/* Added w-full and gap so justify-between actually works */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-10">
              
              {/* Column 1 */}

               <div className="w-full md:w-[400px] h-[300px] relative">
          {/* Background Vector */}
            <Image
              src="/abute/Vector.png"
              alt="Background"
              height={500}
              width={453.71}// Using fill is better for relative parents
              className="object-cover "
            />

            {/* Content Overlay - Aligned Left */}

              <Image
                src="/abute/Polygon 27.png"
                alt="Polygon"
                height={560}
                width={500}
                className="absolute  flex flex-col ml-10 -top-4 -left-8  p-6" // Keeps the shape perfectly intact
              />

                <Image
            src="/abute/VectorE.png"
            alt="Vector"
            height={70}
            width={60}
            className="absolute top-3 left-10 object-contain"
          />

          {/* 4. Frame (1) - Pushed OUT to the bottom-right */}
          <Image
            src="/abute/frame (1).png"
            alt="Frame"
            height={67}
            width={180}
            className="absolute -bottom-20 -right-10 object-contain"
          />

          {/* 5. Frame - Pushed OUT to the top-right */}
          <Image
            src="/abute/frame.png"
            alt="Frame Small"
            height={20}
            width={30}
            className="absolute top-5 right-20 object-contain"
          />


        </div>



              {/* Column 2 */}
             
              <div className="w-full md:w-[500px] text-right">
               <div className="flex flex-col gap-3 pb-6 mb-6 relative">
                  <h3 className="text-black text-2xl md:text-4xl font-semibold leading-tight">
                    Enjoy Learning with a Unique UI Experience
                  </h3>

                  {/* Half-width blue underline */}
                  <div 
                    className="absolute bottom-0 right-0 w-1/2 h-[3px] bg-blue-600 rounded"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Renting provides a practical and low-commitment way to access what you need, ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. It lets you enjoy the advantages without the long-term responsibilities or full ownership costs, making it easier to adapt to changing circumstances while still receiving the same level of benefit and flexibility whenever the situation calls for it.l
                </p>
                  <button className="mt-3 relative z-10 rounded-[10px] bg-blue-500 w-[242px] h-[53px] text-black font-semibold hover:bg-blue-600 transition shadow-lg">
                    View More
                    <div className="absolute top-1/4 -right-5 w-20 h-20 bg-white rounded-full z-0 pointer-events-none transition-transform group-hover:scale-110"></div>
                  </button>
                
              </div>

            </div>
          </div>
           </ScrollReveal>
            <ScrollReveal>
               <div className="flex items-center justify-center  w-full max-w-[1250px] min-h-[350px] p-8 md:p-12">
            
            {/* Added w-full and gap so justify-between actually works */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-10">
              
              {/* Column 1 */}
              <div className="w-full md:w-[500px]">
                <div className="flex flex-col gap-3 pb-6 mb-6 relative">
                  <h3 className="text-black text-2xl md:text-4xl font-semibold leading-tight">
                   Passionate renters That provide good product
                  </h3>

                  {/* Half-width blue underline */}
                  <div 
                    className="absolute bottom-0 left-0 w-1/2 h-[3px] bg-blue-600 rounded"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed">
                 Renting makes perfect sense in many situations, ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. It allows you to gain the advantages without long-term obligations, giving you freedom to adjust as needs change, while still delivering real value and convenience exactly when it matters most.
                </p>
                   <button className="mt-3 relative z-10 rounded-[10px] bg-blue-500 w-[242px] h-[53px] text-black font-semibold hover:bg-blue-600 transition shadow-lg">
                    View More
                    <div className="absolute top-1/4 -right-5 w-20 h-20 bg-white rounded-full z-0 pointer-events-none transition-transform group-hover:scale-110"></div>
                  </button>
                
              </div>

              {/* Column 2 */}
              <div className="w-full md:w-[400px] h-[300px] relative">
          {/* Background Vector */}
            <Image
              src="/abute/Vector.png"
              alt="Background"
              height={500}
              width={453.71}// Using fill is better for relative parents
              className="object-cover "
            />

            {/* Content Overlay - Aligned Left */}

              <Image
                src="/abute/Polygon 26.png"
                alt="Polygon"
                height={560}
                width={500}
                className="absolute  flex flex-col ml-10 -top-4 -left-8  p-6" // Keeps the shape perfectly intact
              />

                <Image
            src="/abute/FrameA.png"
            alt="Vector"
            height={70}
            width={60}
            className="absolute top-3 left-10 object-contain"
          />

          {/* 4. Frame (1) - Pushed OUT to the bottom-right */}
          <Image
            src="/abute/frame (1).png"
            alt="Frame"
            height={67}
            width={180}
            className="absolute -bottom-20 -right-10 object-contain"
          />

          {/* 5. Frame - Pushed OUT to the top-right */}
          <Image
            src="/abute/frame.png"
            alt="Frame Small"
            height={20}
            width={30}
            className="absolute top-5 right-20 object-contain"
          />


        </div>

            </div>
          </div>
            </ScrollReveal>
          
          
        </div>
      
    </main>
  );
}