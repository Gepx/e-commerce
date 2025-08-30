import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import addressService from '@/services/addressService';
import AddressDialog from '@/components/profile/AddressDialog';
import { Bookmark, Dot, Ellipsis, Pencil, SquareUserRound, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

const emptyAddress = {
  id: '',
  label: '',
  recipientName: '',
  phone: '',
  street: '',
  city: '',
  province: '',
  postalCode: '',
  isDefault: false
};

const Address = () => {
  const [searchParams] = useSearchParams();
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogValues, setDialogValues] = useState(emptyAddress);

  const defaultAddress = useMemo(() => addresses.find((a) => a.isDefault) || null, [addresses]);

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const res = await addressService.getUserAddresses();
      setAddresses(res.addresses || []);
    } catch (e) {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      handleAddNew();
    }
  }, [searchParams]);

  const handleAddNew = () => {
    setEditingId(null);
    setDialogValues(emptyAddress);
    setDialogOpen(true);
  };

  const handleEdit = (addr) => {
    setEditingId(addr._id);
    setDialogValues({
      id: addr._id,
      label: addr.label || '',
      recipientName: addr.recipientName || '',
      phone: addr.phone || '',
      street: addr.street || '',
      city: addr.city || '',
      province: addr.province || '',
      postalCode: addr.postalCode || '',
      isDefault: !!addr.isDefault
    });
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (open) => {
    if (!open) {
      setEditingId(null);
      setDialogValues(emptyAddress);
    }
    setDialogOpen(open);
  };

  const handleSubmitDialog = async (data) => {
    if (editingId) {
      await addressService.updateAddress(editingId, {
        label: data.label,
        recipientName: data.recipientName,
        phone: data.phone,
        street: data.street,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        isDefault: !!data.isDefault
      });
    } else {
      await addressService.createAddress({
        label: data.label,
        recipientName: data.recipientName,
        phone: data.phone,
        street: data.street,
        city: data.city,
        province: data.province,
        postalCode: data.postalCode,
        isDefault: !!data.isDefault
      });
    }
    setDialogOpen(false);
    setEditingId(null);
    setDialogValues(emptyAddress);
    await loadAddresses();
  };

  const setDefault = async (id) => {
    await addressService.setDefaultAddress(id);
    const current = addresses.find((a) => a._id === id);
    await Promise.all(
      addresses
        .filter((a) => a._id !== id && a.isDefault)
        .map((a) => addressService.updateAddress(a._id, { isDefault: false }))
    );
    await loadAddresses();
  };

  const onDelete = async (id) => {
    await addressService.deleteAddress(id);
    if (editingId === id) {
      setEditingId(null);
      setDialogValues(emptyAddress);
      setDialogOpen(false);
    }
    await loadAddresses();
  };

  return (
    <>
      <section className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Addresses</h3>
          <Button
            className="bg-black text-white hover:bg-gray-700 cursor-pointer"
            onClick={handleAddNew}>
            Add Address
          </Button>
        </div>

        <div className="text-center">
          {!loading && addresses.length === 0 && (
            <p className="text-sm text-muted-foreground">No addresses set.</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {addresses.map((addr) => (
            <Card
              key={addr._id}
              className={`border rounded-xl shadow-sm overflow-hidden p-0 flex flex-col gap-1 h-[160px] ${
                addr.isDefault ? 'ring-2 ring-primary' : 'hover:shadow-md transition'
              }`}>
              {/* Header */}
              <CardHeader className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b-1">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-gray-600" />
                  <CardTitle className="text-sm font-semibold text-gray-700">
                    {addr.label}
                    {addr.isDefault && (
                      <span className="ml-2 rounded-md bg-primary px-2 py-0.5 text-[10px] text-white">
                        Default
                      </span>
                    )}
                  </CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                      <Ellipsis className="w-4 h-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md rounded-md" align="end">
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => handleEdit(addr)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-2"
                      onClick={() => onDelete(addr._id)}>
                      <Trash className="w-4 h-4 text-red-500" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {!addr.isDefault && (
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => setDefault(addr._id)}>
                        Make Default
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              {/* Content */}
              <CardContent className="px-4 text-gray-700 h-full">
                <p className="text-sm leading-relaxed">
                  {addr.street} {addr.city}, {addr.province} {addr.postalCode}
                </p>

                <div>
                  <Separator className="my-2" />

                  <div className="flex items-center gap-2 text-gray-600">
                    <SquareUserRound className="w-4 h-4" />
                    <span className="text-sm">{addr.recipientName}</span>
                    <Dot className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{addr.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddressDialog
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
          initialValues={dialogValues}
          onSubmit={handleSubmitDialog}
          title={editingId ? 'Edit Address' : 'Add Address'}
        />
      </section>
    </>
  );
};

export default Address;
