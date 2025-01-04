import axios from '@lib/axios';

export function getProviderById(id: string) {
  return axios.get(`/providers/${id}`).then((res) => res.data);
}
