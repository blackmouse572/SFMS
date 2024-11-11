import { Filter } from '@components/quiz-list/QuizTableFilter';
import { getStudyKey } from '@components/study-list/constant';
import axios from '@lib/axios';
import { IPagedRequest, IPagedResponse, Quiz } from '@lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import queryString from 'query-string';

const initialRequest: IPagedRequest = {
  current: 1,
  pageSize: 30,
};
type UseGet = {
  filter?: Filter;
  request?: IPagedRequest;
};
export function useGetQuizzes(props: UseGet) {
  const { filter, request } = props;
  return useInfiniteQuery<IPagedResponse<Quiz>>({
    queryKey: getStudyKey.list(filter ?? {}),
    queryFn: ({ pageParam }) => {
      const paramsObj = {
        ...initialRequest,
        current: pageParam,
        type: filter?.type && new RegExp(filter.type, 'i'),
      };
      const qs = queryString.stringify(paramsObj, {
        skipEmptyString: true,
      });
      return axios.get<IPagedResponse<Quiz>>(`/quiz?${qs}`).then((d) => d.data);
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
