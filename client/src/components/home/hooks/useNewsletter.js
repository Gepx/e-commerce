import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const newsletterService = {
  subscribe: async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('error')) {
          reject(new Error('Failed to subscribe'));
        } else {
          resolve({ message: 'Successfully subscribed!' });
        }
      }, 1000);
    });
  }
};

const useNewsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: { email: '' }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await newsletterService.subscribe(data.email);
      toast.success('Successfully subscribed to newsletter!');
      form.reset();
    } catch (error) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting
  };
};

export default useNewsletter;
