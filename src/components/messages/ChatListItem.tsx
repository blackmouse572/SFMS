import { Caption, Text } from '@components/tailus-ui/typography';
import { AdminAvatar } from '@components/user-nav';

export type ChatListItemProps = {
  item: { avatar?: string; name: string; message: string; timestamp: string; unread?: number };
} & React.HTMLAttributes<HTMLDivElement>;

export function ChatListItem(props: ChatListItemProps) {
  const { item, ...rest } = props;
  return (
    <div className="flex gap-2 items-center p-3 cursor-default hover:bg-soft-bg transition-[background]" {...rest}>
      <AdminAvatar size="sm" src={item.avatar} className="flex-shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <Text weight={'semibold'}>{item.name}</Text>
          <Caption size="xs">{item.timestamp}</Caption>
        </div>
        <Caption size="sm">{item.message}</Caption>
      </div>
      {item.unread && <div className="flex items-center justify-center w-6 h-6 bg-primary-500 text-white rounded-full text-xs">{item.unread}</div>}
    </div>
  );
}
