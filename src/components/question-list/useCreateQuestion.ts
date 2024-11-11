import { getQuestionKey } from '@components/question-list/constant';
import { CreateQuestionSchema } from '@components/question-list/CreateQuestionPanel';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateQuestion() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuestionSchema) => {
      return axios.post('/question', {
        ...data,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getQuestionKey.list() });
    },
  });
}
