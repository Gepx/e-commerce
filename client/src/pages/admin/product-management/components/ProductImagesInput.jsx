import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import LazyImage from '@/components/common/lazy-loading/LazyImage';
import { ImageSkeleton } from '@/components/common/skeleton/ImageSkeleton';

const ProductImagesInput = ({
  form,
  imageFiles,
  imagePreviews,
  handleImageUpload,
  removeImage
}) => {
  return (
    <FormField
      control={form.control}
      name="productImages"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Images (Max 10 files)</FormLabel>
          <FormControl>
            <Input
              placeholder="Product Images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imageFiles.length >= 10}
            />
          </FormControl>
          <FormMessage />

          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((img, index) => (
                <div key={index} className="relative">
                  <LazyImage
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                    placeholder={<ImageSkeleton />}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                    onClick={() => removeImage(index)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default ProductImagesInput;
