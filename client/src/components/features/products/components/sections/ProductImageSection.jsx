import { useProductContext } from '@/components/features/products/context/ProductContext';
import ProductImage from '../ProductImage';

const ProductImageSection = () => {
  const {
    product,
    currentImg,
    setCurrentImg,
    startIndex,
    visibleImages,
    visibleCount,
    handlePrev,
    handleNext,
    showPrevImage,
    showNextImage,
    onMainTouchStart,
    onMainTouchEnd
  } = useProductContext();

  if (!product) return null;

  return (
    <ProductImage
      onMainTouchStart={onMainTouchStart}
      onMainTouchEnd={onMainTouchEnd}
      productImages={product.productImages}
      productName={product.productName}
      currentImg={currentImg}
      showPrevImage={showPrevImage}
      showNextImage={showNextImage}
      handlePrev={handlePrev}
      handleNext={handleNext}
      startIndex={startIndex}
      visibleImages={visibleImages}
      visibleCount={visibleCount}
      setCurrentImg={setCurrentImg}
    />
  );
};

export default ProductImageSection;
