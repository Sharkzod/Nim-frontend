'use client'

import React, { useState } from 'react';
import { Bell, Heart, User, Home, MessageSquare, PlusCircle, Bookmark } from 'lucide-react';
import MobileBottomNav from '@/app/dropshipper/components/BottomNavigation';
import { useRouter } from 'next/navigation';

interface Plan {
  id: string;
  name: string;
  price: string | null;
  listings: number;
  isCurrent: boolean;
  color: string;
}

export default function MembershipUpgradePage() {
  const [plans] = useState<Plan[]>([
    {
      id: 'free',
      name: 'Free plan',
      price: null,
      listings: 5,
      isCurrent: true,
      color: 'bg-blue-600'
    },
    {
      id: 'bronze',
      name: 'Bronze plan',
      price: '₦10,000',
      listings: 15,
      isCurrent: false,
      color: 'bg-white'
    },
    {
      id: 'silver',
      name: 'Silver plan',
      price: '₦25,000',
      listings: 35,
      isCurrent: false,
      color: 'bg-white'
    },
    {
      id: 'gold',
      name: 'Gold plan',
      price: '₦50,000',
      listings: 75,
      isCurrent: false,
      color: 'bg-white'
    }
  ]);

  const [activeTab, setActiveTab] = useState('account');

      const router = useRouter();

  const handleUpgrade = (planId: string) => {
    router.push(`/dropshipper/order-confirmation`);
  };

  const handleUpgradeLater = () => {
    console.log('User will upgrade later');
    // Handle navigation or state change
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-black">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">LOGO</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Upgrade membership plan</h2>
            <p className="text-gray-600 text-sm">
              Signing up offers you a free plan, you can upgrade to a new plan now or later in your dashboard
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-[#1400FF] to-[#6A5EFF] rounded-2xl h-[20vh] p-5 text-white relative gap-4">
              <h3 className="text-[13px] font-semibold mb-[20px] flex m-auto justify-center mt-[10px]">Free plan</h3>
              <div className="flex items-center gap-2 mb-4 text-[10px] text-center justify-center">
                <svg className="w-2 h-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>5 listings</span>
              </div>
              <button className="w-full bg-white text-[#489766] py-2.5 rounded-full font-medium text-[10px]">
                Current plan
              </button>
            </div>

            {/* Bronze Plan */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm h-[20vh]">
              <h3 className="text-[13px] font-semibold mb-[0px] flex m-auto justify-center mt-[10px]">Bronze plan</h3>
              <p className="text-[#FE7A36] font-bold flex items-center mt-2 text-[14px] text-center justify-center">₦10,000</p>
              <div className="flex items-center gap-2 mt-2 text-[12px] text-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>15 listings</span>
              </div>
              <button 
                onClick={() => handleUpgrade('bronze')}
                className="w-full bg-[#3652AD] text-white py-2  rounded-full text-[8px] transition-colors mt-[10px]"
              >
                Upgrade now
              </button>
            </div>

            {/* Silver Plan */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm h-[20vh]">
              <h3 className="text-[13px] font-semibold mb-[0px] flex m-auto justify-center mt-[10px]">Silver plan</h3>
              <p className="text-[#FE7A36] font-bold flex items-center mt-2 text-[14px] text-center justify-center">₦25,000</p>
              <div className="flex items-center gap-2 mt-2 text-[12px] text-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>15 listings</span>
              </div>
              <button 
                onClick={() => handleUpgrade('bronze')}
                className="w-full bg-[#3652AD] text-white py-2  rounded-full text-[8px] transition-colors mt-[10px]"
              >
                Upgrade now
              </button>
            </div>

            {/* Gold Plan */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm h-[20vh]">
              <h3 className="text-[13px] font-semibold mb-[0px] flex m-auto justify-center mt-[10px]">Gold plan</h3>
              <p className="text-[#FE7A36] font-bold flex items-center mt-2 text-[14px] text-center justify-center">₦50,000</p>
              <div className="flex items-center gap-2 mt-2 text-[12px] text-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>15 listings</span>
              </div>
              <button 
                onClick={() => handleUpgrade('bronze')}
                className="w-full bg-[#3652AD] text-white py-2  rounded-full text-[8px] transition-colors mt-[10px]"
              >
                Upgrade now
              </button>
            </div>
          </div>

          {/* Upgrade Later Button */}
          <button 
            onClick={handleUpgradeLater}
            className="w-full bg-white border-1 border-[#3652AD] text-[#3652AD] py-2 rounded-full font-medium hover:bg-blue-50 transition-colors"
          >
            I will upgrade later
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <MobileBottomNav/>
    </div>
  );
}