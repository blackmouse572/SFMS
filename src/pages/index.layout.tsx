import { OpenProvider } from '@components/messages/useOpenProvider';
import { Skeleton } from '@components/Skeleton';
import { customErrorMap } from '@lib/zod';
import { QueryClient } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';
z.setErrorMap(customErrorMap);
const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

function IndexLayout() {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);
  return (
    <main>
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
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
