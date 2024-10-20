import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import DataTable from '@components/data-table/DataTable';
import TopBar, { TopbarAction } from '@components/data-table/Topbar';
import ScholarTableFilter, { type Filter as SchoolarFilter } from '@components/schoolar-list/ScholarshipTableFilter';
import { useGetSchoolarShip } from '@components/schoolar-list/useSchoolarShip';
import Badge from '@components/tailus-ui/Badge';
import { Caption, Text } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { SchoolarShip } from '@lib/types';
import { IconEye, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

function AdminScholarship() {
  const { addItems } = useBreadcrumb();
  useEffectOnce(() => {
    addItems([
      {
        title: 'Quản lý học bổng',
        href: '/admin/scholarship',
      },
    ]);
  });
  const [filter, setFilter] = useState<SchoolarFilter>();
  const { isLoading, data, isFetchingNextPage, fetchNextPage } = useGetSchoolarShip({ filter });

  const columns = useMemo<ColumnDef<SchoolarShip>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên học bổng',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'type',
        header: 'Loại học bổng',
        cell: (info) => <Badge>{info.getValue() as string}</Badge>,
      },
      {
        accessorKey: 'subject',
        header: 'Chủ đề',
        cell: (info) => {
          const subjects = info.getValue() as string[];
          return (
            <div className="flex flex-wrap gap-1">
              {subjects.map((s, i) => (
                <Badge key={i}>{s}</Badge>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: 'level',
        header: 'Cấp',
        cell: (info) => <Badge variant="outlined">{info.getValue() as string}</Badge>,
      },
      {
        accessorKey: 'isActive',
        header: 'Trạng thái',
        cell: (info) => (
          <Badge intent={info.getValue() ? 'success' : 'danger'}>{(info.getValue() as boolean) ? 'Hoạt động' : 'Không hoạt động'}</Badge>
        ),
      },
      {
        accessorKey: 'createdBy',
        accessorFn: (row) => ({
          ...row.createdBy,
          createdAt: row.createdAt,
        }),
        header: 'Tạo bởi',
        cell: (info) => {
          const user = info.getValue() as SchoolarShip['createdBy'] & { createdAt: string };
          return (
            <div className="flex items-center gap-2">
              <AdminAvatar size="sm" />
              <div className="space-y-1">
                <Text size="sm">{user.email}</Text>
                <Caption size="xs">Lúc {Intl.DateTimeFormat('vi-VN').format(new Date(user.createdAt))}</Caption>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const [selectedScholar, setSelectedScholar] = useState<SchoolarShip[]>([]);
  const items = data?.pages?.map((p) => p.data.result).flat() ?? [];

  const onSelect = (ids: string[]) => {
    setTimeout(() => {
      const filtered =
        data?.pages
          ?.map((p) => p.data.result)
          .flat()
          .filter((item) => ids.includes(item._id)) ?? [];
      setSelectedScholar(filtered);
    });
  };

  const actions = useMemo<TopbarAction[][]>(() => {
    return [
      [
        {
          label: 'Tạo mới',
          icon: <IconPlus />,
          size: 'sm',
          intent: 'gray',
          variant: 'soft',
        },
      ],
      selectedScholar.length > 0
        ? [
            {
              label: 'Xem chi tiết',
              icon: <IconEye />,
              size: 'sm',
              intent: 'info',
              variant: 'soft',
              mode: 'single',
            },
            {
              label: 'Sửa',
              icon: <IconPencil />,
              size: 'sm',
              intent: 'secondary',
              variant: 'soft',
              mode: 'single',
            },
          ]
        : [],
      selectedScholar.length > 0
        ? [
            {
              label: 'Xóa',
              icon: <IconTrash />,
              size: 'sm',
              intent: 'danger',
              variant: 'soft',
              mode: 'single',
            },
          ]
        : [],
    ];
  }, [selectedScholar.length]);

  return (
    <div className="space-y-2 mt-8">
      <TopBar selectedItems={selectedScholar} actions={actions} onFilterClick={() => setIsFilterPanelOpen(true)} />
      <ScholarTableFilter open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen} onSubmit={setFilter} />
      <DataTable
        data={items}
        columns={columns}
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        selectionMode="single"
        onSelectionChange={onSelect}
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default AdminScholarship;
