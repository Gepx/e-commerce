import ProductImageSection from './ProductImageSection';
import ProductInfoSection from './ProductInfoSection';
import ProductVoucherSection from './ProductVoucherSection';
import ProductDetailSection from './ProductDetailSection';
import ProductReviewSection from './ProductReviewSection';

const ProductMainContent = () => {
  return (
    <div className="w-full lg:w-9/12 flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 items-start">
        <ProductImageSection />
        <ProductInfoSection />
      </div>
      <ProductVoucherSection />
      <ProductDetailSection />
      <div className="grid grid-cols-1 gap-6">
        <ProductReviewSection />
      </div>
    </div>
  );
};

export default ProductMainContent;
