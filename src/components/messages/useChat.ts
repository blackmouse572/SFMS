import { useGetCurrentConversation } from '@components/messages/useGetCurrentConversation';
import { useGetMessages } from '@components/messages/useGetMessages';
import { useNewConversation } from '@components/messages/useNewConversation';
import { useToken, useUser } from '@lib/auth';
import { Message } from '@lib/types';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { useImmer } from 'use-immer';

export type ChatState = {
  status: 'connected' | 'unconnected';
  isConnecting?: boolean;
};
export type ChatAction = {
  updateStatus: (status: ChatState['status']) => void;
};

export const UseChatSocketKey = {
  sendMessage: 'sendMessage',
  newConversation: 'newConversation',
  getConversations: 'getConversations',
  receiveMessage: 'receiveMessage',
  connection: 'connection',
};

type UseChatProps = {
  onSuccess?: () => void;
};
export function useChat({ onSuccess }: UseChatProps) {
  const token = useToken();
  const user = useUser();
  const { isLoading: isConversationLoading, data: currentConversation } = useGetCurrentConversation();
  const {
    data: messages,
    isLoading: isMessagesLoading,
    addMessage,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetMessages(
    currentConversation?._id ?? '',
    {},
    {
      enabled: currentConversation !== undefined,
      onSuccess,
    }
  );
  const isLoading = useMemo(() => {
    if (isConversationLoading || isMessagesLoading) return true;

    return false;
  }, [isConversationLoading, isMessagesLoading]);

  const [state, setState] = useImmer<ChatState>({
    status: 'unconnected',
    isConnecting: true,
  });

  const socketInstance = useRef<Socket | null>(null);

  const newConversationMutation = useNewConversation({
    key: UseChatSocketKey.newConversation,
    socket: socketInstance.current,
  });

  useEffect(() => {
    if (!token || !currentConversation) return;
    console.log('---useEffect---');
    let socket = socketInstance.current;
    if (!socket) {
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
          roomId: currentConversation._id,
        },
      });
      socketInstance.current = socket;
    }

    socket.on('connect', () => {
      console.log('Connected');
      setState((prev) => ({
        ...prev,
        status: 'connected',
      }));
    });

    socket.on(UseChatSocketKey.receiveMessage, (messsage: Message) => {
      if (messsage.sender._id === user?._id) return;
      addMessage(messsage);
    });

    socket.on('error', (error) => {
      toast.error(error.message);
    });

    socket.on('disconnect', (reason) => {
      setState((prev) => ({
        ...prev,
        status: 'unconnected',
      }));
    });

    return () => {
      if (socket.connected) {
        socketInstance.current = null;
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentConversation]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!user) return;
      const message: Message = {
        sender: user,
        text,
        _id: Math.random().toString(),
        sentAt: new Date().toISOString(),
      };
      addMessage(message);
      if (!socketInstance.current) return;
      socketInstance.current.emit(UseChatSocketKey.sendMessage, message);
    },
    [addMessage, user]
  );

  const newConversation = useCallback(async () => {
    if (!newConversationMutation.isPending) {
      await newConversationMutation.mutateAsync();
    }
  }, [newConversationMutation]);

  const flatMessages = messages?.pages.flatMap((page) => page.result) ?? [];

  return {
    ...state,
    isLoading,
    sendMessage,
    messages: flatMessages,
    conversation: currentConversation,
    newConversation,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
