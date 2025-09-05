import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import wishlistService from '@/services/wishlistService';

const WishlistItem = ({ wishlistItems }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getMatchedVariation = (product, selectedVariants) => {
    if (!product?.variations?.length) return null;
    if (!selectedVariants || Object.keys(selectedVariants).length === 0) return null;
    return product.variations.find((variation) =>
      Object.entries(selectedVariants).every(([key, value]) => variation.attributes[key] === value)
    );
  };

  const debounceToastRemove = useMemo(
    () => debounce(() => toast.success('Item removed successfully'), 800),
    []
  );

  const debounceToastError = useMemo(
    () => debounce(() => toast.error('Failed to remove item'), 800),
    []
  );

  const { mutate: removeItemMutation } = useMutation({
    mutationFn: (item) => wishlistService.removeItemFromWishlist(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      debounceToastRemove();
    },
    onError: (err) => {
      debounceToastError();
    }
  });

  const removeItem = (item) => {
    removeItemMutation({
      productId: item.product._id,
      selectedVariants: item.selectedVariants
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-600 mt-2">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Items you add to your wishlist will appear here</p>
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistItems.map((item) => {
            const matchedVariation = getMatchedVariation(item.product, item.selectedVariants);
            const variationText = matchedVariation
              ? Object.entries(matchedVariation.attributes)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')
              : '';

            return (
              <Card
                key={item._id}
                className="hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
                onClick={() =>
                  navigate(`/product/${item.product._id}`, {
                    state: { selectedVariants: item.selectedVariants }
                  })
                }>
                <CardContent className="px-4">
                  <div className="relative flex h-48">
                    <div className="w-48 h-full cursor-pointer bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.productImages[0]}
                        alt={item.product.productName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div className="cursor-pointer">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {item.product.productName}
                        </h3>

                        {variationText && (
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

                        <div className="text-xl font-bold text-green-600">
                          Rp
                          {matchedVariation?.price?.toLocaleString('id-ID') ||
                            item.product.productPrice.toLocaleString('id-ID')}
                        </div>
                      </div>

                      {/* Bottom right - Remove button */}
                      <div className="flex justify-end mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item);
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
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistItem;
