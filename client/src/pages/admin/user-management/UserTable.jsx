import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Eye, Pen, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import productService from '@/services/productService';
import Loading from '../loading';
import userService from '@/services/userService';

const UserTable = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');
  const userName = searchParams.get('userName') ?? '';

  const params = { page, limit, ...(userName ? { userName } : {}) };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['users', params],
    queryFn: () => productService.getAllProducts(params),
    keepPreviousData: true
  });

  const { mutate: deleteUserAccount, isPending: deleting } = useMutation({
    mutationFn: (id) => userService.deleteUserAccount(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully.');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to delete user.');
    }
  });

  const users = data?.users ?? [];
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
        accessorKey: 'username',
        header: 'Username'
      },
      {
        accessorKey: 'gender',
        header: 'Gender'
      },
      {
        accessorKey: 'dob',
        header: 'Date of Birth'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
          const createdAt = new Date(row.original.createdAt);
          return createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
        }
      },
      {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Button variant="default" size="icon">
                <Pen className="h-4 w-4 text-white" />
              </Button>
              <Button variant="warning" size="icon">
                <Eye className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                disabled={deleting}
                onClick={() => {
                  if (confirm('Delete this user?')) {
                    deleteUserAccount(row.original._id);
                  }
                }}>
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          );
        }
      }
    ],
    [deleting, deleteUserAccount]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        pageCount={pageCount}
        filterColumnId="email"
        filterPlaceholder="Search by email"
      />
    </>
  );
};

export default UserTable;
