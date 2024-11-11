import { getQuestionKey } from '@components/question-list/constant';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteQuestion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/question/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getQuestionKey.list({}) });
    },
  });
}
