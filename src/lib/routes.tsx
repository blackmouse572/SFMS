import AdminLayout from '@pages/(admin)/admin.layout';
import NotAuthLayout from '@pages/(auth)/auth.layout';
import ForgotPage from '@pages/(auth)/forgot.index';
import LoginPage from '@pages/(auth)/login.index';
import RegisterPage from '@pages/(auth)/register.index';
import ContentLayout from '@pages/(content)/layout';
import IndexLayout from '@pages/index.layout';
import VerifyPage from '@pages/verify.index';
import { lazy } from 'react';
import { createBrowserRouter, defer } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      {
        index: true,
        Component: lazy(() => import('@pages/index')),
      },
      {
        element: <ContentLayout />,
        children: [
          {
            Component: lazy(() => import('@pages/(profile)/layout')),
            path: '/profile',
            children: [
              {
                Component: lazy(() => import('@pages/(profile)/profile.index')),
                index: true,
              },
              {
                path: '/profile/cv',
                Component: lazy(() => import('@pages/(profile)/cv.profile.index')),
              },
              {
                path: '/profile/cv-prov',
                Component: lazy(() => import('@pages/(profile)/cv-prov.index')),
              },
            ],
          },
          {
            path: '/tu-van-du-hoc',
            Component: lazy(() => import('@pages/(content)/tu-van')),
          },
          {
            path: '/hoc-bong',
            children: [
              {
                index: true,
                Component: lazy(() => import('@pages/(content)/hoc-bong')),
              },
              {
                path: '/hoc-bong/:id',
                loader: async ({ params }) => {
                  const id = params.id;
                  const { getScholarshipDetails, getRelatedScholarships } = await import('@pages/(content)/hoc-bong/[id].loader');
                  const scholarship = await getScholarshipDetails(id);
                  const { major, level, continent } = scholarship;
                  const majorRelated = getRelatedScholarships({ major });
                  const levelRelated = getRelatedScholarships({ level });
                  const continentRelated = getRelatedScholarships({ continent });

                  return defer({
                    data: scholarship,
                    related: [majorRelated, levelRelated, continentRelated],
                  });
                },
                Component: lazy(() => import('@pages/(content)/hoc-bong/[id].index')),
              },
              {
                path: '/hoc-bong/:id/apply',
                Component: lazy(() => import('@pages/(content)/hoc-bong/apply.[id].index')),
                loader: async ({ params }) => {
                  const id = params.id;
                  const { getScholarshipDetails } = await import('@pages/(content)/hoc-bong/[id].loader');
                  return getScholarshipDetails(id);
                },
              },
            ],
          },
          {
            path: '/kiem-tra',
            children: [
              {
                Component: lazy(() => import('@pages/(content)/kiem-tra')),
                index: true,
              },
              {
                Component: lazy(() => import('@pages/(content)/kiem-tra/[id].index')),
                loader: async ({ params }) => {
                  const id = params.id;
                  if (!id) return null;
                  const { getQuizDetails } = await import('@pages/(content)/kiem-tra/[id].loader');
                  return getQuizDetails(id);
                },
                path: '/kiem-tra/:id',
              },
            ],
          },
          {
            path: '/du-hoc',
            children: [
              {
                index: true,
                Component: lazy(() => import('@pages/(content)/du-hoc')),
              },
              {
                path: '/du-hoc/:id',
                loader: async ({ params }) => {
                  const id = params.id;
                  const { getRelatedStudies, getStudyDetails } = await import('@pages/(content)/du-hoc/[id].loader');
                  const scholarship = await getStudyDetails(id);
                  const { continent, location } = scholarship;
                  const majorRelated = getRelatedStudies({ continent });
                  const levelRelated = getRelatedStudies({ location });
                  const continentRelated = getRelatedStudies({ continent });

                  return defer({
                    data: scholarship,
                    related: [majorRelated, levelRelated, continentRelated],
                  });
                },
                Component: lazy(() => import('@pages/(content)/du-hoc/[id].index')),
              },
            ],
          },
          {
            path: '/nha-cung-cap',
            children: [
              {
                index: true,
                Component: lazy(() => import('@pages/(content)/nha-cung-cap')),
              },
              {
                path: '/nha-cung-cap/:id',
                loader: async ({ params }) => {
                  const id = params.id;
                  const { getProviderById } = await import('@pages/(content)/nha-cung-cap/[id].loader');
                  return getProviderById(id!);
                },
                Component: lazy(() => import('@pages/(content)/nha-cung-cap/[id].index')),
              },
              {
                path: '/nha-cung-cap/:id/hoc-bong',
                loader: async ({ params }) => {
                  const id = params.id;
                  const { getProviderById } = await import('@pages/(content)/nha-cung-cap/[id].loader');
                  return getProviderById(id!);
                },
                Component: lazy(() => import('@pages/(content)/nha-cung-cap/scholarship.[id].index')),
              },
              {
                path: '/nha-cung-cap/:id/hoc-bong/:scholarshipId',
                loader: async ({ params }) => {
                  const id = params.id;
                  const scholarshipId = params.scholarshipId;
                  const [{ getProviderById }, { getScholarshipProvById }, { getScholarProvRelatedScholarships }] = await Promise.all([
                    import('@pages/(content)/nha-cung-cap/[id].loader'),
                    import('@pages/(content)/nha-cung-cap/scholarship.[id].loader'),
                    import('@pages/(content)/nha-cung-cap/[id].scholarship.[id].loader'),
                  ] as const);

                  const [provider, scholarship] = await Promise.all([getProviderById(id!), getScholarshipProvById(scholarshipId!)]);

                  const { major, level } = scholarship;
                  const majorRelated = getScholarProvRelatedScholarships({ major });
                  const levelRelated = getScholarProvRelatedScholarships({ level });
                  const providerRelated = getScholarProvRelatedScholarships({ provider: provider._id });

                  return defer({
                    provider,
                    data: scholarship,
                    related: [majorRelated, levelRelated, providerRelated],
                  });
                },
                Component: lazy(() => import('@pages/(content)/nha-cung-cap/[id].scholarship.[id].index')),
              },
              {
                path: '/nha-cung-cap/:id/hoc-bong/:scholarshipId/apply',
                Component: lazy(() => import('@pages/(content)/nha-cung-cap/apply.[id].scholarship.[id].index')),
                loader: async ({ params }) => {
                  const id = params.scholarshipId;
                  const { getScholarshipProvById } = await import('@pages/(content)/nha-cung-cap/scholarship.[id].loader');

                  return getScholarshipProvById(id!);
                },
              },
            ],
          },
          {
            path: '/payment',
            children: [
              {
                path: '/payment/success',
                Component: lazy(() => import('@pages/(content)/(payment)/success.index')),
              },
              {
                path: '/payment/cancel',
                Component: lazy(() => import('@pages/(content)/(payment)/cancel.index')),
              },
            ],
          },
          {
            path: '/news',
            children: [
              {
                path: '/news/:id',
                loader: async ({ params }) => {
                  const id = params.id;
                  const { loader } = await import('@pages/news.[id].index');
                  if (!loader || !id) return null;
                  return loader({ params: { id } });
                },
                Component: lazy(() => import('@pages/news.[id].index')),
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
            Component: lazy(() => import('@pages/(admin)/index')),
            index: true,
          },
          {
            Component: lazy(() => import('@pages/(admin)/scholarship.index')),
            path: '/admin/scholarship',
          },
          {
            Component: lazy(() => import('@pages/(admin)/users.index')),
            path: '/admin/users',
          },
          {
            Component: lazy(() => import('@pages/(admin)/resume.index')),
            path: '/admin/resume',
          },
          {
            Component: lazy(() => import('@pages/(admin)/chat.index')),
            path: '/admin/chat',
          },
          {
            Component: lazy(() => import('@pages/(admin)/advisory.index')),
            path: '/admin/advisory',
          },
          {
            Component: lazy(() => import('@pages/(admin)/study.index')),
            path: '/admin/study',
          },
          {
            Component: lazy(() => import('@pages/(admin)/crawler.index')),
            path: '/admin/crawler',
          },
          {
            Component: lazy(() => import('@pages/(admin)/provider.index')),
            path: '/admin/providers',
          },
          {
            path: '/admin/quiz',
            children: [
              {
                Component: lazy(() => import('@pages/(admin)/quiz.index')),
                index: true,
              },
              {
                Component: lazy(() => import('@pages/(admin)/edit.quiz.index')),
                path: '/admin/quiz/edit/:id',
                loader: async ({ params }) => {
                  const id = params.id;
                  const { loader } = await import('@pages/(admin)/edit.quiz.index');
                  return loader(id ?? '');
                },
              },
              {
                Component: lazy(() => import('@pages/(admin)/add.quiz.index')),
                path: '/admin/quiz/add',
              },
            ],
          },
          {
            Component: lazy(() => import('@pages/(admin)/question.index')),
            path: '/admin/question',
          },
          {
            path: '/admin/provider',
            children: [
              {
                Component: lazy(() => import('@pages/(admin)/(provider)/scholar-prov.index')),
                path: '/admin/provider/scholarship',
              },
              {
                Component: lazy(() => import('@pages/(admin)/(provider)/resume-prov.index')),
                path: '/admin/provider/resume',
              },
            ],
          },
        ],
      },
    ],
  },
]);
