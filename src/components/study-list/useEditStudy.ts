import { getStudyKey } from '@components/study-list/constant';
import { CreateStudySchema } from '@components/study-list/CreateStudyPanel';
import { useUploadBatchImages } from '@components/upload/useUploadBatchImages';
import axios from '@lib/axios';
import { Study } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditStudy() {
  const client = useQueryClient();
  const { mutateAsync } = useUploadBatchImages();
  return useMutation({
    mutationFn: async ({ data, old }: { data: CreateStudySchema; old: Study }) => {
      const diffImages = data.image.filter((image) => !old.image.includes(image.name));
      if (diffImages.length > 0) {
        const results = await mutateAsync(diffImages);
        const images = results.map((result) => result.url);

        return axios.patch(`/study/${data._id}`, {
          ...data,
          image: images,
        });
      }
      return axios.patch(`/study/${data._id}`, {
        ...data,
        image: old.image,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getStudyKey.list() });
    },
  });
}
