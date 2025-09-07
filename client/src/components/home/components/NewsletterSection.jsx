import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useNewsletter from '@/components/home/hooks/useNewsletter';

const NewsletterSection = () => {
  const { form, onSubmit, isSubmitting } = useNewsletter();

  return (
    <div className="flex flex-col items-start col-span-1 gap-2">
      <h2 className="text-sm font-semibold">Subscribe to our newsletter</h2>
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    required
                    {...field}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </FormControl>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-gray-700 cursor-pointer w-full sm:w-auto">
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
            )}
          />
        </form>
      </Form>
      <p className="text-xs font-light">
        By submitting, you agree to our{' '}
        <Link to="/privacy" className="text-xs font-normal hover:underline cursor-pointer">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default NewsletterSection;
