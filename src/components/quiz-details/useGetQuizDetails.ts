import { getQuizKey } from '@components/quiz-list/constant';
import axios from '@lib/axios';
import { IResponse, Quiz } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

type Options = {
  enabled?: boolean;
};
export function useGetQuizDetails(id: string, option: Options = {}) {
  return useQuery({
    queryKey: getQuizKey.detail(id),
    queryFn: () => axios.get<IResponse<Quiz>>(`/quiz/${id}`).then((d) => d.data.data),
    ...option,
  });
}
