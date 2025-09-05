import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

const CartSummary = ({ selectedItems = [], totalPrice = 0, discount = 0 }) => {
  const subtotal = Number(totalPrice) || 0;
  const discountVal = Number(discount) || 0;
  const finalTotal = Math.max(0, subtotal - discountVal);

  return (
    <Card className="sticky top-4 w-full md:w-80 lg:w-96 self-start shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Selected Items</span>
            <span className="font-medium">{selectedItems.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium">{`Rp${subtotal.toLocaleString('id-ID')}`}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Discount</span>
            <span>-{`Rp${discountVal.toLocaleString('id-ID')}`}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{`Rp${finalTotal.toLocaleString('id-ID')}`}</span>
          </div>
          <Button className="w-full mt-2" disabled={selectedItems.length === 0}>
            Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
