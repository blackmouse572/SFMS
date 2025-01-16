import Button from '@components/tailus-ui/Button';
import { DateRangeInput } from '@components/tailus-ui/DateRangeInput';
import { Form, FormControl, FormField, FormItem, FormLabel, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IconCloudUpload, IconTrash } from '@tabler/icons-react';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useCallback, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const SendEmailPanelSchema = z.object({
  status: z.string().min(1).max(255),
  startDate: z.date(),
  endDate: z.date(),
});
export type SendEmailSchema = z.infer<typeof SendEmailPanelSchema>;

type SendEmailPanelProps = {
  onSubmit: (data: SendEmailSchema, form: UseFormReturn<SendEmailSchema>) => Promise<void>;
  defaultValues?: Partial<SendEmailSchema>;
} & VariantProps &
  Omit<DialogProps, 'children'>;

export function SendEmailPanel(props: SendEmailPanelProps) {
  const { defaultValues, onSubmit, ...rest } = props;
  const form = useForm<SendEmailSchema>({
    resolver: zodResolver(SendEmailPanelSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Sheet {...rest}>
      <SheetContent size="3xl" className="flex h-full flex-col gap-4 overflow-y-auto">
        <Form {...form}>
          <SheetHeader>
            <SheetTitle>Xuất hồ sơ và gửi email</SheetTitle>
          </SheetHeader>
          <SheetBody className="space-y-2 flex-1">
            <form className="space-y-4" onSubmit={form.handleSubmit((v) => onSubmit(v, form))} id="createform">
              <FormField
                control={form.control}
                name="startDate"
                defaultValue={new Date()}
                render={({ field: startField }) => (
                  <FormField
                    control={form.control}
                    name="endDate"
                    defaultValue={new Date()}
                    render={({ field: endField }) => (
                      <FormItem>
                        <FormLabel>Thời gian</FormLabel>
                        <FormControl>
                          <DateRangeInput
                            className="w-full"
                            date={{
                              from: startField.value,
                              to: endField.value,
                            }}
                            key={startField.name}
                            onDateChange={(date) => {
                              startField.onChange(date.from);
                              endField.onChange(date.to);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              />
              <SelectForm control={form.control} name="status" label="Trạng thái">
                <SelectItem value={'Lịch phỏng vấn'} key={'Lịch phỏng vấn'}>
                  Lịch phỏng vấn
                </SelectItem>
                <SelectItem value={'Thất bại'} key={'Thất bại'}>
                  Thất bại
                </SelectItem>
              </SelectForm>
            </form>
          </SheetBody>
          <SheetFooter>
            <Button.Root type="reset" form="createform" intent="gray" variant="outlined" onClick={() => form.reset()}>
              <Button.Label>Đặt lại</Button.Label>
            </Button.Root>
            <Button.Root form="createform" type="submit">
              <Button.Label>Xuất hồ sơ và gửi email</Button.Label>
            </Button.Root>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
export const ImageForm = ({ control, name, label, required }: { control: any; name: string; label: string; required?: boolean }) => {
  const renderValue = useCallback(
    (field: any) => {
      if (!field.value) return null;
      return typeof field.value === 'string' ? (
        <div>
          <img
            src={field.value}
            alt={field.value}
            className="size-40 object-cover rounded-btn group-hover:brightness-75 transition-[brightness] duration-300 border"
          />
          <Button.Root
            variant="outlined"
            size="xs"
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 origin-center opacity-0 group-hover:opacity-100"
            intent="danger"
            type="button"
            onClick={() => {
              field.onChange();
            }}
          >
            <Button.Icon type="only">
              <IconTrash className="size-3.5" />
            </Button.Icon>
          </Button.Root>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={URL.createObjectURL(field.value)}
            alt={field.value.name}
            key={name}
            className="size-40 object-cover rounded-btn group-hover:brightness-75 transition-[brightness] duration-300 border"
          />
          <Button.Root
            variant="outlined"
            size="xs"
            type="button"
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 origin-center opacity-0 group-hover:opacity-100"
            intent="danger"
            onClick={() => {
              field.onChange();
            }}
          >
            <Button.Icon type="only">
              <IconTrash className="size-3.5" />
            </Button.Icon>
          </Button.Root>
        </div>
      );
    },
    [name]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </FormLabel>
          <div className="flex flex-wrap gap-2">
            {field.value ? (
              renderValue(field)
            ) : (
              <label htmlFor={name} className="size-40 rounded-btn border flex items-center justify-center text-xs text-caption flex-col">
                <IconCloudUpload className="size-5" />
                <span>Chọn ảnh</span>
              </label>
            )}
          </div>
          <input
            hidden
            id={name}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files);
                field.onChange(files[0]);
              }
            }}
          />
        </FormItem>
      )}
    />
  );
};
