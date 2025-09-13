import { useEffect, useState } from 'react';
import CheckoutCard from '../CheckoutCard';
import { useProductContext } from '@/components/features/products/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { usePayment } from '@/components/features/transactions/hooks/usePayment';
import addressService from '@/components/features/profile/services/addressService';
import { toast } from 'sonner';

const ProductSidebar = () => {
  const {
    product,
    displayPrice,
    displayStock,
    isPurchasable,
    qty,
    setQty,
    inc,
    dec,
    addItemToCart,
    addItemToWishlist,
    adding,
    addingToWishlist,
    userId,
    selectedVariants
  } = useProductContext();

  const { user } = useAuth();
  const { directBuy, loading } = usePayment();
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

  const onBuyNow = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (!defaultAddress) {
      toast.error('Please set a default address in your profile first');
      return;
    }

    if (loading) return;
    const items = [
      {
        productId: product._id.toString(),
        quantity: qty,
        price: displayPrice
      }
    ];

    try {
      await directBuy({
        shippingAddressId: defaultAddress._id,
        customer: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phoneNumber
        },
        items
      });
    } catch (error) {
      console.error('Buy now failed:', error);
      toast.error(`Buy now failed: ${error.message}`);
    }
  };

  if (!product) return null;

  return (
    <CheckoutCard
      product={product}
      displayPrice={displayPrice}
      displayStock={displayStock}
      isPurchasable={isPurchasable && !loadingAddress}
      qty={qty}
      setQty={setQty}
      inc={inc}
      dec={dec}
      addItemToCart={addItemToCart}
      addItemToWishlist={addItemToWishlist}
      adding={adding}
      addingToWishlist={addingToWishlist}
      userId={userId}
      selectedVariants={selectedVariants}
      onBuyNow={onBuyNow}
      buyingNow={loading}
    />
  );
};

export default ProductSidebar;
