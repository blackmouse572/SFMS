import { UploadCVSchema } from '@components/upload-cv/UploadCVDialog';
import axios from '@lib/axios';
import { IResponse, PaymentLink } from '@lib/types';
import { useMutation } from '@tanstack/react-query';

export function useUploadCVProvider({ providerId }: { providerId: string }) {
  return useMutation({
    mutationFn: (data: UploadCVSchema) => {
      const formData = new FormData();
      formData.append('scholarProv', data.scholarship);
      formData.append('urlCV', data.urlCv);
      formData.append('provider', providerId);

      return axios
        .post<
          IResponse<{
            _id: string;
            createdAt: string;
            payment: PaymentLink;
          }>
        >('/resume-prov', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data.data);
    },
  });
}
