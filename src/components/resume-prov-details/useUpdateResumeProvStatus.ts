import { UpdateResumeStatusSchema } from '@components/resume-details/ResumeUpdateStatusPanel';
import { getResumeProvKey } from '@components/resume-prov-list';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateResumeProvStatus() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<UpdateResumeStatusSchema, 'urlCv'>) => {
      return axios.patch(`/resume-prov/${data.id}`, data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getResumeProvKey.list() });
    },
  });
}
