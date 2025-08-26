import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import useProductForm from '@/hooks/useProductForm';
import { Pen } from 'lucide-react';

import ProductImagesInput from './components/ProductImagesInput';
import ProductSpecifications from './components/ProductSpecifications';
import ProductCategories from './components/ProductCategories';
import ProductVariants from './components/ProductVariants';

const EditProductDialog = ({ product }) => {
  const [open, setOpen] = useState(false);

  const {
    form,
    isPending,
    onSubmit,
    onInvalid,
    addVariantOption,
    addNewVariantOption,
    updateVariantOption,
    deleteVariantOption,
    generateVariantCombinations,
    handleCombinationStockChange,
    handleCombinationPriceChange,
    handleImageUpload,
    removeImage,
    handleCategoryChange,
    hasActiveVariants,
    imageFiles,
    imagePreviews,
    selectedCategories,
    typeVariants,
    categoryOptions,
    variantOptions,
    variantStock,
    variantPrice,
    activeVariants
  } = useProductForm({
    initialData: product,
    setDialogOpen: setOpen
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="warning" size="icon" className="cursor-pointer">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProductImagesInput
              form={form}
              imageFiles={imageFiles}
              imagePreviews={imagePreviews}
              handleImageUpload={handleImageUpload}
              removeImage={removeImage}
            />
            <ProductSpecifications form={form} />
            {/* Product Description */}
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProductCategories
              form={form}
              categoryOptions={categoryOptions}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
            />
            {/* Product Price */}
            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Price"
                      type="number"
                      step="0.01"
                      {...field}
                      disabled={hasActiveVariants}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stock"
                      type="number"
                      {...field}
                      disabled={hasActiveVariants}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ProductVariants
              form={form}
              typeVariants={typeVariants}
              activeVariants={activeVariants}
              addVariantOption={addVariantOption}
              variantOptions={variantOptions}
              addNewVariantOption={addNewVariantOption}
              updateVariantOption={updateVariantOption}
              deleteVariantOption={deleteVariantOption}
              hasActiveVariants={hasActiveVariants}
              generateVariantCombinations={generateVariantCombinations}
              variantStock={variantStock}
              handleCombinationStockChange={handleCombinationStockChange}
              variantPrice={variantPrice}
              handleCombinationPriceChange={handleCombinationPriceChange}
            />

            <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
