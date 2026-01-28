'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const ListProductPage = () => {
  const router = useRouter();
  const [productUrl, setProductUrl] = useState('');
  const [price, setPrice] = useState('0');
  const [commission, setCommission] = useState('0');
  const [youReceive, setYouReceive] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const COMMISSION_RATE = 0.10; // 10%

  // Calculate commission and amount to receive
  useEffect(() => {
    const numericPrice = parseFloat(price.replace(/,/g, '')) || 0;
    const calculatedCommission = numericPrice * COMMISSION_RATE;
    const amountToReceive = numericPrice - calculatedCommission;

    setCommission(calculatedCommission.toLocaleString('en-US', { maximumFractionDigits: 0 }));
    setYouReceive(amountToReceive.toLocaleString('en-US', { maximumFractionDigits: 0 }));
  }, [price]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(value)) {
      const formatted = value ? parseInt(value).toLocaleString('en-US') : '';
      setPrice(formatted);
    }
  };

  const handleSaveToDrafts = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Product saved to drafts successfully!');
      router.push('/my-listings');
    } catch (error) {
      console.error('Error saving to drafts:', error);
      alert('Failed to save to drafts');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!productUrl.trim()) {
      alert('Please enter a product URL');
      return;
    }

    if (!price || parseFloat(price.replace(/,/g, '')) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Product published successfully!');
      router.push('/my-listings');
    } catch (error) {
      console.error('Error publishing product:', error);
      alert('Failed to publish product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">List product</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <div className="space-y-6">
          {/* Product URL Input */}
          <div className="space-y-2">
            <label htmlFor="productUrl" className="block text-sm font-medium text-gray-700">
              Product URL
            </label>
            <input
              id="productUrl"
              type="url"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="Enter product URL"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                ₦
              </span>
              <input
                id="price"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Commission and You Will Receive */}
          <div className="grid grid-cols-2 gap-4">
            {/* Commission */}
            <div className="space-y-2">
              <label htmlFor="commission" className="block text-sm font-medium text-gray-700">
                Commission: 10%
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                  ₦
                </span>
                <input
                  id="commission"
                  type="text"
                  value={commission}
                  readOnly
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* You Will Receive */}
            <div className="space-y-2">
              <label htmlFor="youReceive" className="block text-sm font-medium text-gray-700">
                You will receive
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                  ₦
                </span>
                <input
                  id="youReceive"
                  type="text"
                  value={youReceive}
                  readOnly
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 placeholder-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleSaveToDrafts}
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-white border-2 border-[#3652AD] text-gray-700 font-semibold rounded-full  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save to drafts'}
            </button>
            <button
              onClick={handlePublish}
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-[#3652AD] text-white font-semibold rounded-full hover:bg-[#2a4090] focus:outline-none focus:ring-2 focus:ring-[#3652AD] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductPage;