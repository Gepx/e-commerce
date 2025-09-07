import { createContext, useContext, useState } from 'react';
import useCart from '@/components/features/cart/hooks/useCart';
import useCartActions from '@/components/features/cart/hooks/useCartActions';
import useCartCalculations from '@/components/features/cart/hooks/useCartCalculations';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const cartHook = useCart();
  const actionsHook = useCartActions();
  const calculationsHook = useCartCalculations(cartHook.cartItems, selectedItems);

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(cartHook.cartItems.map((item) => item._id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const isAllSelected =
    selectedItems.length === cartHook.cartItems.length && cartHook.cartItems.length > 0;
  const hasSelectedItems = selectedItems.length > 0;

  const value = {
    ...cartHook,

    ...actionsHook,

    ...calculationsHook,

    selectedItems,
    setSelectedItems,
    toggleSelectItem,
    selectAllItems,
    clearSelection,
    isAllSelected,
    hasSelectedItems,

    updateItemQuantity: (itemId, newQuantity) =>
      actionsHook.updateQuantity(cartHook.cartItems, itemId, newQuantity),

    removeItem: (itemId) => actionsHook.removeCartItem(cartHook.cartItems, itemId, setSelectedItems)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};
