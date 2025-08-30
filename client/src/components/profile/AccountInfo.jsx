import { DynamicField } from '@/components/profile/DynamicField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import userService from '@/services/userService';
import addressService from '@/services/addressService';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from '@/schemas/userSchema';
import { Input } from '../ui/input';
import { User } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const AccountInfo = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();
  const inputImgRef = useRef(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const userId = user?._id;

  const { data: addressesData } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressService.getUserAddresses(),
    enabled: !!userId
  });

  const addresses = addressesData?.addresses || [];

  const defaultAddress = useMemo(() => addresses.find((a) => a.isDefault) || null, [addresses]);

  const { mutate: updateProfile } = useMutation({
    mutationFn: (payload) => userService.updateUserProfile(userId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user'] }),
        queryClient.invalidateQueries({ queryKey: ['addresses'] })
      ]);
      toast.success('Updated profile successfully');
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update profile');
    }
  });

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      dob: '',
      address: {
        country: '',
        province: '',
        city: '',
        postalCode: '',
        street: '',
        line2: ''
      }
    }
  });

  useEffect(() => {
    if (!user) return;
    form.reset({
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      gender: user.gender || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
      address: {
        street: defaultAddress?.street || '',
        city: defaultAddress?.city || '',
        province: defaultAddress?.province || '',
        postalCode: defaultAddress?.postalCode || ''
      }
    });
  }, [user, defaultAddress, form]);

  const onFileChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file || !userId) return;
      try {
        setUploading(true);
        await userService.updateUserAvatar(userId, file);
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success('Avatar updated');
      } catch (err) {
        toast.error(err?.message || 'Failed to update avatar');
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    },
    [userId, queryClient]
  );

  const onRemoveAvatar = useCallback(async () => {
    if (!userId) return;
    try {
      setRemoving(true);
      await userService.removeUserAvatar(userId);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Avatar removed');
    } catch (err) {
      toast.error(err?.message || 'Failed to remove avatar');
    } finally {
      setRemoving(false);
    }
  }, [userId, queryClient]);

  const fieldGroups = [
    {
      title: 'Personal',
      layout: 'sm:grid-cols-2',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
        { name: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
        { name: 'username', label: 'Username', type: 'text' },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]
        },
        { name: 'dob', label: 'Date of Birth', type: 'date' }
      ]
    },
    {
      title: 'Contact',
      layout: 'sm:grid-cols-2',
      fields: [
        { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', disabled: true },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'tel',
          autoComplete: 'tel',
          disabled: true
        }
      ]
    },
    {
      title: 'Address',
      layout: 'sm:grid-cols-3',
      fields: [
        {
          name: 'address.province',
          label: 'Province/State',
          type: 'text',
          autoComplete: 'address-level1',
          disabled: true
        },
        {
          name: 'address.city',
          label: 'City',
          type: 'text',
          autoComplete: 'address-level2',
          disabled: true
        },
        {
          name: 'address.postalCode',
          label: 'Postal Code',
          type: 'text',
          autoComplete: 'postal-code',
          disabled: true
        },
        {
          name: 'address.street',
          label: 'Street',
          type: 'text',
          className: 'sm:col-span-2',
          autoComplete: 'address-line1',
          disabled: true
        }
      ]
    }
  ];

  const onSubmit = async (values) => {
    if (!userId) return;
    setLoading(true);
    try {
      updateProfile({
        username: values.username || undefined,
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        gender: values.gender || undefined,
        dob: values.dob || undefined
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen ubuntu-font">
      <div className="container mx-auto p-4 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-xl font-semibold">Account Information</h3>
          <p className="text-xs text-gray-600"> </p>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-2">
            <h4 className="text-md font-semibold">Profile Picture</h4>
            <div className="flex flex-row items-center gap-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Avatar"
                  className="h-16 w-16 rounded-full border object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
                  <User className="h-8 w-8 text-slate-500" />
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputImgRef}
                onChange={onFileChange}
              />
              <Button
                type="file"
                variant="ghost"
                disabled={uploading}
                className="w-[68px] bg-black text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => inputImgRef.current.click()}>
                {uploading ? 'Uploading...' : 'Change'}
              </Button>

              <Button
                variant="ghost"
                disabled={removing}
                onClick={onRemoveAvatar}
                className="w-[68px] bg-black text-white hover:bg-gray-700 cursor-pointer">
                {removing ? 'Removing...' : 'Remove'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                {fieldGroups.map((group) => (
                  <div key={group.title} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-semibold tracking-wide">{group.title}</h4>
                      {group.title === 'Address' && (
                        <div className="flex gap-2">
                          {!addresses || addresses.length === 0 ? (
                            <Button
                              type="button"
                              className="bg-black text-white hover:bg-gray-700 cursor-pointer"
                              onClick={() => navigate('/addresses?action=add')}>
                              Add Address
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              className="cursor-pointer"
                              onClick={() => navigate('/addresses')}>
                              Manage Addresses
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={`grid gap-4 ${group.layout}`}>
                      {group.fields.map((f) => (
                        <DynamicField key={f.name} config={f} form={form} />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => form.reset()}
                    className="cursor-pointer border-2">
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white hover:bg-gray-700 cursor-pointer"
                    onClick={() => form.handleSubmit(onSubmit)}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AccountInfo;
