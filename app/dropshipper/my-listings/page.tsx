'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Search } from 'lucide-react';
import BottomNavigation from '@/app/components/BottomNav';

type ListingTab = 'active' | 'sold' | 'drafts';

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  images: string[];
  listedOn?: string;
  location?: string;
}

const MyListingsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ListingTab>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Mock product data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Photopulse camera',
      price: 40000,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1606980183032-6f0e1c4ba1fe?w=400'],
      listedOn: '2025-04-10',
      location: 'Nkuebe, Enugu'
    },
    {
      id: '2',
      name: 'Female gown',
      price: 40000,
      status: 'active',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
      listedOn: '2025-04-10',
      location: 'Nkuebe, Enugu'
    },
    {
      id: '3',
      name: 'MacBook Pro 14"',
      price: 1200000,
      status: 'sold',
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
      listedOn: '2024-01-20',
      location: 'Lagos, Nigeria'
    },
    {
      id: '4',
      name: 'Sony Headphones',
      price: 85000,
      status: 'draft',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
      listedOn: '2024-01-18',
      location: 'Abuja, FCT'
    },
    {
      id: '5',
      name: 'Nike Air Max',
      price: 35000,
      status: 'draft',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
      listedOn: '2024-01-10',
      location: 'Ibadan, Oyo'
    }
  ];

  const tabs: { id: ListingTab; label: string }[] = [
    { id: 'active', label: 'Active' },
    { id: 'sold', label: 'Sold' },
    { id: 'drafts', label: 'Drafts' },
  ];

  // Initialize products
  useEffect(() => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setProducts(mockProducts);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load products');
      setIsLoading(false);
    }
  }, []);

  // Filter products based on active tab
  const getFilteredProducts = () => {
    let filtered: Product[] = [];
    
    switch (activeTab) {
      case 'active':
        filtered = mockProducts.filter(p => p.status === 'active');
        break;
      case 'sold':
        filtered = mockProducts.filter(p => p.status === 'sold');
        break;
      case 'drafts':
        filtered = mockProducts.filter(p => p.status === 'draft');
        break;
      default:
        filtered = [];
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const navigateBack = () => {
    router.push('/dashboard/user');
  };

  const formatDate = (dateString: string | Date): string => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleEdit = (productId: string) => {
    router.push(`/edit-product/${productId}`);
  };

  const handleRemove = async (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        setProducts(prev => prev.filter(p => p.id !== productId));
        alert('Product removed successfully!');
      } catch (error) {
        console.error('Error removing product:', error);
        alert('Failed to remove product');
      }
    }
  };

  const handlePublish = async (productId: string) => {
    if (window.confirm('Are you sure you want to publish this product?')) {
      try {
        setProducts(prev => 
          prev.map(p => 
            p.id === productId 
              ? { ...p, status: 'active', listedOn: new Date().toISOString().split('T')[0] }
              : p
          )
        );
        alert('Product published successfully!');
      } catch (error) {
        console.error('Error publishing product:', error);
        alert('Failed to publish product');
      }
    }
  };

  const handleRelist = async (productId: string) => {
    if (window.confirm('Are you sure you want to relist this product?')) {
      try {
        setProducts(prev => 
          prev.map(p => 
            p.id === productId 
              ? { ...p, status: 'active', listedOn: new Date().toISOString().split('T')[0] }
              : p
          )
        );
        alert('Product relisted successfully!');
      } catch (error) {
        console.error('Error relisting product:', error);
        alert('Failed to relist product');
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col bg-white">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button onClick={navigateBack} className="p-1">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">My listing</h1>
          </div>
          <button className="p-1">
            <Settings className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={navigateBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My listing</h1>
        </div>
        <button className="p-1">
          <Settings className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 ">
        <div className="relative">
          <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 placeholder-gray-500 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className=' w-[90%] mx-auto h-full flex flex-col'>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` px-4 pb-2 text-sm font-medium relative ${
              activeTab === tab.id
                ? 'text-[#3652AD]'
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

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto py-4">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Search className="w-12 h-12 mb-3 text-gray-300" />
            <p className="text-sm">No listings found</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-blue-600 text-sm font-medium hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex flex-col">
                {/* Product Image */}
                <div className="w-full rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-26 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                  <h3 className="text-[12px] text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[14px] font-bold text-gray-900 mb-1">
                    {formatPrice(product.price)}
                  </p>
                  {product.location && (
                    <p className="text-xs text-gray-500 mb-1 border-b pb-2 border-gray-200">
                      {product.location}
                    </p>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-black pt-2">
                      Listed on: {product.listedOn ? formatDate(product.listedOn) : 'N/A'}
                    </p>
                    <span className={`text-[10px] font-medium pt-2 ${
                      product.status === 'active' ? 'text-[#0DBA37]' :
                      product.status === 'sold' ? 'text-[#3652AD]' :
                      product.status === 'draft' ? 'text-[#EF4444]' :
                      'text-gray-600'
                    }`}>
                      {product.status === 'active' ? 'Active' :
                       product.status === 'sold' ? 'Sold' :
                       product.status === 'draft' ? 'Draft' :
                       product.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Show different buttons based on status */}
                    {product.status === 'draft' ? (
                      <>
                        <button 
                          onClick={() => handleRemove(product.id)}
                          className="flex-1 py-1 px-3 bg-[#B91C1C] text-white text-[9px] font-medium rounded"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => handleEdit(product.id)}
                          className="flex-1 py-1 px-3 bg-[#3652AD] text-white text-[9px] font-medium rounded"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handlePublish(product.id)}
                          className="flex-1 py-1 px-3 bg-[#0DBA37] text-white text-[9px] font-medium rounded"
                        >
                          Publish
                        </button>
                      </>
                    ) : product.status === 'sold' ? (
                      <>
                        <button 
                          onClick={() => handleRemove(product.id)}
                          className="flex-1 py-1 px-3 bg-[#B91C1C] text-white text-[9px] font-medium rounded"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => handleRelist(product.id)}
                          className="flex-1 py-1 px-3 bg-[#3652AD] text-white text-[9px] font-medium rounded"
                        >
                          Relist
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleRemove(product.id)}
                          className="flex-1 py-1 px-3 bg-[#B91C1C] text-white text-[9px] font-medium rounded"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => handleEdit(product.id)}
                          className="flex-1 py-1 px-3 bg-[#3652AD] text-white text-[9px] font-medium rounded "
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
</div>
      <BottomNavigation/>
    </div>
  );
};

export default MyListingsPage;