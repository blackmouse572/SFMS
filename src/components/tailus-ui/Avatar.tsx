import { BadgeVariantsProps } from '@components/tailus-ui/Badge';
import { cn } from '@lib/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { avatar, badge, fallback, image, type AvatarFallbackProps, type AvatarRootProps } from '@tailus/themer';
import React from 'react';

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarRootProps
>(({ className, size = 'md', status = 'online', bottomStatus = false, topStatus = false, ...props }, ref) => {
  return <AvatarPrimitive.Root {...props} ref={ref} className={avatar({ size, status: status && status, topStatus, bottomStatus, className })} />;
});

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & AvatarFallbackProps
>(({ className, variant = 'solid', intent = 'primary', ...props }, ref) => {
  return <AvatarPrimitive.Fallback {...props} ref={ref} className={fallback[variant]({ intent, className })} />;
});

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
  ({ className, ...props }, ref) => {
    return <AvatarPrimitive.Image {...props} ref={ref} className={image({ className })} />;
  }
);

const AvatarIndicator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & {
    intent: BadgeVariantsProps['intent'];
  }
>(({ className, intent, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={badge['solid']({ intent, className: cn('absolute bottom-0 right-0 size-3 border-2 border-white origin-center', className) })}
    />
  );
});

export default {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
  Indicator: AvatarIndicator,
};

export { AvatarFallback, AvatarImage, AvatarRoot };
