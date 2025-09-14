import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { getMatchedVariation, formatPrice } from '@/components/features/shared/utils/productUtils';
import { useWishlistContext } from '@/components/features/wishlist/context/WishlistContext';
import LazyImage from '@/components/common/lazy-loading/LazyImage';
import { ImageSkeleton } from '@/components/common/skeleton/imageSkeleton';

const WishlistCard = ({ item }) => {
  const { removeWishlistItem, navigateToProduct } = useWishlistContext();

  const matchedVariation = getMatchedVariation(item.product, item.selectedVariants);
  const displayPrice = matchedVariation?.price || item.product.productPrice;

  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
      onClick={() => navigateToProduct(item)}>
      <CardContent className="px-4">
        <div className="relative flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48 h-40 sm:h-full cursor-pointer bg-gray-100 flex-shrink-0">
            <LazyImage
              src={item.product.productImages[0]}
              alt={item.product.productName}
              className="w-full h-full object-cover rounded-lg"
              placeholder={<ImageSkeleton />}
            />
          </div>

          <div className="flex-1 p-4 flex flex-col">
            <div className="cursor-pointer">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {item.product.productName}
              </h3>

              {matchedVariation && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {Object.entries(matchedVariation.attributes).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <span className="capitalize font-semibold">{key}:</span>
                      <span className="ml-1">{value}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xl font-bold text-green-600">{formatPrice(displayPrice)}</div>
            </div>

            <div className="flex justify-end mt-4 sm:mt-auto">
              <Button
                size="sm"
                variant="outline"
                className="bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  removeWishlistItem(item);
                }}>
                <Trash className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
