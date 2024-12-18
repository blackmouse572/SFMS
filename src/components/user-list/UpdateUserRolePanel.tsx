import Button from '@components/tailus-ui/Button';
import { Form } from '@components/tailus-ui/form';
import { ComboBoxForm } from '@components/tailus-ui/form/ComboBoxForm';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { useGetRoles } from '@components/user-details/useGetRoles';
import { useUpdateUserRole } from '@components/user-details/useUpdateUserRole';
import { User } from '@lib/types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export type UpdateUserRolePanelProps = {
  defaultValues?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function UpdateUserRolePanel(props: UpdateUserRolePanelProps) {
  const { defaultValues, open, onOpenChange } = props;
  const form = useForm({
    defaultValues: {
      role: defaultValues?.role._id,
    },
  });
  const { mutateAsync } = useUpdateUserRole();

  useEffect(() => {
    form.reset({
      role: defaultValues?.role._id ?? '',
    });
  }, [defaultValues, form]);

  const onSubmit = async (data: { role?: string }) => {
    if (!defaultValues || !data.role) return;
    toast.promise(
      mutateAsync({
        role: data.role,
        user: defaultValues,
      }),
      {
        loading: 'Đang xử lý...',
        success: (data) => {
          onOpenChange(false);
          return 'Chuyển quyền thành công';
        },
        error: 'Chuyển quyền thất bại',
      }
    );
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent size="3xl" className="flex h-full flex-col gap-4 overflow-y-auto">
        <Form {...form}>
          <SheetHeader>
            <SheetTitle>
              Chỉnh sửa quyền cho <span className="font-semibold">{defaultValues?.name}</span>
            </SheetTitle>
          </SheetHeader>
          <SheetBody className="space-y-2 flex-1">
            <form className="space-y-4" onSubmit={form.handleSubmit((v) => onSubmit(v))} id="createform">
              <StaffSelect control={form.control} name="role" label="Nhân viên" required />
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
  const { data, isLoading } = useGetRoles();

  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((d) => d.name.includes(search));
  }, [data, search]);

  const transformedData = useMemo(() => {
    return filteredData?.map((d) => ({ id: d.id, text: d.name }));
  }, [filteredData]);

  return <ComboBoxForm options={transformedData} control={control} name={name} label={label} onSearch={(value) => setSearch(value)} debounce={500} />;
};
