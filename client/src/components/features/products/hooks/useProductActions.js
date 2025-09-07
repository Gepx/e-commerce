import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import cartService from '@/components/features/cart/services/cartService';
import wishlistService from '@/components/features/wishlist/services/wishlistService';

const useProductActions = () => {
  const queryClient = useQueryClient();

  const { mutate: addItemToCart, isPending: adding } = useMutation({
    mutationFn: (item) => cartService.addItemToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item added to cart successfully.');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to add item to cart.');
    }
  });

  const { mutate: addItemToWishlist, isPending: addingToWishlist } = useMutation({
    mutationFn: (item) => wishlistService.addItemToWishlist(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Item added to wishlist successfully.');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to add item to wishlist.');
    }
  });

  return {
    addItemToCart,
    adding,
    addItemToWishlist,
    addingToWishlist
  };
};

export default useProductActions;
