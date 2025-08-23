import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ProductCategories = ({ form, categoryOptions, selectedCategories, handleCategoryChange }) => {
  return (
    <FormField
      control={form.control}
      name="productCategory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Categories</FormLabel>
          <FormControl>
            <div className="grid grid-cols-2 gap-2 border p-4 rounded-lg">
              {categoryOptions.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />

          {selectedCategories.length > 0 && (
            <div className="text-sm text-gray-600 mt-2">
              Selected: {selectedCategories.join(', ')}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default ProductCategories;
