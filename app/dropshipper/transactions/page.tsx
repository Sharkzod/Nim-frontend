'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import MobileBottomNav from '../components/BottomNavigation';

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  fee: number;
  status: 'completed' | 'pending';
  type: 'debit' | 'credit';
  transactionType: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Balance withdrawal',
    date: '10 may,2024',
    amount: 500000,
    fee: 100,
    status: 'pending',
    type: 'credit',
    transactionType: 'Payout'
  },
  {
    id: '2',
    title: 'Opeyemi paid for female butterfly....',
    date: '10 may,2024',
    amount: -850000,
    fee: 100,
    status: 'completed',
    type: 'debit',
    transactionType: 'Payment'
  }
];

export default function TransactionsPage() {
  const router = useRouter();

  const handleTransactionClick = (transactionId: string) => {
    router.push(`/dashboard/transactions/${transactionId}`);
  };

  const formatAmount = (amount: number) => {
    const sign = amount > 0 ? '+' : '-';
    return `${sign}₦${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-gray-200 px-4 py-4">
        <div className="flex items-center justify-center relative">
          <button 
            onClick={() => router.back()}
            className="absolute left-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Transactions</h1>
        </div>
      </header>

      {/* Transactions List */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              onClick={() => handleTransactionClick(transaction.id)}
              className=" rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' 
                    ? 'bg-red-50' 
                    : 'bg-green-50'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-green-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {transaction.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {transaction.date}
                  </p>
                </div>

                {/* Amount and Status */}
                <div className="flex flex-col items-end gap-1">
                  <p className={`text-base font-semibold ${
                    transaction.type === 'credit' ? 'text-gray-900' : 'text-gray-900'
                  }`}>
                    {formatAmount(transaction.amount)}
                  </p>
                  <span className={`text-xs font-medium ${
                    transaction.status === 'pending'
                      ? 'text-orange-500'
                      : 'text-green-600'
                  }`}>
                    {transaction.status === 'pending' ? 'Pending' : 'Successful'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <MobileBottomNav/>
    </div>
  );
}