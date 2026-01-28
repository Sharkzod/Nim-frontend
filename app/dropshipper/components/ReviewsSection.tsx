'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, ChevronRight } from 'lucide-react';

interface ReviewUser {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Review {
  _id: string;
  user: ReviewUser;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Vendor {
  _id: string;
  businessName?: string;
  location?: string;
}

interface ReviewsSectionComponentProps {
  productId?: string;
  vendor?: Vendor;
  loading?: boolean;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    _id: 'review_1',
    user: {
      _id: 'user_1',
      firstName: 'Opeyemi',
      lastName: 'Anuolu'
    },
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget euismod...',
    createdAt: '2024-04-04T10:30:00Z'
  },
  {
    _id: 'review_2',
    user: {
      _id: 'user_2',
      firstName: 'Opeyemi',
      lastName: 'Anuolu'
    },
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget euismod...',
    createdAt: '2024-04-04T14:20:00Z'
  },
  {
    _id: 'review_3',
    user: {
      _id: 'user_3',
      firstName: 'Opeyemi',
      lastName: 'Anuolu'
    },
    rating: 5,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget euismod...',
    createdAt: '2024-04-04T09:15:00Z'
  },
  {
    _id: 'review_4',
    user: {
      _id: 'user_4',
      firstName: 'Sarah',
      lastName: 'Williams'
    },
    rating: 5,
    comment: 'Absolutely love it! Exceeded my expectations.',
    createdAt: '2024-01-02T16:45:00Z'
  },
  {
    _id: 'review_5',
    user: {
      _id: 'user_5',
      firstName: 'David',
      lastName: 'Brown'
    },
    rating: 2,
    comment: 'Not what I expected. Quality could be better.',
    createdAt: '2023-12-28T11:10:00Z'
  }
];

// Local hook for mock reviews data
const useMockReviewsData = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = () => {
      if (!productId) {
        setReviews(mockReviews);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching reviews for product:', productId);
        
        setTimeout(() => {
          setReviews(mockReviews);
          setLoading(false);
        }, 500);
        
      } catch (err: any) {
        console.error('❌ Error fetching reviews:', err);
        setError('Failed to fetch reviews (mock error)');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return { reviews, loading, error };
};

const ReviewsSectionComponent: React.FC<ReviewsSectionComponentProps> = ({ 
  productId, 
  vendor,
  loading = false 
}) => {
  const router = useRouter();
  
  const { 
    reviews, 
    loading: reviewsLoading, 
    error 
  } = useMockReviewsData(productId || '');

  const getVendorInitials = (vendorName?: string): string => {
    if (!vendorName || typeof vendorName !== 'string') return 'VD';
    const initials = vendorName
      .split(' ')
      .map((n: string) => n.charAt(0))
      .join('')
      .toUpperCase();
    return initials.slice(0, 2) || 'VD';
  };

  const getVendorName = (vendor?: Vendor): string => {
    return vendor?.businessName || 'Agnes David';
  };

  const currentVendor: Vendor = vendor || {
    _id: 'vendor_123',
    businessName: 'Agnes David',
    location: 'Lagos, Nigeria'
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum: number, review: Review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  const userProfile = {
    name: getVendorName(currentVendor),
    initials: getVendorInitials(currentVendor.businessName),
    totalReviews: reviews.length,
    averageRating: calculateAverageRating()
  };

  const renderStars = (rating: number, maxRating: number = 5) => {
    const safeRating = Math.max(0, Math.min(rating, maxRating));
    return Array.from({ length: maxRating }, (_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${
          index < safeRating
            ? 'fill-orange-400 text-orange-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleViewAll = () => {
    console.log('View all reviews');
    alert('This would show all reviews. Using mock data.');
  };

  const handleVisitProfile = () => {
    if (currentVendor._id && currentVendor._id !== 'unknown') {
      console.log('Navigating to vendor profile:', currentVendor._id);
      alert(`This would navigate to vendor profile: ${currentVendor._id}`);
    } else {
      console.log('No vendor ID available');
    }
  };

  const getUserInitials = (user: ReviewUser): string => {
    const firstName = user?.firstName || '';
    const lastName = user?.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };

  const getUserDisplayName = (user: ReviewUser): string => {
    const firstName = user?.firstName || '';
    const lastName = user?.lastName || '';
    return `${firstName} ${lastName}`.trim() || 'Anonymous User';
  };

  // Loading skeleton
  if (loading || reviewsLoading) {
    return (
      <div className="w-[90%] mx-auto bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded-full w-32 animate-pulse"></div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-20 mb-3 animate-pulse"></div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-[90%] mx-auto bg-white rounded-lg p-6">
        <div className="text-center py-8">
          <div className="text-red-600 text-lg mb-2">Error loading reviews</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto bg-white rounded-lg p-6">
      {/* Vendor Header Section */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        {/* Vendor Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#4A5FBA] rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-base">
              {userProfile.initials}
            </span>
          </div>
          <span className="font-semibold text-gray-900 text-base">{userProfile.name}</span>
        </div>

        {/* Visit Profile Button with Arrow */}
        <button
          onClick={handleVisitProfile}
          className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
          disabled={!currentVendor._id || currentVendor._id === 'unknown'}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Reviews Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-medium text-base">
            Reviews({userProfile.totalReviews})
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars(Math.floor(userProfile.averageRating))}
            </div>
            <span className="text-sm font-normal text-gray-700">
              {userProfile.averageRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* View All Button */}
        {reviews.length > 3 && (
          <button
            onClick={handleViewAll}
            className="flex items-center gap-1 text-gray-900 text-sm font-medium hover:text-gray-700 transition-colors"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((review: Review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-2">
                {renderStars(review.rating)}
              </div>

              {/* Date */}
              <div className="text-xs text-gray-500 mb-3">
                {formatDate(review.createdAt)}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-semibold">
                    {getUserInitials(review.user)}
                  </span>
                </div>
                <span className="text-sm font-normal text-gray-900">
                  {getUserDisplayName(review.user)}
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-2">No reviews yet</div>
          <p className="text-gray-400 text-sm">Be the first to review this product</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSectionComponent;