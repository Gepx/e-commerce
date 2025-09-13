import { Card, CardHeader, CardTitle, CardContent } from '../../../ui/card';
import { Separator } from '../../../ui/separator';
import { Button } from '../../../ui/button';
import { formatPrice } from '@/components/features/shared/utils/productUtils';

const CartSummary = ({
  selectedItems = [],
  totalPrice = 0,
  cartSummary = {},
  onCheckout,
  loading = false
}) => {
  const summary =
    cartSummary.subtotal !== undefined
      ? cartSummary
      : {
          subtotal: totalPrice,
          shipping: 0,
          tax: 0,
          total: totalPrice,
          itemCount: selectedItems.length,
          totalQuantity: 0
        };

  const { subtotal, shipping, tax, total, itemCount, totalQuantity } = summary;
  const hasItems = itemCount > 0;

  return (
    <Card className="sticky top-4 w-full md:w-80 lg:w-96 self-start shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Selected Items</span>
            <span className="font-medium">
              {itemCount} items ({totalQuantity} pieces)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>

          {shipping === 0 && subtotal > 0 && (
            <div className="text-xs text-green-600">🎉 You got free shipping!</div>
          )}

          <div className="flex items-center justify-between text-muted-foreground">
            <span>Tax (10%)</span>
            <span>{formatPrice(tax)}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatPrice(total)}</span>
          </div>

          <Button
            className="w-full mt-4 cursor-pointer"
            disabled={!hasItems || loading}
            onClick={onCheckout}
            size="lg">
            {loading
              ? 'Processing...'
              : hasItems
                ? `Checkout (${itemCount})`
                : 'Select Items to Checkout'}
          </Button>

          {!hasItems && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Select items from your cart to proceed
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
