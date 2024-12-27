import { getUserKey } from '@components/user-list';
import axios from '@lib/axios';
import { User } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user, role, provider }: { user: User; role: string; provider?: string }) => {
      return axios.patch(`/users/${user._id}`, {
        ...user,
        role,
        provider,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserKey.list(),
      });
    },
  });
}
