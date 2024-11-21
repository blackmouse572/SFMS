import { getScholarShipKey } from '@components/schoolar-list/constant';
import axios from '@lib/axios';
import { CrawData, IPagedRequest, IPagedResponse } from '@lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import queryString from 'query-string';

const initialRequest: IPagedRequest = {
  current: 1,
  pageSize: 30,
};
type UseGetProps = {
  filter?: Record<string, any>;
  request?: IPagedRequest;
};
export function useGetCrawData(props: UseGetProps) {
  const { filter, request } = props;
  return useInfiniteQuery<IPagedResponse<CrawData>>({
    queryKey: getScholarShipKey.list(filter),
    queryFn: ({ pageParam }) => {
      const paramsObj = {
        ...initialRequest,
        current: pageParam,
        title: filter?.name ? new RegExp(filter.name) : undefined,
        href: filter?.href ? new RegExp(filter.href) : undefined,
      };
      const qs = queryString.stringify(paramsObj, {
        skipEmptyString: true,
      });
      return axios.get<IPagedResponse<CrawData>>(`/crawler/scholarship?${qs}`).then((d) => d.data);
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
