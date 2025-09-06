import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { Eye, Pen, Trash2 } from 'lucide-react';
import { useMemo, memo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import productService from '@/components/features/products/services/productService';
import Loading from '../loading';
import AddProductDialog from './AddProductDialog';
import DeleteWrapper from '@/components/common/alert-wrapper/delete-wrapper';
import EditProductDialog from './EditProductDialog';
import DetailProductDialog from './DetailProductDialog';

const ProductTable = memo(() => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const productName = searchParams.get('productName') ?? '';

  const params = { page, limit, ...(productName ? { productName } : {}) };

  const { data, isLoading } = useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getAllProducts(params),
    keepPreviousData: true
  });

  const [editDialog, setEditDialog] = useState({ isOpen: false });

  const { mutate: deleteProduct, isPending: deleting } = useMutation({
    mutationFn: (id) => productService.deleteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully.');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to delete product.');
    }
  });

  const products = data?.products ?? [];
  const pageCount = data?.pagination?.totalPages ?? 0;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'No',
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        }
      },
      {
        accessorKey: 'productName',
        header: 'Name'
      },
      {
        accessorKey: 'productImages',
        header: 'Image',
        cell: ({ row }) => {
          const img = row.original.productImages?.[0];
          return img ? (
            <img
              src={img}
              alt={row.original.productName}
              className="h-10 w-10 object-cover rounded"
            />
          ) : (
            <span className="text-muted-foreground">No image</span>
          );
        }
      },
      {
        accessorKey: 'productPrice',
        header: 'Price',
        cell: ({ row }) => {
          const finalPrice = Number(row.getValue('productPrice')) || 0;
          return `Rp${finalPrice.toLocaleString('id-ID')}`;
        }
      },
      {
        accessorKey: 'productCategory',
        header: 'Category',
        cell: ({ row }) => {
          const categories = row.getValue('productCategory') || [];
          return Array.isArray(categories) ? categories.join(', ') : categories;
        }
      },
      {
        accessorKey: 'stock',
        header: 'Stock'
      },
      {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <EditProductDialog product={row.original} />
              <DetailProductDialog product={row.original} />
              <DeleteWrapper onConfirm={() => deleteProduct(row.original._id)} isPending={deleting}>
                <Button
                  variant="destructive"
                  size="icon"
                  className="cursor-pointer"
                  disabled={deleting}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DeleteWrapper>
            </div>
          );
        }
      }
    ],
    [deleting, deleteProduct]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Failed to load products.</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={products}
        pageCount={pageCount}
        filterColumnId="productName"
        filterPlaceholder="Product name"
        tableActionsButton={<AddProductDialog />}
      />
    </>
  );
});

ProductTable.displayName = 'ProductTable';

export default ProductTable;
