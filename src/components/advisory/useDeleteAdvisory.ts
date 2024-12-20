import { getAdvisoryKey } from '@components/advisory-list/constant';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteAdvisory() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (data: string) => axios.delete(`/advisory/${data}`),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: getAdvisoryKey.list(),
      });
    },
  });
}
