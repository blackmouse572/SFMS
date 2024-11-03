import { useUser } from '@lib/auth';
import axios from '@lib/axios';
import { IPagedResponse, Message } from '@lib/types';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export function useGetMessages(conversationId: string, filter?: Record<string, any>, options?: Record<string, any>) {
  const client = useQueryClient();
  const user = useUser();
  const addMessage = (message: Message) => {
    console.log('New message', message);
    if (!user) return;
    if (message.sender._id !== user._id) return;

    client.setQueryData<InfiniteData<IPagedResponse<Message>['data'], number>>(['messages', filter], (oldData) => {
      if (!oldData) return;
      const lastPage = oldData.pages[oldData.pages.length - 1];

      if (lastPage) {
        return {
          ...oldData,
          pages: [
            ...oldData.pages.slice(0, oldData.pages.length - 1),
            {
              ...lastPage,
              result: [message, ...lastPage.result],
            },
          ],
        };
      }

      return oldData;
    });
  };

  const query = useInfiniteQuery<IPagedResponse<Message>['data']>({
    queryKey: ['messages', filter],
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
        result: res.data.data.result.reverse(),
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
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),
    ...options,
  });

  return {
    ...query,
    addMessage,
  };
}
