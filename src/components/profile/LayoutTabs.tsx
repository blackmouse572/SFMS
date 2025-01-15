import Tabs from '@components/tailus-ui/Tabs';
import { cn } from '@lib/utils';
import React, { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LayoutTabs({ className, ...props }: React.ComponentPropsWithoutRef<typeof Tabs.Root>) {
  const items = [
    {
      label: 'Thông tin cá nhân',
      path: '/profile',
    },
    {
      label: 'CV đã nộp',
      path: '/profile/cv',
    },
    {
      label: 'Hồ sơ trường',
      path: '/profile/cv-prov',
    },
  ];
  const path = useLocation().pathname;
  const spanRef = useRef<HTMLSpanElement>(null);
  const go = useNavigate();

  useLayoutEffect(() => {
    const activeTrigger = document.getElementById(path) as HTMLElement;
    if (spanRef.current) {
      spanRef.current.style.left = activeTrigger.offsetLeft + 'px';
      spanRef.current.style.width = activeTrigger.offsetWidth + 'px';
    }
  }, [path]);

  return (
    <Tabs.Root {...props} className={cn('space-y-4 min-w-fit', className)} defaultValue={path} onValueChange={(value) => go(value)}>
      <Tabs.List variant="mixed" triggerVariant="plain" size="md">
        <Tabs.Indicator ref={spanRef} variant="elevated" className="bg-white" />
        {items.map((item, index) => (
          <Tabs.Trigger key={index} id={item.path} value={item.path} className="text-nowrap">
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

export default LayoutTabs;
