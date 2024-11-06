import { UseChatSocketKey } from '@components/messages';
import { useGetMessages } from '@components/messages/useGetMessages';
import { useToken, useUser } from '@lib/auth';
import { Conversation, Message, MessagePayload } from '@lib/types';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

export interface UseAdminChatProps {
  conversation?: Pick<Conversation, '_id'>;
}
export function useAdminChat(props: UseAdminChatProps) {
  const { conversation } = props;

  const token = useToken();
  const user = useUser();

  const {
    data: messages,
    isLoading: isMessagesLoading,
    addMessage,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetMessages(
    conversation?._id ?? '',
    {},
    {
      enabled: !!conversation,
      //   onSuccess,
    }
  );

  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) return;
    let socket = socketInstance;
    if (!socket || conversation?._id) {
      socket = io(import.meta.env.VITE_API_URL as string, {
        auth: {
          token,
        },
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: token,
            },
          },
        },
        query: {
          roomId: conversation?._id,
        },
      });
      setSocketInstance(socket);
    }

    socket.on('connect', () => {
      // console.log('Connected');
    });

    socket.on(UseChatSocketKey.receiveMessage, (messsage: Message) => {
      if (messsage.sender._id === user?._id) return;
      addMessage(messsage);
    });

    socket.on('error', (error) => {
      toast.error(error.message);
    });

    socket.on('disconnect', (reason) => {
      // console.log('Disconnected');
    });

    return () => {
      if (socket.connected) {
        setSocketInstance(null);
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, conversation]);

  const sendMessage = useCallback(
    (text: string, files?: File[]) => {
      if (!user) return;
      const message: Message = {
        sender: user,
        text,
        files: files,
        _id: Math.random().toString(),
        sentAt: new Date().toISOString(),
      };
      const payload: MessagePayload = {
        text: message.text,
        files: files
          ? files.map((file) => ({
              name: file.name,
              buffer: file,
            }))
          : [],
      };
      addMessage(message);
      if (!socketInstance) return;
      socketInstance.emitWithAck(UseChatSocketKey.sendMessage, payload);
    },
    [addMessage, socketInstance, user]
  );

  const flatMessages = messages?.pages.map((d) => d.result).flat() ?? [];

  return {
    messages: flatMessages,
    isMessagesLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    sendMessage,
  };
}
