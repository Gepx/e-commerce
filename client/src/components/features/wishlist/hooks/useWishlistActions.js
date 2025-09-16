import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { debounce } from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import wishlistService from '@/components/features/wishlist/services/wishlistService';

const useWishlistActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  const debounceToastRemove = useMemo(
    () => debounce(() => toast.success('Item removed successfully'), 500),
    []
  );

  const debounceToastError = useMemo(() => debounce((message) => toast.error(message), 500), []);

  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: (item) => wishlistService.removeItemFromWishlist(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?._id] });
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      debounceToastRemove();
    },
    onError: (err) => {
      debounceToastError(err?.message || 'Failed to remove item');
    }
  });

  const removeWishlistItem = (item) => {
    removeItem({
      productId: item.product._id,
      selectedVariants: item.selectedVariants
    });
  };

  const navigateToProduct = (item) => {
    navigate(`/product/${item.product._id}`, {
      state: { selectedVariants: item.selectedVariants }
    });
  };

  const continuesShopping = () => {
    navigate('/');
  };

  return {
    removeItem,
    isRemoving,
    removeWishlistItem,
    navigateToProduct,
    continuesShopping
  };
};

export default useWishlistActions;
