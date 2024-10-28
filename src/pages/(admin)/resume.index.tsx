import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import DataTable from '@components/data-table/DataTable';
import TopBar, { TopbarAction } from '@components/data-table/Topbar';
import ResumeDetailPanel from '@components/resume-details/ResumeDetailPanel';
import StatusBadge from '@components/resume-details/StatusBadge';
import { ResumeTableFilter, useResumeList } from '@components/resume-list';
import { Text } from '@components/tailus-ui/typography';
import { UserFilter } from '@components/user-list/UserTableFilter';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { Resume, SchoolarShip } from '@lib/types';
import { IconEye } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

function AdminResume() {
  const { setItems } = useBreadcrumb();
  useEffectOnce(() => {
    setItems([
      {
        title: 'Quản lý CV',
        href: '/admin/resume',
      },
    ]);
  });

  const [selectedItems, setSelectedItems] = useState<Resume[]>();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [filter, setFilter] = useState<UserFilter>();
  const { data, isFetchingNextPage, fetchNextPage, isLoading } = useResumeList({ filter });

  const onSelect = (ids: string[]) => {
    const filtered = items.filter((item) => ids.includes(item._id)) ?? [];
    setSelectedItems(filtered);
  };

  const actions = useMemo<TopbarAction[][]>(
    () => [
      selectedItems?.length === 1
        ? [
            {
              label: 'Xem chi tiết',
              icon: <IconEye />,
              size: 'sm',
              variant: 'soft',
              onClick: () => setIsDetailPanelOpen(true),
            },
          ]
        : [],
    ],
    [selectedItems]
  );

  const columns = useMemo<ColumnDef<Resume>[]>(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (row) => <Text>{row.getValue() as string}</Text>,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: (row) => <StatusBadge status={row.getValue() as string} />,
      },
      {
        accessorKey: 'scholarship',
        header: 'Học bổng',
        cell: (row) => {
          const scholarship = row.getValue() as Pick<SchoolarShip, '_id' | 'name'>;
          return <Text className="max-w-[400px] ">{scholarship?.name}</Text>;
        },
      },
      {
        accessorKey: 'orderCode',
        header: 'Mã đơn hàng',
        cell: (row) => <Text>{row.getValue() as string}</Text>,
      },
    ],
    []
  );

  const items = data?.pages?.map((p) => p.data.result).flat() ?? [];

  const isFilterActive = useMemo(() => {
    if (filter && Object.values(filter).some((v) => v?.length > 0)) {
      return true;
    }

    return false;
  }, [filter]);

  return (
    <div className="space-y-2 mt-8">
      <TopBar selectedItems={selectedItems} actions={actions} onFilterClick={() => setIsFilterPanelOpen(true)} isFilterActive={isFilterActive} />
      <ResumeTableFilter open={isFilterPanelOpen} onOpenChange={setIsFilterPanelOpen} onSubmit={setFilter} />
      <ResumeDetailPanel open={isDetailPanelOpen} onOpenChange={setIsDetailPanelOpen} item={selectedItems?.[0]} />
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

export default AdminResume;
