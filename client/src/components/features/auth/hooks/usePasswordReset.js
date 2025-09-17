import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  emailOnlySchema,
  verifyOtpSchema,
  resetPasswordSchema,
  resetPasswordConfirmSchema
} from '@shared';
import authService from '@/components/features/auth/services/authService';

const usePasswordReset = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [devOtp, setDevOtp] = useState(null);

  const emailForm = useForm({
    resolver: zodResolver(emailOnlySchema),
    defaultValues: { email: '' }
  });

  const otpForm = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { email: '', otp: '' }
  });

  const passwordForm = useForm({
    resolver: zodResolver(resetPasswordConfirmSchema),
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  const sendOtp = async (data) => {
    setSubmitting(true);
    try {
      const res = await authService.requestPasswordOtp(data.email);
      setEmail(data.email);
      otpForm.reset({ email: data.email, otp: '' });
      setDevOtp(null);
      toast.success('OTP request sent to your email');
      setStep(2);
    } catch (error) {
      emailForm.setError('email', { message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const verifyOtp = async (data) => {
    setSubmitting(true);
    try {
      const res = await authService.verifyPasswordOtp({ email: data.email, otp: data.otp });
      setResetToken(res.resetToken);
      setStep(3);
    } catch (error) {
      otpForm.setError('otp', { message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const resetPassword = async (data) => {
    setSubmitting(true);
    try {
      await authService.resetPassword({ token: resetToken, newPassword: data.newPassword });
      setStep(4);
      toast.success('Password successfully changed');
    } catch (error) {
      passwordForm.setError('newPassword', { message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const goToStep = (newStep) => setStep(newStep);

  return {
    step,
    email,
    submitting,
    devOtp,

    emailForm,
    otpForm,
    passwordForm,

    sendOtp: emailForm.handleSubmit(sendOtp),
    verifyOtp: otpForm.handleSubmit(verifyOtp),
    resetPassword: passwordForm.handleSubmit(resetPassword),
    goToStep
  };
};

export default usePasswordReset;
