import ProductDetail from '../ProductDetail';
import { useProductContext } from '@/components/features/products/context/ProductContext';
import { specValue } from '@/components/features/products/utils/productUtils';

const ProductDetailSection = () => {
  const { product } = useProductContext();

  if (!product) return null;

  return (
    <ProductDetail
      productSpecification={product.productSpecification}
      productDescription={product.productDescription}
      specValue={specValue}
    />
  );
};

export default ProductDetailSection;
