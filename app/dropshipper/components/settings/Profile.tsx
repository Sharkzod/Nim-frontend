'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, ChevronDown } from 'lucide-react';

interface ProfilePageProps {
  settingsRoute?: string;
  showFullLayout?: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  settingsRoute = '/dropshipper/settings', 
  showFullLayout = false 
}) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleCancel = () => {
    router.push(settingsRoute);
  };

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      alert('Please fill in your first and last name');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const profileData = {
        firstName,
        lastName,
        phoneNumber,
        gender
      };
      
      console.log('Saving profile:', profileData);
      alert('Profile saved successfully!');
      router.push(settingsRoute);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  // Form content component
  const FormContent = () => (
    <div className="space-y-5">
      {/* First Name */}
      <div className="space-y-2">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Opeyemi"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ayeola"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Enter your phone number"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Gender Dropdown */}
      <div className="space-y-2">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsGenderOpen(!isGenderOpen)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between"
          >
            <span className={gender ? 'text-gray-900' : 'text-gray-400'}>
              {gender || 'Select gender'}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-600 transition-transform ${isGenderOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isGenderOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setGender(option);
                    setIsGenderOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    gender === option ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-6">
        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="w-full py-2 px-6 bg-[#FE7A3633] border-1 border-[#FE7A3633] text-[#FE7A36] font-semibold rounded-full hover:bg-orange-50 hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full py-2 px-6 bg-[#3652AD] text-white font-semibold rounded-full hover:bg-[#2a4090] focus:outline-none focus:ring-2 focus:ring-[#3652AD] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );

  // If showFullLayout is false, render only the form content
  if (!showFullLayout) {
    return (
      <div className="max-w-2xl mx-auto w-full px-4 py-6">
        <FormContent />
      </div>
    );
  }

  // Full layout version (standalone page)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push(settingsRoute)} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <FormContent />
      </div>
    </div>
  );
};

export default ProfilePage;