import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  price: number;
  image: string;
  isPaid: boolean;
  deliveryAddress: string;
}

const ToPayTabComponent: React.FC = () => {
  const orders: Order[] = [
    {
      id: '1',
      productName: 'Photopulse camera',
      price: 40000,
      image: '/cream.png',
      isPaid: true,
      deliveryAddress: '123 Main St, Lagos'
    },
    {
      id: '2',
      productName: 'Nike Air Max',
      price: 40000,
      image: '/cream.png',
      isPaid: true,
      deliveryAddress: '456 Oak Ave, Abuja'
    }
  ];

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const handleViewDeliveryAddress = (orderId: string) => {
    console.log('View delivery address for order:', orderId);
  };

  if (orders.length === 0) {
    return (
      <EmptyState 
        title="No orders to ship"
        description="Orders that need shipping will appear here"
      />
    );
  }

  return (
    <div className="space-y-3 p-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          formatPrice={formatPrice}
          onViewAddress={handleViewDeliveryAddress}
        />
      ))}
    </div>
  );
};

const OrderCard: React.FC<{
  order: Order;
  formatPrice: (price: number) => string;
  onViewAddress: (orderId: string) => void;
}> = ({ order, formatPrice, onViewAddress }) => (
  <div 
    onClick={() => onViewAddress(order.id)}
    className="bg-white rounded-lg overflow-hidden transition-shadow duration-200 cursor-pointer"
  >
    <div className="flex gap-3 p-3">
      {/* Product Image */}
      <div className="w-28 rounded-lg overflow-hidden">
        <img
          src={order.image}
          alt={order.productName}
          className="w-full h-26 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE3NVYxNzVIMjI1VjEyNUgxNzVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[12px] text-gray-900 mb-1">
            {order.productName}
          </h3>
          <div className="text-[14px] font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
            {formatPrice(order.price)}
          </div>
        </div>

        <div className=" items-center justify-between">
          <div>
            {order.isPaid && (
              <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                Paid
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            
            <span className="text-xs text-gray-600">
              Delivery address
            </span>
             <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
         
        </div>
      </div>
    </div>
  </div>
);

const EmptyState: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-white rounded-xl p-12 text-center border border-gray-200 m-4">
    <div className="text-gray-400 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default ToPayTabComponent;