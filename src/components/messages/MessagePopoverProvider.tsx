import { ChatSchema } from '@components/messages/MessageInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

function MessagePopoverProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<z.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      text: '',
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}

export default MessagePopoverProvider;
