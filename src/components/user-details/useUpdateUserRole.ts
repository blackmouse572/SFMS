import { getUserKey } from '@components/user-list';
import axios from '@lib/axios';
import { User } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user, role }: { user: User; role: string }) => {
      return axios.patch(`/users`, {
        ...user,
        role,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserKey.list(),
      });
    },
  });
}
