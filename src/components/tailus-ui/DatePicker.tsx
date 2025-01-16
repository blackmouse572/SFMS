import Calendar from '@components/tailus-ui/Calendar';
import Input from '@components/tailus-ui/Input';
import { IconCalendar } from '@tabler/icons-react';
import Button from '@tailus-ui/Button';
import { FormControl } from '@tailus-ui/form';
import Popover from '@tailus-ui/Popover';
import { format } from 'date-fns';
type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  defaultValue?: Date;
  required?: boolean;
};
export const DatePicker = ({ value, onChange, defaultValue, required }: DatePickerProps) => {
  return (
    <div className="relative">
      <FormControl>
        <Input type="text" required={required} variant="mixed" size="md" defaultValue={defaultValue && format(defaultValue, 'PPP')} />
      </FormControl>
      <div className="absolute right-0.5 inset-y-0.5">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button.Root className="rounded-[calc(var(--btn-radius)-2px)]" variant="ghost" intent="gray" size="sm">
              <Button.Icon type="only" size="sm">
                <IconCalendar />
              </Button.Icon>
            </Button.Root>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content sideOffset={6} mixed className="max-w-fit">
              <Calendar required mode="single" defaultMonth={value} selected={value} onSelect={(day: Date) => onChange?.(day)} intent="primary" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
};
