import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { debounce } from 'lodash';
import cartService from '@/components/features/cart/services/cartService';

const useCartActions = () => {
  const queryClient = useQueryClient();

  const debounceToastUpdate = useMemo(
    () => debounce(() => toast.success('Item updated successfully'), 500),
    []
  );

  const debounceToastRemove = useMemo(
    () => debounce(() => toast.success('Item removed successfully'), 500),
    []
  );

  const { mutate: updateItem, isPending: isUpdating } = useMutation({
    mutationFn: (updatedItem) => cartService.updateCartItem(updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      debounceToastUpdate();
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update item');
    }
  });

  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: (item) => cartService.removeCartItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      debounceToastRemove();
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to remove item');
    }
  });

  const updateQuantity = (cartItems, itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      updateItem({
        productId: item.product._id,
        selectedVariants: item.selectedVariants,
        quantity: newQuantity
      });
    }
  };

  const removeCartItem = (cartItems, itemId, setSelectedItems) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      removeItem({
        productId: item.product._id,
        selectedVariants: item.selectedVariants
      });

      if (setSelectedItems) {
        setSelectedItems((prev) => prev.filter((id) => id !== itemId));
      }
    }
  };

  return {
    updateItem,
    removeItem,
    isUpdating,
    isRemoving,
    updateQuantity,
    removeCartItem
  };
};

export default useCartActions;
