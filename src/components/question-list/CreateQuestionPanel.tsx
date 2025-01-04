import Button, { Label } from '@components/tailus-ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage, InputForm } from '@components/tailus-ui/form';
import Select from '@components/tailus-ui/Select';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import Textarea from '@components/tailus-ui/Textare';
import { Tooltip } from '@components/tailus-ui/Tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IconCheck, IconInfoCircleFilled } from '@tabler/icons-react';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const CreateQuestionSchema = z
  .object({
    _id: z.string().optional(),
    question: z.string().min(3).max(1000),
    answer: z.array(z.string().min(3).max(1000)).min(1),
    option: z.array(z.string().min(3).max(1000)).min(1),
    quiz: z.coerce.number().min(0),
  })
  .refine(
    ({ answer, option }) => {
      return answer.every((a) => option.includes(a));
    },
    {
      message: 'Câu trả lời phải nằm trong lựa chọn',
      path: ['answer'],
    }
  );
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
              <FormField
                control={form.control}
                name="answer"
                defaultValue={[]}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <Tooltip tooltip={'Câu trả lời phải nằm trong lựa chọn'}>
                        <IconInfoCircleFilled className="size-5 text-primary-500" />
                      </Tooltip>
                      <Label>Câu trả lời</Label>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        floating
                        placeholder={`answer 1\nanswer 2\nanswer 3`}
                        value={field.value.join('\n')}
                        onChange={(e) => {
                          field.onChange(e.target.value.split('\n'));
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="option"
                defaultValue={[]}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-1">
                      <Label>Lựa chọn</Label>
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        floating
                        placeholder={`answer 1\nanswer 2\nanswer 3`}
                        value={field.value.join('\n')}
                        onChange={(e) => {
                          field.onChange(e.target.value.split('\n'));
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <InputForm control={form.control} name="quiz" label="Bài kiểm tra" type="number" />
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
