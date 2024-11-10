import { getStudyKey } from '@components/study-list/constant';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteStudy() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/study/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getStudyKey.list({}) });
    },
  });
}
