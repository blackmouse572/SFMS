import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import DataTable from '@components/data-table/DataTable';
import TopBar, { TopbarAction } from '@components/data-table/Topbar';
import { CreateScholarPanel, CreateScholarSchema, ScholarDetailPanel } from '@components/schoolar-list';
import { ScholarTableFilter, type Filter as SchoolarFilter } from '@components/schoolar-list/ScholarshipTableFilter';
import { useCreateScholarShip } from '@components/schoolar-list/useCreateScholarShip';
import { useGetSchoolarShip } from '@components/schoolar-list/useSchoolarShip';
import Badge from '@components/tailus-ui/Badge';
import { Caption, Text } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { SchoolarShip } from '@lib/types';
import { IconEye, IconPencil, IconPlus, IconPointFilled, IconTrash } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

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
  const { mutateAsync: create } = useCreateScholarShip();

  const columns = useMemo<ColumnDef<SchoolarShip>[]>(
    () => [
      {
        accessorFn: (row) => ({
          name: row.name,
          isActive: row.isActive,
        }),
        header: 'Tên học bổng',
        cell: (info) => {
          const { name, isActive } = info.getValue() as { name: string; isActive: boolean };
          return (
            <div className="flex items-center gap-2">
              <IconPointFilled className={isActive ? 'text-green-500' : 'text-red-500'} />
              <Text size="sm">{name}</Text>
            </div>
          );
        },
      },
      {
        accessorKey: 'continent',
        header: 'Lục địa',
        cell: (info) => (
          <Badge size="sm" variant={'outlined'} className="text-nowrap">
            {info.getValue() as string}
          </Badge>
        ),
      },
      {
        accessorKey: 'major',
        header: 'Chủ đề',
        cell: (info) => {
          const subjects = info.getValue() as string[];
          return (
            <div className="flex flex-wrap gap-1">
              {subjects.map((s, i) => (
                <Badge size="sm" key={i}>
                  {s}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: 'level',
        header: 'Cấp',
        cell: (info) => {
          const levels = info.getValue() as string[];
          return (
            <div className="flex flex-wrap gap-1">
              {levels.map((l, i) => (
                <Badge size="sm" key={i}>
                  {l}
                </Badge>
              ))}
            </div>
          );
        },
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
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const [selectedScholar, setSelectedScholar] = useState<SchoolarShip[]>([]);
  const items = data?.pages?.map((p) => p.data.result).flat() ?? [];

  const onSelect = (ids: string[]) => {
    const filtered = items.filter((item) => ids.includes(item._id)) ?? [];
    setSelectedScholar(filtered);
  };

  const onCreate = async (data: CreateScholarSchema, f: UseFormReturn<CreateScholarSchema>) => {
    toast.promise(create(data), {
      loading: 'Đang tạo học bổng...',
      success: () => {
        f.reset();
        setIsCreatePanelOpen(false);
        return 'Tạo học bổng thành công';
      },
      error: 'Tạo học bổng thất bại',
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
          onClick: () => setIsCreatePanelOpen(true),
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
              onClick: () => setIsDetailPanelOpen(true),
            },
            {
              label: 'Sửa',
              icon: <IconPencil />,
              size: 'sm',
              intent: 'secondary',
              variant: 'soft',
              mode: 'single',
              onClick: () => setIsEditPanelOpen(true),
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
      <ScholarDetailPanel open={isDetailPanelOpen} onOpenChange={setIsDetailPanelOpen} item={selectedScholar[0]} />
      <CreateScholarPanel open={isCreatePanelOpen} onOpenChange={setIsCreatePanelOpen} onSubmit={onCreate} />
      <CreateScholarPanel open={isEditPanelOpen} onOpenChange={setIsEditPanelOpen} onSubmit={() => {}} defaultValues={selectedScholar[0] as any} />
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
