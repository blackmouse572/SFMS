import { getScholarShipKey } from '@components/schoolar-list/constant';
import { getScholarProvShipKey } from '@components/schoolarprov-list/constant';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteScholarProvship() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/scholar-prov/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getScholarProvShipKey.list() });
    },
  });
}
