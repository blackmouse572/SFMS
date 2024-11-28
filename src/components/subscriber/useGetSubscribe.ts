import { getSubscribersKey } from '@components/subscriber/constant';
import { SubcribeSchema } from '@components/subscriber/SubscribeDialog';
import axios from '@lib/axios';
import { IResponse } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useGetSubscribe() {
  return useQuery({
    queryKey: getSubscribersKey.list(),
    queryFn: async () => axios.post<IResponse<SubcribeSchema>>('/subscribers/subject').then((res) => res.data.data),
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
