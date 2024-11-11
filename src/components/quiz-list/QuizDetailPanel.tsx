import { Sheet, SheetBody, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { Table, TableBody, TableCell, TableRow } from '@components/tailus-ui/Table';
import { Caption, Text } from '@components/tailus-ui/typography';
import { Quiz } from '@lib/types';
import { DialogProps } from '@radix-ui/react-dialog';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useMemo } from 'react';
type DetailPaneProps = Omit<DialogProps, 'children'> & {
  item?: Quiz;
} & VariantProps;

type TableItem = {
  label: string;
  value: React.ReactNode;
};

export function QuizDetailPanel(props: DetailPaneProps) {
  const { item, ...rest } = props;

  const table = useMemo<TableItem[]>(() => {
    if (!item) return [];
    return [
      {
        label: 'Tên quiz',
        value: item.title,
      },
      {
        label: 'Mô tả',
        value: item.description,
      },
      {
        label: 'Loại',
        value: item.type,
      },
      {
        label: 'Ngày tạo',
        value: Intl.DateTimeFormat('vi-VN').format(new Date(item.createdAt)),
      },
      {
        label: 'Ngày cập nhật',
        value: item.updatedAt ? Intl.DateTimeFormat('vi-VN').format(new Date(item.updatedAt)) : 'Chưa cập nhật',
      },
    ];
  }, [item]);

  if (!item) return null;

  return (
    <Sheet {...rest}>
      <SheetContent size="3xl" className="flex h-full flex-col gap-4 overflow-auto">
        <SheetHeader className="sticky top-0 z-[51] bg-white border-b py-7">
          <SheetTitle>Thông tin </SheetTitle>
          <SheetDescription>{item._id}</SheetDescription>
        </SheetHeader>
        <SheetBody className="flex-1 space-y-8">
          <Table className="border-separate border-spacing-y-2">
            <TableBody className="gap-1 space-y-3">
              {table.map(({ label, value }) => (
                <TableRow key={label} className="border-none">
                  <TableCell className="bg-soft-bg font-medium text-nowrap">{label}</TableCell>
                  <TableCell className="font-normal">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {item.question.map((q, index) => (
            <div key={q._id} className="">
              <Text className="font-medium">Câu hỏi {index + 1}:</Text>
              <Caption>{q.question}</Caption>
            </div>
          ))}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
