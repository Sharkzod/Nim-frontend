// app/settings/[tab]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePage from '../../components/settings/Profile';
import BusinessDetails from '@/app/components/settingsComponents/BusinessDetails';
import ShippingAddress from '@/app/components/settingsComponents/ShippingAddress';
import WithdrawalDetails from '@/app/components/settingsComponents/WithdrawalDetails';
import ChangePassword from '@/app/components/settingsComponents/ChangePassword';
import NotificationSettings from '../../components/settings/Notification';
import DeleteAccount from '@/app/components/settingsComponents/DeleteAccount';

interface TabPageProps {
  params: Promise<{ tab: string }>;
}

const TabPage: React.FC<TabPageProps> = ({ params }) => {
  const router = useRouter();
  const [tab, setTab] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simply extract the tab parameter without any validation
    const extractTab = async () => {
      const resolvedParams = await params;
      setTab(resolvedParams.tab);
      setLoading(false);
    };

    extractTab();
  }, [params]);

  const renderTabContent = () => {
    switch (tab) {
      case 'profile':
        return <ProfilePage settingsRoute="/dropshipper/settings" showFullLayout />;
      case 'business':
        return <BusinessDetails settingsRoute="/dashboard/settings" showFullLayout />;
      case 'shipping':
        return <ShippingAddress settingsRoute="/dashboard/settings" showFullLayout />;
      case 'withdrawal':
        return <WithdrawalDetails settingsRoute="/dashboard/settings" showFullLayout />;
      case 'password':
        return <ChangePassword settingsRoute="/dashboard/settings" showFullLayout />;
      case 'notifications':
        return <NotificationSettings settingsRoute="/dashboard/settings" showFullLayout />;
      case 'delete':
        return <DeleteAccount settingsRoute="/dashboard/settings" showFullLayout />;
      default:
        return null;
    }
  };

  const getTabTitle = () => {
    switch (tab) {
      case 'profile': return 'Profile';
      case 'business': return 'Business Details';
      case 'shipping': return 'Shipping Address';
      case 'withdrawal': return 'Withdrawal Details';
      case 'password': return 'Change Password';
      case 'notifications': return 'Notification Settings';
      case 'delete': return 'Delete Account';
      default: return 'Settings';
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col min-h-screen bg-gray-50">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white">
          <button
            onClick={() => router.push('/dropshipper/settings')}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-medium text-gray-900">Settings</h1>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      {/* <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-white">
        <button
          onClick={() => router.push('/dropshipper/settings')}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-medium text-gray-900">{getTabTitle()}</h1>
      </div> */}

      <div className="flex-1">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabPage;