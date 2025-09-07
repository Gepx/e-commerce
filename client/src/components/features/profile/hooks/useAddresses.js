import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import addressService from '@/components/features/profile/services/addressService';

const EMPTY_ADDRESS = {
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

const useAddresses = () => {
  const [searchParams] = useSearchParams();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dialogValues, setDialogValues] = useState(EMPTY_ADDRESS);

  const defaultAddress = useMemo(() => addresses.find((a) => a.isDefault) || null, [addresses]);

  const loadAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await addressService.getUserAddresses();
      setAddresses(res.addresses || []);
    } catch (error) {
      toast.error(error?.message || 'Failed to load addresses');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddNew = useCallback(() => {
    setEditingId(null);
    setDialogValues(EMPTY_ADDRESS);
    setDialogOpen(true);
  }, []);

  const handleEdit = useCallback((address) => {
    setEditingId(address._id);
    setDialogValues({
      id: address._id,
      label: address.label || '',
      recipientName: address.recipientName || '',
      phone: address.phone || '',
      street: address.street || '',
      city: address.city || '',
      province: address.province || '',
      postalCode: address.postalCode || '',
      isDefault: !!address.isDefault
    });
    setDialogOpen(true);
  }, []);

  const handleDialogOpenChange = useCallback((open) => {
    if (!open) {
      setEditingId(null);
      setDialogValues(EMPTY_ADDRESS);
    }
    setDialogOpen(open);
  }, []);

  const handleSubmitDialog = useCallback(
    async (data) => {
      try {
        const addressData = {
          label: data.label,
          recipientName: data.recipientName,
          phone: data.phone,
          street: data.street,
          city: data.city,
          province: data.province,
          postalCode: data.postalCode,
          isDefault: !!data.isDefault
        };

        if (editingId) {
          await addressService.updateAddress(editingId, addressData);
          toast.success('Address updated successfully');
        } else {
          await addressService.createAddress(addressData);
          toast.success('Address created successfully');
        }

        setDialogOpen(false);
        setEditingId(null);
        setDialogValues(EMPTY_ADDRESS);
        await loadAddresses();
      } catch (error) {
        toast.error(error?.message || 'Failed to save address');
      }
    },
    [editingId, loadAddresses]
  );

  const setAsDefault = useCallback(
    async (id) => {
      try {
        await addressService.setDefaultAddress(id);
        toast.success('Default address updated');
        await loadAddresses();
      } catch (error) {
        toast.error(error?.message || 'Failed to set default address');
      }
    },
    [loadAddresses]
  );

  const deleteAddress = useCallback(
    async (id) => {
      try {
        await addressService.deleteAddress(id);
        toast.success('Address deleted successfully');

        if (editingId === id) {
          setEditingId(null);
          setDialogValues(EMPTY_ADDRESS);
          setDialogOpen(false);
        }

        await loadAddresses();
      } catch (error) {
        toast.error(error?.message || 'Failed to delete address');
      }
    },
    [editingId, loadAddresses]
  );

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      handleAddNew();
    }
  }, [searchParams, handleAddNew]);

  return {
    addresses,
    defaultAddress,
    loading,
    dialogOpen,
    editingId,
    dialogValues,
    handleAddNew,
    handleEdit,
    handleDialogOpenChange,
    handleSubmitDialog,
    setAsDefault,
    deleteAddress,
    loadAddresses
  };
};

export default useAddresses;
