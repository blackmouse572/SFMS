import { useGetQuestion } from '@components/question-list';
import Button from '@components/tailus-ui/Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/tailus-ui/Command';
import { Form, FormField, FormItem, FormLabel, FormMessage, InputForm, SelectForm } from '@components/tailus-ui/form';
import Popover from '@components/tailus-ui/Popover';
import Select from '@components/tailus-ui/Select';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Question, QuizType } from '@lib/types';
import { cn } from '@lib/utils';
import { type DialogProps } from '@radix-ui/react-dialog';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const CreateQuizSchema = z.object({
  _id: z.string().optional(),
  type: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  question: z.array(z.string().min(1)),
});
export type CreateQuizSchema = z.infer<typeof CreateQuizSchema>;

type CreateQuestionPanelProps = {
  onSubmit: (data: CreateQuizSchema, form: UseFormReturn<CreateQuizSchema>) => Promise<void>;
  defaultValues?: Partial<Omit<CreateQuizSchema, 'question'>> & {
    question?: Pick<Question, '_id' | 'question'>[];
  };
} & VariantProps &
  Omit<DialogProps, 'children'>;

export function CreateQuizPanel(props: CreateQuestionPanelProps) {
  const { defaultValues, onSubmit, ...rest } = props;

  const form = useForm<CreateQuizSchema>({
    resolver: zodResolver(CreateQuizSchema),
  });

  useEffect(() => {
    form.reset({
      ...defaultValues,
      question: defaultValues?.question?.map((q) => q._id) ?? [],
    });
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
              <InputForm control={form.control} name="title" label="Tiêu đề" />
              <InputForm control={form.control} name="description" label="Mô tả" />
              <SelectForm control={form.control} name="type" label="Loại">
                <SelectItem entry={{ value: QuizType.certification }} />
                <SelectItem entry={{ value: QuizType.interview }} />
              </SelectForm>
              <QuestionForm control={form.control} name="question" label="Câu hỏi" defaultValues={defaultValues?.question ?? []} />
            </form>
          </SheetBody>
          <SheetFooter>
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

const QuestionForm = ({
  control,
  name,
  label,
  defaultValues,
}: {
  control: UseFormReturn<CreateQuizSchema>['control'];
  name: string;
  label: string;
  defaultValues: Pick<Question, '_id' | 'question'>[];
}) => {
  const [search, setSearch] = useState('');
  const [questions, setQuestions] = useState(defaultValues);
  const { append, remove } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: name as any,
  });
  const { isLoading, data } = useGetQuestion({
    filter: {
      question: search,
    },
  });
  const items = data?.pages.flatMap((d) => d.data.result).map((a) => ({ id: a._id, text: a.question })) ?? [];
  const options = items.map((a) => ({ id: a.id, text: a.text }));
  const debouncedSearchTerm = useDebounce(search, 200);

  useEffect(() => {
    setSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const onAdd = (id: string) => {
    const selected = items.find((i) => i.id === id);
    const isExist = questions.find((q) => q._id === id);
    if (isExist) return;
    if (selected) {
      append(selected.id);
      setQuestions((prev) => [...prev, { _id: selected.id, question: selected.text }]);
    }
  };

  return (
    <>
      <FormField
        control={control}
        name={name as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              <span className="text-danger-500 ml-1">*</span>
            </FormLabel>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q._id} className="flex items-start gap-2">
                  <Button.Root
                    variant="outlined"
                    intent="gray"
                    type="button"
                    size="xs"
                    className="flex-shrink-0"
                    onClick={() => {
                      remove(index);
                      setQuestions((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    <Button.Icon type="only">
                      <IconX />
                    </Button.Icon>
                  </Button.Root>
                  <span>{q.question}</span>
                </div>
              ))}
            </div>

            <Popover.Root modal>
              <Popover.Trigger asChild>
                <Button.Root variant="outlined" role="combobox" intent="gray" className="ml-auto">
                  <Button.Label>Thêm câu hỏi</Button.Label>
                  <Button.Icon type="trailing">
                    <IconPlus />
                  </Button.Icon>
                </Button.Root>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content fancy className={cn('z-[13] p-0 relative w-[500px]')}>
                  <Command className="w-full" shouldFilter={false}>
                    <CommandInput value={search} onValueChange={setSearch} placeholder="Tìm câu hỏi" className="h-9" />
                    <CommandList>
                      <CommandEmpty>{isLoading ? 'Đang tải...' : 'Không có kết quả'}</CommandEmpty>
                      <CommandGroup>
                        {options?.map((language) => (
                          <CommandItem
                            value={language.id}
                            key={language.id}
                            onSelect={() => {
                              onAdd(language.id);
                            }}
                          >
                            {language.text}
                            <IconCheck
                              className={cn('ml-auto h-4 w-4', questions.find((q) => q._id === language.id) ? 'opacity-100' : 'opacity-0')}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
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
