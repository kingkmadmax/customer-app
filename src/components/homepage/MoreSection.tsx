"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe } from "lucide-react"; // Icons for the cards

export default function AboutSection() {
  const cards = [
    {
      title: "Secure Rentals",
      desc: "Verified listings and secure payment gateways for your peace of mind.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Fast Process",
      desc: "From browsing to booking in under 5 minutes. No paperwork headaches.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Nationwide reach",
      desc: "Access the largest network of rental items across the entire country.",
      icon: <Globe className="w-6 h-6 text-green-500" />,
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 max-w-[1440px] mx-auto">
      {/* 1. BIG CONTAINER WITH IMAGE */}
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" // Replace with your site image
          alt="About EthioRent"
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8 md:p-16">
          <div className="max-w-xl text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Redefining the <br /> 
              <span className="text-blue-400">Rental Experience</span>
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              EthioRent is the leading marketplace for high-quality rentals. 
              Whether you need a home, a vehicle, or electronics, we connect 
              you with reliable owners instantly.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE THREE CARDS (Animating from Right to Left) */}
      <div className="relative -mt-24 z-20 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }} // Start 100px to the right
            whileInView={{ opacity: 1, x: 0 }} // Move to final position
            viewport={{ once: true }} // Only animate once
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2, // Staggered entry
              ease: "easeOut" 
            }}
            className="bg-black p-8 rounded-2xl shadow-xl border border-gray-100 hover:scale-105 transition-transform"
          >
            <div className="mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-lg">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}