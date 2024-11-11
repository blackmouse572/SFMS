import Button from '@components/tailus-ui/Button';
import { Form, SelectForm } from '@components/tailus-ui/form';
import Select from '@components/tailus-ui/Select';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { QuizType } from '@lib/types';
import { DialogProps } from '@radix-ui/react-dialog';
import { IconCheck, IconFilter } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const FilterSchema = z
  .object({
    type: z.string().min(3),
  })
  .partial();

export type Filter = z.infer<typeof FilterSchema>;
type TableFilterProps = Omit<DialogProps, 'children'> & {
  onSubmit: (data: Filter) => void;
};

export function QuizTableFilter(props: TableFilterProps) {
  const { onSubmit, ...rest } = props;
  const form = useForm<Filter>({
    defaultValues: {
      type: '',
    },
  });

  const onFormSubmit = (data: Filter) => {
    onSubmit(data);
    rest.onOpenChange?.(false);
  };

  const onReset = async () => {
    form.reset();
  };

  const { handleSubmit } = form;

  return (
    <Sheet {...rest}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full gap-4">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <IconFilter className="text-primary-500 size-4" />
                Bộ lọc
              </SheetTitle>
            </SheetHeader>

            <SheetBody className="flex-1 space-y-4">
              <SelectForm control={form.control} name="type" label="Loại">
                <SelectItem entry={{ value: QuizType.certification }} />
                <SelectItem entry={{ value: QuizType.interview }} />
              </SelectForm>
            </SheetBody>
            <SheetFooter className="">
              <Button.Root type="reset" intent="gray" variant="outlined" onClick={onReset}>
                <Button.Label>Xóa</Button.Label>
              </Button.Root>
              <Button.Root type="submit">
                <Button.Label>Lưu</Button.Label>
              </Button.Root>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

const SelectItem = ({
  entry,
}: {
  entry: {
    key?: string;
    value: string;
  };
}) => {
  return (
    <Select.Item value={entry.key ?? entry.value} className="pl-7 items-center">
      <Select.ItemIndicator asChild>
        <IconCheck className="size-3.5 text-secondary-500" />
      </Select.ItemIndicator>
      <Select.ItemText>{entry.value}</Select.ItemText>
    </Select.Item>
  );
};
