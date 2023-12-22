import { ReactNode } from 'react';
import RootPage from './pages/RootPage';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundaryPage from './pages/ErrorBoundaryPage';

interface RoutesProps {
  path: string;
  element: ReactNode;
  redirectPath?: string;
  errorElement?: ReactNode;
  children: { path: string; element: ReactNode }[];
}

const routes: RoutesProps[] = [
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'error-boundary',
        element: <ErrorBoundaryPage />,
      },
    ],
  },
];

const router = createBrowserRouter(
  routes.map((route) => {
    const childrenRoutes = route.children?.map((childRoute) => ({
      path: childRoute.path,
      element: childRoute.element,
      errorElement: <NotFound />,
    }));

    return {
      ...route,
      children: childrenRoutes,
    };
  }),
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
