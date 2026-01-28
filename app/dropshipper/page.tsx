'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Heart, ChevronDown, Home, MessageSquare, PlusCircle, Bookmark, User, Star } from 'lucide-react';
import MobileBottomNav from './components/BottomNavigation';

interface Product {
  id: number;
  title: string;
  price: string;
  location: string;
  category: string;
  image: string;
  rating: number;
  isDrop: boolean;
  priceNote?: string;
}

const MarketplaceHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'Health & beauty', icon: '💄' },
    { name: 'Babies and kids', icon: '👶' },
    { name: 'Electronics', icon: '📱' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Automotive', icon: '🚗' },
  ];

  const products: Product[] = [
    {
      id: 1,
      title: 'Photoguise camera',
      price: '₦40,000',
      location: 'Maitama, Enugu',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=400',
      rating: 4,
      isDrop: false,
    },
    {
      id: 2,
      title: 'Photoguise camera',
      price: '₦40,000',
      location: 'Maitama, Enugu',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
      rating: 4,
      isDrop: false,
    },
    {
      id: 3,
      title: '3 bedroom flat',
      price: '₦4,000,000',
      location: 'Maitama, Enugu',
      category: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      rating: 4,
      isDrop: true,
      priceNote: 'per 5mths',
    },
    {
      id: 4,
      title: 'Photoguise camera',
      price: '₦40,000',
      location: 'Maitama, Enugu',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
      rating: 4,
      isDrop: true,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    // Ensure rating is within bounds
    const safeRating = Math.min(Math.max(rating, 0), 5);
    
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-2 h-2 ${
              i < safeRating
                ? 'fill-black text-black'
                : 'text-black'
            }`}
          />
        ))}
      </div>
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div>
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-26 object-cover rounded-2xl"
        />
    
      </div>
      <div className="p-2">
         <div className='flex justify-between items-center'>
        <div className="flex items-center justify-between ">
          <StarRating rating={product.rating} />
        </div>
        <button className="rounded-full flex items-center text-black justify-center  hover:bg-gray-50">
          <Heart className="w-3 h-3" />
        </button>
        </div>
       
        
        <h3 className="font-light text-gray-900  text-[12px]">{product.title}</h3>
        
        
        <p className="font-bold text-gray-900 text-[15px]">
          {product.price}
          {product.priceNote && (
            <span className=" font-light text-gray-500 text-[12px]"> {product.priceNote}</span>
          )}
        </p>
        <p className="text-sm text-gray-500">{product.location}</p>
      </div>
     
      
    </div>
      <button className="w-full bg-[#3652AD] text-[12px] text-white py-1.5 font-light rounded-[100px] transition-colors">
          Drop-ship item
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-black">LOGO</h1>
          <div className="flex items-center gap-4 text-black relative" ref={dropdownRef}>
            <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button>
              <Heart className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 border-2 border-black rounded-[50%]">
              <User className="w-4 h-4 flex flex-column justify-center m-auto items-center rounded-full mt-[5px] text-black" />
            </div>
            <button 
              className="flex items-center"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-label="Toggle user menu"
            >
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="bg-gray-50 rounded-lg p-3 m-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Moni Roy</p>
                      <p className="text-xs text-gray-500">User</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-200 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Moni Roy</p>
                      <p className="text-xs text-gray-500">Drop-shipper</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Switch Account
                  </button>
                  <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 border-t border-gray-200">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[80px]"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
                {category.icon}
              </div>
              <p className="text-xs text-center text-gray-700 leading-tight">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-4">
        <h2 className="text-xl font-bold mb-4 text-black">Trending</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MarketplaceHome;