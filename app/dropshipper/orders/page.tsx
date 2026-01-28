'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Search } from 'lucide-react';
import VerticalNavMenu from '@/app/components/SidebarNavigation';
import Footer from '@/app/components/Footer';
// import OffersTabComponent from '@/app/components/orderComponents/Offers';
// import ToShipTabComponent from '@/app/components/orderComponents/ToPayTab';
import ShippedOrdersComponent from '../components/orderComponents/ShippedTab';
import CompletedOrdersComponent from '../components/orderComponents/CompletedTab';
import FailedOrdersComponent from '../components/orderComponents/FailedTab';
import Header from '@/app/components/TopBar';
import ToPayTabComponent from '../components/orderComponents/ToPayTab';
import MobileBottomNav from '../components/BottomNavigation';

type OrderTab = 'paid' | 'shipped' | 'completed' | 'failed';

const IncomingOrdersComponent: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderTab>('paid');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { id: OrderTab; label: string }[] = [
    { id: 'paid', label: 'Paid' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'completed', label: 'Completed' },
    { id: 'failed', label: 'Failed' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'paid':
        return <ToPayTabComponent />;
      case 'shipped':
        return <ShippedOrdersComponent />;
      case 'completed':
        return <CompletedOrdersComponent />;
      case 'failed':
        return <FailedOrdersComponent />;
      default:
        return <ToPayTabComponent />;
    }
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden w-full flex flex-col min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-900" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-auto">
          {renderTabContent()}
          <MobileBottomNav/>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex w-full flex-col min-h-screen">
        <Header />
        <div className="w-full flex flex-col lg:flex-row flex-1 mx-auto p-3 sm:p-4 md:p-6 bg-gray-50">
          {/* Sidebar */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0">
            <VerticalNavMenu />
          </div>

          {/* Main content */}
          <div className="flex flex-col w-full lg:ml-6 xl:ml-8 lg:mt-[30px] max-w-7xl">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
              Incoming orders
            </h1>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 mb-4 sm:mb-6">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium transition-colors duration-200 relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-2 sm:px-0">
              {renderTabContent()}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
        
      </div>
    </>
  );
};

export default IncomingOrdersComponent;