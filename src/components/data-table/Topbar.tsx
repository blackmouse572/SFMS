import Button, { ButtonProps } from '@components/tailus-ui/Button';
import { cn } from '@lib/utils';
import { IconFilter, IconTableAlias } from '@tabler/icons-react';
import { useCallback } from 'react';
export type TopbarAction = {
  label: string;
  icon?: React.ReactNode;
} & ButtonProps;
type TopBarProps<TData> = {
  selectedItems?: TData[];
  actions?: TopbarAction[][];
  onFilterClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;
function TopBar<TData>(props: TopBarProps<TData>) {
  const { actions, className, onFilterClick, ...rest } = props;

  const renderItem = useCallback(({ ...item }: TopbarAction, i?: number) => {
    return (
      <Button.Root key={i} {...item}>
        {item.icon && <Button.Icon type="leading">{item.icon}</Button.Icon>}
        <Button.Label>{item.label}</Button.Label>
      </Button.Root>
    );
  }, []);

  return (
    <div className={cn('flex', className)} {...rest}>
      <div className="flex-1 flex divide-x-2">
        {actions?.map((action, i) => action.length > 0 && <div className="px-2 flex gap-2">{action.map((a) => renderItem(a, i))}</div>)}
      </div>
      <div className="mr-auto w-fit flex gap-2 pr-2">
        <Button.Root size="sm" intent="gray" variant="outlined" onClick={() => onFilterClick?.()}>
          <Button.Icon type="only">
            <IconFilter />
          </Button.Icon>
        </Button.Root>
        <Button.Root size="sm" intent="gray" variant="outlined">
          <Button.Icon type="only">
            <IconTableAlias />
          </Button.Icon>
        </Button.Root>
      </div>
    </div>
  );
}

export default TopBar;
