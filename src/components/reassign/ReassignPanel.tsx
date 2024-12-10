import { ReassignSchema, useReassign } from '@components/reassign/useReAssign';
import Button from '@components/tailus-ui/Button';
import { Form } from '@components/tailus-ui/form';
import { ComboBoxForm } from '@components/tailus-ui/form/ComboBoxForm';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@lib/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export type ReassignPanelProps = {
  defaultValues?: ReassignSchema;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function ReassignPanel(props: ReassignPanelProps) {
  const { defaultValues, open, onOpenChange } = props;
  const form = useForm<ReassignSchema>({
    resolver: zodResolver(ReassignSchema),
  });
  const { mutateAsync } = useReassign(defaultValues?.id ?? '');

  useEffect(() => {
    form.reset({
      ...defaultValues,
    });
  }, [defaultValues, form]);
  const onSubmit = async (data: ReassignSchema) => {
    toast.promise(mutateAsync(data), {
      loading: 'Đang xử lý...',
      success: (data) => {
        onOpenChange(false);
        return 'Chuyển nhân viên thành công';
      },
      error: 'Chuyển nhân viên thất bại',
    });
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent size="3xl" className="flex h-full flex-col gap-4 overflow-y-auto">
        <Form {...form}>
          <SheetHeader>
            <SheetTitle>Chỉnh sửa staff</SheetTitle>
          </SheetHeader>
          <SheetBody className="space-y-2 flex-1">
            <form className="space-y-4" onSubmit={form.handleSubmit((v) => onSubmit(v))} id="createform">
              <StaffSelect control={form.control} name="staff" label="Nhân viên" required />
            </form>
          </SheetBody>
          <SheetFooter>
            <Button.Root form="createform" type="submit">
              <Button.Label>Chuyển nhân viên</Button.Label>
            </Button.Root>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

type StaffSelectProps = {
  control: any;
  name: string;
  label: string;
  required?: boolean;
};
const StaffSelect = ({ control, name, label, required }: StaffSelectProps) => {
  const { data } = useQuery<
    {
      _id: string;
      name: string;
    }[]
  >({
    queryKey: ['staff'],
    queryFn: () => axios.get('/users/staff').then((res) => res.data.data),
  });

  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((d) => d.name.includes(search));
  }, [data, search]);
  console.log(filteredData);
  const transformedData = useMemo(() => {
    return filteredData?.map((d) => ({ id: d._id, text: d.name }));
  }, [filteredData]);

  return <ComboBoxForm options={transformedData} control={control} name={name} label={label} onSearch={(value) => setSearch(value)} debounce={500} />;
};
