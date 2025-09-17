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
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePasswordReset from '@/components/features/auth/hooks/usePasswordReset';
import PasswordField from '@/components/features/auth/components/common/PasswordField';

const ResetWithEmailOtp = () => {
  const {
    step,
    email,
    submitting,
    devOtp,
    emailForm,
    otpForm,
    passwordForm,
    sendOtp,
    verifyOtp,
    resetPassword,
    goToStep
  } = usePasswordReset();

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
              <form onSubmit={sendOtp} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="test@example.com"
                          autoComplete="email"
                          {...field}
                        />
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
              <form onSubmit={verifyOtp} className="space-y-4">
                {/* Dev OTP no longer shown; email is used */}
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
                      <FormMessage className="text-red-500 text-[10px]" />
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
                        <Input
                          type="text"
                          placeholder="123456"
                          maxLength={6}
                          autoComplete="one-time-code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-1/3 cursor-pointer"
                    onClick={() => goToStep(1)}
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
              <form onSubmit={resetPassword} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <PasswordField field={field} label="New Password" autoComplete="new-password" />
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <PasswordField
                      field={field}
                      label="Confirm Password"
                      autoComplete="new-password"
                    />
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-1/3 cursor-pointer"
                    onClick={() => goToStep(2)}
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
