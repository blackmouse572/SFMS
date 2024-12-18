import axios from '@lib/axios';
import { IResponse } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useGetRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => axios.get<IResponse<{ id: string; name: string }[]>>('/roles/all-role').then((res) => res.data.data),
  });
}
