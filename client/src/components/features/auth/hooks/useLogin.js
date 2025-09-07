import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema } from '@server/schemas/authSchema';
import { useAuth } from '@/context/AuthContext';

const useLogin = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await login({
        email: data.email,
        password: data.password
      });

      setTimeout(() => toast.success('Login successful'), 500);
      navigate('/');
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

export default useLogin;
