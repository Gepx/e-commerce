import { TableRow, TableCell } from '@/components/ui/table';
import { ShoppingCart } from 'lucide-react';
import CartTableLayout from '@/components/features/cart/components/CartTableLayout';
import CartItemCard from './CartItemCard';
import { useCartContext } from '@/components/features/cart/context/CartContext';

const CartList = () => {
  const { cartItems, isEmpty, selectedItems, setSelectedItems } = useCartContext();

  if (isEmpty) {
    return (
      <CartTableLayout
        cartItems={cartItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}>
        <TableRow>
          <TableCell colSpan={5} className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">Your cart is empty</p>
          </TableCell>
        </TableRow>
      </CartTableLayout>
    );
  }

  return (
    <CartTableLayout
      cartItems={cartItems}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}>
      {cartItems.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}
    </CartTableLayout>
  );
};

export default CartList;
