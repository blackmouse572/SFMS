import { ChatPopover } from '@components/messages/ChatPopover';
import { useIsAuthenticated } from '@lib/auth';
import { customErrorMap } from '@lib/zod';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';
z.setErrorMap(customErrorMap);

function IndexLayout() {
  const isAuth = useIsAuthenticated();
  return (
    <main>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" position="top" />
      <Outlet />
    </main>
  );
}

export default IndexLayout;
