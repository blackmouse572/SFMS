import { getConversationKey } from '@components/messages-list/useGetConversations';
import axios from '@lib/axios';
import { Conversation } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateChatStatus(conversationId: string) {
  const queryClient = useQueryClient();
  const updateChatStatus = useMutation({
    mutationFn: async (status: Pick<Conversation, 'status'>) => {
      return axios.put(`/chat/${conversationId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getConversationKey.list });
      queryClient.invalidateQueries({ queryKey: ['messages', {}, conversationId] });
    },
  });
  return updateChatStatus;
}
