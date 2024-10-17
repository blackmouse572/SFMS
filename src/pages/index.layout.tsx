import { customErrorMap } from '@lib/zod';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { z } from 'zod';
z.setErrorMap(customErrorMap);
const queryClient = new QueryClient();

function IndexLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Outlet />
        <Toaster richColors position="bottom-left" duration={5000} />
      </main>
    </QueryClientProvider>
  );
}

export default IndexLayout;
