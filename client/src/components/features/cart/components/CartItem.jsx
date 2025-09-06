import CartRow from './CartRow';
import CartTableLayout from './CartTableLayout';
import { TableRow, TableCell } from '../../../ui/table';
import { ShoppingCart } from 'lucide-react';

const CartItem = ({ cartItems, selectedItems, setSelectedItems }) => {
  return (
    <CartTableLayout
      cartItems={cartItems}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}>
      {cartItems.length === 0 ? (
        <TableRow>
          <TableCell colSpan={5} className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">Your cart is empty</p>
          </TableCell>
        </TableRow>
      ) : (
        <CartRow
          cartItems={cartItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}
    </CartTableLayout>
  );
};

export default CartItem;
