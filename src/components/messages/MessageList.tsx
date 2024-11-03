import { cn } from '@lib/utils';

import React, { forwardRef } from 'react';

export type MessageListProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(({ children, className, ...rest }, ref) => {
  return (
    <div ref={ref} className={cn('flex flex-col-reverse gap-4', className)} {...rest}>
      {children}
    </div>
  );
});

MessageList.displayName = 'MessageList';
