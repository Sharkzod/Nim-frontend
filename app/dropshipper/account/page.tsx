'use client'

import React from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowDownToLine, 
  Wallet, 
  Trophy, 
  RefreshCw, 
  ShoppingBag, 
  Truck, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Bookmark,
  Star,
  Settings,
  Bell,
  Edit3,
  Heart, ChevronDown, User
} from 'lucide-react';

import { useState, useRef } from 'react';
import MobileBottomNav from '../components/BottomNavigation';


interface WalletDashboardProps {
  balance?: number;
  username?: string;
}

const WalletDashboard: React.FC<WalletDashboardProps> = ({ 
  balance = 0, 
  username = "User" 
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
  

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Action Button Component
const ActionButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="rounded-xl w-full flex flex-col items-center gap-2 mb-5">
    <div className="text-gray-700">{icon}</div>
    <span className="text-[10.9px] text-center text-gray-700">{label}</span>
  </button>
);


// Listing Item Component
const ListingItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  color?: string; 
  bgColor?: string 
}> = ({ icon, label, color = "text-gray-700", bgColor = "bg-gray-50" }) => (
  <button className="bg-white rounded-xl flex flex-col items-center gap-2 transition-shadow w-full">
    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
      <div className={color}>{icon}</div>
    </div>
    <span className="text-[12px] text-center text-gray-700">{label}</span>
  </button>
);



// Order Item Component
const OrderItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="bg-white rounded-xl flex flex-col items-center gap-2 transition-shadow w-full">
    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-gray-700">{icon}</div>
    </div>
    <span className="text-xs text-center text-gray-700 leading-tight">{label}</span>
  </button>
);

// Other Item Component
const OtherItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="bg-white rounded-xl flex flex-col items-center gap-2 transition-shadow w-full">
    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
      <div className="text-gray-700">{icon}</div>
    </div>
    <span className="text-xs text-center text-gray-700 leading-tight">{label}</span>
  </button>
);

  return (
    <div className="min-h-screen bg-gray-100 mx-auto">
      {/* Wallet Balance Card */}
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
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div> */}
            </div>
    <div className="w-[90%] flex flex-col mx-auto py-6">
      <div className="bg-gradient-to-br from-[#1D1296] to-[#6356F6] rounded-2xl p-6 text-white mb-6">
        <div className="text-sm mb-2 opacity-90">Wallet balance</div>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">
            {isBalanceVisible ? formatCurrency(balance) : '₦0'}
          </span>
          <button 
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isBalanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3">
        <ActionButton icon={<img src="/withdrop.png" alt="Withdraw" className='w-6 h-6'/>} label="Withdraw balance" />
        <ActionButton icon={<Wallet size={24} />} label="Fund wallet" />
        <ActionButton icon={<Trophy size={24} />} label="Upgrade membership" />
      </div>

      {/* Upgrade Membership Banner */}
      <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
           <img src="/plane.png" alt="Upgrade" className='w-6 h-6' />
          </div>
          <div>
            <div className="font-medium text-[#3652AD] text-[12px]">Upgrade membership</div>
            <div className="text-[10px] text-black">Upgrade your membership plan to list more items</div>
          </div>
        </div>
        <button className="bg-[#3652AD] text-white px-4 py-2 rounded-[100px] text-[8px] font-medium hover:bg-indigo-700 transition-colors">
          Upgrade
        </button>
      </div>

      {/* My Listing Section */}
      <div className="mb-6 bg-white p-4 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-semibold text-gray-900">My listing</h2>
          <button className="text-[12px] text-black flex items-center gap-1 hover:text-indigo-700">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4">
          <ListingItem icon={<img src="/list.png" alt="List item" className='w-6 h-6' />} label="List item" color="text-orange-500"/>
          <ListingItem icon={<img src="/list.png" alt="Active" className='w-6 h-6' />} label="Active" color="text-gray-700" bgColor="bg-gray-50" />
          <ListingItem icon={<ShoppingBag size={24} />} label="Sold" color="text-gray-700" bgColor="bg-gray-50" />
          <ListingItem icon={<Edit3 size={24} />} label="Drafts" color="text-gray-700" bgColor="bg-gray-50" />
        </div>
      </div>

      {/* Orders Section */}
      <div className="mb-6 bg-white p-4 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-semibold text-gray-900">Orders</h2>
          <button className="text-[12px] text-black flex items-center gap-1 hover:text-indigo-700">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <OrderItem icon={<ShoppingBag size={24} />} label="Offers" />
          <OrderItem icon={<Truck size={24} />} label="To ship" />
          <OrderItem icon={<CheckCircle size={24} />} label="Completed" />
          <OrderItem icon={<XCircle size={24} />} label="Failed" />
        </div>
      </div>

      {/* Transactions */}
      <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between mb-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
            <RefreshCw size={20} className="text-gray-700" />
          </div>
          <span className="font-medium text-gray-900">Transactions</span>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </button>

      {/* Other Section */}
      <div className="mb-6 bg-white p-4 rounded-xl">
        <h2 className="flex items-center justify-between mb-4 text-black">Other</h2>
        <div className="grid grid-cols-4 gap-4">
          <OtherItem icon={<Bookmark size={24} />} label="Saved items" />
          <OtherItem icon={<Star size={24} />} label="Reviews" />
          <OtherItem icon={<Settings size={24} />} label="Settings" />
          <OtherItem icon={<Bell size={24} />} label="Notifications" />
        </div>
      </div>
    </div>
    <MobileBottomNav/>
    </div>
  );
};




export default WalletDashboard;