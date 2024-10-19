import AuthLayout from '@pages/(auth)/auth.layout';
import ForgotPage from '@pages/(auth)/forgot.index';
import LoginPage from '@pages/(auth)/login.index';
import RegisterPage from '@pages/(auth)/register.index';
import TuVanPage from '@pages/(content)/tu-van';
import ContentLayout from '@pages/(content)/layout';
import App from '@pages/index';
import IndexLayout from '@pages/index.layout';
import VerifyPage from '@pages/verify.index';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        element: <ContentLayout />,
        children: [
          {
            path: '/tu-van-du-hoc',
            element: <TuVanPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <LoginPage />,
            path: '/login',
          },
          {
            element: <RegisterPage />,
            path: '/register',
          },
          {
            element: <VerifyPage />,
            path: '/verify',
          },
          {
            element: <ForgotPage />,
            path: '/forgot-password',
          },
        ],
      },
    ],
  },
]);
