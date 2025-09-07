import { CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const RatingFilter = ({ selectedRatings, onToggleRating }) => {
  return (
    <div>
      <CardTitle className="text-lg font-semibold">Rating</CardTitle>
      {Array.from({ length: 5 }).map((_, index) => {
        const ratingValue = index + 1;
        return (
          <div className="flex items-center gap-2" key={index}>
            <Checkbox
              id={`rating-${index}`}
              className="w-4 h-4"
              checked={selectedRatings.includes(ratingValue)}
              onCheckedChange={() => onToggleRating(ratingValue)}
            />
            <label htmlFor={`rating-${index}`}>
              {'⭐'.repeat(ratingValue) + (index !== 4 ? ' & higher' : ' ')}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RatingFilter;
