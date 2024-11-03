import Button from '@components/tailus-ui/Button';
import { Form, InputForm } from '@components/tailus-ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { IconSend } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ChatSchema = z.object({
  text: z.string(),
});
type MessageInputProps = {
  sendMessage: (text: string) => void;
  className?: string;
};
function MessageInput({ sendMessage, className }: MessageInputProps) {
  const form = useForm({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      text: '',
    },
  });
  return (
    <Form {...form}>
      <form
        className={cn('px-3 py-1.5 flex gap-2 bottom-0 bg-white shadow-md drop-shadow-sm border-t', className)}
        onSubmit={form.handleSubmit((data) => {
          sendMessage(data.text);
          form.reset();
        })}
      >
        <InputForm name="text" control={form.control} placeholder="Type a message..." className="flex-1" />
        <Button.Root size="sm" variant="solid" type="submit">
          <Button.Icon type="only">
            <IconSend />
          </Button.Icon>
        </Button.Root>
      </form>
    </Form>
  );
}

export default MessageInput;
