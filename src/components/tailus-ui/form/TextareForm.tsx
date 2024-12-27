import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/tailus-ui/form/Form';
import Textarea, { TextAreaProps } from '@components/tailus-ui/Textare';
import * as React from 'react';

export interface InputProps extends TextAreaProps {
  control: any;
  name: string;
  required?: boolean;
  label?: React.ReactNode;
}

const TextAreaForm = React.forwardRef<HTMLTextAreaElement, InputProps>(({ className, control, name, label, required, ...props }, ref) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {typeof label === 'string' ? (
            <FormLabel>
              {label}
              {required && <span className="text-danger-500 ml-1">*</span>}
            </FormLabel>
          ) : (
            label
          )}
          <FormControl>
            <Textarea {...field} ref={ref} {...props} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
});
TextAreaForm.displayName = 'Textare form';

export { TextAreaForm };
