// Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Heart, User, ChevronDown } from 'lucide-react';

interface ProfileItem {
  id: string | number;
  name: string;
  role: string;
  avatarBgColor: string;
  avatarInitials?: string;
}

interface HeaderProps {
  logoText?: string;
  logoComponent?: React.ReactNode;
  showNotifications?: boolean;
  showWishlist?: boolean;
  userProfiles?: ProfileItem[];
  currentUser?: {
    name: string;
    role: string;
    avatarBgColor?: string;
  };
  onNotificationClick?: () => void;
  onWishlistClick?: () => void;
  onProfileSettings?: () => void;
  onSwitchAccount?: (profileId: string | number) => void;
  onLogout?: () => void;
  onProfileSelect?: (profile: ProfileItem) => void;
  className?: string;
  showUnreadNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  logoText = 'LOGO',
  logoComponent,
  showNotifications = true,
  showWishlist = true,
  userProfiles = [
    { id: 1, name: 'Moni Roy', role: 'User', avatarBgColor: 'bg-pink-200' },
    { id: 2, name: 'Moni Roy', role: 'Drop-shipper', avatarBgColor: 'bg-blue-200' },
  ],
  currentUser = {
    name: 'Moni Roy',
    role: 'User',
    avatarBgColor: 'bg-pink-200'
  },
  onNotificationClick,
  onWishlistClick,
  onProfileSettings,
  onSwitchAccount,
  onLogout,
  onProfileSelect,
  className = '',
  showUnreadNotification = true,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchAccount = (profile: ProfileItem) => {
    onSwitchAccount?.(profile.id);
    onProfileSelect?.(profile);
    setIsDropdownOpen(false);
  };

  const handleProfileSettings = () => {
    onProfileSettings?.();
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsDropdownOpen(false);
  };

  return (
    <header className={`flex items-center justify-between ${className}`}>
      {/* Logo Section */}
      <div className="flex items-center">
        {logoComponent ? (
          logoComponent
        ) : (
          <h1 className="text-2xl font-bold text-black">{logoText}</h1>
        )}
      </div>

      {/* User Actions Section */}
      <div className="flex items-center gap-4 text-black relative" ref={dropdownRef}>
        {/* Notifications */}
        {showNotifications && (
          <button 
            className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onNotificationClick}
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6" />
            {showUnreadNotification && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        )}

        {/* Wishlist */}
        {showWishlist && (
          <button 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={onWishlistClick}
            aria-label="Wishlist"
          >
            <Heart className="w-6 h-6" />
          </button>
        )}

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
            <div className={`w-6 h-6 ${currentUser.avatarBgColor || 'bg-pink-200'} rounded-full flex items-center justify-center`}>
              <span className="text-xs font-semibold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>

          {/* Dropdown Toggle */}
          <button 
            className="flex items-center p-1 hover:bg-gray-100 rounded-full transition-colors"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-label="Toggle user menu"
          >
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            {/* Profile List */}
            <div className="bg-gray-50 rounded-lg p-4 m-2">
              <p className="text-xs font-medium text-gray-500 mb-2">SELECT PROFILE</p>
              {userProfiles.map((profile) => (
                <button
                  key={profile.id}
                  className="flex items-center gap-3 w-full p-2 hover:bg-white rounded-md transition-colors mb-2 last:mb-0"
                  onClick={() => handleSwitchAccount(profile)}
                >
                  <div className={`w-10 h-10 ${profile.avatarBgColor} rounded-full flex items-center justify-center`}>
                    {profile.avatarInitials ? (
                      <span className="text-sm font-semibold">{profile.avatarInitials}</span>
                    ) : (
                      <span className="text-sm font-semibold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{profile.name}</p>
                    <p className="text-xs text-gray-500">{profile.role}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Action Menu */}
            <div className="border-t border-gray-200">
              <button 
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                onClick={handleProfileSettings}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Profile Settings
              </button>
              
              <button 
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                onClick={() => {
                  const firstProfile = userProfiles[0];
                  if (firstProfile) handleSwitchAccount(firstProfile);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Switch Account
              </button>
              
              <button 
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 border-t border-gray-200 flex items-center gap-2"
                onClick={handleLogout}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;