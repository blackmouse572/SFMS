import { STATUS_OPTIONS } from '@components/advisory-list/constant';
import Button from '@components/tailus-ui/Button';
import Card from '@components/tailus-ui/Card';
import { Form, FormField, FormItem, FormLabel, FormMessage, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { Text } from '@components/tailus-ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { Advisory } from '@lib/types';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IconCloudUpload, IconFileTypePdf, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const UpdateAdvisoryStatusSchema = z.object({
  _id: z.string(),
  status: z.string().min(3),
});

export type UpdateAdvisoryStatusSchema = z.infer<typeof UpdateAdvisoryStatusSchema>;

type AdvisoryDetailPanel = {
  item?: Pick<Advisory, '_id' | 'status'>;
  onSubmit: (data: UpdateAdvisoryStatusSchema) => void;
} & Omit<DialogProps, 'children'>;

export function AdvisoryUpdateStatusPanel(props: AdvisoryDetailPanel) {
  const { item, ...rest } = props;
  const form = useForm<UpdateAdvisoryStatusSchema>({
    resolver: zodResolver(UpdateAdvisoryStatusSchema),
    defaultValues: {
      _id: item?._id,
    },
  });

  useEffect(() => {
    form.reset({
      _id: item?._id,
      status: item?.status,
    });
  }, [form, item]);

  const onSubmit = (data: UpdateAdvisoryStatusSchema) => {
    props.onSubmit(data);
  };

  return (
    <Sheet {...rest}>
      <SheetContent size="lg" className="flex h-full flex-col gap-4 overflow-auto">
        <SheetHeader className="sticky top-0 z-[51] bg-white border-b py-7">
          <SheetTitle>Cập nhật trạng thái hồ sơ</SheetTitle>
        </SheetHeader>
        <SheetBody className="flex-1">
          <Form {...form}>
            <form id="update-status" className="flex-1" onSubmit={form.handleSubmit(onSubmit)}>
              <SelectForm label="Trạng thái" control={form.control} name="status">
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectForm>
              <input type="hidden" {...form.register('_id')} />
            </form>
          </Form>
        </SheetBody>
        <SheetFooter className="">
          <Button.Root type="reset" intent="gray" variant="outlined" onClick={() => form.reset()}>
            <Button.Label>Xóa</Button.Label>
          </Button.Root>
          <Button.Root type="submit" form="update-status">
            <Button.Label>Lưu</Button.Label>
          </Button.Root>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
