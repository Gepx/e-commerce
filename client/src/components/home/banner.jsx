import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from '../common/lazy-loading/LazyImage';
import { ImageSkeleton } from '../common/skeleton/ImageSkeleton';

const bannerImages = [
  {
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop',
    alt: 'Elegant silver watch on a reflective surface'
  },
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1920&auto=format&fit=crop',
    alt: 'Modern headphones on a clean yellow background'
  },
  {
    src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1920&auto=format&fit=crop',
    alt: 'Vintage-style camera with lens details'
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop',
    alt: 'Stylish green sofa in a minimalist room setting'
  },
  {
    src: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1920&auto=format&fit=crop',
    alt: 'Sleek modern laptop open on a desk'
  }
];

const Banner = () => (
  <Carousel className="w-full">
    <CarouselContent>
      {bannerImages.map((img, index) => (
        <CarouselItem key={index}>
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 relative">
              <div className="w-full h-64 md:h-80 lg:h-96">
                <LazyImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full rounded-xl object-cover"
                  placeholder={<ImageSkeleton />}
                />
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="collapse md:visible left-4">
      <ChevronLeft />
    </CarouselPrevious>
    <CarouselNext className="collapse md:visible right-4">
      <ChevronRight />
    </CarouselNext>
  </Carousel>
);

export default Banner;
