import axios from '@lib/axios';
import { Conversation, IPagedResponse } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useGetCurrentConversation() {
  return useQuery<Conversation | undefined>({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await axios.get<IPagedResponse<Conversation>>('/chat', {
        params: {
          current: 1,
          pageSize: 1,
        },
      });
      const conversation = res.data.data.result[0];

      // If latest conversation is not active, return undefined as no conversation is active
      if (conversation.status === false) {
        return undefined;
      }
      return conversation;
    },
  });
}
