import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import wishlistService from '@/components/features/wishlist/services/wishlistService';

const useWishlist = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const {
    data: wishlistData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: () => wishlistService.getUserWishlist(),
    enabled: !!userId,
    retry: false,
    staleTime: 60 * 1000
  });

  const wishlistItems = wishlistData?.wishlist?.items || [];

  return {
    wishlistItems,
    isLoading,
    isError,
    error,
    isEmpty: wishlistItems.length === 0,
    itemCount: wishlistItems.length
  };
};

export default useWishlist;
