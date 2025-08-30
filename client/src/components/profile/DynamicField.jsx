import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function DynamicField({ form, config }) {
  const isSelect = config.type === 'select';
  return (
    <FormField
      control={form.control}
      name={config.name}
      render={({ field }) => (
        <FormItem className={config.className}>
          {config.label && <FormLabel>{config.label}</FormLabel>}
          <FormControl>
            {isSelect ? (
              <select
                id={config.name}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={field.value}
                onChange={field.onChange}
                disabled={config.disabled}>
                <option value="">{config.placeholder || `Select ${config.label}`}</option>
                {(config.options || []).map((o) => {
                  const value = o.value || o;
                  const label = o.label || o;
                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            ) : (
              <Input
                id={config.name}
                type={config.type || 'text'}
                placeholder={config.placeholder || config.label}
                autoComplete={config.autoComplete}
                disabled={config.disabled}
                {...field}
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
}
