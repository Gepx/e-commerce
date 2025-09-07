import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const ReviewSummary = ({ averageRating, ratingCounts, totalRatings }) => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Star className="w-10 h-10 fill-yellow-500 text-yellow-500" />
          <p className="text-2xl font-bold">{averageRating.toFixed(1)} / 5.0</p>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((r) => {
            const pct = Math.round((ratingCounts[r] / totalRatings) * 100);
            return (
              <div className="flex items-center gap-3" key={r}>
                <span className="w-4 text-sm">{r}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-10 text-right text-sm text-gray-600">{ratingCounts[r]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ReviewSummary;
