import { RegisterSchema } from '@components/register-form/register.schema';
import { useRegister } from '@components/register-form/useRegister';
import Button from '@components/tailus-ui/Button';
import { Form, InputForm, SelectForm, SelectItem } from '@components/tailus-ui/form';
import SeparatorRoot from '@components/tailus-ui/Separator';
import { Title } from '@components/tailus-ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const GenderOptions = [
  {
    label: '♂️ Nam',
    value: 'Male',
  },
  {
    label: '♀️ Nữ',
    value: 'Female',
  },
];
function RegisterForm() {
  const go = useNavigate();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const { handleSubmit } = form;
  const { mutateAsync: register } = useRegister();

  const onSubmit: SubmitHandler<RegisterSchema> = (data, e) => {
    e?.preventDefault();
    toast.promise(register(data), {
      loading: 'Đang đăng ký...',
      success: ({ data: { _id } }) => {
        go('/verify?id=' + _id + '&email=' + data.email);
        return `Đăng ký tài khoản thành công`;
      },
      error: (err) => err.message,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Title className="text-center">Đăng ký tài khoản mới</Title>
        <div className="space-y-4">
          <InputForm label="Tên hiển thị" control={form.control} name="name" />
          <InputForm label="Tên đăng nhập" control={form.control} name="username" />
          <InputForm label="Email" control={form.control} name="email" />
          <InputForm label="Mật khẩu" control={form.control} name="password" type="password" />
          <InputForm label="Nhập lại mật khẩu" control={form.control} name="repassword" type="password" />
          <InputForm label="Số điện thoại" control={form.control} name="phone" />
          <InputForm label="Địa chỉ" control={form.control} name="address" />
          <div className="grid grid-cols-2 gap-2">
            <InputForm label="Tuổi" type="number" control={form.control} name="age" className="" />
            <SelectForm placeholder="Nam" label="Giới tính" control={form.control} name="gender" className="flex-1">
              {GenderOptions.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectForm>
          </div>
        </div>
        <div className="space-y-2">
          <Button.Root type="submit" className="w-full">
            <Button.Label>Đăng ký</Button.Label>
          </Button.Root>
          <SeparatorRoot />
          <Button.Root variant="ghost" type="button" className="w-full" href="/login">
            <Button.Label>Đăng nhập</Button.Label>
          </Button.Root>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
