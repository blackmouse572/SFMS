import { getStudyKey } from '@components/study-list/constant';
import { CreateStudySchema } from '@components/study-list/CreateStudyPanel';
import { useUploadBatchImages } from '@components/upload/useUploadBatchImages';
import axios from '@lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateStudy() {
  const client = useQueryClient();
  const { mutateAsync } = useUploadBatchImages();
  return useMutation({
    mutationFn: async (data: CreateStudySchema) => {
      const results = await mutateAsync(data.image);
      const images = results.map((result) => result.url);

      return axios.post('/study', {
        ...data,
        image: images,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getStudyKey.list() });
    },
  });
}
