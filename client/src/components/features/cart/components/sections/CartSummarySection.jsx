import { useEffect, useState } from 'react';
import CartSummary from '@/components/features/cart/components/CartSummary';
import { useCartContext } from '@/components/features/cart/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { usePayment } from '@/components/features/transactions/hooks/usePayment';
import addressService from '@/components/features/profile/services/addressService';
import { toast } from 'sonner';

const CartSummarySection = () => {
  const { selectedItems, cartSummary, clearSelection } = useCartContext();
  const { user } = useAuth();
  const { pay, loading } = usePayment();
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  useEffect(() => {
    const loadDefaultAddress = async () => {
      if (!user) return;

      setLoadingAddress(true);
      try {
        const res = await addressService.getUserAddresses();
        const addresses = res.addresses || [];
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(defaultAddr || null);
      } catch (error) {
        console.error('Failed to load addresses:', error);
      } finally {
        setLoadingAddress(false);
      }
    };

    loadDefaultAddress();
  }, [user]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (!defaultAddress) {
      toast.error('Please set a default address in your profile first');
      return;
    }

    if (selectedItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    if (loading || loadingAddress) return;

    const result = await pay({
      shippingAddressId: defaultAddress._id,
      selectedItemIds: selectedItems,
      customer: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber
      }
    });

    if (result.type === 'success' || result.type === 'pending') {
      clearSelection();
      toast.success('Payment initiated successfully!');
    }
  };

  const isCheckoutDisabled = loading || loadingAddress || selectedItems.length === 0;

  return (
    <CartSummary
      selectedItems={selectedItems}
      totalPrice={cartSummary.total}
      cartSummary={cartSummary}
      onCheckout={isCheckoutDisabled ? undefined : handleCheckout}
      loading={loading}
    />
  );
};

export default CartSummarySection;
