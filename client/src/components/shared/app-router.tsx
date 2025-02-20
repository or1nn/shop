import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import NotFound from '@/pages/not-found';
import { MainLayout } from '@components/layouts';
import { authRoutes, publicRoutes } from '@/routes';

export const AppRouter = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {isAuth &&
            authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
