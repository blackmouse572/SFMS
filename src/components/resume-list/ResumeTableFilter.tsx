import { useGetSchoolarShip } from '@components/schoolar-list';
import Button from '@components/tailus-ui/Button';
import { Form, InputForm } from '@components/tailus-ui/form';
import { ComboBoxForm } from '@components/tailus-ui/form/ComboBoxForm';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { DialogProps } from '@radix-ui/react-dialog';
import { IconFilter } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UserListFilterProps = Omit<DialogProps, 'children'> & {
  onSubmit: (data: UserFilter) => void;
};

export const FilterSchema = z
  .object({
    status: z.string().min(3),
    scholarship: z.string().min(3),
  })
  .partial();

export type UserFilter = z.infer<typeof FilterSchema>;

function ResumeTableFilter(props: UserListFilterProps) {
  const { onSubmit, ...rest } = props;
  const form = useForm<UserFilter>({
    defaultValues: {
      status: '',
      scholarship: '',
    },
  });
  const [scholarship, setScholarship] = useState<string>('');
  const { isLoading, data } = useGetSchoolarShip({
    filter: {
      name: scholarship,
    },
  });
  const items = useMemo(() => data?.pages.flatMap((d) => d.data.result).map((a) => ({ id: a._id, text: a.name })) ?? [], [data]);

  const onFormSubmit = (data: UserFilter) => {
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
              <InputForm control={form.control} name="email" label="Tên" />
              <ComboBoxForm
                options={items}
                control={form.control}
                name="scholarship"
                label="Học bổng"
                onSearch={(value) => setScholarship(value)}
                debounce={500}
              />
              {/* <SelectForm control={form.control} name="scholarship" label="Học bổng">
                <SelectItem key={1} value="1">
                  Học bổng 1
                </SelectItem>
                <SelectItem key={2} value="2">
                  Học bổng 2
                </SelectItem>
              </SelectForm> */}
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

export { ResumeTableFilter };