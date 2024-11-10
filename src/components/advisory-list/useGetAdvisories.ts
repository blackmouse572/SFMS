import { getAdvisoryKey } from '@components/advisory-list/constant';
import axios from '@lib/axios';
import { Advisory, IPagedResponse } from '@lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import queryString from 'query-string';

type UseGetAdvisoriesProps = {
  filter?: Record<string, any>;
};
export function useGetAdvisories(props: UseGetAdvisoriesProps) {
  const { filter } = props;
  return useInfiniteQuery<IPagedResponse<Advisory>>({
    queryKey: getAdvisoryKey.list(filter),
    queryFn: ({ pageParam }) => {
      const paramsObj = {
        current: pageParam,
        value: filter?.value && new RegExp(filter.value, 'i'),
        level: filter?.level && new RegExp(filter.level, 'i'),
        location: filter?.location && new RegExp(filter.location, 'i'),
        continent: filter?.continent && new RegExp(filter.continent, 'i'),
        status: filter?.status && new RegExp(filter.status, 'i'),
      };
      const qs = queryString.stringify(paramsObj, {
        skipEmptyString: true,
      });
      return axios.get<IPagedResponse<Advisory>>(`/advisory?${qs}`).then((d) => d.data);
    },
    initialPageParam: 1,
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
