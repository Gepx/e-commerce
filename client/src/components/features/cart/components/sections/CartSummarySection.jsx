import CartSummary from '@/components/features/cart/components/CartSummary';
import { useCartContext } from '@/components/features/cart/context/CartContext';

const CartSummarySection = () => {
  const { selectedItems, cartSummary } = useCartContext();

  return (
    <CartSummary
      selectedItems={selectedItems}
      totalPrice={cartSummary.total}
      cartSummary={cartSummary}
    />
  );
};

export default CartSummarySection;
