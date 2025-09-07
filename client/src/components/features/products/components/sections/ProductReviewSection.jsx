import ReviewSummary from '../ReviewSummary';
import Review from '../Review';
import { useProductContext } from '@/components/features/products/context/ProductContext';

const ProductReviewSection = () => {
  const { averageRating, ratingCounts, totalRatings, ratingOpen, setRatingOpen, reviews } =
    useProductContext();

  return (
    <div className="grid grid-cols-1 gap-6">
      <ReviewSummary
        averageRating={averageRating}
        ratingCounts={ratingCounts}
        totalRatings={totalRatings}
      />
      <Review ratingOpen={ratingOpen} setRatingOpen={setRatingOpen} reviews={reviews} />
    </div>
  );
};

export default ProductReviewSection;
