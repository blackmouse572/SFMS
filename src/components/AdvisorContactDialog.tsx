import { LEVEL_OPTIONS, VALUE_OPTIONS } from '@components/advisory-list/constant';
import { useCreateAdvisory } from '@components/advisory/useCreateAdvisory';
import { ContinentOptions } from '@components/schoolar-list/constant';
import Button from '@components/tailus-ui/Button';
import Dialog from '@components/tailus-ui/Dialog';
import { CheckboxForm, Form, InputForm, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPhoneFilled, IconX } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const AdvisorSchema = z.object({
  fullName: z.string().min(3).max(255),
  emailAdvisory: z.string().email({
    message: 'Email không hợp lệ',
  }),
  // phone need to be 10 or 11 digits, start with 0 or 84
  phone: z.string().regex(/^(0|84)[0-9]{9,10}$/, {
    message: 'Số điện thoại không hợp lệ',
  }),
  address: z.string().default(''),
  time: z.coerce.string().min(3),
  value: z.string().min(3),
  level: z.string().min(3),
  continent: z.string().min(3),
  agree: z.object({
    terms: z.boolean().refine((value) => value === true, {
      message: 'Bạn cần đồng ý với điều khoản sử dụng',
    }),
    registerNewsletter: z.boolean(),
  }),
});
export type AdvisorSchema = z.infer<typeof AdvisorSchema>;

function AdvisorContactDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createAdvisory } = useCreateAdvisory();
  const form = useForm<AdvisorSchema>({
    resolver: zodResolver(AdvisorSchema),
    defaultValues: {
      fullName: '',
      emailAdvisory: '',
      phone: '',
      address: '',
      time: format(new Date(), 'MMM yyyy'),
      value: VALUE_OPTIONS[0].value,
      level: LEVEL_OPTIONS[0].value,
      continent: ContinentOptions[0].value,
    },
  });

  const onSubmit = async (data: AdvisorSchema) => {
    toast.promise(createAdvisory(data), {
      success: () => {
        form.reset();
        return 'Đã gửi đơn tới chuyên gia, chúng tôi sẽ liên hệ với bạn sớm nhất có thể';
      },
      error: 'OOps, có lỗi xảy ra, vui lòng thử lại sau',
      finally: () => {
        setOpen(false);
      },
    });
  };

  const generateTimeOptions = (startDate: Date, count: number): string[] => {
    const formattedDates: string[] = [];

    for (let i = 0; i < count; i++) {
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);
      const formattedDate = format(currentDate, 'MMM yyyy');
      formattedDates.push(formattedDate);
    }

    return formattedDates;
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button.Root intent="secondary" size="lg" className="rounded-full">
          <Button.Label>Đăng ký tư vấn</Button.Label>
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="z-[11]" />
        <Dialog.Content className="lg:w-1/2 z-[11]">
          <Dialog.Title>Đăng ký tư vấn</Dialog.Title>
          <Dialog.Description className="mt-2">Đăng ký tư vấn để nhận được sự hỗ trợ từ chuyên gia của chúng tôi.</Dialog.Description>
          <Form {...form}>
            <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <InputForm required control={form.control} name="fullName" label="Họ và tên" />
              <InputForm required control={form.control} name="emailAdvisory" label="Email" />
              <InputForm type="number" control={form.control} name="phone" label="Số điện thoại" />
              <InputForm control={form.control} name="address" label="Địa chỉ" />
              <div className="grid grid-cols-2 gap-4">
                <SelectForm control={form.control} name="level" label="Trình độ bạn muốn học bổng?">
                  {LEVEL_OPTIONS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectForm>
                <SelectForm control={form.control} name="value" label="Bạn muốn chi trả như thế nào?">
                  {VALUE_OPTIONS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectForm>
                <SelectForm control={form.control} name="continent" label="Bạn muốn học ở đâu?">
                  {ContinentOptions.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.value}
                    </SelectItem>
                  ))}
                </SelectForm>
                <SelectForm control={form.control} name="time" label="Khi nào bạn dự định học?">
                  {generateTimeOptions(new Date(), 40).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectForm>
              </div>
              <div className="w-fit mx-auto space-y-2">
                <CheckboxForm
                  defaultValue={false}
                  control={form.control}
                  name="agree.terms"
                  label="Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật"
                />
                <CheckboxForm
                  defaultValue={false}
                  control={form.control}
                  name="agree.registerNewsletter"
                  label="Tôi muốn nhận thông tin mới nhất và ưu đãi"
                />
              </div>

              <Dialog.Actions>
                <Dialog.Close asChild>
                  <Button.Root variant="ghost" size="sm" intent="gray" className="rounded-full absolute top-0 right-0 origin-center">
                    <Button.Icon type="only">
                      <IconX />
                    </Button.Icon>
                  </Button.Root>
                </Dialog.Close>
                <Button.Root className="w-full">
                  <Button.Icon type="leading">
                    <IconPhoneFilled />
                  </Button.Icon>
                  <Button.Label>
                    <Button.Label>Nhận tư vấn</Button.Label>
                  </Button.Label>
                </Button.Root>
              </Dialog.Actions>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AdvisorContactDialog;
