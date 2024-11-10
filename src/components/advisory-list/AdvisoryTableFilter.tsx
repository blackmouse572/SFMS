import { LEVEL_OPTIONS, STATUS_OPTIONS, VALUE_OPTIONS } from '@components/advisory-list/constant';
import { ContinentOptions } from '@components/schoolar-list/constant';
import Button from '@components/tailus-ui/Button';
import { Form, InputForm, SelectForm } from '@components/tailus-ui/form';
import Select from '@components/tailus-ui/Select';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { DialogProps } from '@radix-ui/react-dialog';
import { IconCheck, IconFilter } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type AdvisoryTableFilterProps = Omit<DialogProps, 'children'> & {
  onSubmit: (data: Filter) => void;
};

export const FilterSchema = z
  .object({
    continent: z.string().min(3),
    value: z.string().min(3),
    level: z.string().min(3),
    name: z.string().min(3),
    email: z.string().min(3),
    status: z.string().min(3),
  })
  .partial();

export type Filter = z.infer<typeof FilterSchema>;

function AdvisoryTableFilter(props: AdvisoryTableFilterProps) {
  const { onSubmit, ...rest } = props;
  const form = useForm<Filter>({
    defaultValues: {
      continent: '',
      value: '',
      level: '',
      name: '',
      email: '',
      status: '',
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
              <InputForm control={form.control} name="name" label="Tên người tư vấn" />
              <InputForm control={form.control} name="email" label="Email người tư vấn" />
              <SelectForm control={form.control} name="continent" label="Khu vực">
                {ContinentOptions.map((country) => (
                  <SelectItem entry={country} key={country.value} />
                ))}
              </SelectForm>
              <SelectForm control={form.control} name="level" label="Trình độ">
                {LEVEL_OPTIONS.map((country) => (
                  <SelectItem entry={country} key={country.value} />
                ))}
              </SelectForm>
              <SelectForm control={form.control} name="level" label="Thanh toán">
                {VALUE_OPTIONS.map((country) => (
                  <SelectItem entry={country} key={country.value} />
                ))}
              </SelectForm>
              <SelectForm control={form.control} name="status" label="Trạng thái">
                {STATUS_OPTIONS.map((country) => (
                  <SelectItem entry={country} key={country.value} />
                ))}
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
export { AdvisoryTableFilter };
