import { form, type InputProps } from '@tailus/themer';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, InputProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant = 'mixed', fancy = false, size = 'md', ...props }, forwardedRef) => {
    const { input, textarea } = form();

    if ((variant === 'bottomOutlined' || variant === 'plain') && fancy) {
      throw Error('Fancy is not supported with the bottomOutlined or plain variant !');
    }

    return (
      <textarea
        ref={forwardedRef as React.RefObject<HTMLTextAreaElement>}
        className={input({ variant, fancy, size, class: twMerge(textarea(), 'min-h-24', className) })}
        {...props}
      />
    );
  }
);

export default Textarea;
