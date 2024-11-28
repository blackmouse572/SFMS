import { getSubscribersKey } from '@components/subscriber/constant';
import { SubcribeSchema } from '@components/subscriber/SubscribeDialog';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSubcribe() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({ isUpdate, payload }: { payload: SubcribeSchema; isUpdate: boolean }) => {
      if (isUpdate) {
        return axios.patch('/subscribers', payload).then((res) => res.data.data);
      }
      return axios.post('/subscribers', payload).then((res) => res.data.data);
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: getSubscribersKey.list(),
      });
    },
  });
}
