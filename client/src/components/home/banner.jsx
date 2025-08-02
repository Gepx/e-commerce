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

const Banner = () => (
  <Carousel className="w-[calc(95%-1rem)] md:w-[95%] mx-auto">
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 relative">
              <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                <span className="text-4xl font-semibold text-gray-500">{index + 1}</span>
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
