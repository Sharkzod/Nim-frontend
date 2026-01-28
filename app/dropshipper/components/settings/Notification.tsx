'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings } from 'lucide-react'; 
// import SettingsComponentFactory from './SettingsComponentFactory';

interface NotificationSettingsProps {
  onSave?: (settings: any) => void;
  onCancel?: () => void;
  settingsRoute?: string;
  showFullLayout?: boolean;
}

// Toggle Component
const Toggle = ({ 
  isOn, 
  onToggle,
  disabled = false
}: { 
  isOn: boolean; 
  onToggle: () => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onToggle}
    disabled={disabled}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
      isOn ? 'bg-blue-600' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
        isOn ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default function NotificationSettings({
  onSave,
  onCancel,
  settingsRoute = '/settings',
  showFullLayout = false
}: NotificationSettingsProps) {
  // Default notification settings
  const defaultSettings = {
    email: {
      messages: true,
      offers: true,
      paymentApproval: true,
      newsletter: true
    },
    inApp: {
      messages: true,
      offers: true,
      paymentApproval: true,
      newsletter: true
    }
  };

  const [localSettings, setLocalSettings] = useState(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleToggle = (category: 'email' | 'inApp', setting: keyof typeof defaultSettings.email) => {
    const newSettings = {
      ...localSettings,
      [category]: {
        ...localSettings[category],
        [setting]: !localSettings[category][setting]
      }
    };
    
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      setSaving(false);
      setHasChanges(false);
      
      // Call parent onSave if provided
      if (onSave) {
        onSave(localSettings);
      }
    }, 500);
  };

  const handleCancel = () => {
    // Reset to original settings
    setLocalSettings(defaultSettings);
    setHasChanges(false);
    
    if (onCancel) {
      onCancel();
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all notification settings to default?')) {
      setLocalSettings(defaultSettings);
      setHasChanges(true);
    }
  };

  const isLoading = saving;

    const router = useRouter();

  return (
    
      <div className="flex flex-col">
        {/* Main Content */}
        <div className=" mx-auto w-full py-4 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push(settingsRoute)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Notification Settings</h1>
          </div>
          {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-700" />
          </button> */}
      </div>
        <div className="flex-1 px-6 py-6">
        
          <div className="space-y-8">
            {/* Email Notifications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">Email notifications</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Messages</span>
                  </div>
                  <Toggle
                    isOn={localSettings.email.messages}
                    onToggle={() => handleToggle('email', 'messages')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Offers & Promotions</span>
                  </div>
                  <Toggle
                    isOn={localSettings.email.offers}
                    onToggle={() => handleToggle('email', 'offers')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Payment Approvals</span>
                  </div>
                  <Toggle
                    isOn={localSettings.email.paymentApproval}
                    onToggle={() => handleToggle('email', 'paymentApproval')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Newsletter</span>
                  </div>
                  <Toggle
                    isOn={localSettings.email.newsletter}
                    onToggle={() => handleToggle('email', 'newsletter')}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* In-app Notifications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-900">In-app notifications</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Messages</span>
                  </div>
                  <Toggle
                    isOn={localSettings.inApp.messages}
                    onToggle={() => handleToggle('inApp', 'messages')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Offers & Promotions</span>
                  </div>
                  <Toggle
                    isOn={localSettings.inApp.offers}
                    onToggle={() => handleToggle('inApp', 'offers')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Payment Approvals</span>
                  </div>
                  <Toggle
                    isOn={localSettings.inApp.paymentApproval}
                    onToggle={() => handleToggle('inApp', 'paymentApproval')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-gray-700">Newsletter</span>
                  </div>
                  <Toggle
                    isOn={localSettings.inApp.newsletter}
                    onToggle={() => handleToggle('inApp', 'newsletter')}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {hasChanges && (
          <div className="sticky bottom-0 px-6 py-2 bg-white border-t border-gray-100 mt-8">
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 px-6 py-2 bg-[#FE7A3633] text-[#FE7A36] rounded-full font-medium text-md transition-colors hover:bg-[#FE7A3644] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 px-6 py-2 bg-[#3652AD] text-white rounded-full font-medium text-sm transition-colors hover:bg-[#2a418a] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    
  );
}