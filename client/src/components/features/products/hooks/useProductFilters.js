import { useState, useMemo } from 'react';

const useProductFilters = (products = []) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categories = useMemo(() => {
    const allCategories = products.flatMap((product) => product.productCategory);
    const uniqueCategories = [...new Set(allCategories)];

    return uniqueCategories.map((category) => {
      const count = products.filter((p) => p.productCategory.includes(category)).length;
      return { category, count };
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategories.length > 0) {
        const hasSelectedCategory = selectedCategories.some((cat) =>
          product.productCategory.includes(cat)
        );
        if (!hasSelectedCategory) return false;
      }

      const price = product.productPrice;
      if (priceRange.min && price < parseInt(priceRange.min)) return false;
      if (priceRange.max && price > parseInt(priceRange.max)) return false;

      if (selectedRatings.length > 0) {
        const productRating = product.productStar || 0;
        const hasMatchingRating = selectedRatings.some((rating) => productRating >= rating);
        if (!hasMatchingRating) return false;
      }

      return true;
    });
  }, [products, selectedCategories, priceRange, selectedRatings]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const updatePriceRange = (field, value) => {
    setPriceRange((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSelectedRatings([]);
  };

  return {
    categories,
    filteredProducts,
    selectedCategories,
    priceRange,
    selectedRatings,
    toggleCategory,
    updatePriceRange,
    toggleRating,
    clearFilters
  };
};

export default useProductFilters;
