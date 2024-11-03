import { Conversation } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Socket } from 'socket.io-client';
type UseNewConversationProps = {
  socket: Socket | null;
  key: string;
  onSuccess?: (newConversation: Conversation) => void;
};
export function useNewConversation({ socket, key, onSuccess }: UseNewConversationProps) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return new Promise<Conversation | undefined>((resolve, reject) => {
        if (!socket?.connected) {
          return reject('Socket is not connected');
        }

        socket.emitWithAck(key, {}).then((result: any) => {
          if (result && result.status === 200) {
            resolve(result.data);
          }
          if (result && result.status === 404) {
            return reject('No conversation found');
          }
          reject('Error while creating new conversation');
        });
      });
    },
    onSuccess: (data) => {
      if (data) {
        client.invalidateQueries({
          queryKey: ['conversations'],
        });
        onSuccess?.(data);
      }
    },
  });
}
