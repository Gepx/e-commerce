import { useMemo } from 'react';
import { getUnitPrice, calculateItemTotal } from '@/components/features/shared/utils/productUtils';

const useCartCalculations = (cartItems, selectedItems) => {
  const totalPrice = useMemo(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item._id))
      .reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }, [cartItems, selectedItems]);

  const totalQuantity = useMemo(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item._id))
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems, selectedItems]);

  const itemTotals = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      acc[item._id] = {
        unitPrice: getUnitPrice(item),
        total: calculateItemTotal(item)
      };
      return acc;
    }, {});
  }, [cartItems]);

  const cartSummary = useMemo(() => {
    const subtotal = totalPrice;
    const shipping = subtotal > 0 ? (subtotal >= 100000 ? 0 : 15000) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount: selectedItems.length,
      totalQuantity
    };
  }, [totalPrice, selectedItems.length, totalQuantity]);

  return {
    totalPrice,
    totalQuantity,
    itemTotals,
    cartSummary
  };
};

export default useCartCalculations;
