import { CartProvider, useCartContext } from '@/components/features/cart/context/CartContext';
import CartItem from '@/components/features/cart/components/CartItem';
import CartSummarySection from '@/components/features/cart/components/sections/CartSummarySection';
import { Loader2 } from 'lucide-react';
import Loading from '@/components/common/loading/Loading';
import { Suspense } from 'react';

const CartContent = () => {
  const { isLoading, isError } = useCartContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <p className="text-red-500">Error loading cart items.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <CartItem />
        </div>
        <aside className="w-full">
          <CartSummarySection />
        </aside>
      </Suspense>
    </div>
  );
};

const Cart = () => {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
};

export default Cart;
