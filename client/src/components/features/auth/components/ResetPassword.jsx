import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailOnlySchema, verifyOtpSchema, resetPasswordSchema } from '@server/schemas/authSchema';
import authService from '@/components/features/auth/services/authService';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetWithEmailOtp = () => {
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
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  const onSendOtp = async (data) => {
    setSubmitting(true);
    try {
      const res = await authService.requestPasswordOtp(data.email);
      setEmail(data.email);
      otpForm.reset({ email: data.email, otp: '' });

      if (res.devOtp) setDevOtp(res.devOtp);
      setStep(2);
    } catch (error) {
      emailForm.setError('email', { message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const onVerifyOtp = async (data) => {
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

  const onResetPassword = async (data) => {
    setSubmitting(true);
    try {
      await authService.resetPassword({ token: resetToken, newPassword: data.newPassword });
      setStep(4);
      toast.success('Password reset successfully');
    } catch (error) {
      passwordForm.setError('newPassword', { message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {step === 1 && 'Enter your email to receive a one-time code'}
            {step === 2 && 'Enter the 6-digit code sent to your email'}
            {step === 3 && 'Create a new password'}
            {step === 4 && 'Your password was reset successfully'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onSendOtp)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="test@example.com" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-700 cursor-pointer"
                  disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Code'}
                </Button>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onVerifyOtp)} className="space-y-4">
                {devOtp && <p className="text-sm text-muted-foreground">DEV OTP: {devOtp}</p>}
                <FormField
                  control={otpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled
                          value={field.value || email}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Code</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" maxLength={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-1/3"
                    onClick={() => setStep(1)}
                    disabled={submitting}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-2/3 bg-black text-white hover:bg-gray-700 cursor-pointer"
                    disabled={submitting}>
                    {submitting ? 'Verifying...' : 'Verify Code'}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 3 && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onResetPassword)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-1/3"
                    onClick={() => setStep(2)}
                    disabled={submitting}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-2/3 bg-black text-white hover:bg-gray-700 cursor-pointer"
                    disabled={submitting}>
                    {submitting ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-green-600 dark:text-green-400">
                Your password has been successfully reset.
              </p>
              <Button
                asChild
                className="w-full bg-black text-white hover:bg-gray-700 cursor-pointer ">
                <Link to="/auth">Go to Sign in</Link>
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            Remember your password?{' '}
            <Link to="/auth" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetWithEmailOtp;
