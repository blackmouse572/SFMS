import App from '@pages/index';
import IndexLayout from '@pages/index.layout';
import LoginPage from '@pages/login.index';
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
        element: <LoginPage />,
        path: '/login',
      },
    ],
  },
]);
