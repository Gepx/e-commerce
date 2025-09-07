import CheckoutCard from '../CheckoutCard';
import { useProductContext } from '@/components/features/products/context/ProductContext';

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

  if (!product) return null;

  return (
    <CheckoutCard
      product={product}
      displayPrice={displayPrice}
      displayStock={displayStock}
      isPurchasable={isPurchasable}
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
    />
  );
};

export default ProductSidebar;
