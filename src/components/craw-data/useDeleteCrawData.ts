import { getScholarShipKey } from '@components/schoolar-list/constant';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteCrawData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/crawler/scholarship/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getScholarShipKey.list(),
      });
    },
  });
}
