import Button, { ButtonProps } from '@components/tailus-ui/Button';
import DropdownMenu from '@components/tailus-ui/DropdownMenu';
import { cn } from '@lib/utils';
import { IconChevronDown } from '@tabler/icons-react';

export type DropdownButtonOption = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};
export type DropdownButtonProps = {
  menu?: DropdownButtonOption[];
} & ButtonProps;
function DropdownButton(props: DropdownButtonProps) {
  const { className, menu, children, intent, variant, size, ...rest } = props;

  return (
    <div className={cn('flex', 'first:[&>button]:rounded-r-none last:[&>button]:rounded-l-none', className)}>
      <Button.Root intent={intent} variant={variant} size={size} {...rest}>
        {children}
      </Button.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button.Root intent={intent} variant={variant} size={size}>
            <Button.Icon className="" type="only">
              <IconChevronDown />
            </Button.Icon>
          </Button.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content mixed sideOffset={5} className="z-20" side="top" align="end">
            {menu?.map((option, index) => (
              <DropdownMenu.Item key={index} onClick={option.onClick}>
                <div className="flex items-center gap-2">
                  {option.icon && <DropdownMenu.Icon>{option.icon}</DropdownMenu.Icon>}
                  <span>{option.label}</span>
                </div>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}

export default DropdownButton;
