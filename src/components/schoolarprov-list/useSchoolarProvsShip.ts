import { getScholarProvShipKey } from '@components/schoolarprov-list/constant';
import axios from '@lib/axios';
import { IPagedRequest, IPagedResponse, SchoolarShip } from '@lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import queryString from 'query-string';

const initialRequest: IPagedRequest = {
  current: 1,
  pageSize: 30,
};
type UseGetSchoolarShip = {
  filter?: Record<string, any>;
  request?: IPagedRequest;
};
export function useSchoolarProvsShip(props: UseGetSchoolarShip) {
  const { filter, request } = props;
  return useInfiniteQuery<IPagedResponse<SchoolarShip>>({
    queryKey: getScholarProvShipKey.list(filter),
    queryFn: ({ pageParam }) => {
      const paramsObj = {
        ...initialRequest,
        current: pageParam,
        name: filter?.name && new RegExp(filter.name, 'i'),
        level: filter?.level && new RegExp(filter.level, 'i'),
        location: filter?.location && new RegExp(filter.location, 'i'),
        continent: filter?.continent && new RegExp(filter.continent, 'i'),
        provider: filter?.provider,
        value: filter?.value && new RegExp(filter.value, 'i'),
        'GPA<': filter?.gpa && filter.gpa,
        'ielts<': filter?.ielts && filter.ielts,
        'pay<': filter?.pay && filter.pay,
      };
      const qs = queryString.stringify(paramsObj, {
        skipEmptyString: true,
      });
      return axios.get<IPagedResponse<SchoolarShip>>(`/scholar-prov?${qs}`).then((d) => d.data);
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
