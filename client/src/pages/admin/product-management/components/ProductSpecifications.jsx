import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const ProductSpecifications = ({ form }) => {
  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <h3 className="text-lg font-semibold">Product Specifications</h3>

      <FormField
        control={form.control}
        name="productSpecification.brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <FormControl>
              <Input placeholder="Brand" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-row gap-4">
        <FormField
          control={form.control}
          name="productSpecification.weight.value"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Weight Value</FormLabel>
              <FormControl>
                <Input
                  placeholder="Weight"
                  type="number"
                  value={Number(field.value)}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productSpecification.weight.unit"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Weight Unit</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="productSpecification.material"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Material</FormLabel>
            <FormControl>
              <Input placeholder="Material" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="productSpecification.origin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Origin</FormLabel>
            <FormControl>
              <Input placeholder="Origin" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="productSpecification.warranty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Warranty</FormLabel>
            <FormControl>
              <Input placeholder="Warranty" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductSpecifications;
