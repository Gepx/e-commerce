import { Card, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, FilterIcon, Star } from 'lucide-react';
import LazyImage from '@/components/common/lazy-loading/LazyImage';
import { ImageSkeleton } from '@/components/common/skeleton/imageSkeleton';

const Review = ({ ratingOpen, setRatingOpen, reviews }) => {
  return (
    <>
      {/* Filter + Review list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 md:col-span-1 h-fit">
          <div className="flex items-center gap-2 mb-2">
            <FilterIcon className="w-4 h-4" />
            <h4 className="text-lg font-semibold">Filter Reviews</h4>
          </div>

          <div className="flex flex-col gap-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setRatingOpen((s) => !s)}>
              <CardTitle className="text-base font-semibold">Rating</CardTitle>
              <button type="button" className="p-1">
                {ratingOpen ? (
                  <ChevronUp className="w-4 h-4 cursor-pointer hover:bg-gray-200 rounded-full" />
                ) : (
                  <ChevronDown className="w-4 h-4 cursor-pointer hover:bg-gray-200 rounded-full" />
                )}
              </button>
            </div>
            {ratingOpen && (
              <div className="mt-2 flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((n) => (
                  <div className="flex items-center gap-2" key={n}>
                    <Checkbox id={`rating-${n}`} />
                    <label htmlFor={`rating-${n}`} className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {n}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 lg:col-span-2">
          <div className="h-[300px] overflow-y-auto space-y-4 pr-1">
            {reviews.map((r) => (
              <div key={r.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <LazyImage
                    src={`https://i.pravatar.cc/80?img=${(r.id % 70) + 1}`}
                    alt={r.name}
                    className="w-10 h-10 rounded-full"
                    placeholder={<ImageSkeleton />}
                  />
                  <div className="text-xs">
                    <p className="font-bold">{r.name}</p>
                    <p className="font-light">{r.date}</p>
                  </div>
                </div>
                <p className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < r.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </p>
                <p className="text-sm font-medium mt-1">{r.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Review;
