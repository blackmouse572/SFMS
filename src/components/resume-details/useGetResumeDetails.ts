import { getResumeKey } from '@components/resume-list';
import axios from '@lib/axios';
import { IResponse, Resume } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

type Options = {
  enabled?: boolean;
};
export function useGetResumeDetails(id: string, option: Options = {}) {
  return useQuery({
    queryKey: getResumeKey.id(id),
    queryFn: () => axios.get<IResponse<Resume>>(`/resumes/${id}`).then((d) => d.data.data),
    ...option,
  });
}
