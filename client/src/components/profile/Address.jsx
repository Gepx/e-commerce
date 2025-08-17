import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const emptyAddress = {
  id: '',
  label: '',
  receiver: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  isDefault: false
};

const dummyInitial = [
  {
    id: '1',
    label: 'Home',
    receiver: 'John Doe',
    phone: '+1 555 111 2222',
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62701',
    country: 'USA',
    isDefault: true
  },
  {
    id: '2',
    label: 'Office',
    receiver: 'John Doe',
    phone: '+1 555 999 0000',
    street: '456 Business Rd Suite 8',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62704',
    country: 'USA',
    isDefault: false
  }
];

const fields = [
  { name: 'label', label: 'Label', autoComplete: 'off' },
  { name: 'receiver', label: 'Receiver Name', autoComplete: 'name' },
  { name: 'phone', label: 'Phone', autoComplete: 'tel' },
  { name: 'street', label: 'Street', autoComplete: 'address-line1', col: 'sm:col-span-2' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'state', label: 'State/Province', autoComplete: 'address-level1' },
  { name: 'postalCode', label: 'Postal Code', autoComplete: 'postal-code' },
  { name: 'country', label: 'Country', autoComplete: 'country-name' }
];

const Address = () => {
  const [addresses, setAddresses] = useState(dummyInitial);
  const [editingId, setEditingId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const form = useForm({ defaultValues: emptyAddress });

  // Load address into form when editing
  useEffect(() => {
    if (editingId) {
      const a = addresses.find((x) => x.id === editingId);
      if (a) form.reset(a);
      setOpenForm(true);
    } else {
      form.reset(emptyAddress);
    }
  }, [editingId, addresses, form]);

  const handleAddNew = () => {
    setEditingId(null);
    form.reset(emptyAddress);
    setOpenForm(true);
  };

  const setDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const onSubmit = (data) => {
    if (editingId) {
      setAddresses((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...data } : a)));
    } else {
      const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
      setAddresses((prev) => [...prev, { ...data, id }]);
    }
    setOpenForm(false);
    setEditingId(null);
    form.reset(emptyAddress);
  };

  const onDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (editingId === id) {
      setEditingId(null);
      form.reset(emptyAddress);
      setOpenForm(false);
    }
  };

  return (
    <section className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Addresses</h3>
        <Button className="bg-black text-white hover:bg-gray-700" onClick={handleAddNew}>
          Add Address
        </Button>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((addr) => (
          <Card key={addr.id} className={`border ${addr.isDefault ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">
                    {addr.label}{' '}
                    {addr.isDefault && (
                      <span className="ml-1 rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{addr.receiver}</p>
                  <p className="text-sm">{addr.phone}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setEditingId(addr.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-red-600"
                    onClick={() => onDelete(addr.id)}>
                    Del
                  </Button>
                </div>
              </div>
              <div className="text-sm">
                <p>{addr.street}</p>
                <p>
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p>{addr.country}</p>
              </div>
              {!addr.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setDefault(addr.id)}>
                  Set Default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        {addresses.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-full">No addresses yet. Add one.</p>
        )}
      </div>

      {/* Form */}
      {openForm && (
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <FormField
                      key={f.name}
                      control={form.control}
                      name={f.name}
                      render={({ field }) => (
                        <FormItem className={f.col}>
                          <FormLabel>{f.label}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id={f.name}
                              autoComplete={f.autoComplete}
                              placeholder={f.label}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setOpenForm(false);
                      setEditingId(null);
                      form.reset(emptyAddress);
                    }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-black text-white hover:bg-gray-700">
                    {editingId ? 'Update Address' : 'Add Address'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default Address;
