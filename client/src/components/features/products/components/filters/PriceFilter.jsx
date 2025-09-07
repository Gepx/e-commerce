import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PriceFilter = ({ priceRange, onUpdatePriceRange, onApply }) => {
  return (
    <div>
      <CardTitle className="text-lg font-semibold">Price</CardTitle>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min Price"
          value={priceRange.min}
          onChange={(e) => onUpdatePriceRange('min', e.target.value)}
        />
        -
        <Input
          type="number"
          placeholder="Max Price"
          value={priceRange.max}
          onChange={(e) => onUpdatePriceRange('max', e.target.value)}
        />
      </div>
      <Button
        className="w-full bg-black text-white hover:bg-gray-700 cursor-pointer mt-4"
        onClick={onApply}>
        Apply
      </Button>
    </div>
  );
};

export default PriceFilter;
