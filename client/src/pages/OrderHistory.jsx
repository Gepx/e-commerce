import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { DataTable } from '@/components/common/DataTable.jsx';
import { useTransactions } from '@/components/features/transactions/hooks/useTransactions';

const statusColor = {
  pending: 'bg-yellow-100 text-yellow-800',
  settlement: 'bg-green-100 text-green-800',
  capture: 'bg-green-100 text-green-800',
  challenge: 'bg-orange-100 text-orange-800',
  deny: 'bg-red-100 text-red-800',
  cancel: 'bg-red-100 text-red-800',
  refund: 'bg-purple-100 text-purple-800',
  expired: 'bg-gray-100 text-gray-800'
};

export default function OrderHistory() {
  const { data, pagination, loading, error, refetch } = useTransactions({ page: 1, limit: 10 });
  const [selected, setSelected] = useState(null);

  const columns = useMemo(
    () => [
      {
        header: 'Order ID',
        accessorKey: 'orderId',
        cell: ({ row }) => (
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setSelected(row.original)}>
            {row.original.orderId}
          </button>
        )
      },
      { header: 'Type', accessorKey: 'transactionType', cell: () => 'Payment' },
      { header: 'Channel', accessorKey: 'channel', cell: () => 'QRIS' },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <Badge className={statusColor[row.original.status] || 'bg-gray-100 text-gray-800'}>
            {row.original.status}
          </Badge>
        )
      },
      {
        header: 'Amount',
        accessorKey: 'totalAmount',
        cell: ({ row }) => `Rp ${Number(row.original.totalAmount || 0).toLocaleString('id-ID')}`
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString()
      }
    ],
    []
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Order History</h3>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={loading}>
          Refresh
        </Button>
      </div>

      {error ? (
        <div className="rounded-md border p-4 text-red-600">Failed to load transactions</div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pageCount={pagination.totalPages}
          filterColumnId="orderId"
          filterPlaceholder="Search by Order ID"
          onParamsChange={(p) => {
            const page = Number(p.page || 1);
            const limit = Number(p.limit || 10);
            refetch({ page, limit, orderId: p.orderId });
          }}
        />
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <span className="inline-block max-w-[75%] truncate align-middle">
                Order #{selected?.orderId}
              </span>
              <Badge
                className={`ml-2 align-middle ${statusColor[selected?.status] || 'bg-gray-100 text-gray-800'}`}>
                {selected?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                Placed at {new Date(selected.createdAt).toLocaleString()}
              </div>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-2">Product</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Qty</th>
                      <th className="p-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selected.items || []).map((it, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">
                          <div className="flex items-center gap-3">
                            {it.image && (
                              <img
                                src={it.image}
                                alt={it.productName}
                                className="h-10 w-10 rounded object-cover"
                              />
                            )}
                            <span className="truncate max-w-[260px]" title={it.productName}>
                              {it.productName}
                            </span>
                          </div>
                        </td>
                        <td className="p-2">Rp {Number(it.price).toLocaleString('id-ID')}</td>
                        <td className="p-2">{it.quantity}</td>
                        <td className="p-2 text-right">
                          Rp {Number(it.price * it.quantity).toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end text-base font-semibold">
                Total: Rp {Number(selected.totalAmount || 0).toLocaleString('id-ID')}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
