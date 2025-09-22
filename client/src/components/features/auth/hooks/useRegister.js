import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registerSchema } from '@shared/schemas/auth';
import authService from '@/components/features/auth/services/authService';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password
      });

      setTimeout(() => toast.success('Registration successful'), 500);
      navigate('/auth');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading
  };
};

export default useRegister;
