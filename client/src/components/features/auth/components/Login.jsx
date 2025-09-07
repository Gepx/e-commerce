import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useLogin from '@/components/features/auth/hooks/useLogin';
import AuthCard from '@/components/features/auth/components/common/AuthCard';
import PasswordField from '@/components/features/auth/components/common/PasswordField';
import OAuthSection from '@/components/features/auth/components/common/OAuthSection';

const Login = () => {
  const { form, onSubmit, isLoading } = useLogin();
  return (
    <AuthCard title="Login" description="Login to your account to continue">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/auth/reset-password"
                    className="font-semibold text-sm hover:underline leading-none">
                    Forgot Password?
                  </Link>
                </div>
                <PasswordField field={field} label="" autoComplete="current-password" />
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-700 cursor-pointer"
            disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/auth/register" className="underline hover:text-primary">
          Register
        </Link>
      </div>

      <OAuthSection />
    </AuthCard>
  );
};

export default Login;
