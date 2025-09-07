import { useState } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const PasswordField = ({ field, label = 'Password', placeholder = '••••••••', autoComplete }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...field}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-0 right-0 h-full px-3 py-2 cursor-pointer hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeIcon className="w-4 h-4" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
            )}
            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </FormControl>
      <FormMessage className="text-red-500 text-[10px]" />
    </FormItem>
  );
};

export default PasswordField;
