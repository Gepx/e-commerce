import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import api from '@/lib/api';

const useNewsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: { email: '' }
  });

  const onSubmit = async ({ email }) => {
    setIsSubmitting(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success('Thanks! You are subscribed.');
      form.reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Failed to subscribe');
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
