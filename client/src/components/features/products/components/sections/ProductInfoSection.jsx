import ProductInfo from '../ProductInfo';
import { useProductContext } from '@/components/features/products/context/ProductContext';

const ProductInfoSection = () => {
  const { product, selectedVariants, setSelectedVariants, averageRating, totalRatings } =
    useProductContext();

  if (!product) return null;

  return (
    <ProductInfo
      productName={product.productName}
      productPrice={product.productPrice}
      variants={product.variants}
      selectedVariants={selectedVariants}
      setSelectedVariants={setSelectedVariants}
      averageRating={averageRating}
      totalRatings={totalRatings}
    />
  );
};

export default ProductInfoSection;
