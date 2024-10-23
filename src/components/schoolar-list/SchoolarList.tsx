import { useGetSchoolarShip } from '@components/schoolar-list/useSchoolarShip';
import { Skeleton } from '@components/Skeleton';
import Badge from '@components/tailus-ui/Badge';
import Card from '@components/tailus-ui/Card';
import { Text } from '@components/tailus-ui/typography';
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>;
};

type SchoolarListProps = {
  name?: string;
};
function SchoolarShipsList({ name }: SchoolarListProps) {
  const { isLoading, data } = useGetSchoolarShip({
    filter: {
      name,
    },
  });

  if (isLoading) {
    return (
      <Layout>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/2" />
            </Card>
          ))}
      </Layout>
    );
  }

  if (data?.pages.length === 0) return <div>No data</div>;

  return (
    <Layout>
      {data?.pages.map((p) =>
        p.data.result.map((s) => (
          <Link to={`/hoc-bong/${s._id}`} key={s._id}>
            <Card variant="outlined" className="cursor-default space-y-2">
              <Text size="lg" weight={'bold'}>
                {s.name}
              </Text>
              <Badge variant="soft">{s.location}</Badge>
            </Card>
          </Link>
        ))
      )}
    </Layout>
  );
}

export { SchoolarShipsList };
