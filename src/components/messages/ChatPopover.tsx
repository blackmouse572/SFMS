import LoadMoreTrigger from '@components/data-table/LoadMoreTrigger';
import { MessageBubble } from '@components/messages/MessageBubble';
import MessageInput from '@components/messages/MessageInput';
import { MessageList } from '@components/messages/MessageList';
import { useChat } from '@components/messages/useChat';
import { useOpen } from '@components/messages/useOpenProvider';
import { Skeleton } from '@components/Skeleton';
import Button from '@components/tailus-ui/Button';
import Popover from '@components/tailus-ui/Popover';
import { Title } from '@components/tailus-ui/typography';
import { IconArrowDown, IconLoader2, IconMessage2, IconX } from '@tabler/icons-react';
import { useRef } from 'react';
// export type ChatPopoverProps = {};
export function ChatPopover() {
  const { isOpen, setIsOpen } = useOpen();
  const messageListRef = useRef<HTMLDivElement>(null);

  const {
    sendMessage,
    messages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    conversation,
    newConversation,
    isGettingNewConversation,
  } = useChat({});

  const onSendMessage = (text: string, files?: File[]) => {
    sendMessage(text, files);
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

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
    if (isLoading) {
      return (
        <MessageList className="px-4 overflow-x-hidden overflow-y-auto" ref={messageListRef}>
          {isLoading && (
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
          )}
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
                  isMine={msg.sender._id === conversation.user._id}
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

    return (
      <MessageList className="px-4 py-5 overflow-x-hidden overflow-y-auto h-full" ref={messageListRef}>
        <div className="flex items-center justify-center flex-col h-full">
          <Title>Hãy bắt đầu cuộc trò chuyện</Title>
          <Button.Root size="md" variant="solid" className="mt-4" onClick={newConversation} disabled={isGettingNewConversation}>
            {isGettingNewConversation && (
              <Button.Icon type="only">
                <IconLoader2 className="animate-spin" />
              </Button.Icon>
            )}
            <Button.Label>{isGettingNewConversation ? 'Đang tìm tư vấn viên' : 'Bắt đầu cuộc trò chuyện'}</Button.Label>
          </Button.Root>
        </div>
      </MessageList>
    );
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button.Root size="md" variant="solid" className="fixed bottom-4 right-4 z-10 rounded-full" onClick={() => setIsOpen(!isOpen)}>
          <Button.Icon type="only">
            <IconMessage2 />
          </Button.Icon>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          sideOffset={10}
          alignOffset={10}
          mixed
          className="p-0 w-full"
          onFocusOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="h-[500px] w-[30vw] rounded-md flex flex-col relative overflow-hidden">
            <div className="bg-soft-bg px-4 py-2.5 top-0">
              <Title size="base">Chat với tư vấn viên</Title>
            </div>
            {renderBody()}
            <MessageInput className="" sendMessage={onSendMessage} />
          </div>
          <Button.Root
            variant="outlined"
            size="sm"
            className="absolute bottom-14 rounded-full left-2"
            onClick={() => {
              if (messageListRef.current) {
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
              }
            }}
          >
            <Button.Icon type="only">
              <IconArrowDown />
            </Button.Icon>
          </Button.Root>
          <Popover.Close asChild>
            <Button.Root variant="ghost" size="xs" intent="gray">
              <Button.Icon type="only">
                <IconX />
              </Button.Icon>
            </Button.Root>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
