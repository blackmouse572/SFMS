import { ImageForm } from '@components/schoolar-list';
import { ContinentOptions } from '@components/schoolar-list/constant';
import Button from '@components/tailus-ui/Button';
import Editor from '@components/tailus-ui/editor/editor';
import { Form, FormField, FormItem, FormLabel, InputForm, SelectForm } from '@components/tailus-ui/form';
import { SwitchForm } from '@components/tailus-ui/form/SwitchForm';
import Select from '@components/tailus-ui/Select';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { useUploadImage } from '@components/upload/useUploadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IconCheck, IconCloudUpload, IconTrash } from '@tabler/icons-react';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const CreateStudySchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3).max(255),
  continent: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  description: z.string().min(3).max(5000),
  isActive: z.boolean().default(true),
  image: z
    .array(z.union([z.string().url(), z.instanceof(File)]))
    .min(1, {
      message: 'Chưa chọn ảnh',
    })
    .refine(
      (files) => {
        return files.every((file) => {
          if (typeof file === 'string') return true;
          return file.type.startsWith('image/');
        });
      },
      {
        message: 'File không phải là ảnh',
      }
    )
    .refine((files) => files.length <= 10, { message: 'Chỉ được tải lên tối đa 10 ảnh' })
    .refine(
      (files) =>
        files.reduce((acc, file) => {
          if (typeof file === 'string') return acc;
          return acc + file.size;
        }, 0) <=
        1024 * 1024 * 10,
      {
        message: 'Dung lượng ảnh tối đa 10MB',
      }
    ),
});
export type CreateStudySchema = z.infer<typeof CreateStudySchema>;

type CreateScholarPanelProps = {
  onSubmit: (data: CreateStudySchema, form: UseFormReturn<CreateStudySchema>) => Promise<void>;
  defaultValues?: Partial<CreateStudySchema>;
} & VariantProps &
  Omit<DialogProps, 'children'>;

function CreateStudyPanel(props: CreateScholarPanelProps) {
  const { defaultValues, onSubmit, ...rest } = props;
  const { mutateAsync } = useUploadImage();
  const handleUploadImage = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        toast.error('File không tồn tại');
        return reject('File không tồn tại');
      }
      toast.promise(mutateAsync(file), {
        loading: 'Đang tải ảnh lên...',
        success: (data) => {
          resolve(data.url);
          return 'Tải ảnh lên thành công';
        },
        error: (error) => {
          reject(error);
          return 'Tải ảnh lên thất bại';
        },
      });
    });
  };
  const form = useForm<CreateStudySchema>({
    resolver: zodResolver(CreateStudySchema),
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
            <SheetTitle>Tạo du học</SheetTitle>
          </SheetHeader>
          <SheetBody className="space-y-2 flex-1">
            <form className="space-y-4" onSubmit={form.handleSubmit((v) => onSubmit(v, form))} id="createform">
              <InputForm control={form.control} className={''} name="name" label="Tên" required />
              <InputForm control={form.control} name="location" label="Vị trí" required />
              <SelectForm control={form.control} name="continent" label="Khu vực" required>
                {ContinentOptions.map((country) => (
                  <SelectItem entry={country} key={country.value} />
                ))}
              </SelectForm>
              <SwitchForm control={form.control} name="isActive" label="Sử dụng" />
              <ImageForm control={form.control} name="image" label="Ảnh" required />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Mô tả</FormLabel>
                    <Editor onUploadImg={handleUploadImage} content={field.value} onChange={field.onChange} />
                  </FormItem>
                )}
              />
            </form>
          </SheetBody>
          <SheetFooter>
            <Button.Root form="createform" intent="gray" variant="outlined" onClick={() => form.reset()}>
              <Button.Label>Đặt lại</Button.Label>
            </Button.Root>
            <Button.Root form="createform" type="submit">
              <Button.Label>Tạo mới</Button.Label>
            </Button.Root>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
type Entry = {
  key?: string;
  value: string;
};

const SelectItem = ({ entry }: { entry: Entry }) => {
  return (
    <Select.Item value={entry.key ?? entry.value} className="pl-7 items-center">
      <Select.ItemIndicator asChild>
        <IconCheck className="size-3.5 text-secondary-500" />
      </Select.ItemIndicator>
      <Select.ItemText>{entry.value}</Select.ItemText>
    </Select.Item>
  );
};
export { CreateStudyPanel };
