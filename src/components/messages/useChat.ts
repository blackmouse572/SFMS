import { useGetCurrentConversation } from '@components/messages/useGetCurrentConversation';
import { useGetMessages } from '@components/messages/useGetMessages';
import { useNewConversation } from '@components/messages/useNewConversation';
import { useToken, useUser } from '@lib/auth';
import { Conversation, Message, MessagePayload } from '@lib/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
      enabled: !!currentConversation,
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

  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  const reconnect = useCallback(
    (conversation?: Conversation) => {
      if (!socketInstance) return;
      socketInstance.disconnect();

      const newSocket = io(import.meta.env.VITE_API_URL as string, {
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
          roomId: conversation?._id ?? currentConversation?._id,
        },
      });

      setSocketInstance(newSocket);
    },
    [currentConversation?._id, socketInstance, token]
  );

  const newConversationMutation = useNewConversation({
    key: UseChatSocketKey.newConversation,
    socket: socketInstance,
    onSuccess: (conversation) => {
      reconnect(conversation);
    },
  });

  useEffect(() => {
    if (!token) return;
    let socket = socketInstance;
    if (!socket || currentConversation?._id) {
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
          roomId: currentConversation?._id,
        },
      });
      setSocketInstance(socket);
    }

    socket.on('connect', () => {
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
        setSocketInstance(null);
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentConversation]);

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

  const newConversation = useCallback(async () => {
    if (!newConversationMutation.isPending) {
      toast.promise(newConversationMutation.mutateAsync(), {
        loading: 'Đang tìm tư vấn viên...',
        error: (e) => e,
      });
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
    isGettingNewConversation: newConversationMutation.isPending,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
