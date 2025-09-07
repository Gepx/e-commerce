import { Button } from '@/components/ui/button';
import { ShoppingBag, Star } from 'lucide-react';

const ProductInfo = ({
  productName,
  productPrice,
  variants,
  selectedVariants,
  setSelectedVariants,
  averageRating,
  totalRatings
}) => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold leading-tight">{productName}</h1>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <ShoppingBag className="w-4 h-4" />
          154 orders
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {averageRating.toFixed(1)} ({totalRatings} reviews)
        </span>
      </div>

      <span className="text-2xl font-semibold">{`Rp${productPrice.toLocaleString('id-ID')}`}</span>

      {variants && variants.length > 0 && (
        <>
          {variants.map((variant) => (
            <div className="flex flex-col gap-2" key={variant.type}>
              <div className="text-sm text-gray-500 capitalize">{variant.type}</div>
              <div className="flex items-center gap-2 flex-wrap">
                {variant.options.map((option) => {
                  const isActive = selectedVariants[variant.type] === option;
                  return (
                    <Button
                      key={option}
                      variant={isActive ? 'solid' : 'outline'}
                      className={`cursor-pointer h-9 px-4 ${isActive ? 'bg-green-500 ring-1 ring-blue-500' : ''}`}
                      onClick={() =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [variant.type]: option
                        }))
                      }>
                      {option}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductInfo;
