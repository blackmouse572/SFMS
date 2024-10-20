import AdminLayout from '@pages/(admin)/admin.layout';
import AdminScholarship from '@pages/(admin)/scholarship.index';
import NotAuthLayout from '@pages/(auth)/auth.layout';
import ForgotPage from '@pages/(auth)/forgot.index';
import LoginPage from '@pages/(auth)/login.index';
import RegisterPage from '@pages/(auth)/register.index';
import HocBongPage from '@pages/(content)/hoc-bong';
import SchoolarshipDetails from '@pages/(content)/hoc-bong/[id].index';
import ContentLayout from '@pages/(content)/layout';
import TuVanPage from '@pages/(content)/tu-van';
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
          {
            path: '/hoc-bong',
            children: [
              {
                index: true,
                element: <HocBongPage />,
              },
              {
                path: '/hoc-bong/:id',
                element: <SchoolarshipDetails />,
              },
            ],
          },
        ],
      },
      {
        element: <NotAuthLayout />,
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
      {
        element: <AdminLayout />,
        path: '/admin',
        children: [
          {
            element: <AdminScholarship />,
            path: '/admin/scholarship',
          },
        ],
      },
    ],
  },
]);
