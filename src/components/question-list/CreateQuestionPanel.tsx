import Button from '@components/tailus-ui/Button';
import { Form, InputForm } from '@components/tailus-ui/form';
import Select from '@components/tailus-ui/Select';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IconCheck } from '@tabler/icons-react';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const CreateQuestionSchema = z.object({
  _id: z.string().optional(),
  question: z.string().min(10).max(1000),
  answer: z.string().min(10).max(1000),
  option: z.array(z.string().min(10).max(1000)).nonempty(),
});
export type CreateQuestionSchema = z.infer<typeof CreateQuestionSchema>;

type CreateQuestionPanelProps = {
  onSubmit: (data: CreateQuestionSchema, form: UseFormReturn<CreateQuestionSchema>) => Promise<void>;
  defaultValues?: Partial<CreateQuestionSchema>;
} & VariantProps &
  Omit<DialogProps, 'children'>;

export function CreateQuestionPanel(props: CreateQuestionPanelProps) {
  const { defaultValues, onSubmit, ...rest } = props;

  const form = useForm<CreateQuestionSchema>({
    resolver: zodResolver(CreateQuestionSchema),
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
            <SheetTitle>{defaultValues?._id ? 'Chỉnh sửa câu hỏi' : 'Tạo mới câu hỏi'}</SheetTitle>
          </SheetHeader>
          <SheetBody className="space-y-2 flex-1">
            <form className="space-y-4" onSubmit={form.handleSubmit((v) => onSubmit(v, form))} id="createform">
              <InputForm control={form.control} name="question" label="Câu hỏi" />
              <InputForm control={form.control} name="answer" label="Đáp án" />
              <div className="grid grid-cols-2 gap-4">
                <InputForm control={form.control} name="option.0" label="Lựa chọn 1" />
                <InputForm control={form.control} name="option.1" label="Lựa chọn 2" />
                <InputForm control={form.control} name="option.2" label="Lựa chọn 3" />
                <InputForm control={form.control} name="option.3" label="Lựa chọn 4" />
              </div>
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
