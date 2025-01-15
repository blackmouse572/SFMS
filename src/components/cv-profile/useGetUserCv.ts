import { getResumeKey } from '@components/resume-list';
import { getResumeProvKey } from '@components/resume-prov-list';
import axios from '@lib/axios';
import { IResponse, Resume, ResumeProv } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useGetUserCv() {
  return useQuery({
    queryKey: [getResumeKey.list()],
    queryFn: () => axios.post<IResponse<Resume[]>>('/resumes/by-user').then((res) => res.data),
  });
}
export function useGetUserCvProv() {
  return useQuery({
    queryKey: [getResumeProvKey.list()],
    queryFn: () => axios.post<IResponse<ResumeProv[]>>('/resume-prov/by-user').then((res) => res.data),
  });
}
