import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { memo } from 'react';

const ProductVariants = memo(
  ({
    form,
    typeVariants,
    activeVariants,
    addVariantOption,
    variantOptions,
    addNewVariantOption,
    updateVariantOption,
    deleteVariantOption,
    hasActiveVariants,
    generateVariantCombinations,
    variantStock,
    handleCombinationStockChange,
    variantPrice,
    handleCombinationPriceChange
  }) => {
    return (
      <div className="space-y-4 border p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Product Variants</h3>

        <FormField
          control={form.control}
          name="variants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Variant Types</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  {typeVariants.map((t) => (
                    <div key={t.type} className="flex items-center gap-2">
                      <Checkbox
                        id={t.type}
                        className="w-4 h-4"
                        checked={activeVariants[t.type] || false}
                        onCheckedChange={() => addVariantOption(t.type)}
                      />
                      <Label htmlFor={t.type}>{t.label}</Label>
                    </div>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {Object.keys(activeVariants).length > 0 &&
          typeVariants.map(
            (t) =>
              activeVariants[t.type] && (
                <Card key={t.type}>
                  <CardHeader>
                    <div className="flex flex-row justify-between items-center">
                      <CardTitle>{t.label} Options</CardTitle>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => addNewVariantOption(t.type)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add {t.label}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {variantOptions[t.type]?.map((option, index) => (
                      <div key={`${t.type}-${index}`} className="flex flex-row gap-2">
                        <Input
                          placeholder={`Enter ${t.label.toLowerCase()} option`}
                          value={option}
                          onChange={(e) => updateVariantOption(t.type, index, e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => deleteVariantOption(t.type, index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
          )}

        {hasActiveVariants && Object.keys(variantOptions).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Stock by Variant Combinations</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {generateVariantCombinations.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  Fill in all variant options above to see combinations for stock and pricing.
                </p>
              ) : (
                generateVariantCombinations.map((combination, index) => {
                  const combinationKey = Object.values(combination).join('|');
                  const combinationDisplay = Object.entries(combination)
                    .map(([type, option]) => `${option}`)
                    .join(' | ');

                  return (
                    <div key={`combination-${index}`} className="flex flex-row gap-2 items-center">
                      <span className="w-32 font-medium">{combinationDisplay}</span>
                      <Input
                        type="number"
                        placeholder="Stock"
                        value={variantStock.combinations?.[combinationKey] || ''}
                        onChange={(e) => handleCombinationStockChange(combination, e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        value={variantPrice.combinations?.[combinationKey] || ''}
                        onChange={(e) => handleCombinationPriceChange(combination, e.target.value)}
                      />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

ProductVariants.displayName = 'ProductVariants';

export default ProductVariants;
