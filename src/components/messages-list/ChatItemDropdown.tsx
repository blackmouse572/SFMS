import { useUpdateChatStatus } from '@components/messages-list/useUpdateChatStatus';
import Button from '@components/tailus-ui/Button';
import DropdownMenu from '@components/tailus-ui/DropdownMenu';
import { Text } from '@components/tailus-ui/typography';
import { Conversation } from '@lib/types';
import { IconDots, IconX } from '@tabler/icons-react';
import { toast } from 'sonner';

type ChatItemDropdownProps = {
  conversation: Pick<Conversation, '_id' | 'status'>;
};

function ChatItemDropdown({ conversation }: ChatItemDropdownProps) {
  const { mutateAsync } = useUpdateChatStatus(conversation._id);

  const handleEndChat = async () => {
    toast.promise(mutateAsync({ status: false }), {
      loading: 'Đang kết thúc...',
      success: 'Đã kết thúc',
      error: 'Lỗi khi kết thúc',
      position: 'top-right',
    });
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button.Root variant="ghost" intent="gray">
          <Button.Icon type="only">
            <IconDots />
          </Button.Icon>
        </Button.Root>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content mixed sideOffset={5}>
          {conversation.status && (
            <DropdownMenu.Item onClick={handleEndChat}>
              <DropdownMenu.Icon>
                <IconX />
              </DropdownMenu.Icon>
              <Text>Kết thúc</Text>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default ChatItemDropdown;
