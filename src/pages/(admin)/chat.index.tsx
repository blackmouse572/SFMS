import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import LoadMoreTrigger from '@components/data-table/LoadMoreTrigger';
import { ChatPanel } from '@components/messages-list/ChatPanel';
import { useGetConversation } from '@components/messages-list/useGetConversations';
import { Skeleton } from '@components/Skeleton';
import Card from '@components/tailus-ui/Card';
import SeparatorRoot from '@components/tailus-ui/Separator';
import { Caption, Text } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useEffect, useState } from 'react';

function AdminChat() {
  const { setItems } = useBreadcrumb();
  useEffectOnce(() => {
    setItems([
      {
        title: 'Tin nhắn',
        href: '/admin/chat',
      },
    ]);
  });
  const [selectedItem, setSelectedItem] = useState<string>();
  const { isLoading, data, fetchNextPage, hasNextPage, isSuccess, isFetchingNextPage } = useGetConversation({});
  const items = data?.pages.map((d) => d.data.result).flat() ?? [];
  const selectedConversation = items.find((item) => item._id === selectedItem);

  useEffect(() => {
    if (isSuccess && items.length > 0) {
      setSelectedItem(items[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="grid grid-cols-[0.25fr,minmax(200px,1fr)] divide-x-2 h-[calc(100%-68.5px)]">
      <div className="">
        {isLoading && (
          <>
            <div>
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div>
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div>
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div>
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-20 h-4" />
            </div>
          </>
        )}
        {items.map((item) => (
          <Card
            variant="soft"
            className="flex gap-2 data-[selected='true']:bg-soft-bg hover:bg-soft-bg bg-transparent transition-[background] rounded-none cursor-default"
            onClick={() => setSelectedItem(item._id)}
            key={item._id}
            data-selected={selectedConversation?._id === item._id}
          >
            <AdminAvatar
              src={item.user.avatar}
              size={'lg'}
              initial={item.user.email}
              indicator={{
                intent: item.status === false ? 'danger' : 'success',
              }}
              className="flex-shrink-0"
            />
            <div>
              <Text weight={'medium'}>{item.user.email}</Text>
              <div className="space-y-2">
                <Caption>{item.messages?.[0]?.text}</Caption>
                <SeparatorRoot />
                <Caption size="xs">Staff: {item.staff.email}</Caption>
              </div>
            </div>
          </Card>
        ))}
        <LoadMoreTrigger onLoadMore={fetchNextPage} hasMore={hasNextPage} isLoading={isFetchingNextPage} />
      </div>
      <ChatPanel className="divide-y-2 h-full" conversation={selectedConversation} />
    </div>
  );
}

export default AdminChat;
