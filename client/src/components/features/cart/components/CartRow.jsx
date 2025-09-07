import CartItemCard from './sections/CartItemCard';
import { TableBody } from '../../../ui/table';

const CartRow = ({ cartItems }) => {
  return (
    <TableBody>
      {cartItems.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}
    </TableBody>
  );
};

export default CartRow;
