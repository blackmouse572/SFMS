import { getAdvisoryKey } from '@components/advisory-list/constant';
import axios from '@lib/axios';
import { Advisory } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateAdvisoryStatus() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: Pick<Advisory, 'status' | '_id'>) => axios.patch(`/advisory/${data._id}`, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getAdvisoryKey.list() });
    },
  });
}
