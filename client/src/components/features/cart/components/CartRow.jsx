import { TableRow, TableCell, TableBody } from '../../../ui/table';
import { Button } from '../../../ui/button';
import { Checkbox } from '../../../ui/checkbox';
import { Input } from '../../../ui/input';
import { Trash, ShoppingCart } from 'lucide-react';
import cartService from '@/components/features/cart/services/cartService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { debounce } from 'lodash';

const CartRow = ({ cartItems, selectedItems, setSelectedItems }) => {
  const queryClient = useQueryClient();

  const debounceToastUpdate = useMemo(
    () => debounce(() => toast.success('Item updated successfully'), 800),
    []
  );

  const debounceToastRemove = useMemo(
    () => debounce(() => toast.success('Item remove successfully'), 800),
    []
  );

  const { mutate: updateItemMutation } = useMutation({
    mutationFn: (updatedItem) => cartService.updateCartItem(updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      debounceToastUpdate();
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update item');
    }
  });

  const { mutate: removeItemMutation } = useMutation({
    mutationFn: (item) => cartService.removeCartItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      debounceToastRemove();
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to remove item');
    }
  });

  if (cartItems.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">Your cart is empty</p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((item) => item._id === itemId);

    if (item) {
      updateItemMutation({
        productId: item.product._id,
        selectedVariants: item.selectedVariants,
        quantity: newQuantity
      });
    }
  };

  const removeItem = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      removeItemMutation({
        productId: item.product._id,
        selectedVariants: item.selectedVariants
      });
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const renderVariants = (selectedVariants) => {
    if (!selectedVariants || Object.keys(selectedVariants).length === 0) {
      return null;
    }

    return (
      <div className="flex gap-3 text-xs text-gray-500 capitalize">
        {Object.entries(selectedVariants).map(([variantType, value]) => (
          <span key={variantType}>
            {variantType}: {value}
          </span>
        ))}
      </div>
    );
  };

  const getMatchedVariation = (product, selectedVariants) => {
    if (!product?.variations?.length) return null;
    if (!selectedVariants || Object.keys(selectedVariants).length === 0) return null;
    return product.variations.find((variation) =>
      Object.entries(selectedVariants).every(([key, value]) => variation.attributes[key] === value)
    );
  };

  const getMaxQty = (item) => {
    const matchedVariation = getMatchedVariation(item.product, item.selectedVariants);
    return matchedVariation?.stock ?? item.product.stock;
  };

  const getUnitPrice = (item) => {
    const matchedPrice = getMatchedVariation(item.product, item.selectedVariants);
    return matchedPrice?.price ?? item.product.productPrice;
  };

  return (
    <>
      {cartItems.map((item) => (
        <TableRow key={item._id} className="align-middle">
          <TableCell className="text-center">
            <Checkbox
              checked={selectedItems.includes(item._id)}
              onCheckedChange={() => toggleSelectItem(item._id)}
            />
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-4">
              <img
                src={item.product.productImages[0]}
                alt={item.product.productName}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <h3 className="font-medium">{item.product.productName}</h3>
                {renderVariants(item.selectedVariants)}
              </div>
            </div>
          </TableCell>

          <TableCell className="text-center">
            <div className="flex items-center justify-center">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                disabled={item.quantity === 1}
                onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                -
              </Button>
              <Input
                type="number"
                className="w-14 h-8 text-center border-0 focus-visible:ring-0 shadow-none rounded-none"
                value={item.quantity}
                onChange={(e) => {
                  const raw = Number(e.target.value || 1);
                  const maxQty = getMaxQty(item);
                  updateQuantity(item._id, Math.max(1, Math.min(maxQty, raw)));
                }}
              />
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                disabled={item.quantity >= getMaxQty(item)}
                onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                +
              </Button>
            </div>
          </TableCell>

          <TableCell className="text-center">
            <div className="flex flex-col items-center">
              <span className="text-base font-semibold">{`Rp ${Number(item.quantity * getUnitPrice(item)).toLocaleString('id-ID')}`}</span>
              <span className="text-xs text-muted-foreground">{`Rp ${Number(getUnitPrice(item)).toLocaleString('id-ID')}/each`}</span>
            </div>
          </TableCell>

          <TableCell>
            <Button
              variant="ghost"
              size="icon"
              className="text-black-500 bg-red-500 hover:bg-red-600 w-fit p-2 cursor-pointer"
              onClick={() => removeItem(item._id)}>
              <Trash className="h-4 w-4" />
              Remove
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default CartRow;
