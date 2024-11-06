import axios from '@lib/axios';
import { Conversation, IPagedRequest, IPagedResponse } from '@lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import queryString from 'query-string';

const initialRequest: IPagedRequest = {
  current: 1,
  pageSize: 30,
};
type useGetConversation = {
  filter?: Record<string, any>;
  request?: IPagedRequest;
};

export const getConversationKey = {
  list: ['conversations'],
  id: (id: string) => ['conversations', id],
};

export function useGetConversation(porps: useGetConversation) {
  const { request } = porps;

  return useInfiniteQuery<IPagedResponse<Conversation>>({
    queryKey: getConversationKey.list,
    queryFn: ({ pageParam }) => {
      const paramsObj = {
        ...initialRequest,
        current: pageParam,
      };
      const qs = queryString.stringify(paramsObj, {
        skipEmptyString: true,
      });
      return axios.get<IPagedResponse<Conversation>>(`/chat?${qs}`).then((d) => d.data);
    },
    initialPageParam: request ?? initialRequest.current,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.meta.current >= lastPage.data.meta.pages) {
        return undefined;
      }
      return lastPage.data.meta.current + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.meta.current <= 1) return undefined;
      return firstPage.data.meta.current - 1;
    },
  });
}
