import { CreateScholarSchema } from '@components/schoolar-list/CreateScholarPanel';
import { getScholarProvShipKey } from '@components/schoolarprov-list/constant';
import { useUploadBatchImages } from '@components/upload/useUploadBatchImages';
import { useUser } from '@lib/auth';
import axios from '@lib/axios';
import { SchoolarShip } from '@lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditScholarProvShip() {
  const client = useQueryClient();
  const user = useUser();
  const { mutateAsync } = useUploadBatchImages();
  return useMutation({
    mutationFn: async ({ data }: { data: CreateScholarSchema; old: SchoolarShip }) => {
      const imagesToUpload = data.image.filter((i) => i instanceof File);
      const images = data.image.filter((i) => !(i instanceof File));
      if (imagesToUpload.length > 0) {
        const res = await mutateAsync(imagesToUpload);
        images.push(...res.map((r) => r.url));
      }

      return axios.patch(`/scholar-prov/${data._id}`, {
        ...data,
        provider: user?._id,
        image: images,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: getScholarProvShipKey.list() });
    },
  });
}
