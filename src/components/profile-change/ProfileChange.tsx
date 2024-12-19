import { useGetUserInfor } from '@components/profile-change/useGetUserInfo';
import { useUpdateProfile } from '@components/profile-change/useUpdateProfile';
import Button from '@components/tailus-ui/Button';
import { Form, InputForm, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ProfileChangeSchema = z.object({
  name: z.string().min(3).max(255),
  age: z.coerce.number().min(0).max(100),
  gender: z.enum(['male', 'female']),
  address: z.string().min(10).max(255),
  phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại cần bắt đầu bằng 84 hoặc 0, và có 10 số' }),
});

export type ProfileChangeSchema = z.infer<typeof ProfileChangeSchema>;

function ProfileChange() {
  const { isLoading, data } = useGetUserInfor();
  const form = useForm<ProfileChangeSchema>({
    resolver: zodResolver(ProfileChangeSchema),
  });
  const { mutateAsync: updateProfile } = useUpdateProfile();
  useEffect(() => {
    if (!isLoading) {
      form.reset(data as any);
    }
  }, [data, form, isLoading]);

  const onSubmit = async (data: ProfileChangeSchema) => {
    toast.promise(updateProfile(data), {
      loading: 'Đang cập nhật thông tin...',
      success: () => 'Cập nhật thông tin thành công',
      error: (err) => err.message,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputForm control={form.control} name="name" label="Họ và tên" />
        <InputForm control={form.control} name="age" label="Tuổi" type="number" />
        <InputForm control={form.control} name="address" label="Địa chỉ" />
        <InputForm control={form.control} name="phone" label="Số điện thoại" />
        <SelectForm control={form.control} name="gender" label="Giới tính">
          <SelectItem value="male">Nam</SelectItem>
          <SelectItem value="female">Nữ</SelectItem>
        </SelectForm>
        <div className="flex gap-2 justify-end">
          <Button.Root size="sm" intent="gray" type="reset" variant="outlined">
            <Button.Label>Hủy</Button.Label>
          </Button.Root>
          <Button.Root type="submit" size="sm">
            <Button.Label>Đổi thông tin</Button.Label>
          </Button.Root>
        </div>
      </form>
    </Form>
  );
}

export default ProfileChange;
