import CartSummary from '@/components/features/cart/components/CartSummary';
import { usePayment } from '@/components/features/transactions/hooks/usePayment';

const CardCheckout = ({ selectedAddress, user, selectedItems = [], totalPrice = 0 }) => {
  const { pay, loading } = usePayment();

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address first!');
      return;
    }

    await pay({
      shippingAddressId: selectedAddress._id,
      customer: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber
      }
    });
  };

  return (
    <CartSummary
      selectedItems={selectedItems}
      totalPrice={totalPrice}
      onCheckout={loading ? undefined : handleCheckout}
    />
  );
};

export default CardCheckout;
