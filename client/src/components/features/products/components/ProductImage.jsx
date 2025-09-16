import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from '@/components/common/lazy-loading/LazyImage';
import { ImageSkeleton } from '@/components/common/skeleton/imageSkeleton';

const ProductImage = ({
  onMainTouchStart,
  onMainTouchEnd,
  productImages,
  productName,
  currentImg,
  showPrevImage,
  showNextImage,
  handlePrev,
  handleNext,
  startIndex,
  visibleImages,
  visibleCount,
  setCurrentImg
}) => {
  return (
    <div className="lg:col-span-5 flex flex-col gap-3">
      <div className="relative">
        <Card
          className="p-0 m-0 overflow-hidden aspect-[4/3]"
          onTouchStart={onMainTouchStart}
          onTouchEnd={onMainTouchEnd}>
          <LazyImage
            src={productImages[currentImg]}
            alt={productName}
            className="w-full h-full object-cover"
            placeholder={<ImageSkeleton />}
          />
        </Card>
        {/* Mobile/Medium overlay arrows */}
        <button
          type="button"
          onClick={showPrevImage}
          className="lg:hidden absolute inset-y-0 left-2 my-auto h-8 w-8 rounded-full bg-white/80 shadow flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={showNextImage}
          className="lg:hidden absolute inset-y-0 right-2 my-auto h-8 w-8 rounded-full bg-white/80 shadow flex items-center justify-center">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Thumbnails only on large screens */}
      <div className="relative hidden lg:flex items-center">
        {startIndex > 0 && (
          <Button
            onClick={handlePrev}
            className="absolute -left-6 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100 cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}

        <div className="grid grid-cols-5 gap-3">
          {visibleImages.map((img, i) => (
            <Card
              key={i + startIndex}
              className={`p-0 m-0 overflow-hidden aspect-square  ${
                i + startIndex === currentImg
                  ? 'ring-2 ring-blue-500'
                  : 'ring-transparent hover:ring-blue-300'
              }`}>
              <LazyImage
                src={img}
                alt={`Image ${i + startIndex + 1}`}
                onClick={() => setCurrentImg(i + startIndex)}
                className={'w-full h-full object-cover cursor-pointer'}
                placeholder={<ImageSkeleton />}
              />
            </Card>
          ))}
        </div>

        {startIndex + visibleCount < productImages.length && (
          <Button
            onClick={handleNext}
            className="absolute -right-6 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100 cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductImage;
