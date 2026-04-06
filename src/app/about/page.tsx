"use client";

import { ArrowLeft, Heart, Shield, Truck, Users, Star, Award, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    id: 0,
    icon: Truck,
    title: "Fast Delivery",
    desc: "Quick and reliable delivery to your doorstep",
  },
  {
    id: 1,
    icon: Shield,
    title: "Secure Rentals",
    desc: "100% secure transactions and verified products",
  },
  {
    id: 2,
    icon: Heart,
    title: "Quality Guaranteed",
    desc: "Premium products with satisfaction guarantee",
  },
  {
    id: 3,
    icon: Users,
    title: "24/7 Support",
    desc: "Always here to help you with your rentals",
  },
];

const stats = [
  { number: "10,000+", label: "Happy Customers" },
  { number: "50,000+", label: "Products Rented" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Customer Support" },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/api/placeholder/150/150",
    bio: "Passionate about making premium rentals accessible to everyone."
  },
  {
    name: "Mike Chen",
    role: "Head of Operations",
    image: "/api/placeholder/150/150",
    bio: "Ensures smooth operations and exceptional customer experience."
  },
  {
    name: "Emily Davis",
    role: "Customer Success Manager",
    image: "/api/placeholder/150/150",
    bio: "Dedicated to making every rental experience memorable."
  }
];

export default function AboutPage() {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About RentEase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium product rentals. We make it easy to access
              high-quality items without the commitment of ownership.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Premium Rentals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, RentEase began with a simple vision: to revolutionize
                  the way people access premium products. We noticed that many people
                  wanted to try high-quality items but were hesitant to make large purchases.
                </p>
                <p>
                  Today, we serve over 10,000 satisfied customers across the country,
                  offering a wide range of premium products for rent. From electronics
                  to furniture, we make it easy to access what you need when you need it.
                </p>
                <p>
                  Our commitment to quality, transparency, and customer satisfaction
                  has made us the go-to platform for premium rentals.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose RentEase?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeCard === feature.id;

                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveCard(feature.id)}
                    className={`bg-white border rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-lg
                      ${isActive
                        ? "border-blue-500 bg-blue-50 scale-105"
                        : "border-gray-200 hover:border-blue-300"
                      }
                    `}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-4 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to premium products by providing flexible,
                affordable rental solutions that empower people to live better
                without the burden of ownership.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>Quality:</strong> Only premium, well-maintained products</li>
                <li>• <strong>Transparency:</strong> Clear pricing and terms</li>
                <li>• <strong>Trust:</strong> Verified products and secure transactions</li>
                <li>• <strong>Convenience:</strong> Easy booking and fast delivery</li>
              </ul>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust RentEase for their rental needs.
              Browse our collection and start renting today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Browse Products
              </button>
              <button
                onClick={() => router.push("/HeaderEliment/contact")}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}