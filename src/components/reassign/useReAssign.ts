import { getResumeKey } from '@components/resume-list';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const ReassignSchema = z.object({
  staff: z.string().nonempty(),
  id: z.string().nonempty(),
});
export type ReassignSchema = z.infer<typeof ReassignSchema>;
export function useReassign(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReassignSchema) => {
      return axios.patch(`/resumes/${id}/staff`, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getResumeKey.list(),
      });
    },
  });
}
