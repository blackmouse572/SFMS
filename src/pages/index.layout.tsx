import { Skeleton } from '@components/Skeleton';
import { customErrorMap } from '@lib/zod';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';
z.setErrorMap(customErrorMap);

function IndexLayout() {
  return (
    <main>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" position="top" />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </main>
  );
}

const Loading = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center gap-4 max-w-sm mx-auto">
    <Skeleton className="w-full h-16" />
    <Skeleton className="w-1/2 h-8" />
    <Skeleton className="w-full h-8" />
    <Skeleton className="w-full h-8" />
  </div>
);

export default IndexLayout;
