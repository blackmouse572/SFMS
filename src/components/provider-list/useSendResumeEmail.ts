import { SendEmailSchema } from '@components/provider-list/SendEmailPanel';
import { useUser } from '@lib/auth';
import axios from '@lib/axios';
import { useMutation } from '@tanstack/react-query';

export function useSendEmail() {
  const user = useUser();
  return useMutation({
    mutationFn: async (data: SendEmailSchema) => {
      return axios.post('/resume-prov/excel', undefined, {
        params: {
          populate: 'scholarProv,userId,provider',
          fields: 'scholarProv.name,userId.phone,provider.name',
          status: data.status,
          provider: user?.provider,
          'updatedAt>': data.startDate,
          'updatedAt<': data.endDate,
        },
      });
    },
  });
}