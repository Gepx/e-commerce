import {
  WishlistProvider,
  useWishlistContext
} from '@/components/features/wishlist/context/WishlistContext';
import WishlistItem from '@/components/features/wishlist/components/WishlistItem';
import { Loader2 } from 'lucide-react';

const WishlistContent = () => {
  const { isLoading, isError } = useWishlistContext();

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

  return <WishlistItem />;
};

const Wishlist = () => {
  return (
    <WishlistProvider>
      <WishlistContent />
    </WishlistProvider>
  );
};

export default Wishlist;
