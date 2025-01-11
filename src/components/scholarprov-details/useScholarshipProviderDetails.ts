import axios from '@lib/axios';
import { SchoolarShip } from '@lib/types';
import { useQuery } from '@tanstack/react-query';

export function useScholarshipProviderDetails({ id }: { id: string }) {
  return useQuery<SchoolarShip>({
    queryKey: ['scholarship-details-privder', id],
    queryFn: () => axios.get<SchoolarShip>(`/scholar-prov/${id}`).then((d) => d.data),
  });
}
