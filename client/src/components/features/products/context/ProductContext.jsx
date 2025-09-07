import { createContext, useContext, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import useProduct from '@/components/features/products/hooks/useProduct';
import useProductImages from '@/components/features/products/hooks/useProductImages';
import useProductVariants from '@/components/features/products/hooks/useProductVariants';
import useProductActions from '@/components/features/products/hooks/useProductActions';
import { VOUCHERS, MOCK_REVIEWS } from '@/components/features/products/constants/productConstants';
import { calculateRatingStats } from '@/components/features/products/utils/productUtils';

const ProductContext = createContext();

export const ProductProvider = ({ children, productId }) => {
  const { user } = useAuth();
  const [qty, setQty] = useState(1);
  const [ratingOpen, setRatingOpen] = useState(true);

  const productQuery = useProduct(productId);
  const imageHandlers = useProductImages(productQuery.data?.product?.productImages);
  const variantHandlers = useProductVariants(productQuery.data?.product);
  const actionHandlers = useProductActions();

  const product = productQuery.data?.product || null;
  const userId = user?._id;
  const vouchers = VOUCHERS;
  const reviews = MOCK_REVIEWS;
  const ratingStats = calculateRatingStats(reviews);

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const value = {
    ...productQuery,
    product,
    userId,

    qty,
    setQty,
    inc,
    dec,
    ratingOpen,
    setRatingOpen,

    vouchers,
    reviews,
    ...ratingStats,

    ...imageHandlers,
    ...variantHandlers,
    ...actionHandlers
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider');
  }
  return context;
};
