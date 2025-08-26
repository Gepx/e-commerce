import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const DetailProductDialog = ({ product }) => {
  const [open, setOpen] = useState(false);
  const images = product?.productImages ?? [];

  const specs = product?.productSpecification ?? {};
  const variants = product?.variants ?? [];
  const variations = product?.variations ?? [];

  const formatCurrency = (num) => `Rp ${Number(num).toLocaleString('id-ID')}`;
  const specValue = (value) =>
    typeof value === 'object' && value !== null
      ? `${value?.value ?? '-'} ${value?.unit ?? ''}`.trim()
      : (value ?? '-');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" className="cursor-pointer">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Detail</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-tight">{product?.productName}</h3>
              <div className="flex flex-wrap items-center gap-2">
                {product?.productCategory && (
                  <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                    {product.productCategory}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold">{formatCurrency(product?.productPrice)}</div>
              <div className="text-sm text-muted-foreground">Stock: {product?.stock ?? 0}</div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.length ? (
                  images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Image ${idx + 1}`}
                      className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-md border"
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No images</p>
                )}
              </div>
            </CardContent>
          </Card>

          {!!Object.keys(specs).length && (
            <Card>
              <CardHeader>
                <CardTitle>Specification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-x-8">
                  {Object.entries(specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start justify-between gap-4 border-b py-2 last:border-b-0">
                      <p className="text-sm font-medium capitalize">{key}</p>
                      <p className="text-sm text-muted-foreground">{specValue(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {product?.productDescription && (
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-40 overflow-auto pr-1">
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {product.productDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {!!variants.length && (
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {variants.map((variant) => (
                  <div key={variant.type} className="flex items-start gap-2">
                    <span className="text-sm font-medium capitalize w-24 shrink-0">
                      {variant.type}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {variant.options.map((opt) => (
                        <span
                          key={opt}
                          className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {!!variations.length && (
            <Card>
              <CardHeader>
                <CardTitle>Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                          <TableHead>Attributes</TableHead>
                          <TableHead className="text-right">Stock</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variations.map((variation, idx) => {
                          const attrs = Object.entries(variation.attributes || {})
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(', ');
                          return (
                            <TableRow key={idx}>
                              <TableCell className="text-muted-foreground capitalize">
                                {attrs || '-'}
                              </TableCell>
                              <TableCell className="text-right">{variation.stock}</TableCell>
                              <TableCell className="text-right font-medium">
                                {formatCurrency(variation.price)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailProductDialog;
