import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';

const CheckoutCard = ({
  product,
  displayPrice,
  displayStock,
  isPurchasable,
  qty,
  setQty,
  inc,
  dec,
  addItemToCart,
  addItemToWishlist,
  adding,
  addingToWishlist,
  userId,
  selectedVariants,
  onBuyNow,
  buyingNow = false
}) => {
  return (
    <div className="w-full lg:w-3/12">
      <Card className="sticky top-24 p-4 flex flex-col gap-3 shadow-lg">
        <p className="text-xl font-semibold">
          Subtotal: {`Rp${displayPrice.toLocaleString('id-ID')}`}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="sm" className="px-3 cursor-pointer" onClick={dec}>
              -
            </Button>
            <Input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
              className="w-14 text-center border-0 focus-visible:ring-0 focus-visible:border-0 shadow-none"
            />
            <Button variant="ghost" size="sm" className="px-3 cursor-pointer" onClick={inc}>
              +
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">Stock: {displayStock}</span>
        </div>

        <Button
          size="lg"
          disabled={!isPurchasable}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          onClick={() =>
            addItemToCart({
              userId: userId,
              productId: product._id.toString(),
              quantity: qty,
              selectedVariants: selectedVariants,
              price: displayPrice
            })
          }>
          <ShoppingCart className="w-5 h-5 mr-2" />
          {adding ? 'Adding...' : 'Add to Cart'}
        </Button>

        <Button
          size="lg"
          disabled={!isPurchasable || buyingNow}
          onClick={onBuyNow}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
          {buyingNow ? 'Processing...' : 'Buy Now'}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold transition-all duration-200 cursor-pointer"
          onClick={() =>
            addItemToWishlist({
              productId: product._id.toString(),
              selectedVariants: selectedVariants
            })
          }>
          <Heart className="w-5 h-5 mr-2" />
          {addingToWishlist ? 'Adding...' : 'Add to Wishlist'}
        </Button>
      </Card>
    </div>
  );
};

export default CheckoutCard;
