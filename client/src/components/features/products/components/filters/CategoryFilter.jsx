import { CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const CategoryFilter = ({ categories, selectedCategories, onToggleCategory }) => {
  return (
    <div>
      <CardTitle className="text-lg font-semibold">Categories</CardTitle>
      {categories.map((c, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={`cat-${c.category}`}
              className="w-4 h-4"
              checked={selectedCategories.includes(c.category)}
              onCheckedChange={() => onToggleCategory(c.category)}
            />
            <label htmlFor={`cat-${c.category}`} className="line-clamp-1 max-w-[100px]">
              {c.category}
            </label>
          </div>
          <span>{c.count}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
