import Aligner from '@components/tailus-ui/Aligner';
import { CheckboxProps } from '@components/tailus-ui/Checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/tailus-ui/form/Form';
import Label from '@components/tailus-ui/Label';
import RadioGroup from '@components/tailus-ui/RadioGroup';
import { cn } from '@lib/utils';
import * as React from 'react';
import { ControllerProps } from 'react-hook-form';

export interface RadioGroupProps extends CheckboxProps {
  control: any;
  name: string;
  label: string;
  values: { key?: string; value: string }[];
  rules?: ControllerProps['rules'];
}

const RadioGroupForm = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ className, control, name, label, values, rules, ...props }, ref) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn('', className)}>
          <FormLabel className="pt-0 text-wrap">{label}</FormLabel>
          <FormControl className="grid grid-cols-2 gap-2">
            <RadioGroup.Root {...props} {...field} onValueChange={field.onChange} defaultValue={field.value} intent="primary" ref={ref}>
              {values.map((item) => (
                <FormItem key={item.key} className="">
                  <FormControl key={item.value}>
                    <Aligner>
                      <RadioGroup.Item value={item.value} id={item.value}>
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <Label htmlFor={item.value}>{item.value}</Label>
                    </Aligner>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup.Root>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
RadioGroupForm.displayName = 'CheckboxForm';

export { RadioGroupForm };
