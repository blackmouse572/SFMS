import Button from '@components/tailus-ui/Button';
import { Form, InputForm } from '@components/tailus-ui/form';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { DialogProps } from '@radix-ui/react-dialog';
import { IconFilter } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type ScholarshipTableFilterProps = Omit<DialogProps, 'children'> & {
  onSubmit: (data: Filter) => void;
};

export const FilterSchema = z
  .object({
    name: z.string(),
    href: z.string(),
  })
  .partial();

export type Filter = z.infer<typeof FilterSchema>;

export function CrawDataTableFilter(props: ScholarshipTableFilterProps) {
  const { onSubmit, ...rest } = props;
  const form = useForm<Filter>({
    defaultValues: {
      name: '',
      href: '',
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
              <InputForm control={form.control} name="name" label="Tên học bổng" />
              <InputForm control={form.control} name="href" label="Link" />
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
