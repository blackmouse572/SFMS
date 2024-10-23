import { FormField, FormItem, FormLabel, FormMessage } from '@components/tailus-ui/form/Form';
import Select from '@components/tailus-ui/Select';
import { cn } from '@lib/utils';
import { IconChevronDown } from '@tabler/icons-react';
import React, { ReactNode } from 'react';

interface SelectFormProps extends React.ComponentPropsWithoutRef<'select'> {
  control: any;
  name: string;
  children: ReactNode;
  placeholder?: string;
  classname?: string;
  label: string;
  required?: boolean;
}

export function SelectForm({ control, required, className, name, placeholder, label, ...props }: SelectFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </FormLabel>

          <Select.Root onValueChange={(v) => field.onChange(v)} value={field.value} required={required}>
            <Select.Trigger>
              <Select.Value placeholder={placeholder} />
              <Select.Icon asChild>
                <IconChevronDown className="size-4 opacity-50 ml-auto" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content mixed className="z-20">
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

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
};
export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <Select.Item value={value} className="items-center">
      <Select.ItemIndicator />
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
