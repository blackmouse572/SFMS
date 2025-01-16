import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import { Filter } from '@components/advisory-list/AdvisoryTableFilter';
import DataTable from '@components/data-table/DataTable';
import TopBar, { TopbarAction } from '@components/data-table/Topbar';
import { ProviderTableFilter, useDeleteProvider, useProviderList } from '@components/provider-list';
import { CreateProviderPanel } from '@components/provider-list/CreateProviderPanel';
import ProviderDetailPanel from '@components/provider-list/ProviderDetailPanel';
import { useCreateProvider } from '@components/provider-list/useCreateProvider';
import { Text } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useUser } from '@lib/auth';
import { Provider } from '@lib/types';
import { IconEye, IconPlus } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

function AdminProviders() {
  const { setItems } = useBreadcrumb();
  useEffectOnce(() => {
    setItems([
      {
        title: 'Quản lý nhà cung cấp',
        href: '/admin/providers',
      },
    ]);
  });
  const [filter, setFilter] = useState<Filter>();
  const user = useUser();
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
  const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } = useProviderList({ filter: { ...filter, _id: user?.provider } });
  const { mutateAsync: createAsync } = useCreateProvider();
  const { mutateAsync: deleteAdvisory } = useDeleteProvider();

  const columns = useMemo<ColumnDef<Provider>[]>(
    () => [
      {
        accessorFn: (row) => ({
          name: row.name,
          logo: row.logo,
        }),
        header: 'Hồ sơ',
        cell: (info) => {
          const { name, logo } = info.getValue() as Record<string, string>;
          return (
            <div className="flex gap-2 items-center">
              <AdminAvatar className="flex-shrink-0" size="sm" src={logo} />
              <Text size="sm">{name}</Text>
            </div>
          );
        },
      },
      {
        accessorKey: 'createdBy',
        accessorFn: (row) => ({
          createdBy: row.createdBy,
          createdAt: row.createdAt,
        }),
        header: 'Tạo bởi',
        cell: (info) => {
          const user = info.getValue() as { _id: string; email: string };
          return (
            <div className="flex items-center gap-2">
              <AdminAvatar size="sm" />
              <div className="space-y-1">
                <Text size="sm">{user.email}</Text>
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
  const [isUpdateStatusPanelOpen, setIsUpdateStatusPanelOpen] = useState(false);
  const isFilterActive = useMemo(() => {
    if (filter && Object.values(filter).some((v) => v.length > 0)) {
      return true;
    }

    return false;
  }, [filter]);

  const [selectedItem, setSelectedItem] = useState<Provider[]>([]);
  const items = data?.pages?.map((p) => p.data.result).flat() ?? [];

  const onSelect = (ids: string[]) => {
    const filtered = items.filter((item) => ids.includes(item._id)) ?? [];
    setSelectedItem(filtered);
  };

  const handleDeleteAdvisory = useCallback(async () => {
    const id = selectedItem[0]?._id;
    if (!id) return;

    toast.promise(deleteAdvisory(id), {
      loading: 'Đang xóa hồ sơ...',
      success: 'Xóa hồ sơ thành công',
      error: 'Xóa hồ sơ thất bại',
      finally: () => {
        setSelectedItem([]);
      },
    });
  }, [selectedItem, deleteAdvisory]);

  const handleCreateProvider = async (data: any) => {
    if (data._id) {
      toast.promise(createAsync(data), {
        loading: 'Đang cập nhật hồ sơ...',
        success: 'Cập nhật hồ sơ thành công',
        error: 'Cập nhật hồ sơ thất bại',
        finally: () => {
          setIsUpdateStatusPanelOpen(false);
        },
      });
    } else {
      toast.promise(createAsync(data), {
        loading: 'Đang tạo hồ sơ...',
        success: 'Tạo hồ sơ thành công',
        error: 'Tạo hồ sơ thất bại',
        finally: () => {
          setIsCreatePanelOpen(false);
        },
      });
    }
  };

  const actions = useMemo<TopbarAction[][]>(() => {
    return [
      // If user is a provider, hide the create button
      user?.provider
        ? []
        : [
            {
              label: 'Thêm mới',
              size: 'sm',
              variant: 'soft',
              icon: <IconPlus />,
              onClick: () => setIsCreatePanelOpen(true),
            },
          ],
      selectedItem.length > 0
        ? [
            {
              label: 'Xem chi tiết',
              icon: <IconEye />,
              size: 'sm',
              variant: 'soft',
              onClick: () => setIsDetailPanelOpen(true),
            },
            {
              label: 'Cập nhật ',
              size: 'sm',
              variant: 'soft',
              intent: 'secondary',
              onClick: () => setIsUpdateStatusPanelOpen(true),
            },
            {
              label: 'Xóa',
              size: 'sm',
              variant: 'soft',
              intent: 'danger',
              onClick: handleDeleteAdvisory,
            },
          ]
        : [],
      selectedItem.length > 0 ? [] : [],
    ];
  }, [handleDeleteAdvisory, selectedItem.length, user?.provider]);

  return (
    <div className="space-y-2 mt-8">
      <TopBar
        selectedItems={selectedItem}
        actions={actions}
        onFilterClick={() => setIsFilterPanelOpen(true)}
        isFilterActive={isFilterActive}
        totalItems={data?.pages?.[0].data.meta.total}
      />
      <CreateProviderPanel open={isCreatePanelOpen} onOpenChange={() => setIsCreatePanelOpen(false)} onSubmit={handleCreateProvider} />
      <CreateProviderPanel
        open={isUpdateStatusPanelOpen}
        onOpenChange={() => setIsUpdateStatusPanelOpen(false)}
        onSubmit={handleCreateProvider}
        defaultValues={selectedItem[0]}
      />
      <ProviderDetailPanel open={isDetailPanelOpen} onOpenChange={() => setIsDetailPanelOpen(false)} item={selectedItem[0]} />
      <ProviderTableFilter open={isFilterPanelOpen} onOpenChange={() => setIsFilterPanelOpen(false)} onSubmit={setFilter} />
      <DataTable
        data={items}
        columns={columns}
        isLoading={isLoading}
        isLoadingMore={isFetchingNextPage}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        selectionMode="single"
        onSelectionChange={onSelect}
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default AdminProviders;
