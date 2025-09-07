import { createContext, useContext } from 'react';
import useWishlist from '@/components/features/wishlist/hooks/useWishlist';
import useWishlistActions from '@/components/features/wishlist/hooks/useWishlistActions';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const wishlistHook = useWishlist();
  const actionsHook = useWishlistActions();

  const value = {
    ...wishlistHook,

    ...actionsHook
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within WishlistProvider');
  }
  return context;
};
