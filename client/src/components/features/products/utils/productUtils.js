import { useMemo } from 'react';

export const specValue = (value) =>
  typeof value === 'object' && value !== null
    ? `${value?.value ?? '-'} ${value?.unit ?? ''}`.trim()
    : (value ?? '-');

export const calculateRatingStats = (reviews) => {
  return useMemo(() => {
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => (ratingCounts[r.rating] = (ratingCounts[r.rating] || 0) + 1));

    const totalRatings = reviews.length || 1;
    const averageRating =
      (5 * ratingCounts[5] +
        4 * ratingCounts[4] +
        3 * ratingCounts[3] +
        2 * ratingCounts[2] +
        1 * ratingCounts[1]) /
      totalRatings;

    return { ratingCounts, totalRatings, averageRating };
  }, [reviews]);
};
