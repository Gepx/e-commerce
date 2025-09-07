import { useQuery } from '@tanstack/react-query';
import cartService from '@/components/features/cart/services/cartService';

const useCart = () => {
  const {
    data: cartData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => cartService.getUserCart(),
    staleTime: 5 * 60 * 1000
  });

  const cartItems = cartData?.cart?.items || [];

  return {
    cartItems,
    isLoading,
    isError,
    error,
    isEmpty: cartItems.length === 0
  };
};

export default useCart;
