import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import ProductImagesInput from './components/ProductImagesInput';
import ProductSpecifications from './components/ProductSpecifications';
import ProductCategories from './components/ProductCategories';
import ProductVariants from './components/ProductVariants';
import useProductForm from '@/components/features/products/hooks/useProductForm';

const AddProductDialog = () => {
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
  } = useProductForm({ setDialogOpen: setOpen });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add New Product</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Please fill in the details to add a new product.</DialogDescription>
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

            {/* General Stock input (disabled when variants active) */}
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
              {isPending ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
