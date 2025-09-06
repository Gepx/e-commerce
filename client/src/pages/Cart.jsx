import CartItem from '@/components/features/cart/components/CartItem';
import CartSummary from '@/components/features/cart/components/CartSummary';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import cartService from '@/components/features/cart/services/cartService';
import { Loader2 } from 'lucide-react';

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    data: cartData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => cartService.getUserCart()
  });

  const cartItems = cartData?.cart?.items || [];

  const getMatchedVariation = (product, selectedVariants) => {
    if (!product?.variations?.length) return null;
    if (!selectedVariants || Object.keys(selectedVariants).length === 0) return null;
    return product.variations.find((variation) =>
      Object.entries(selectedVariants).every(([key, value]) => variation.attributes[key] === value)
    );
  };

  const getUnitPrice = (item) => {
    const matchedPrice = getMatchedVariation(item.product, item.selectedVariants);
    return matchedPrice?.price ?? item.product.productPrice;
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item._id))
    .reduce((sum, item) => {
      const price = getUnitPrice(item);
      return sum + price * item.quantity;
    }, 0);

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
        <p className="text-red-500">Error loading cart items.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
      <div className="w-full">
        <CartItem
          cartItems={cartItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>

      <aside className="w-full">
        <CartSummary selectedItems={selectedItems} totalPrice={totalPrice} />
      </aside>
    </div>
  );
};

export default Cart;
