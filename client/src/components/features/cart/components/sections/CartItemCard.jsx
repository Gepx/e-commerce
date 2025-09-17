import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import {
  getMaxStock,
  renderVariants,
  formatPrice
} from '@/components/features/shared/utils/productUtils';
import { useCartContext } from '@/components/features/cart/context/CartContext';
import LazyImage from '@/components/common/lazy-loading/LazyImage';
import { ImageSkeleton } from '@/components/common/skeleton/ImageSkeleton';

const CartItemCard = ({ item }) => {
  const { selectedItems, toggleSelectItem, updateItemQuantity, removeItem, itemTotals } =
    useCartContext();

  const isSelected = selectedItems.includes(item._id);
  const maxStock = getMaxStock(item);
  const variants = renderVariants(item.selectedVariants);
  const itemTotal = itemTotals[item._id] || { unitPrice: 0, total: 0 };

  return (
    <TableRow className="align-middle">
      <TableCell className="text-center">
        <Checkbox checked={isSelected} onCheckedChange={() => toggleSelectItem(item._id)} />
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-4">
          <LazyImage
            src={item.product.productImages[0]}
            alt={item.product.productName}
            className="w-16 h-16 object-cover rounded-md"
            placeholder={<ImageSkeleton />}
          />
          <div className="flex flex-col">
            <h3 className="font-medium">{item.product.productName}</h3>
            {variants && (
              <div className="flex gap-3 text-xs text-gray-500 capitalize">
                {variants.map((variant, index) => (
                  <span key={index}>{variant.display}</span>
                ))}
              </div>
            )}
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
            onClick={() => updateItemQuantity(item._id, item.quantity - 1)}>
            -
          </Button>
          <Input
            type="number"
            className="w-14 h-8 text-center border-0 focus-visible:ring-0 shadow-none rounded-none"
            value={item.quantity}
            onChange={(e) => {
              const newQuantity = Math.max(1, Math.min(maxStock, Number(e.target.value || 1)));
              updateItemQuantity(item._id, newQuantity);
            }}
          />
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            disabled={item.quantity >= maxStock}
            onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>
            +
          </Button>
        </div>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex flex-col items-center">
          <span className="text-base font-semibold">{formatPrice(itemTotal.total)}</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(itemTotal.unitPrice)}/each
          </span>
        </div>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-red-500 hover:bg-red-600 w-fit p-2 cursor-pointer"
          onClick={() => removeItem(item._id)}>
          <Trash className="h-4 w-4" />
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItemCard;
