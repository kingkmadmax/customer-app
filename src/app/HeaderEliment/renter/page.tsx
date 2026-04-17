"use client";

import React from 'react';
import { User, Phone, MapPin, Upload, Landmark, Smartphone, ShieldCheck } from 'lucide-react';

export default function ProfessionalRegistration() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Renter Registration
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Complete your onboarding profile to secure your rental agreement.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Section 1: Identity & Contact */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 p-2 rounded-lg mr-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Primary Identity</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Enter your full name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="tel" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="+251 ..." />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Government ID Verification</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:bg-white hover:border-blue-400 transition-all cursor-pointer group text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-gray-600">Click to upload Passport or National ID</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Property Location */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
              <div className="bg-green-50 p-2 rounded-lg mr-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Main Location</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Address</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="Street name and area" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Unit / Apt #</label>
                <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="Optional" />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
              <div className="bg-amber-50 p-2 rounded-lg mr-4">
                <Smartphone className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Payment Setup</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Telebirr Option */}
              <label className="relative flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <input type="radio" name="payment" className="w-4 h-4 text-blue-600 mr-4" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 group-hover:text-blue-900">Telebirr</p>
                  <p className="text-xs text-gray-500">Fast mobile payment</p>
                </div>
                <Smartphone className="h-6 w-6 text-gray-300 group-hover:text-blue-500" />
              </label>

              {/* Bank Transfer Option */}
              <label className="relative flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <input type="radio" name="payment" className="w-4 h-4 text-blue-600 mr-4" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900 group-hover:text-blue-900">Bank Transfer</p>
                  <p className="text-xs text-gray-500">Direct ACH/CBE transfer</p>
                </div>
                <Landmark className="h-6 w-6 text-gray-300 group-hover:text-blue-500" />
              </label>
            </div>
          </div>

          {/* Final Action */}
          <div className="flex flex-col items-center">
            <button className="w-full md:w-1/2 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 mb-4">
              Submit Registration
            </button>
            <div className="flex items-center text-gray-400 text-sm">
              <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
              All information is stored securely following local regulations.
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}