import axios from '@lib/axios';
import { useMutation } from '@tanstack/react-query';

export function useGetMail() {
  return useMutation({
    mutationFn: async () => {
      return axios.get('/mail').then((res) => res.data.data);
    },
  });
}
