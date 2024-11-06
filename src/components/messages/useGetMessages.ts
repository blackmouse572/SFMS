import { useUser } from '@lib/auth';
import axios from '@lib/axios';
import { IPagedResponse, Message } from '@lib/types';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export function useGetMessages(conversationId: string, filter?: Record<string, any>, options?: Record<string, any>) {
  const client = useQueryClient();
  const user = useUser();
  const addMessage = (message: Message) => {
    if (!user) return;
    client.setQueryData<InfiniteData<IPagedResponse<Message>['data'], number>>(['messages', filter, conversationId], (oldData) => {
      if (!oldData) return;
      const firstPage = oldData.pages[0];

      if (firstPage) {
        return {
          ...oldData,
          pages: [
            {
              ...firstPage,
              result: [message, ...firstPage.result],
            },
            ...oldData.pages.slice(1),
          ],
        };
      }

      return oldData;
    });
  };

  const query = useInfiniteQuery<IPagedResponse<Message>['data']>({
    queryKey: ['messages', filter, conversationId],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get<IPagedResponse<Message>>(`/chat/${conversationId}/messages`, {
        params: {
          current: pageParam,
          pageSize: 20,
          ...filter,
        },
      });

      return {
        ...res.data.data,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current >= lastPage.meta.pages) {
        return undefined;
      }
      return lastPage.meta.current + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta.current <= 1) return undefined;
      return firstPage.meta.current - 1;
    },

    ...options,
  });

  return {
    ...query,
    addMessage,
  };
}
