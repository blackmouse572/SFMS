import { useAdvisoryDetails } from '@components/advisory-details/useGetAdvisoryDetails';
import StatusBadge from '@components/advisory-list/StatusBadge';
import CopyButton from '@components/CopyButton';
import { Skeleton } from '@components/Skeleton';
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@components/tailus-ui/Sheet';
import { Table, TableBody, TableCell, TableRow } from '@components/tailus-ui/Table';
import { Caption, Text } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { Advisory } from '@lib/types';
import { type DialogProps } from '@radix-ui/react-dialog';
import { useMemo } from 'react';

type AdvisoryDetailPanel = {
  item?: Pick<Advisory, '_id'>;
} & Omit<DialogProps, 'children'>;

function AdvisoryDetailsPanel(props: AdvisoryDetailPanel) {
  const { item, ...rest } = props;
  const { isLoading, data } = useAdvisoryDetails(item?._id ?? '', {
    enabled: !!item && rest.open,
  });
  const table = useMemo(() => {
    if (!data) return [];
    return [
      {
        label: 'Email',
        value: data.emailAdvisory,
        action: <CopyButton intent="gray" size="xs" variant="soft" content={data.emailAdvisory} />,
      },
      {
        label: 'Tên người dùng',
        value: data.fullName,
        action: <CopyButton intent="gray" size="xs" variant="soft" content={data.fullName} />,
      },
      {
        label: 'Trạng thái',
        value: <StatusBadge status={data.status} />,
      },
      {
        label: 'Học bổng',
        value: data.level,
      },
      {
        label: 'Lục địa',
        value: data.continent,
      },
      {
        label: 'Thanh toán',
        value: data.value,
      },
      {
        label: 'Địa chỉ',
        value: data.address,
      },
      {
        label: 'Số điện thoại',
        value: data.phone,
        action: <CopyButton intent="gray" size="xs" variant="soft" content={data.phone} />,
      },
      {
        label: 'Ngày tạo',
        value: Intl.DateTimeFormat('vi-VN').format(new Date(data.createdAt)),
      },
      data.createdBy
        ? {
            label: 'Tạo bởi',
            value: (
              <div className="flex items-center gap-2">
                <AdminAvatar size="sm" />
                <div>
                  <Text size="sm">{data.createdBy}</Text>
                  <Caption size="xs">Lúc {Intl.DateTimeFormat('vi-VN').format(new Date(data.createdAt))}</Caption>
                </div>
              </div>
            ),
          }
        : {},
    ];
  }, [data]);
  return (
    <Sheet {...rest}>
      <SheetContent size="lg" className="flex h-full flex-col gap-4 overflow-auto">
        <SheetHeader className="sticky top-0 z-[51] bg-white border-b py-7">
          <SheetTitle>Chi tiết hồ sơ</SheetTitle>
          <SheetDescription>{item?._id}</SheetDescription>
        </SheetHeader>
        <SheetBody className="flex-1">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="w-full h-20 rounded-full" />
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-20" />
              <Skeleton className="w-full h-20" />
            </div>
          )}
          {data && (
            <div className="space-y-8">
              <Table className="border-separate border-spacing-y-2">
                <TableBody className="gap-1 space-y-3">
                  {table.map(({ label, value, action }) => (
                    <TableRow key={label} className="border-none group [&>td]:py-2 relative">
                      <TableCell className="bg-soft-bg font-medium text-nowrap">{label}</TableCell>
                      <TableCell className="font-normal">{value}</TableCell>
                      {action && <div className="absolute top-1/2 right-0 hidden group-hover:inline-block -translate-y-1/2">{action}</div>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="space-y-2">
                <Text weight={'bold'}>Lịch sử</Text>
                <div className="space-y-4">
                  {data.history.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Caption size="xs">{Intl.DateTimeFormat('vi-VN').format(new Date(h.updatedAt))}</Caption>
                      <div>
                        <Text size="sm">{h.updatedBy?.email}</Text>
                        <StatusBadge status={h.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}

export default AdvisoryDetailsPanel;
