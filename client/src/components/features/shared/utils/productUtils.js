export const getMatchedVariation = (product, selectedVariants) => {
  if (!product?.variations?.length) return null;
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) return null;

  return product.variations.find((variation) =>
    Object.entries(selectedVariants).every(([key, value]) => variation.attributes[key] === value)
  );
};

export const getUnitPrice = (item) => {
  const matchedVariation = getMatchedVariation(item.product, item.selectedVariants);
  return matchedVariation?.price ?? item.product.productPrice;
};

export const getMaxStock = (item) => {
  const matchedVariation = getMatchedVariation(item.product, item.selectedVariants);
  return matchedVariation?.stock ?? item.product.stock;
};

export const renderVariants = (selectedVariants) => {
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) {
    return null;
  }

  return Object.entries(selectedVariants).map(([variantType, value]) => ({
    type: variantType,
    value: value,
    display: `${variantType}: ${value}`
  }));
};

export const formatPrice = (price) => {
  return `Rp ${Number(price).toLocaleString('id-ID')}`;
};

export const calculateItemTotal = (item) => {
  const unitPrice = getUnitPrice(item);
  return unitPrice * item.quantity;
};
