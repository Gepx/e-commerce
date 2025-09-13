import CheckoutCard from '@/components/features/products/components/CheckoutCard';
import { usePayment } from '@/components/features/transactions/hooks/usePayment';

const ProductCheckout = ({
  product,
  displayPrice,
  user,
  selectedAddress,
  addItemToCart,
  qty = 1,
  ...rest
}) => {
  const { directBuy, loading } = usePayment();

  const onBuyNow = async () => {
    const items = [
      {
        productId: product._id.toString(),
        quantity: qty,
        price: displayPrice
      }
    ];

    await directBuy({
      shippingAddressId: selectedAddress._id,
      customer: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber
      },
      items
    });
  };

  return (
    <CheckoutCard
      product={product}
      displayPrice={displayPrice}
      isPurchasable
      onBuyNow={loading ? undefined : onBuyNow}
      {...rest}
    />
  );
};

export default ProductCheckout;
