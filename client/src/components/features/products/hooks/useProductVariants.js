import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useProductVariants = (product) => {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [activeVariation, setActiveVariation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedVariants) {
      setSelectedVariants(location.state.selectedVariants);
    }
  }, [location.state?.selectedVariants]);

  useEffect(() => {
    if (!product?.variants || !product?.variations) return;

    const requiredVariantCount = product.variants.length;
    const selectedVariantCount = Object.keys(selectedVariants).length;

    if (requiredVariantCount > 0 && requiredVariantCount === selectedVariantCount) {
      const foundVariation = product.variations.find((variation) => {
        return Object.entries(selectedVariants).every(([key, value]) => {
          return variation.attributes[key] === value;
        });
      });
      setActiveVariation(foundVariation || null);
    } else {
      setActiveVariation(null);
    }
  }, [selectedVariants, product]);

  const isPurchasable = product?.variants?.length === 0 || !!activeVariation;
  const displayPrice = activeVariation?.price || product?.productPrice;
  const displayStock = activeVariation?.stock ?? product?.stock;

  return {
    selectedVariants,
    setSelectedVariants,
    activeVariation,
    isPurchasable,
    displayPrice,
    displayStock
  };
};

export default useProductVariants;
