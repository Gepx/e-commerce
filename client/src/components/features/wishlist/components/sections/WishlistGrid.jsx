import { Button } from '@/components/ui/button';
import WishlistCard from './WishlistCard';
import { useWishlistContext } from '@/components/features/wishlist/context/WishlistContext';

const WishlistEmptyState = () => {
  const { continuesShopping } = useWishlistContext();

  return (
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
          onClick={continuesShopping}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 cursor-pointer">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

const WishlistHeader = ({ itemCount }) => (
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
    <p className="text-gray-600 mt-2">
      {itemCount} {itemCount === 1 ? 'item' : 'items'} in your wishlist
    </p>
  </div>
);

const WishlistGrid = () => {
  const { wishlistItems, isEmpty, itemCount } = useWishlistContext();

  return (
    <div className="container mx-auto px-4 py-6">
      <WishlistHeader itemCount={itemCount} />

      {isEmpty ? (
        <WishlistEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistItems.map((item) => (
            <WishlistCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistGrid;
