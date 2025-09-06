import WishlistItem from '@/components/features/wishlist/components/WishlistItem';
import { useAuth } from '@/context/AuthContext';
import wishlistService from '@/components/features/wishlist/services/wishlistService';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const Wishlist = () => {
  const user = useAuth();
  const userId = user?._id;

  const {
    data: wishListData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getUserWishlist(),
    enabled: !!userId
  });

  const wishlistItems = wishListData?.wishlist?.items || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <p className="text-red-500">Error loading wishlist items.</p>
      </div>
    );
  }

  return <WishlistItem wishlistItems={wishlistItems} />;
};

export default Wishlist;
