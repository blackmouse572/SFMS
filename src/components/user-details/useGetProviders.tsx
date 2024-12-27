import axios from '@lib/axios';
import { IResponse } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useGetProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: () => axios.get<IResponse<{ _id: string; name: string }[]>>('/providers/all-names').then((res) => res.data.data),
  });
}
