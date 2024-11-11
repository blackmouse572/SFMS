import { getQuizKey } from '@components/quiz-list/constant';
import { CreateQuizSchema } from '@components/quiz-list/CreateQuizPanel';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditQuiz() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuizSchema) => {
      return axios.patch(`/quiz/${data._id}`, {
        ...data,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getQuizKey.list() });
    },
  });
}
