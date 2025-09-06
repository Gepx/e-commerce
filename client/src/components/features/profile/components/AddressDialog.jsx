import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
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
import { useForm } from 'react-hook-form';

const fields = [
  { name: 'label', label: 'Label', autoComplete: 'off' },
  { name: 'recipientName', label: 'Recipient Name', autoComplete: 'name' },
  { name: 'phone', label: 'Phone', autoComplete: 'tel' },
  { name: 'street', label: 'Street', autoComplete: 'address-line1', col: 'sm:col-span-2' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'province', label: 'Province/State', autoComplete: 'address-level1' },
  { name: 'postalCode', label: 'Postal Code', autoComplete: 'postal-code' }
];

export default function AddressDialog({ open, onOpenChange, initialValues, onSubmit, title }) {
  const form = useForm({ defaultValues: initialValues });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
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
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="cursor-pointer">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-700 cursor-pointer">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
