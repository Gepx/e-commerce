import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FilterIcon, ChevronDown, ChevronUp } from 'lucide-react';
import CategoryFilter from './filters/CategoryFilter';
import PriceFilter from './filters/PriceFilter';
import RatingFilter from './filters/RatingFilter';

const ProductFilters = ({
  categories,
  selectedCategories,
  priceRange,
  selectedRatings,
  onToggleCategory,
  onUpdatePriceRange,
  onToggleRating,
  onClearFilters
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Card className="block md:col-span-1 h-fit p-4 md:max-w-[200px]">
      <button
        type="button"
        className="flex items-center justify-between w-full gap-2 md:justify-start"
        onClick={() => setIsFilterOpen((prev) => !prev)}>
        <div className="flex items-center gap-2">
          <FilterIcon className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">Filter</h2>
        </div>
        <span className="md:hidden">
          {isFilterOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      <CardContent className={`${isFilterOpen ? 'flex' : 'hidden'} p-0 flex-col gap-4 md:flex`}>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
        />

        <PriceFilter
          priceRange={priceRange}
          onUpdatePriceRange={onUpdatePriceRange}
          onApply={() => {}}
        />

        <RatingFilter selectedRatings={selectedRatings} onToggleRating={onToggleRating} />
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
