import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ShippedOrder {
  id: string;
  productName: string;
  price: number;
  image: string;
  status: 'pending' | 'completed' | 'failed';
}

const FailedOrdersComponent: React.FC = () => {
  const [orders] = useState<ShippedOrder[]>([
    {
      id: '1',
      productName: 'Luxury women shoes',
      price: 40000,
      image: '/cream.png',
      status: 'failed'
    },
    {
      id: '2',
      productName: 'Luxury women shoes',
      price: 40000,
      image: '/cream.png',
      status: 'failed'
    }
  ]);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const handleOrderClick = (orderId: string) => {
    console.log('Order clicked:', orderId);
    // Navigate to order details page
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Mobile & Desktop View */}
      {orders.length > 0 ? (
        <div className="space-y-3 p-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleOrderClick(order.id)}
              className="bg-white rounded-lg overflow-hidden duration-200 cursor-pointer"
            >
              <div className="flex gap-3 p-3">
                {/* Product Image */}
                <div className="w-28 h-28 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE3NVYxNzVIMjI1VjEyNUgxNzVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[12px] font-medium text-gray-900 mb-1 line-clamp-2">
                      {order.productName}
                    </h3>
                    <div className="text-[14px] font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2">
                      {formatPrice(order.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 text-xs font-medium rounded">
                      Failed
                    </span>
                    {/* <ChevronRight className="w-4 h-4 text-gray-400" /> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200 m-4">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No failed orders</h3>
          <p className="text-base text-gray-500">Failed orders will appear here</p>
        </div>
      )}
    </div>
  );
};

export default FailedOrdersComponent;