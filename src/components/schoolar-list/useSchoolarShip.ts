import { Filter } from '@components/schoolar-list/ScholarshipTableFilter';
import axios from '@lib/axios';
import { IPagedRequest, IPagedResponse, SchoolarShip } from '@lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const initialRequest: IPagedRequest = {
  current: 1,
  pageSize: 30,
};
type UseGetSchoolarShip = {
  filter?: Filter;
};
export function useGetSchoolarShip(props: UseGetSchoolarShip) {
  const { filter } = props;
  return useInfiniteQuery<IPagedResponse<SchoolarShip>>({
    queryKey: ['schoolar-ship', filter],
    queryFn: ({ pageParam }) =>
      axios
        .get<IPagedResponse<SchoolarShip>>('/scholarship', {
          params: {
            ...initialRequest,
            current: pageParam,
            name: filter?.name && new RegExp(filter.name),
            type: filter?.type && new RegExp(filter.type),
            subject: filter?.subject && new RegExp(filter.subject),
            level: filter?.level && new RegExp(filter.level),
          },
        })
        .then((d) => d.data),
    initialPageParam: initialRequest.current,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.meta.current >= lastPage.data.meta.pages) return undefined;
      return lastPage.data.meta.current + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.data.meta.current <= 1) return undefined;
      return firstPage.data.meta.current - 1;
    },
  });
}
