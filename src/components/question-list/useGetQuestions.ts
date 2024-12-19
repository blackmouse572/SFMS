import { Filter } from '@components/question-list/QuestionTableFilter';
import { getStudyKey } from '@components/study-list/constant';
import axios from '@lib/axios';
import { IPagedRequest, IPagedResponse, Question } from '@lib/types';
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
export function useGetQuestion(props: UseGet) {
  const { filter, request } = props;
  return useInfiniteQuery<IPagedResponse<Question>>({
    queryKey: getStudyKey.list(filter ?? {}),
    queryFn: ({ pageParam }) => {
      const paramsObj = {
        ...initialRequest,
        current: pageParam,
        question: filter?.question && new RegExp(filter.question, 'i'),
        answer: filter?.answer && new RegExp(filter.answer, 'i'),
        quiz: filter?.quiz,
      };
      const qs = queryString.stringify(paramsObj, {
        skipEmptyString: true,
      });
      return axios.get<IPagedResponse<Question>>(`/question?${qs}`).then((d) => d.data);
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
