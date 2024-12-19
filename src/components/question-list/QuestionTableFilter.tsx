import { useGetQuizzes } from '@components/quiz-list/useGetQuiz';
import Button from '@components/tailus-ui/Button';
import { Form, InputForm } from '@components/tailus-ui/form';
import { ComboBoxForm } from '@components/tailus-ui/form/ComboBoxForm';
import { Sheet, SheetBody, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { DialogProps } from '@radix-ui/react-dialog';
import { IconFilter } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TableFilterProps = Omit<DialogProps, 'children'> & {
  onSubmit: (data: Filter) => void;
};

export const FilterSchema = z
  .object({
    question: z.string(),
    answer: z.string(),
    quiz: z.string(),
  })
  .partial();

export type Filter = z.infer<typeof FilterSchema>;

export function QuestionTableFilter(props: TableFilterProps) {
  const { onSubmit, ...rest } = props;
  const form = useForm<Filter>({
    defaultValues: {
      question: '',
      answer: '',
      quiz: '',
    },
  });

  const onFormSubmit = (data: Filter) => {
    onSubmit(data);
    rest.onOpenChange?.(false);
  };

  const onReset = async () => {
    form.reset();
  };

  const { handleSubmit } = form;

  return (
    <Sheet {...rest}>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full gap-4">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <IconFilter className="text-primary-500 size-4" />
                Bộ lọc
              </SheetTitle>
            </SheetHeader>

            <SheetBody className="flex-1 space-y-4">
              <InputForm control={form.control} name="question" label="Câu hỏi" />
              <InputForm control={form.control} name="answer" label="Câu trả lời" />
              <InputForm control={form.control} name="quiz" label="Bài kiểm tra" type="number" />
            </SheetBody>
            <SheetFooter className="">
              <Button.Root type="reset" intent="gray" variant="outlined" onClick={onReset}>
                <Button.Label>Xóa</Button.Label>
              </Button.Root>
              <Button.Root type="submit">
                <Button.Label>Lưu</Button.Label>
              </Button.Root>
            </SheetFooter>
          </form>
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
const QuizSelect = ({ control, name, label, required }: StaffSelectProps) => {
  const [search, setSearch] = useState('');
  const { data: infiniteData, isLoading } = useGetQuizzes({
    filter: { name: search },
  });
  const data = infiniteData?.pages.flatMap((page) => page.data.result);
  const transformedData = useMemo(() => {
    return data?.map((d) => ({ id: d._id, text: d.title }));
  }, [data]);

  return <ComboBoxForm options={transformedData} control={control} name={name} label={label} onSearch={(value) => setSearch(value)} debounce={500} />;
};
