import Tabs from '@components/tailus-ui/tabs';
import { QuizType } from '@lib/types';
import { cn } from '@lib/utils';
import React, { useLayoutEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
const items = [
  {
    label: 'Chứng chỉ',
    path: QuizType.certification,
  },
  {
    label: 'Phỏng vấn',
    path: QuizType.interview,
  },
];

function TestModeTabs({ className, ...props }: React.ComponentPropsWithoutRef<typeof Tabs.Root>) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [search, setSearch] = useSearchParams({
    m: QuizType.certification,
  });

  useLayoutEffect(() => {
    const path = search.get('m') || QuizType.certification;
    const activeTrigger = document.getElementById(path) as HTMLElement;
    if (spanRef.current) {
      spanRef.current.style.left = activeTrigger.offsetLeft + 'px';
      spanRef.current.style.width = activeTrigger.offsetWidth + 'px';
    }
  }, [search]);

  const onClick = (value: string) => {
    setSearch({ m: value });
  };

  return (
    <Tabs.Root {...props} className={cn('space-y-4', className)} defaultValue={search.get('m') || QuizType.certification} onValueChange={onClick}>
      <Tabs.List data-shade="925" variant="mixed" triggerVariant="plain" size="md">
        <Tabs.Indicator ref={spanRef} variant="elevated" className="bg-white" />
        {items.map((item, index) => (
          <Tabs.Trigger key={index} id={item.path} value={item.path}>
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

export default TestModeTabs;
