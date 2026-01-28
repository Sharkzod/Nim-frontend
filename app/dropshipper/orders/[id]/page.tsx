'use client'
import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/TopBar';
import VerticalNavMenu from '@/app/components/SidebarNavigation';
import Footer from '@/app/components/Footer';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderStatus {
  id: string;
  label: string;
  date: string;
  completed: boolean;
}

const OrderDetailComponent: React.FC = () => {
  const router = useRouter();
  const [order] = useState({
    orderNumber: '#001',
    orderDate: '12 May, 2023',
    isPaid: true,
    deliveryAddress: {
      name: 'John Apolokosi',
      phone: '+234-687-5876-57',
      address: '177, Aggrey Road, Ibadan, Oyo state.'
    },
    items: [
      {
        id: '1',
        name: 'Photopulse camera',
        quantity: 2,
        price: 15000,
        image: '/cream.png'
      }
    ],
    subtotal: 30000,
    delivery: 0,
    total: 40000
  });

  const orderStatuses: OrderStatus[] = [
    {
      id: '1',
      label: 'Order placed',
      date: '02 May, 2023',
      completed: true
    },
    {
      id: '2',
      label: 'Order is shipped',
      date: '03 May, 2023',
      completed: true
    },
    {
      id: '3',
      label: 'Estimated delivery date',
      date: '06 May, 2023',
      completed: false
    }
  ];

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const handleBack = () => {
    router.back();
  };

  const handleMessageSeller = () => {
    console.log('Message seller');
  };

  const handleMessageBuyer = () => {
    console.log('Message buyer');
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden w-full flex flex-col min-h-screen bg-white">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-900" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Order {order.orderNumber}</h1>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-auto">
          {/* Product Image */}
          <div className="w-full aspect-[4/3] bg-gray-100">
            <img
              src={order.items[0].image}
              alt={order.items[0].name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE3NVYxNzVIMjI1VjEyNUgxNzVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==';
              }}
            />
          </div>

          <div className="p-4">
            {/* Product Info */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-[12px] text-gray-900 mb-1">{order.items[0].name}</h2>
                <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
              </div>
              {order.isPaid && (
                <span className="px-2.5 py-1 bg-[#EAF9DF] text-[#0DA246] text-[12px] rounded ml-3">
                  Paid
                </span>
              )}
            </div>

            {/* Action Buttons */}
             <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={handleMessageSeller}
                className=" px-6 py-2 bg-white border-1 border-[#3652AD] text-[#3652AD] font-semibold text-[12px] rounded-full"
              >
                Message seller
              </button>
              <button
                onClick={handleMessageBuyer}
                className="px-6 py-2 bg-white border-1 border-[#3652AD] text-[#3652AD] font-semibold text-[12px] rounded-full"
              >
                Message buyer
              </button>
            </div>

            {/* Order Details Grid */}
            <div className="flex flex-row w-full justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Order number</h3>
                 <h3 className="text-sm text-gray-600 mb-1">Order date</h3>
              </div>
              <div>
                               <p className="font-semibold text-sm text-gray-900">{order.orderNumber}</p>

                <p className="font-semibold text-sm text-gray-900">{order.orderDate}</p>
              </div>
            </div>

            {/* Order Status */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-4">Order status</h3>
              <div className="space-y-4">
                {orderStatuses.map((status) => (
                  <div key={status.id} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        status.completed
                          ? 'bg-green-500'
                          : 'bg-white border-2 border-gray-300'
                      }`}
                    >
                      {status.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${status.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {status.label}
                      </h4>
                      <p className={`text-xs ${status.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {status.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-3">Delivery address</h3>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">{order.deliveryAddress.name}</p>
                <p className="text-sm text-gray-600">{order.deliveryAddress.phone}</p>
                <p className="text-sm text-gray-600">{order.deliveryAddress.address}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Order Summary</h3>

              {/* Order Item */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{order.items[0].name}</h4>
                </div>
                <div className="font-bold text-sm text-gray-900 flex-shrink-0">
                  +{formatPrice(order.items[0].price)}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.delivery)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold text-base text-gray-900">Total:</span>
                  <span className="font-bold text-lg text-gray-900">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex w-full flex-col">
        <Header />
        <div className="w-[90%] flex flex-col lg:flex-row mt-[5px] mx-auto bg-white">
          {/* Sidebar */}
          <div className="lg:block lg:w-64 xl:w-72 flex-shrink-0">
            <VerticalNavMenu />
          </div>

          {/* Main Content */}
          <div className='flex flex-col w-full lg:ml-6 xl:ml-8 lg:mt-[10px] max-w-4xl'>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Order {order.orderNumber}</h1>
            </div>

            {/* Product Card */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-base text-gray-900 mb-1 truncate">{order.items[0].name}</h3>
                  <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                </div>
              </div>
              {order.isPaid && (
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full ml-2 flex-shrink-0">
                  Paid
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={handleMessageSeller}
                className="py-3 px-6 bg-white border-2 border-[#3652AD] text-[#3652AD] font-semibold rounded-full hover:bg-blue-50 transition-colors"
              >
                Message seller
              </button>
              <button
                onClick={handleMessageBuyer}
                className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Message buyer
              </button>
            </div>

            {/* Order Progress */}
            <div className="mb-8">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: '50%' }}
                  />
                </div>

                {/* Status Items */}
                <div className="relative flex justify-between">
                  {orderStatuses.map((status) => (
                    <div key={status.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${
                          status.completed
                            ? 'bg-green-500'
                            : 'bg-white border-2 border-gray-300'
                        }`}
                      >
                        {status.completed && (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <h4
                        className={`text-sm font-medium text-center mb-1 ${
                          status.completed ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {status.label}
                      </h4>
                      <p
                        className={`text-xs text-center ${
                          status.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {status.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Order number</h3>
                <p className="font-semibold text-base text-gray-900">{order.orderNumber}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Delivery address</h3>
                <p className="font-semibold text-base text-gray-900 mb-1">{order.deliveryAddress.name}</p>
                <p className="text-sm text-gray-600 mb-1">{order.deliveryAddress.phone}</p>
                <p className="text-sm text-gray-600">{order.deliveryAddress.address}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Order date</h3>
                <p className="font-semibold text-base text-gray-900">{order.orderDate}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Order Item */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base text-gray-900 truncate">{order.items[0].name}</h3>
                  <p className="text-sm text-gray-600">Qty: {order.items[0].quantity}</p>
                </div>
                <div className="font-bold text-base text-gray-900 flex-shrink-0">
                  ={formatPrice(order.items[0].price)}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-semibold text-gray-900">{order.delivery}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 mb-8">
                  <span className="font-semibold text-base text-gray-900">Total:</span>
                  <span className="font-bold text-orange-600 text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OrderDetailComponent;