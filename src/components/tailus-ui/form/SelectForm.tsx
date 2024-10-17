import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/tailus-ui/form/Form';
import Select from '@components/tailus-ui/Select';
import { cn } from '@lib/utils';
import { ReactNode } from 'react';

interface SelectFormProps extends React.ComponentPropsWithoutRef<'select'> {
  control: any;
  name: string;
  children: ReactNode;
  placeholder: string;
  classname?: string;
  label: string;
}

export function SelectForm({ control, className, name, placeholder, label, ...props }: SelectFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>{label}</FormLabel>
          <Select.Root onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <Select.Trigger>
                <Select.Value placeholder={placeholder} />
              </Select.Trigger>
            </FormControl>
            <Select.Portal>
              <Select.Content mixed className="z-50">
                <Select.Viewport>{props.children}</Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
