import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserZodSchema } from '@/schemas/userClientSchema';

const useProfileForm = (user, defaultAddress, onSubmit) => {
  const form = useForm({
    resolver: zodResolver(updateUserZodSchema),
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

  const handleSubmit = async (values) => {
    const profileData = {
      username: values.username || undefined,
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      gender: values.gender || undefined,
      dob: values.dob || undefined
    };

    await onSubmit(profileData);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit)
  };
};

export default useProfileForm;
