import { useScholarshipDetails } from '@components/schoolar-details/useScholarshipDetails';
import { useParams } from 'react-router-dom';

function SchoolarshipDetails() {
  const { id } = useParams();
  if (!id) throw new Error('id is required');
  const { data, isLoading } = useScholarshipDetails({ id });

  if (isLoading) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default SchoolarshipDetails;
