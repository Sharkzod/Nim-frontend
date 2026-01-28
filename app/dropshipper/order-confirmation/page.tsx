'use client'
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type PaymentOption = 'wallet' | 'crypto' | 'bank';

const UpgradePlan: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>('bank');

  const cryptoIcons = [
    { name: 'Tether', color: 'bg-emerald-500' },
    { name: 'Bitcoin', color: 'bg-orange-500' },
    { name: 'Ethereum', color: 'bg-indigo-500' },
    { name: 'Binance', color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 text-black bg-white shadow-sm h-[70px]">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Upgrade plan</h1>
        </div>
          <p className="text-black text-md mb-6 pl-6">
                  Select payment option to continue
          </p>

        {/* Payment Selection */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm w-[90%] max-w-md mx-auto">
          

          <div className="">
            <h2 className="font-medium text-gray-900 mb-1 text-[15px]">Payment options</h2>

            {/* Wallet Balance Option */}
            <label className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={selectedPayment === 'wallet'}
                  onChange={(e) => setSelectedPayment(e.target.value as PaymentOption)}
                  className="w-3 h-3 text-[#FE7A36]"
                />
                <span className="text-gray-700 text-[12px]">Wallet balance</span>
              </div>
              <span className="text-[orange-500] text-[12px] font-medium">#0</span>
            </label>

            {/* Crypto Currency Option */}
            <label className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="crypto"
                  checked={selectedPayment === 'crypto'}
                  onChange={(e) => setSelectedPayment(e.target.value as PaymentOption)}
                  className="w-3 h-3 text-[#FE7A36]"
                />
                <span className="text-gray-700 text-[12px]">Crypto currency</span>
              </div>
              <div className="flex gap-1">
                <img src="/usdt.png" alt="Tether" className="w-4 h-4" />
                <img src="/BTC.png" alt="Tether" className="w-4 h-4" />
                <img src="/ETH.png" alt="Tether" className="w-4 h-4" />
                <img src="/BNB.png" alt="Tether" className="w-4 h-4" />
                
              </div>
            </label>

            {/* Bank Transfer Option */}
            <label className="flex items-center justify-between p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedPayment === 'bank'}
                  onChange={(e) => setSelectedPayment(e.target.value as PaymentOption)}
                  className="w-3 h-3 text-[#FE7A36]"
                />
                <span className="text-gray-700 text-[12px]">Bank transfer</span>
              </div>
            </label>
          </div>
        </div>

        {/* Plan Details */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm max-w-md w-[90%] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-medium text-sm">Bronze plan</h3>
            <span className="text-orange-500 text-sm font-medium">₦10,000</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked
              readOnly
              className="w-5 h-5 rounded accent-gray-900"
            />
            <span className="text-sm">15 listings</span>
          </div>
        </div>

        {/* Continue Button */}
        <button className="w-[90%] bg-[#3652AD] justify-center flex flex-column m-auto text-white font-medium py-2 rounded-[100px] transition-colors shadow-sm">
          Continue
        </button>
      </div>
    </div>
  );
};

export default UpgradePlan;