import axios from '@lib/axios';
import { IResponse, User } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useGetUserInfor() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => axios.get<IResponse<User>>('/users/update').then((res) => res.data.data),
  });
}
