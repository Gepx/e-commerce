import React, { memo, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import LazyImage from '@/components/common/lazy-loading/LazyImage';
import { ImageSkeleton } from '@/components/common/skeleton/imageSkeleton';

const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();

  // Memoize the navigation handler to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    navigate(`/product/${product._id}`);
  }, [navigate, product._id]);

  // Memoize expensive formatting operation
  const formattedPrice = useMemo(
    () => `Rp${product.productPrice.toLocaleString('id-ID')}`,
    [product.productPrice]
  );

  return (
    <Card
      className="w-fit h-[284px] overflow-hidden p-0 border-none gap-0 cursor-pointer flex flex-col"
      onClick={handleClick}>
      <div className="w-[180px] h-[180px] overflow-hidden">
        <LazyImage
          src={product.productImages[0]}
          alt={product.productName}
          className="w-full h-full object-cover"
          placeholder={<ImageSkeleton />}
          sizes="180px"
          priority={false}
        />
      </div>
      <CardContent className="flex flex-col w-[180px] p-2 justify-between flex-1">
        <CardTitle className="font-normal">
          <p className="text-sm line-clamp-2">{product.productName}</p>
        </CardTitle>
        <CardDescription>
          <h4 className="text-lg font-semibold line-clamp-1">{formattedPrice}</h4>
        </CardDescription>
        <CardFooter className="p-0 mt-auto">
          <p className="text-sm text-gray-500">⭐{product.productStar}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
});

// Add display name for better debugging
ProductCard.displayName = 'ProductCard';

export default ProductCard;
