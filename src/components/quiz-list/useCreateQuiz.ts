import { getQuizKey } from '@components/quiz-list/constant';
import { CreateQuizSchema } from '@components/quiz-list/CreateQuizPanel';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateQuiz() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuizSchema) => {
      return axios.post('/quiz', {
        ...data,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getQuizKey.list() });
    },
  });
}
