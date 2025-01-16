import StatusBadge from '@components/resume-details/StatusBadge';
import { useGetResumeProvDetails } from '@components/resume-prov-details/useGetResumeDetails';
import Button from '@components/tailus-ui/Button';
import { Form, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { TextAreaForm } from '@components/tailus-ui/form/TextareForm';
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { Caption, Link, Text } from '@components/tailus-ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResumeProv, ResumeProvStatus, ResumeStatus } from '@lib/types';
import { type DialogProps } from '@radix-ui/react-dialog';
import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

export const UpdateResumeStatusSchema = z.object({
  id: z.string(),
  status: z.string().min(1).optional(),
  note: z.string().optional(),
});

export type UpdateResumeStatusSchema = z.infer<typeof UpdateResumeStatusSchema>;

type ResumeDetailPanel = {
  item?: Pick<ResumeProv, '_id' | 'status'>;
  onSubmit: (data: UpdateResumeStatusSchema) => void;
} & Omit<DialogProps, 'children'>;

export function ResumeProvUpdateStatusPanel(props: ResumeDetailPanel) {
  const { item, ...rest } = props;
  const form = useForm<UpdateResumeStatusSchema>({
    resolver: zodResolver(UpdateResumeStatusSchema),
    defaultValues: {
      id: item?._id,
      status: ResumeProvStatus['Lịch phỏng vấn'],
    },
  });

  const { data } = useGetResumeProvDetails(item?._id ?? '', {
    enabled: !!item && rest.open,
  });

  useEffect(() => {
    form.reset({
      id: item?._id,
      status: item?.status,
      note: '',
    });
  }, [form, item]);

  const onSubmit = (data: UpdateResumeStatusSchema) => {
    props.onSubmit(data);
  };

  const statusOptions = useMemo(() => {
    return Object.values(ResumeProvStatus).map((status) => (
      <SelectItem key={status} value={status}>
        {status}
      </SelectItem>
    ));
  }, []);

  const status = useWatch({ control: form.control, name: 'status' });
  const willNoteable =
    status === ResumeProvStatus['Hồ sơ thất bại'] || status === ResumeProvStatus['Hồ sơ thành công'] || status === ResumeProvStatus['Lịch phỏng vấn'];

  return (
    <Sheet {...rest}>
      <SheetContent size="lg" className="flex h-full flex-col gap-4 overflow-auto">
        <SheetHeader className="sticky top-0 z-[51] bg-white border-b py-7">
          <SheetTitle>Cập nhật trạng thái hồ sơ</SheetTitle>
          <SheetDescription>
            {data?.status === ResumeProvStatus['Hồ sơ thành công'] && 'Hồ sơ đã đậu và đã hoàn thành, không thể cập nhật trạng thái'}
          </SheetDescription>
        </SheetHeader>
        <fieldset disabled={data?.status === ResumeProvStatus['Hồ sơ thành công']}>
          <SheetBody className="flex-1">
            <Form {...form}>
              <form id="update-status" className="flex-1 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <SelectForm
                  label="Trạng thái"
                  control={form.control}
                  required
                  name="status"
                  disabled={data?.status === ResumeStatus['Hồ sơ thành công']}
                >
                  {statusOptions}
                </SelectForm>
                <input type="hidden" {...form.register('id')} />
                {willNoteable && <TextAreaForm control={form.control} name="note" label="Ghi chú" />}
              </form>
            </Form>
            <div className="space-y-2">
              <Text weight={'bold'}>Lịch sử</Text>
              <div className="space-y-4">
                {data?.history.map((h, i) => (
                  <div key={i}>
                    <div key={i} className="flex items-center gap-2">
                      <Caption size="xs">{Intl.DateTimeFormat('vi-VN').format(new Date(h.updatedAt))}</Caption>
                      <div>
                        <Text size="sm">{h.updatedBy.email}</Text>
                        <StatusBadge status={h.status} />
                      </div>
                    </div>
                    {h.note && (
                      <div>
                        <Text size="sm">
                          <span className="font-medium">Note:</span> {h.note}
                        </Text>
                      </div>
                    )}
                    {h.urlCV && (
                      <div>
                        <Text size="sm">
                          <span className="font-medium">URL CV:</span> <Link href={h.urlCV}>{h.urlCV.split('/').pop()}</Link>
                        </Text>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SheetBody>
          <SheetFooter className="">
            <Button.Root type="reset" intent="gray" variant="outlined" onClick={() => form.reset()}>
              <Button.Label>Đặt lại</Button.Label>
            </Button.Root>
            <Button.Root type="submit" form="update-status">
              <Button.Label>Cập nhật</Button.Label>
            </Button.Root>
          </SheetFooter>
        </fieldset>
      </SheetContent>
    </Sheet>
  );
}
