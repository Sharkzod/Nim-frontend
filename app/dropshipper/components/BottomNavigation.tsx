// components/MobileBottomNav.tsx
import React from 'react';
import { NavigationItem } from '@/app/types/navigation';

interface MobileBottomNavProps {
  items?: NavigationItem[];
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ items }) => {
  const defaultItems: NavigationItem[] = [
    {
      id: 'me',
      label: 'Home',
      icon: (
        <img src='/bottom-home.png' alt='Home' className='w-6 h-6' />
      ),
      isActive: true,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: (
        <img src='/bottom-message.png' alt='Messages' className='w-6 h-6' />
      ),
    //   count: 3,
    },
    {
      id: 'sell',
      label: 'Sell',
      icon: (
        <img src='/bottom-sell.png' alt='Sell' className='w-6 h-6' />
      ),
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: (
        <img src='/bottom-saved.png' alt='Saved' className='w-6 h-6' />
      ),
    },

    {
      id: 'saved',
      label: 'Account',
      icon: (
        <img src='/acct.png' alt='Account' className='w-6 h-6' />
      ),
    },
  ];

  const navItems = items || defaultItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`
              flex flex-col items-center justify-center relative px-3 py-2
              ${item.isActive ? 'text-blue-600' : 'text-gray-500'}
            `}
          >
            <div className="relative">
              {item.icon}
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;