import { getAdvisoryKey } from '@components/advisory-list/constant';
import axios from '@lib/axios';
import { Advisory, IResponse } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

type Options = {
  enabled?: boolean;
};
export function useAdvisoryDetails(id: string, option: Options = {}) {
  return useQuery({
    queryKey: getAdvisoryKey.id(id),
    queryFn: () => axios.get<IResponse<Advisory>>(`/advisory/${id}`).then((d) => d.data.data),
    ...option,
  });
}
