import { Sheet, SheetBody, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { Table, TableBody, TableCell, TableRow } from '@components/tailus-ui/Table';
import { Question } from '@lib/types';
import { DialogProps } from '@radix-ui/react-dialog';
import { DialogProps as VariantProps } from '@tailus/themer';
import { useMemo } from 'react';
type DetailPaneProps = Omit<DialogProps, 'children'> & {
  item?: Question;
} & VariantProps;

type TableItem = {
  label: string;
  value: React.ReactNode;
};

export function QuestionDetailPanel(props: DetailPaneProps) {
  const { item, ...rest } = props;

  const table = useMemo<TableItem[]>(() => {
    if (!item) return [];
    return [
      {
        label: 'Câu hỏi',
        value: item.question,
      },
      {
        label: 'Đáp án',
        value: item.answer,
      },
      {
        label: 'Lựa chọn 1',
        value: item.option[0],
      },
      {
        label: 'Lựa chọn 2',
        value: item.option[1],
      },
      {
        label: 'Lựa chọn 3',
        value: item.option[2],
      },
      {
        label: 'Lựa chọn 4',
        value: item.option[3],
      },
      {
        label: 'Ngày tạo',
        value: Intl.DateTimeFormat('vi-VN').format(new Date(item.createdAt)),
      },
      {
        label: 'Ngày cập nhật',
        value: item.updatedAt ? Intl.DateTimeFormat('vi-VN').format(new Date(item.updatedAt)) : 'Chưa cập nhật',
      },
      {
        label: 'Tạo bởi',
        value: item.createdBy.email,
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
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
