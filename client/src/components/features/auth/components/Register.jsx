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
import useRegister from '@/components/features/auth/hooks/useRegister';
import AuthCard from '@/components/features/auth/components/common/AuthCard';
import PasswordField from '@/components/features/auth/components/common/PasswordField';
import OAuthSection from '@/components/features/auth/components/common/OAuthSection';

const Register = () => {
  const { form, onSubmit, isLoading } = useRegister();

  return (
    <AuthCard
      title="Register your account"
      description="Enter the requirements below to register your account">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Alexander Graham"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[10px]" />
              </FormItem>
            )}
          />

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
              <PasswordField field={field} label="Password" autoComplete="new-password" />
            )}
          />

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-700 cursor-pointer"
            disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/auth" className="underline hover:text-primary">
          Sign in
        </Link>
      </div>

      <OAuthSection />
    </AuthCard>
  );
};

export default Register;
