import Calendar from '@components/tailus-ui/Calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import Button from '@tailus-ui/Button';
import Popover from '@tailus-ui/Popover';
import Select from '@tailus-ui/Select';
import Separator from '@tailus-ui/Separator';
import ToggleGroup from '@tailus-ui/ToggleGroup';
import { format } from 'date-fns';
import { type ReactNode } from 'react';
import { type DateRange } from 'react-day-picker';

type DateRaneInputProps = {
  date?: DateRange;
  onDateChange?: (date: DateRange) => void;
  className?: string;
};
export const DateRangeInput = ({ date, onDateChange, className }: DateRaneInputProps) => {
  const handleValueChange = (value: string) => {
    const today = new Date();
    let from, to;
    switch (value) {
      case 'today':
        from = to = today;
        break;
      case 'yesterday':
        from = to = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        break;
      case 'last-week':
        from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        to = today;
        break;
      case 'last-month':
        from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        to = today;
        break;
      case 'last-3-months':
        from = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        to = today;
        break;
      case 'last-12-months':
        from = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        to = today;
        break;
      case 'month-to-date':
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = today;
        break;
      case 'life-time':
        from = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
        to = today;
        break;
      default:
        break;
    }
    onDateChange?.({ from, to });
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root variant="outlined" intent="gray" className={className}>
          <Button.Icon type="leading">
            <CalendarIcon />
          </Button.Icon>
          <Button.Label className="text-sm">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy', {})} - {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              <span>Select a date</span>
            )}
          </Button.Label>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={6} mixed className="sm:flex sm:py-0 gap-[--card-padding] max-w-fit z-10">
          <ToggleGroup.Root
            className="hidden sm:grid gap-0 relative pr-4 border-r sm:py-[--card-padding]"
            type="single"
            onValueChange={handleValueChange}
            defaultValue="last-month"
            intent="primary"
            size="sm"
          >
            <ToggleGroup.Item withLabel className="w-full justify-start" value="today">
              Hôm nay
            </ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="yesterday">
              Hôm qua
            </ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-week">
              Tuần trước
            </ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-month">
              Tháng trước
            </ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-3-months">
              3 tháng trước
            </ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-12-months">
              12 tháng trước
            </ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="month-to-date">
              Tháng đến nay
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <div className="sm:hidden">
            <Select.Root onValueChange={handleValueChange} defaultValue="last-month">
              <Select.Trigger>
                <Select.Value placeholder="Pick a range" />
                <Select.Icon />
              </Select.Trigger>

              <Select.Portal>
                <Select.Content mixed variant="solid">
                  <Select.Viewport>
                    <SelectItem value="today">Hôm nay</SelectItem>
                    <SelectItem value="yesterday">Hôm qua</SelectItem>
                    <SelectItem value="last-week">Tuần trước</SelectItem>
                    <SelectItem value="last-month">Tháng trước</SelectItem>
                    <SelectItem value="last-3-months">3 tháng trước</SelectItem>
                    <SelectItem value="last-12-months">12 tháng trước</SelectItem>
                    <SelectItem value="month-to-date">Tháng đến nay</SelectItem>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <Separator dashed className="my-4 sm:hidden" />
          <div className="sm:py-[--card-padding]">
            <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={(date) => date && onDateChange?.(date)} numberOfMonths={1} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const SelectItem = ({ value, children }: { value: string; children: ReactNode }) => {
  return (
    <Select.Item value={value}>
      <Select.ItemIndicator />
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};
