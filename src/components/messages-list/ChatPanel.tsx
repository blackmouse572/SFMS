import LoadMoreTrigger from '@components/data-table/LoadMoreTrigger';
import ChatItemDropdown from '@components/messages-list/ChatItemDropdown';
import { useAdminChat } from '@components/messages-list/useAdminChat';
import { MessageBubble } from '@components/messages/MessageBubble';
import MessageInput from '@components/messages/MessageInput';
import { MessageList } from '@components/messages/MessageList';
import { Skeleton } from '@components/Skeleton';
import { Caption, Title } from '@components/tailus-ui/typography';
import { useUser } from '@lib/auth';
import { Conversation } from '@lib/types';
import { cn } from '@lib/utils';
import { IconPointFilled } from '@tabler/icons-react';

import React, { useRef } from 'react';
type ChatPanelProps = {
  conversation?: Pick<Conversation, '_id' | 'user' | 'status'>;
} & React.ComponentProps<'div'>;

export function ChatPanel(props: ChatPanelProps) {
  const { conversation, ...rest } = props;
  const messageListRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const { isMessagesLoading, messages, hasNextPage, fetchNextPage, isFetchingNextPage, sendMessage } = useAdminChat({ conversation });

  const getTimeStamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // 1 phút
    if (diff < 60000) {
      return 'Mới đây';
    }
    // 1 giờ
    else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)} phút trước`;
    }
    // 1 ngày
    else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)} giờ trước`;
    } else {
      return Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        day: 'numeric',
        month: 'short',
      }).format(date);
    }
  };

  const renderBody = () => {
    if (isMessagesLoading) {
      return (
        <MessageList className="px-4 overflow-x-hidden overflow-y-auto" ref={messageListRef}>
          <>
            <Skeleton className="w-1/2 h-28" />
            <Skeleton className="w-1/2 h-28" />
            <Skeleton className="w-1/2 h-28" />
            <Skeleton className="w-1/2 h-28" />
            <Skeleton className="w-1/2 h-28 ml-auto" />
            <Skeleton className="w-1/2 h-28" />
            <Skeleton className="w-1/2 h-28 ml-auto" />
            <Skeleton className="w-1/2 h-28" />
            <Skeleton className="w-1/2 h-28 ml-auto" />
          </>
        </MessageList>
      );
    }
    if (conversation) {
      return (
        <MessageList className="px-4 py-5 overflow-x-hidden overflow-y-auto min-h-[calc(500px-105px)]" ref={messageListRef}>
          {messages && (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg._id}
                  message={msg}
                  isMine={msg.sender._id === user?._id}
                  sender={msg.sender}
                  timestamp={getTimeStamp(new Date(msg.sentAt))}
                />
              ))}
            </>
          )}
          <LoadMoreTrigger onLoadMore={fetchNextPage} hasMore={hasNextPage} isLoading={isFetchingNextPage} />
        </MessageList>
      );
    }
  };

  return (
    <div {...rest} className={cn('gap-4', rest.className)}>
      <div className="px-2.5 py-3 flex justify-between items-center">
        <div className="">
          <Title>{conversation?.user.email}</Title>
          <div className="flex items-center">
            <IconPointFilled size={13} className={conversation?.status === false ? 'text-red-500' : 'text-green-500'} />
            <Caption size="xs">{conversation?.status === false ? 'Cuộc trò chuyện đã kết thúc' : 'Đang trò chuyện'}</Caption>
          </div>
        </div>
        <div className="flex items-center">{conversation && <ChatItemDropdown conversation={conversation} />}</div>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[79vh] flex flex-col">{renderBody()}</div>
      {conversation?.status === false ? null : <MessageInput className="w-full shadow-none border-none px-4 py-0" sendMessage={sendMessage} />}
    </div>
  );
}
