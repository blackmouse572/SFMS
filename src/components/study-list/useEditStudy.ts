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
    mutationFn: async ({ data }: { data: CreateStudySchema; old: Study }) => {
      const imagesToUpload = data.image.filter((i) => i instanceof File);
      const images = data.image.filter((i) => !(i instanceof File));
      if (imagesToUpload.length > 0) {
        const res = await mutateAsync(imagesToUpload);
        images.push(...res.map((r) => r.url));
      }
      return axios.patch(`/study/${data._id}`, {
        ...data,
        image: images,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getStudyKey.list() });
    },
  });
}
