import { getQuizKey } from '@components/quiz-list/constant';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteQuiz() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axios.delete(`/quiz/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getQuizKey.list({}) });
    },
  });
}
