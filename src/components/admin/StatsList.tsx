import { useGetAdminStatics } from '@components/admin/useGetAdminStatics';
import { Skeleton } from '@components/Skeleton';
import Card from '@components/tailus-ui/Card';
import { Caption, Text, Title } from '@components/tailus-ui/typography';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React, { PropsWithChildren, useMemo } from 'react';

function Layout(props: PropsWithChildren) {
  return (
    <Card className="w-full" variant="outlined">
      <Title as="h2" size="lg" weight="medium" className="mb-1">
        Thống kê
      </Title>
      <Text className="my-0" size="sm">
        Xem tổng quan về hệ thống
      </Text>
      <div className="mt-6 grid gap-6 divide-y grid-cols-2 sm:divide-x sm:divide-y-0 md:grid-cols-4">{props.children}</div>
    </Card>
  );
}

function Trend({ trend, value }: { trend: 'up' | 'down'; value: string }) {
  return trend === 'up' ? (
    <div className="flex items-center gap-1.5 [--body-text-color:theme(colors.success.600)] dark:[--body-text-color:theme(colors.success.400)]">
      <IconTrendingUp className="size-4 text-[--body-text-color]" />
      <Text size="sm" className="my-0">
        {value}
      </Text>
    </div>
  ) : (
    <div className="flex items-center gap-1.5 [--body-text-color:theme(colors.danger.600)] dark:[--body-text-color:theme(colors.danger.400)]">
      <IconTrendingDown className="size-4 text-[--body-text-color]" />
      <Text size="sm" className="my-0">
        {value}
      </Text>
    </div>
  );
}

type ItemProps = {
  title: string;
  value: string;
  description?: React.ReactNode;
};

function Item({ title, value, description }: ItemProps) {
  return (
    <div className="pt-6 sm:pl-6 sm:pt-0">
      <Caption as="span">{title}</Caption>
      <div className="mt-2 flex items-center justify-between gap-3">
        <Title as="span">{value}</Title>
        {description}
      </div>
    </div>
  );
}

function StatsList() {
  const { isLoading, data } = useGetAdminStatics();
  
  const totalTransactionTrend = useMemo<{ trend: 'up' | 'down'; value: string }>(() => {
    if (!data || !data.transactions || !data.transactions.thisMonth || !data.transactions.lastMonth) {
      return {
        trend: 'up',
        value: '0%',
      };
    }
    
    const current = data.transactions.thisMonth[0]?.total || 0;
    // Safely access lastMonth data
    const last = data.transactions.lastMonth[0]?.total || 0;
    
    if (last === 0) {
      return {
        trend: current > 0 ? 'up' : 'down',
        value: current > 0 ? '100%' : '0%',
      };
    }
    
    const diff = ((current - last) / last) * 100;
    return {
      trend: diff >= 0 ? 'up' : 'down',
      value: `${Math.abs(diff).toFixed(2)}%`,
    };
  }, [data]);

  // Calculate completion rate safely
  const getCompletionRate = () => {
    if (!data || !data.resumes) return '0%';
    
    const completed = data.resumes.completed || 0;
    const pending = data.resumes.pending || 0;
    
    if (completed === 0) return '0%';
    
    return ((pending / completed) * 100).toFixed(2) + '%';
  };

  if (isLoading) {
    return (
      <Layout>
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </Layout>
    );
  }

  return (
    <Layout>
      <Item 
        title="Tổng số hồ sơ" 
        value={(data?.resumes?.total || 0).toString()} 
      />
      <Item
        title="Tỷ lệ hồ sơ thành công"
        value={`${data?.resumes?.completed || 0} / ${data?.resumes?.pending || 0}`}
        description={<Trend trend={totalTransactionTrend.trend} value={getCompletionRate()} />}
      />
      <Item 
        title="Tổng số tiền giao dịch" 
        value={(data?.transactions?.total?.[0]?.total || 0).toString()} 
        description={<Caption>VND</Caption>} 
      />
      <Item
        title="Giao dịch tháng này"
        value={(data?.transactions?.thisMonth?.[0]?.total || 0).toString()}
        description={<Trend trend={totalTransactionTrend.trend} value={totalTransactionTrend.value} />}
      />
    </Layout>
  );
}

export default StatsList;
